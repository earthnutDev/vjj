import { Semver } from 'src/types';
import { npmPkgInfoType } from 'a-node-tools';
import { DataStore } from './types';
import { isNull } from 'a-type-of-js';

/**
 *
 * 数仓
 *
 */
export const dataStore: DataStore = {
  commandParameters: {
    updateDependence: undefined,
    buildCheck: undefined,
    preid: undefined,
    pushNpm: undefined,
    noDiff: false,
  },
  originalVersion: {
    _version: '',
    set version(version: string) {
      this._version = version; // 保存原始版本号

      /**    预发布版本号  */
      let prerelease: string = '';

      if (!/^(\d+\.?){3}(-([\w|\d]+\.)?\d+)?$/.test(version)) {
        throw new Error('版本号格式错误');
      }
      // 包含预发布版本号信息
      if (version.includes('-')) {
        this.hasPrerelease = true;
        [version, prerelease] = version.split('-');
        if (prerelease.includes('.')) {
          const prereleaseArray = prerelease.split('.');
          this.preidOriginal = prereleaseArray[0];
          this.prereleaseNumber = Number(prereleaseArray[1]);
        } else {
          // 如果包含字母
          if (/^[a-zA-Z]+$/.test(prerelease)) {
            this.preidOriginal = prerelease;
            this.prereleaseNumber = 0;
          }

          // 如果仅包含数字
          else if (/^[0-9]+$/.test(prerelease)) {
            this.preidOriginal = '';
            this.prereleaseNumber = Number(prerelease);
          }
        }
      }

      [this.major, this.minor, this.patch] = version
        .split('.')
        .map(v => Number(v));
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
  },

  set name(name: string) {
    this.originalVersion.name = name;
  },
  get name() {
    return this.originalVersion.name;
  },
  onlineData: {
    _info: null,
    set info(info: npmPkgInfoType | null) {
      this._info = info;
      if (isNull(info)) return;
      // 获取线上已有的预发布 preid 标识，除了 `latest` 标识
      this.preid = Object.keys(info['dist-tags']).filter(
        tag => tag !== 'latest',
      );
    },
    get info(): npmPkgInfoType | null {
      return this._info;
    },
    preid: [],
  },
  packageJson: {
    path: '',
  },
  _semver: undefined,
  get semver() {
    return this._semver;
  },
  set semver(value: Semver) {
    this._semver = value;
    // 当值
    if (value === 'prerelease') {
      this.commandParameters.preid = this.originalVersion.preidOriginal;
    }
  },
};
