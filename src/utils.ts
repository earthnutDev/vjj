import { cursorAfterClear } from 'a-node-tools';
import command from './command';
import { waiting } from './waiting';
import { getRandomInt, sleep } from 'a-js-tools';

/**  退出程序  */
export async function exitProgram(info: string = '您选择了退出，正在为您退出') {
  waiting.run({
    info,
    prefix: getRandomInt(5),
  });
  await sleep(890);
  waiting.destroyed();
  cursorAfterClear();
  return command.end();
}
