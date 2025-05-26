import { isArray, isString, isUndefined } from 'a-type-of-js';
import command from './command';
import { dataStore } from './data-store';

/**
 *
 * 解析参数
 *
 */
export function parseArg() {
  const { commandParameters } = dataStore;
  /**  用户参数  */
  const args = command.args;

  /**  用户参数的 map 形式  */
  const argsMap = args.$map;

  const preid = argsMap['--preid'];

  if (!isUndefined(preid) && isArray(preid.value) && isString(preid.value[0])) {
    commandParameters.preid = preid.value[0];
  }

  // 配置是否打包检测
  if (argsMap['--buildCheck']) {
    commandParameters.buildCheck = true;
  }

  // 配置是否直接 npm publish
  if (argsMap['--publish']) {
    commandParameters.pushNpm = true;
  }

  // 配置是否跳过版本检测
  const noDiff = argsMap['--no-diff'];
  if (!isUndefined(noDiff)) {
    if (noDiff.value && noDiff.value[0] === false) {
      commandParameters.noDiff = false;
    } else {
      commandParameters.noDiff = true;
    }
  }

  // 配置是否不写入 CHANGELOG.md
  const noWriteChangelog = argsMap['--no-changelog'];
  if (!isUndefined(noWriteChangelog)) {
    if (noWriteChangelog.value && noWriteChangelog.value[0] === false) {
      commandParameters.noWriteChangelog = false;
    } else {
      commandParameters.noWriteChangelog = true;
    }
  }
}
