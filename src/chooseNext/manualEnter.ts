import { isUndefined } from 'a-type-of-js';
import command from '../command';
import { exitProgram } from '../utils';
import { commandParameters } from '../data-store/commandParameters';
import { dataStore } from 'src/data-store';
import { estimatedVersion } from 'src/data-store/estimatedVersion';
/**
 *
 * 获取手动输入的版本号
 *
 */
export async function manualEnter() {
  const result = await command.question({
    text: '请为预发布版本号配置标签',
    verify: [
      {
        reg: /^[a-zA-Z].*$/,
        info: '首字符仅支持大小写英文字符',
      },
      {
        reg: /^.[a-zA-Z0-9]*$/,
        info: '非首字符仅支持使用大小写字符及数字',
      },
    ],
  });

  // 用户在输入与发布的
  if (isUndefined(result)) {
    return exitProgram('您在输入预发布版本的标签时选择了退出，即将为您退出');
  }

  commandParameters.preid = result;
  dataStore.semver = estimatedVersion.buildPre(dataStore.semver!) as never;
}
