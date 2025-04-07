import { publish } from './publish';
import { parseArg } from './parseArg';
import { _p } from 'a-node-tools';
import { dataStore } from './data-store';
import { updateDependence } from './updateDependence';
import { versionMange } from './versionMange';
import { greenPen } from './greenPen';
import { buildCheck } from './buildCheck';
import { getVersion } from './getVersion';
import { parseVersion } from './parseVersion';
import { updateVersion } from './updateVersion';

/**
 * 主函数
 */
export async function main() {
  parseArg(); // 解析参数
  // 是否更新依赖
  if (dataStore.updateDependence) {
    await updateDependence();
  }

  // 检查构建
  if (dataStore.buildCheck) {
    await buildCheck();
  }

  /** 版本预估 */
  {
    parseVersion(await getVersion()); // 解析版本号
    await versionMange();
    await updateVersion(); // 更新版本号
  }

  // 发布到 npm
  if (dataStore.pushNpm) {
    await publish();
  }

  _p(greenPen(` 🚀 执行 🚀   ✅`));
}
