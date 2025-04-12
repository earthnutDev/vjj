import { blackPen } from '../pen/blackPen';
import { getBlank } from './getBlank';

/**
 *
 * 黑色背景
 *
 */
export const blackBg = ' '.repeat(getBlank()).concat(blackPen(' '.repeat(56)));
