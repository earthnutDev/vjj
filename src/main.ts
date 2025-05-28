import { publish } from './publish';
import { parseArg } from './parseArg';
import { chooseNext } from './chooseNext';
import { buildCheck } from './buildCheck';
import { getVersion } from './getVersion';
import { diff } from './diff';
import { updateVersion } from './updateVersion';
import { writeToCHANGELOG } from './writeToCHANGELOG';
import { dog, dun } from './dog';
import { commandParameters } from './data-store/commandParameters';
import { isFalse } from 'a-type-of-js';

/**
 * 主函数
 */
export async function main() {
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
  if (commandParameters.noWriteChangelog === false && dun) {
    await writeToCHANGELOG();
  } else if (isFalse(dun)) {
    dog('跳过执行写入 CHANGELOG.md 文件');
  }

  // 发布到 npm
  if (commandParameters.pushNpm) {
    await publish();
  }
}
