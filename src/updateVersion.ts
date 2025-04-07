import { runOtherCode, _p } from 'a-node-tools';
import pen from 'color-pen';
import { dataStore } from './data-store';

/**
 *
 * 更新版本号
 *
 */
export async function updateVersion() {
  const { semver, preid, preidOriginal } = dataStore;
  if (!semver) {
    _p(pen.random('没有版本号，跳过版本更新'));
    return;
  }
  const code = `npm version ${semver} --no-git-tag-version --allow-same-version ${semver.startsWith('pre') ? `--preid  ${preid || preidOriginal || ''}` : ''}`;
  /** 该版本更新并不会提交代码，代码提交放到下面来做版本的变更 */
  await runOtherCode({ code });
  _p(pen.random('版本整理完毕'));
}
