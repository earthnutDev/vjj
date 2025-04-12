import { _p, runOtherCode } from 'a-node-tools';
import { greenPen } from './pen/greenPen';
import pen from 'color-pen';

/**
 *
 * 问询否需
 *
 */

/**
 *
 * 更新依赖
 *
 */
export async function updateDependence() {
  _p(
    pen.hex('#666')(
      `请等待更新包（你的 package.json 的 scripts 最好有 build 命令）`,
    ),
  );
  await runOtherCode({ code: 'npm update --save' });
  _p(greenPen(`依赖更新完毕`));
}
