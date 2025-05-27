import { OriginalVersion, VersionDetail } from './types';

/**  原始数据  */
export const originalVersion: OriginalVersion = {
  _version: '',
  set version(version: string) {
    this._version = version; // 保存原始版本号

    Object.assign(this, this.parseVersion(version));
  },
  get version() {
    return this._version;
  },
  major: 0,
  minor: 0,
  patch: 0,
  hasPrerelease: false,
  preidOriginal: '',
  prereleaseNumber: 0,
  name: '',
  parseVersion(version: string): VersionDetail {
    let prerelease,
      hasPrerelease = false,
      preidOriginal = '',
      prereleaseNumber = 0,
      major = 0,
      minor = 0,
      patch = 0;

    if (!/^(\d+\.?){3}(-([\w|\d]+\.)?\d+)?$/.test(version)) {
      throw new Error('版本号格式错误');
    }

    // 包含预发布版本号信息
    if (version.includes('-')) {
      hasPrerelease = true;
      [version, prerelease] = version.split('-');
      if (prerelease.includes('.')) {
        const prereleaseArray = prerelease.split('.');
        preidOriginal = prereleaseArray[0];
        prereleaseNumber = Number(prereleaseArray[1]);
      } else {
        // 如果包含字母
        if (/^[a-zA-Z]+$/.test(prerelease)) {
          preidOriginal = prerelease;
          prereleaseNumber = 0;
        }

        // 如果仅包含数字
        else if (/^[0-9]+$/.test(prerelease)) {
          preidOriginal = '';
          prereleaseNumber = Number(prerelease);
        }
      }
    }

    [major, minor, patch] = version.split('.').map(v => Number(v));
    return {
      hasPrerelease,
      preidOriginal,
      prereleaseNumber,
      major,
      minor,
      patch,
    };
  },
};
