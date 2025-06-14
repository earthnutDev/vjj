import { _p, runOtherCode } from 'a-node-tools';
import { greenPen } from 'color-pen';
import { exitProgram } from './utils';

/**
 *
 * 检查构建
 *
 */
export async function buildCheck() {
  const rebuild = await runOtherCode({
    code: 'npm run build',
    printLog: true,
    waiting: true,
  });

  if (!rebuild.success) {
    return exitProgram('打包测试出现故障，请排除该故障后重试');
  }
  _p(greenPen(`打包测试完成`));
}
