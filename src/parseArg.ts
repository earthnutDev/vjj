import { isString } from 'a-type-of-js';
import command from './command';
import { dataStore } from './data-store';

/**
 *
 * 解析参数
 *
 */
export function parseArg() {
  /**  用户参数  */
  const args = command.args;

  /**  用户参数的 map 形式  */
  const argsMap = args.$map;

  if (argsMap['preid'] && isString(argsMap['preid'].value[0])) {
    dataStore.preid = argsMap['preid'].value[0];
  }

  if (argsMap['updateDependence']) {
    dataStore.updateDependence = true;
  }

  if (argsMap['buildCheck']) {
    dataStore.buildCheck = true;
  }

  if (argsMap['publish']) {
    dataStore.pushNpm = true;
  }
}
