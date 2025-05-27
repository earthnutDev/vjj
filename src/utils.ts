import { cursorAfterClear } from 'a-node-tools';
import command from './command';
import { waiting } from './waiting';
import { getRandomInt } from 'a-js-tools';

/**  退出程序  */
export async function exitPogrom(info: string = '您选择了退出，正在为您退出') {
  waiting.run({
    info,
    prefix: getRandomInt(5),
  });
  await new Promise(resolve => setTimeout(resolve, 880));
  waiting.destroyed();
  cursorAfterClear();
  return command.end();
}
