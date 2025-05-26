import { runOtherCode, _p } from 'a-node-tools';
import { dataStore } from './data-store';
import { hexPen, magentaPen } from 'color-pen';
import { isFalse } from 'a-type-of-js';
import { dun } from './dog';
import { exitPogrom } from './utils';

/**
 *
 * 更新版本号
 *
 */
export async function updateVersion() {
  const { semver, originalVersion, commandParameters } = dataStore;
  const { preid } = commandParameters;
  const { version } = originalVersion;

  if (!semver) {
    return await exitPogrom(
      hexPen('#aa0')`没有选择发布模式版本号，跳过版本更新`,
    );
  }

  const code = `npm version ${semver} --no-git-tag-version --allow-same-version ${semver.startsWith('pre') ? `--preid  ${preid}` : ''}`;

  if (!dun) {
    _p('跳过执行', false);
    return _p(code);
  }
  /** 该版本更新并不会提交代码，代码提交放到下面来做版本的变更 */
  const result = await runOtherCode({ code, printLog: false, waiting: true });
  if (isFalse(result.success)) {
    return exitPogrom(magentaPen`执行 npx version 出现故障`);
  } else {
    _p(hexPen('#3a6')`版本整理完毕, 版本号由 ${version} 更新为 ${result.data}`);
    dataStore.newVersion = result.data.replace(/\n/g, '');
  }
}
