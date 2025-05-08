import { bgBlackPen, strInOneLineOnTerminal } from 'color-pen';
import { getBlank } from './getBlank';

/**
 *
 * 黑色背景
 *
 */
export const blackBg = strInOneLineOnTerminal(
  ' '.repeat(getBlank()).concat(bgBlackPen(' '.repeat(56))),
);
