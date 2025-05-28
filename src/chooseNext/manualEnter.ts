import { isUndefined } from 'a-type-of-js';
import command from '../command';
import { exitPogrom } from '../utils';
import { commandParameters } from '../data-store/commandParameters';

/**
 *
 * 获取手动输入的版本号
 *
 */
export async function manualEnter() {
  const preidOriginal = await command.question({
    text: '请为预发布版本号配置标签',
    private: true,
  });

  // 用户在输入与发布的
  if (isUndefined(preidOriginal)) {
    return exitPogrom('您在输入预发布版本的标签时选择了退出，即将为您退出');
  }
  commandParameters.preid = preidOriginal;
}
