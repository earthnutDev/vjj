import { Semver } from 'src/types';
import { DataStore } from '../types';
import { originalVersion } from './originalVersion';
import { onlineData } from './onlineData';
import { commandParameters } from './commandParameters';

/**
 *
 * 数仓
 *
 */
export const dataStore: DataStore = {
  commandParameters,
  originalVersion,

  set name(name: string) {
    this.originalVersion.name = name.trim();
  },
  get name() {
    return this.originalVersion.name.trim();
  },
  onlineData,
  packageJson: {
    path: '',
    info: null,
  },
  _semver: undefined,
  get semver() {
    return this._semver;
  },
  set semver(value: Semver) {
    this._semver = value;
    // 当值为 prerelease 时，标签为原标签
    if (value === 'prerelease') {
      this.commandParameters.preid = this.originalVersion.preidOriginal;
    }
  },
  newVersion: '',
};
