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
      show: false,
    },
  ]),
  ['list', list],
  [
    'run',
    function (this: EstimatedVersion) {
      const { minor, patch, hasPrerelease } = originalVersion;
      /**  构建 minor  */
      const createMinor = () => {
        const value = this.buildPre('minor');
        this.minor = {
          data: {
            tip: `使用 ${magentaPen`minor`} 进行${hasPrerelease ? '测试转正' : '功能添加'}`,
            value,
            label: this.createLabel(value),
          },
          show: true,
        };
      };
      /**  构建 patch  */
      const createPatch = () => {
        const value = this.buildPre('patch');
        this.patch = {
          show: true,
          data: {
            tip: `使用 ${hasPrerelease ? brightBluePen`patch` : greenPen`patch`} 进行${hasPrerelease ? '测试转正' : '修复 bug'} `,
            value,
            label: this.createLabel(value),
          },
        };
      };

      // 当前预发布版本
      if (hasPrerelease) {
        /**  预发布版本  */
        const prereleaseVersion = this.buildPre('prerelease');
        this.prerelease = {
          show: true,
          data: {
            value: prereleaseVersion,
            tip: `使用 ${greenPen`prerelease`} 进行测试迭代 `,
            label: this.createLabel(prereleaseVersion),
          },
        };
        // 预发布下补丁号为 0
        if (isZero(patch)) {
          // 预发布下次版本号为 0
          if (!isZero(minor)) createMinor();
        } else {
          /**  补丁版本号不为 0 则包含这两部分  */
          createPatch();
          createMinor();
        }
      } else {
        // 非预发布时展示这两部分
        createPatch();
        createMinor();
      }
      const value = this.buildPre('major');
      this.major = {
        data: {
          value,
          tip: `使用 ${redPen`major`} 进行${hasPrerelease ? '测试转正' : '迭代更新'}  `,
          label: this.createLabel(value),
        },
        show: true,
      };
      this.buildPrepatch();
      this.buildPreminor();
      this.buildPremajor();
      return this.list.filter(e => this[e].show).map(e => this[e].data);
    },
  ],
  [
    'nextPreid',
    function () {
      const { preid } = commandParameters;
      return preid || '⁇';
    },
  ],
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
  [
    'createLabel',
    function (_version: string) {
      const { version } = originalVersion;
      return `${version} ${arrowhead} ${_version}`;
    },
  ],
  [
    'buildPremajor',
    function (this: EstimatedVersion) {
      const value = this.buildPre('premajor');
      this.premajor = {
        show: true,
        data: {
          value: 'premajor',
          label: this.createLabel(value),
          tip: `使用 ${brightRedPen`premajor`} 发布大版本迭代测试`,
        },
      };
    },
  ],
  [
    'buildPreminor',
    function (this: EstimatedVersion) {
      const value = this.buildPre('preminor');
      this.preminor = {
        show: true,
        data: {
          value: 'preminor',
          label: this.createLabel(value),
          tip: `使用 ${brightMagentaPen`preminor`} 发布新功能测试`,
        },
      };
    },
  ],
  [
    'buildPrepatch',
    function (this: EstimatedVersion) {
      const value = this.buildPre('prepatch');
      this.prepatch = {
        data: {
          tip: `使用 ${brightGreenPen`prepatch`} 发布修复测试`,
          value: 'prepatch',
          label: this.createLabel(value),
        },
        show: true,
      };
    },
  ],
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
