import { OriginalVersion } from '../types';
import { parseVersion } from './parseVersion';

/**  原始数据  */
export const originalVersion: OriginalVersion = {
  _version: '',
  set version(version: string) {
    this._version = version; // 保存原始版本号

    Object.assign(this, parseVersion(version));
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
};
