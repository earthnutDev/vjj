import { _p, getNpmPkgInfo } from 'a-node-tools';
import { isNull } from 'a-type-of-js';
import { dataStore } from '../data-store';
import { parseVersion } from './parseVersion';

/**
 *
 * 对比版本号
 *
 */
export async function diff() {
  try {
    const { name, version } = dataStore.originalVersion;
    const npmInfo = await getNpmPkgInfo(name || 'vjj');

    dataStore.onlineData.info = npmInfo;

    // 未获其线上数据或数据不对
    if (isNull(npmInfo) || npmInfo.name !== name) {
      return;
    }

    parseVersion(version, npmInfo);
  } catch (error) {
    if (
      process.env.VJJ_DEV === 'true' &&
      process.env.npm_lifecycle_event === 'dev'
    ) {
      _p(error);
    }
    // 忽略错误
    return;
  }
}
