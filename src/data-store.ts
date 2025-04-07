export const dataStore: {
  /**   依赖更新  */
  updateDependence: boolean | undefined;
  /**  打包 📦 检测  */
  buildCheck: boolean | undefined;
  /**  版本管理  */
  preid: string | undefined;
  /**  上推 npm  */
  pushNpm: boolean | undefined;
  /**   版本号  */
  versionOriginal: string;
  /**  主版本号  */
  major: number;
  /**  次版本号  */
  minor: number;
  /**  修订号  */
  patch: number;
  /**  包含预发布版本号  */
  hasPrerelease: boolean;
  /**  预发布版本号的原有标识   */
  preidOriginal: string;
  /**  预发布版本号   */
  prereleaseNumber: number;
  /**  用户选择的发布模式  */
  semver:
    | 'patch'
    | 'minor'
    | 'major'
    | 'prepatch'
    | 'preminor'
    | 'premajor'
    | 'prerelease'
    | undefined;
} = {
  updateDependence: undefined,
  buildCheck: undefined,
  preid: undefined,
  pushNpm: undefined,
  versionOriginal: '',
  major: 0,
  minor: 0,
  patch: 0,
  hasPrerelease: false,
  preidOriginal: '',
  prereleaseNumber: 0,
  semver: undefined,
};
