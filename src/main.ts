import { publish } from './publish';
import { parseArg } from './parseArg';
import { _p } from 'a-node-tools';
import { dataStore } from './data-store';

import { chooseNext } from './chooseNext';
import { greenPen } from './pen/greenPen';
import { buildCheck } from './buildCheck';
import { getVersion } from './getVersion';

import { diff } from './diff';
import { updateVersion } from './updateVersion';
import { writeToCHANGELOG } from './writeToCHANGELOG';

/**
 * 主函数
 */
export async function main() {
  const { commandParameters } = dataStore;
  parseArg(); // 解析参数

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

  // ✍️ 写入 CHANGELOG.md
  if (commandParameters.noWriteChangelog === false) {
    await writeToCHANGELOG();
  }
  // 发布到 npm
  if (commandParameters.pushNpm) {
    await publish();
  }

  _p(greenPen(` 🚀 执行 🚀   ✅`));
}
