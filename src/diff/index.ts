import { dog } from './../dog';
import { getNpmPkgInfo } from 'a-node-tools';
import { isNull } from 'a-type-of-js';
import { checkVersion } from './checkVersion';
import { originalVersion } from '../data-store/originalVersion';
import { onlineData } from '../data-store/onlineData';

/**
 *
 * 对比版本号
 *
 *
 * 获取线上的 npm 版本号，检出最后的 latest 版本
 */
export async function diff() {
  try {
    const { name, version } = originalVersion;

    const result = await getNpmPkgInfo(name || 'vjj');

    const npmInfo = result.data;

    onlineData.info = npmInfo;

    // 未获其线上数据或数据不对
    if (isNull(npmInfo) || npmInfo.name !== name) {
      return;
    }

    await checkVersion(version, npmInfo); // 比较版本
  } catch (error) {
    dog.error(error);
    // 忽略错误
    return;
  }
}
