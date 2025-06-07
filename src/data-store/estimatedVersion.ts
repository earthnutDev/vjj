import {
  brightBluePen,
  brightGreenPen,
  brightMagentaPen,
  brightRedPen,
  cyanPen,
  greenPen,
  magentaPen,
  redPen,
} from 'color-pen';
import { EstimatedVersion, EstimatedVersionList } from 'src/types';
import { originalVersion } from './originalVersion';
import { commandParameters } from './commandParameters';
import { isZero } from 'a-type-of-js';

/**  箭头  */
const arrowhead = cyanPen`>>`;

/**  获取时间   */
const getTime = () => {
  const time = new Date();

  return `${time.getFullYear().toString()}${(time.getMonth() + 1).toString().padStart(2, '0')}${time.getDate().toString().padStart(2, '0')}`;
};
/** 有序  */
export const list: EstimatedVersionList[] = [
  'prerelease',
  'patch',
  'minor',
  'major',
  'prepatch',
  'preminor',
  'premajor',
] as const;

export const estimatedVersion: EstimatedVersion = Object.fromEntries([
  ...list.map(e => [
    e,
    {
      data: {
        value: '',
        tip: '',
        label: '',
      },
      version: '',
      show: false,
    },
  ]),
  ['list', list],
  [
    'run',
    function (this: EstimatedVersion) {
      const { minor, patch, hasPrerelease } = originalVersion;

      // 当前预发布版本
      if (hasPrerelease) {
        this.buildPrerelease();

        // 预发布下补丁号为 0
        if (isZero(patch)) {
          // 预发布下次版本号为 0
          if (!isZero(minor)) this.buildMinor();
        } else {
          /**  补丁版本号不为 0 则包含这两部分  */
          this.buildPatch();
          this.buildMinor();
        }
      } else {
        // 非预发布时展示这两部分
        this.buildPatch();
        this.buildMinor();
      }
      this.buildMajor();
      this.buildPrepatch();
      this.buildPreminor();
      this.buildPremajor();
      return this.list.filter(e => this[e].show).map(e => this[e].data);
    },
  ],
  /**  下一个预发布版本的标识  */
  [
    'nextPreid',
    function () {
      const { preid } = commandParameters;
      return preid || '⁇';
    },
  ],
  /**  下一个预发布版本的构建号  */
  [
    'nextBuild',
    function (this: EstimatedVersion, prerelease?: true) {
      const nextPreid = prerelease
        ? originalVersion.preidOriginal
        : this.nextPreid();
      return nextPreid === 'canary'
        ? getTime()
        : prerelease
          ? originalVersion.prereleaseNumber + 1
          : 0;
    },
  ],
  /**  构建发布的标签  */
  [
    'createLabel',
    function (_version: string) {
      const { version } = originalVersion;
      return `${version} ${arrowhead} ${_version}`;
    },
  ],
  /**  构建  major 主版本更新预测 */
  [
    'buildMajor',
    function (this: EstimatedVersion) {
      const { hasPrerelease } = originalVersion;
      const version = this.buildPre('major');
      this.major = {
        data: {
          value: 'major',
          tip: `使用 ${redPen`major`} 进行${hasPrerelease ? '测试转正' : '迭代更新'}  `,
          label: this.createLabel(version),
        },
        version,
        show: true,
      };
    },
  ],
  /**  构建次版本更新预测  */
  [
    'buildMinor',
    function (this: EstimatedVersion) {
      const { hasPrerelease } = originalVersion;
      const version = this.buildPre('minor');
      this.minor = {
        data: {
          tip: `使用 ${magentaPen`minor`} 进行${hasPrerelease ? '测试转正' : '功能添加'}`,
          value: 'minor',
          label: this.createLabel(version),
        },
        version: version,
        show: true,
      };
    },
  ],
  /**  构建 debug 版本 */
  [
    'buildPatch',
    function (this: EstimatedVersion) {
      const { hasPrerelease } = originalVersion;
      const version = this.buildPre('patch');
      this.patch = {
        show: true,
        version,
        data: {
          tip: `使用 ${hasPrerelease ? brightBluePen`patch` : greenPen`patch`} 进行${hasPrerelease ? '测试转正' : '修复 bug'} `,
          value: 'patch',
          label: this.createLabel(version),
        },
      };
    },
  ],
  /**  构建主版本的预发布  */
  [
    'buildPremajor',
    function (this: EstimatedVersion) {
      const version = this.buildPre('premajor');
      this.premajor = {
        show: true,
        version,
        data: {
          value: 'premajor',
          label: this.createLabel(version),
          tip: `使用 ${brightRedPen`premajor`} 发布大版本迭代测试`,
        },
      };
    },
  ],
  /**  构建次版本的预发布  */
  [
    'buildPreminor',
    function (this: EstimatedVersion) {
      const version = this.buildPre('preminor');
      this.preminor = {
        show: true,
        version,
        data: {
          value: 'preminor',
          label: this.createLabel(version),
          tip: `使用 ${brightMagentaPen`preminor`} 发布新功能测试`,
        },
      };
    },
  ],
  /**  构建 debug 的预发布版本  */
  [
    'buildPrepatch',
    function (this: EstimatedVersion) {
      const version = this.buildPre('prepatch');
      this.prepatch = {
        data: {
          tip: `使用 ${brightGreenPen`prepatch`} 发布修复测试`,
          value: 'prepatch',
          label: this.createLabel(version),
        },
        version,
        show: true,
      };
    },
  ],
  [
    'buildPrerelease',
    function (this: EstimatedVersion) {
      const { preidOriginal, prereleaseNumber } = originalVersion;
      /**  预发布版本  */
      const version = this.buildPre('prerelease');
      const disable =
        preidOriginal === 'canary' && getTime() === prereleaseNumber.toString();
      this.prerelease = {
        show: true,
        version,
        data: {
          value: 'prerelease',
          tip: `使用 ${greenPen`prerelease`} 进行测试迭代 `,
          label: this.createLabel(version),
          disable,
        },
      };
    },
  ],
  /**  构建每一个新版本预测版本  */
  [
    'buildPre',
    function (this: EstimatedVersion, kind: EstimatedVersionList) {
      const { major, minor, patch, hasPrerelease, preidOriginal } =
        originalVersion;
      if (kind === 'prepatch') {
        return `${major}.${minor}.${patch + 1}-${this.nextPreid()}.${this.nextBuild()}`;
      } else if (kind === 'preminor') {
        return `${major}.${minor + 1}.0-${this.nextPreid()}.${this.nextBuild()}`;
      } else if (kind === 'premajor') {
        return `${major + 1}.0.0-${this.nextPreid()}..${this.nextBuild()}`;
      } else if (kind === 'major') {
        return `${major + Number(!hasPrerelease || !!(patch + minor))}.0.0`;
      } else if (kind === 'prerelease') {
        return `${major}.${minor}.${patch}-${preidOriginal}.${this.nextBuild(true)}`;
      } else if (kind === 'patch') {
        return `${major}.${minor}.${patch + Number(!hasPrerelease)}`;
      } else if (kind === 'minor') {
        return `${major}.${minor + Number(!hasPrerelease || !!patch)}.0`;
      }
    },
  ],
]);
