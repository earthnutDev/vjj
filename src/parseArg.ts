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

  if (argsMap['--upDependence']) {
    commandParameters.updateDependence = true;
  }

  if (argsMap['--buildCheck']) {
    commandParameters.buildCheck = true;
  }

  if (argsMap['--publish']) {
    commandParameters.pushNpm = true;
  }

  const noDiff = argsMap['--no-diff'];
  if (!isUndefined(noDiff)) {
    if (noDiff.value && noDiff.value[0] === false) {
      commandParameters.noDiff = false;
    } else {
      commandParameters.noDiff = true;
    }
  }
}
