import command from 'src/command';
import { dataStore } from 'src/data-store';
import { manualEnter } from './manualEnter';

/**
 * 获取预发布版本号
 */
export async function getPreid() {
  const { commandParameters, onlineData } = dataStore;

  // 如果说手动设置了 preid ，一般不会调用该方法，但是为了防止意外
  // 如果手动设置了 preid ，将以该值为准
  if (commandParameters.preid) {
    return;
  }

  /**  建议的 preid  */
  const suggestPreid = [
    'alpha: 版本处于内部测试',
    'beta: 版本进入公测',
    'rc: 版本进入候选',
    'next: 下一个版本',
  ];

  const { preid: preidOnline, info } = onlineData;

  /**  云端的已有的  */
  const onlinePreidList = preidOnline.map(
    item => `${item}: 上一次在版本 ${info?.['dist-tags'][item]} 🀄️ 使用`,
  );

  onlinePreidList.push(
    ...suggestPreid.filter(item =>
      preidOnline.every(preid => !item.startsWith(preid + ':')),
    ),
    '手动输入',
  );

  const choosePreid = (await command.selection({
    data: onlinePreidList,
    resultText: '您输入的预发布版本号为',
  })) as string;

  if (choosePreid === '手动输入') {
    return await manualEnter();
  }

  commandParameters.preid = choosePreid.split(':')[0];
}
