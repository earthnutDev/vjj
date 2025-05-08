import { randomPen, strInOneLineOnTerminal } from 'color-pen';
import { getTerminalWidth } from './terminalWidth';

/**  画线  */
export function colorLine() {
  const terminalWidth = getTerminalWidth();
  let str = '';
  for (let i = 0; i < terminalWidth; i++) {
    str += randomPen(i % 3 == 0 ? '*' : '=');
  }
  return strInOneLineOnTerminal(str);
}
