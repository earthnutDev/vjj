import { _p, cursorAfterClear } from 'a-node-tools';
import command from './command';
import { waiting } from './waiting';
import { getRandomInt, sleep } from 'a-js-tools';
import { cyanPen, greenPen } from 'color-pen';
import { dataStore } from './data-store';

/**  退出程序  */
export async function exitProgram(info: string = '您选择了退出，正在为您退出') {
  const { version } = dataStore.originalVersion;
  const { onlineData } = dataStore;
  waiting.run({
    info,
    prefix: getRandomInt(5),
  });
  await sleep(890);
  waiting.destroyed();
  cursorAfterClear();
  if (version) {
    _p(`当前应用的版本是 ${cyanPen(version)}`);
  }
  if (onlineData.info?.version) {
    _p(`当前线上版本为 ${greenPen(onlineData.info?.version)}`);
  }
  return command.end();
}
