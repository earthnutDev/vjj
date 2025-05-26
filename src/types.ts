import { npmPkgInfoType } from 'a-node-tools';

/**
 *
 * 可用的升级策略
 *
 */
export type Semver =
  | 'patch'
  | 'minor'
  | 'major'
  | 'prepatch'
  | 'preminor'
  | 'premajor'
  | 'prerelease'
  | undefined;
/**
 *
 * 数 据
 *
 */
export interface DataStore {
  /**
   *
   *   当前包的名
   *
   *
   * 是由 getter、setter 来控制的，在 setter 时会同步设置 originalVersion.name 为当前包的名
   *
   */
  name: string;
  /**  本地 package.json */
  packageJson: {
    /**  本地 package.json 文件的路径  */
    path: string;
    /**    */
  };
  /**  用户参数  */
  commandParameters: {
    /**  不显示对比，缺省值为 false  */
    noDiff: boolean;
    /**  不写入 CHANGELOG.md  */
    noWriteChangelog: boolean;
    /**  打包 📦 检测  */
    buildCheck: boolean | undefined;
    /**
     *
     *  预发布包的
     *
     * 该值有两个赋值的途径：
     *
     * - 手动命令式添加值 `--id xx`
     * - 选择带预发布版本时添加该值
     *
     * 该值将作为最后的 preid 值
     */
    preid: string | undefined;
    /**  上推 npm  */
    pushNpm: boolean | undefined;
  };
  /**  原版本号的信息  */
  originalVersion: {
    /**  包名  */
    name: string;
    /**  版本号  */
    _version: string;
    /**
     *
     *   版本号
     *
     *
     * 该值会在 setter 时被更新，当 setter 时，会更新 _version 的值，
     *
     * 并设置 major、minor、patch、hasPrerelease、preidOriginal、prereleaseNumber 的值
     *
     */
    version: string;
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
  };
  /**
   *
   * 线上版本信息
   *
   *  该值受 `no-diff` 值的影响
   */
  onlineData: {
    _info: npmPkgInfoType | null;
    /**  从接口获取的全数据  */
    info: npmPkgInfoType | null;
    /**  线上已有的预发布 preid 标识 （给 info 赋值的时候自定更新该值）  */
    preid: string[];
  };
  /**  用户选择的发布模式  */
  _semver: Semver;
  /**
   *
   * ###  用户选择的发布模式
   *
   * 该值在 setter ，根据发布类型自动覆盖 preid
   *
   */
  semver: Semver;
  /**  最终返回的真实版本  */
  newVersion: string;
}
