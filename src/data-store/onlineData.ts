import { dog } from './../dog';
import { npmPkgInfoType } from 'a-node-tools';
import { OnlineData, VersionDetail } from '../types';
import { isBusinessEmptyString, isNull, isUndefined } from 'a-type-of-js';
import { originalVersion } from './originalVersion';
import { parseVersion } from './parseVersion';

export const onlineData: OnlineData = {
  _info: null,
  set info(info: npmPkgInfoType | null) {
    dog('执行赋值');
    this._info = info;
    if (isNull(info)) return;
    // 获取线上已有的预发布 preid 标识，除了 `latest` 标识
    this.preid = Object.keys(info['dist-tags']).filter(tag => tag !== 'latest');

    this.maxVersion = Object.keys(info.time)
      .filter(e => e !== 'created' && e !== 'modified')
      .reduce(
        (previousValue, currentValue) =>
          compared(previousValue, currentValue, info),
        '',
      );

    dog('对比当前最高的版本和当前的版本', this.maxVersion, originalVersion);
    if (
      compared(this.maxVersion, originalVersion.version, info) !==
      originalVersion.version
    ) {
      this.lessThen = true;
    } else {
      this.lessThen = false;
    }
  },
  get info(): npmPkgInfoType | null {
    return this._info;
  },
  preid: [],
  maxVersion: '',
  lessThen: false,
};

const list: { [x: string]: VersionDetail } = {};

/**  对比  */
function compared(a: string, b: string, info: npmPkgInfoType): string {
  if (isBusinessEmptyString(a)) {
    dog('第一参数为空，返回', b);
    return b;
  }
  if (isBusinessEmptyString(b)) {
    dog('第二参数为空，返回', a);
    return a;
  }
  if (a === b) {
    dog('两版本相同，返回任意值', a);
    return a;
  }

  const c: VersionDetail = list[a] ?? (list[a] = parseVersion(a));
  const d: VersionDetail = list[b] ?? (list[b] = parseVersion(b));

  if (c.major > d.major) {
    dog('第一个版本主版本号高', a, b);
    return a;
  } else if (c.major < d.major) {
    dog('第二个版本主版本号高', a, b);
    return b;
  }

  if (c.minor > d.minor) {
    dog('第一个版本次版本号高', a, b);
    return a;
  } else if (c.minor < d.minor) {
    dog('第二个版本次版本号高', a, b);
    return b;
  }

  if (c.patch > d.patch) {
    dog('第一个版本修订版本号高', a, b);
    return a;
  } else if (c.patch < d.patch) {
    dog('第二个版本修订版本号高', a, b);
    return b;
  }

  if (c.hasPrerelease && !d.hasPrerelease) {
    dog('第一个版本没有预发布标识', a, b);
    return a;
  } else if (!c.hasPrerelease && d.hasPrerelease) {
    dog('第二个版本没有预发布标识', a, b);
    return b;
  }
  // 原以为判断天衣无缝，当本地版本为 0x.xx.xx 这种非法的字符时将出现在这里
  else if (!c.hasPrerelease && !d.hasPrerelease) {
    dog('两个都没有预发布标识，本不当走进这个分支', a, b);
    dog.error('出现不可能出现的错误，下面两个数据相等的东西居然', c, d);
    return a;
  }

  if (c.preidOriginal === d.preidOriginal) {
    dog('两个比较版本都含有相同的预发布标签', a, b);
    if (c.prereleaseNumber >= d.prereleaseNumber) {
      return a;
    }
    return b;
  }

  const e = info.time[a],
    f = info.time[b];

  if (isUndefined(e)) {
    dog('第一个参数尚不存在于线上', a, b);
    return f;
  }

  if (isUndefined(f)) {
    dog('第二个参数不存在于线上', a, b);
    return e;
  }

  if (e > f) {
    dog('第一个版本发布的时间高于第二个发布的时间', a, b);
    return a;
  }

  return b;
}
