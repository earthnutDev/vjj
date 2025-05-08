import { _p, runOtherCode } from 'a-node-tools';
import command from './command';
import { greenPen } from 'color-pen';

/**
 *
 * 检查构建
 *
 */
export async function buildCheck() {
  const rebuild = await runOtherCode('npm run build');

  if (!rebuild.success) {
    command.error();
  }
  _p(greenPen(`打包测试完成`));
}
