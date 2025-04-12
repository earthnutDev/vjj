import { getTerminalWidth } from './terminalWidth';

/**  获取空白的宽度  */
export function getBlank() {
  const terminalWidth = getTerminalWidth();
  const blank = (terminalWidth - 56) / 2;
  return blank > 0 ? blank : 0;
}
