import { _p, runOtherCode } from 'a-node-tools';
import { greenPen } from './pen/greenPen';

/**
 *
 * 更新 npm 依赖项
 *
 */
export async function publish() {
  _p(greenPen(`版本整理完毕，准备上到 npm`));
  const publish = await runOtherCode('npm publish');
  if (!publish.error) {
    _p(greenPen(`上推 npm 包完毕`));
  }
}
