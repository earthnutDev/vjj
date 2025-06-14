import { dataStore } from './../data-store/index';
import { estimatedVersion } from './../data-store/estimatedVersion';
import { isUndefined } from 'a-type-of-js';
import command from '../command';
import { manualEnter } from './manualEnter';
import { exitProgram } from '../utils';
import { commandParameters } from '../data-store/commandParameters';
import { onlineData } from '../data-store/onlineData';
import { enArr, getRandomString } from 'a-js-tools';
import { SelectionParamObjectData } from 'a-command';

/**
 * 获取预发布版本号
 */
export async function getPreid() {
  // 如果说手动设置了 preid ，一般不会调用该方法，但是为了防止意外
  // 如果手动设置了 preid ，将以该值为准
  if (commandParameters.preid) {
    return;
  }

  /**  建议的 preid  */
  const data: SelectionParamObjectData<string>[] = [
    {
      label: 'canary: 不好，有瓦斯',
      value: 'canary',
    },
    { label: 'alpha: 版本处于内部测试', value: 'alpha' },
    { label: 'beta: 版本进入公测', value: 'beta' },
    { label: 'rc: 版本进入候选', value: 'rc' },
    { label: 'next: 下一个版本', value: 'next' },
  ];

  /**  简单的建议的 preid 的数组  */
  const suggestPreid = data.map(e => e.value);

  const { preid: preidOnline, info } = onlineData;

  /**  交集 id ，这些 id 在两个数组中均包含  */
  const intersectionPreid = enArr.intersection(preidOnline, suggestPreid);
  const differencePreid = enArr.difference(preidOnline, suggestPreid);
  /**  差值 id ，这些 id 仅存在于线上已发布  */

  intersectionPreid.forEach(
    e =>
      (data[data.findIndex(i => i.value === e)].tip =
        `上一次在版本 ${info?.['dist-tags'][e]} 中使用`),
  );

  differencePreid.forEach(e =>
    data.unshift({
      label: `${e}: 上一次在版本 ${info?.['dist-tags'][e]} 中使用`,
      value: e,
    }),
  );

  const value = getRandomString({
    length: 6,
    includeNumbers: true,
    includeSpecial: true,
  });

  data.push({
    label: '手动输入',
    value,
    tip: '使用全新的 dist tag',
  });

  // data.forEach(e => {
  //   // 当前的标签在待选（一定在）时屏蔽该指
  //   if (e.value === preidOriginal) {
  //     e.disable = true;
  //   }
  // });

  const choosePreid = await command.selection<string>({
    data,
    info: '请为本次预发布配置标签',
    private: true,
  });

  // 用户使了退出
  if (isUndefined(choosePreid)) {
    return await exitProgram();
  }

  if (choosePreid === value) {
    return await manualEnter();
  }

  commandParameters.preid = choosePreid;

  dataStore.semver = estimatedVersion.buildPre(dataStore.semver!) as never;
}
