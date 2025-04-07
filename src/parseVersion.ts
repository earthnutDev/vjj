import { dataStore } from './data-store';

/**
 * 解析版本号
 */
export function parseVersion(versionAll: string): void {
  /**  主要版本号  */
  let major: number = 0,
    /**  次版本号  */
    minor: number = 0,
    /**  补丁版本号  */
    patch: number = 0,
    /**    是否是预发布版本  */
    hasPrerelease: boolean = false,
    /**    预发布版本号  */
    prerelease: string = '',
    /**    预发布版本标识  */
    prereleaseIdentifier: string = '',
    /**    预发布版本号  */
    prereleaseNumber: number = 0;
  let version: string = versionAll;
  if (!/^(\d+\.?){3}(-([\w|\d]+\.)?\d+)?$/.test(versionAll)) {
    throw new Error('版本号格式错误');
  }
  // 包含预发布版本号信息
  if (versionAll.includes('-')) {
    hasPrerelease = true;
    [version, prerelease] = versionAll.split('-');
    if (prerelease.includes('.')) {
      const prereleaseArray = prerelease.split('.');
      prereleaseIdentifier = prereleaseArray[0];
      prereleaseNumber = Number(prereleaseArray[1]);
    } else {
      prereleaseIdentifier = '';
      prereleaseNumber = parseInt(prerelease);
    }
  } else {
    version = versionAll;
  }
  [major, minor, patch] = version.split('.').map(v => Number(v));

  dataStore.versionOriginal = versionAll;
  dataStore.major = major;
  dataStore.minor = minor;
  dataStore.patch = patch;
  dataStore.hasPrerelease = hasPrerelease;
  dataStore.preidOriginal = prereleaseIdentifier;
  dataStore.prereleaseNumber = prereleaseNumber;
}
