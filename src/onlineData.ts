import { npmPkgInfoType } from 'a-node-tools';
import { OnlineData } from './types';
import { originalVersion } from './originalVersion';
import { isNull } from 'a-type-of-js';

export const onlineData: OnlineData = {
  _info: null,
  set info(info: npmPkgInfoType | null) {
    this._info = info;
    if (isNull(info)) return;
    // 获取线上已有的预发布 preid 标识，除了 `latest` 标识
    this.preid = Object.keys(info['dist-tags']).filter(tag => tag !== 'latest');

    this.maxVersion =
      Object.keys(info.time)
        .filter(e => e !== 'created' && e !== 'modified')
        .sort()
        .at(-1) || '';

    if (this.maxVersion > originalVersion.version) {
      this.lessThen = true;
    }
  },
  get info(): npmPkgInfoType | null {
    return this._info;
  },
  preid: [],
  maxVersion: '',
  lessThen: false,
};
