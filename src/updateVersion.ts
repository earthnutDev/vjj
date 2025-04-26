import { runOtherCode, _p } from 'a-node-tools';
import pen from 'color-pen';
import { dataStore } from './data-store';
import command from './command';

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
    _p(pen.hex('#aa0')`没有选择发布模式版本号，跳过版本更新`);
    return;
  }
  const code = `npm version ${semver} --no-git-tag-version --allow-same-version ${semver.startsWith('pre') ? `--preid  ${preid}` : ''}`;
  /** 该版本更新并不会提交代码，代码提交放到下面来做版本的变更 */
  const result = await runOtherCode({ code, printLog: false });
  if (result.success === false) {
    command.error();
  } else {
    _p(
      pen.hex('#3a6')`版本整理完毕, 版本号由 ${version} 更新为 ${result.data}`,
    );
    dataStore.newVersion = result.data.replace(/\n/g, '');
  }
}
