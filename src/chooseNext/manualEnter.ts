import command from '../command';
import { dataStore } from '../data-store';

/**
 *
 * 获取手动输入的版本号
 *
 */
export async function manualEnter() {
  const preidOriginal = await command.question({
    text: '请输入预发布版本号',
    resultText: '您输入的预发布版本号为',
  });

  dataStore.commandParameters.preid = preidOriginal as string;
}
