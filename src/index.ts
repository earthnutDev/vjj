import { publish } from './publish';
import { parseArg } from './parseArg';
import { _p } from 'a-node-tools';
import { dataStore } from './data-store';
import { updateDependence } from './updateDependence';
import { chooseNext } from './chooseNext';
import { greenPen } from './pen/greenPen';
import { buildCheck } from './buildCheck';
import { getVersion } from './getVersion';

import { diff } from './diff';
import { updateVersion } from './updateVersion';

/**
 * 主函数
 */
export async function main() {
  const { commandParameters } = dataStore;
  parseArg(); // 解析参数

  // 是否更新依赖
  if (commandParameters.updateDependence) {
    await updateDependence();
  }

  // 检查构建
  if (commandParameters.buildCheck) {
    await buildCheck();
  }

  /** 版本预估 */
  {
    await getVersion(); // 获取版本号
    if (commandParameters.noDiff === false) {
      await diff();
    }

    await chooseNext(); // 版本预估
    await updateVersion(); // 更新版本号
  }

  // 发布到 npm
  if (commandParameters.pushNpm) {
    await publish();
  }

  _p(greenPen(` 🚀 执行 🚀   ✅`));
}
