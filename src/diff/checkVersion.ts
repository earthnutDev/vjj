import { originalVersion } from './../data-store/originalVersion';
import { _p, cursorMoveUp, npmPkgInfoType } from 'a-node-tools';
import { getBlank } from './getBlank';
import { blackBg } from './blackBg';
import { colorLine } from './colorLine';
import { bgBlackPen, strInOneLineOnTerminal } from 'color-pen';
import { onlineData } from '../data-store/onlineData';
import { chooseVersion } from './chooseVersion';
import { rewriteVersion } from './rewriteVersion';

/**
 *
 * 检查版本号
 *
 * 解析线上的版本，如果线上版本包含本版本，则跳过提示打印
 *
 *
 */
export async function checkVersion(version: string, tempInfo: npmPkgInfoType) {
  const versions = Object.keys(tempInfo.time);

  const {
    major,
    minor,
    patch,
    hasPrerelease,
    preidOriginal,
    prereleaseNumber,
  } = originalVersion;
  /**  由解析来的数据拼接成版本  */
  const splicingVersion = `${major}.${minor}.${patch}${hasPrerelease ? `-${preidOriginal}.${prereleaseNumber}` : ''}`;
  //  拼接版本理应与原版本相同，不相同时则显示一个重写版本的提示
  if (originalVersion.version !== splicingVersion) {
    return await rewriteVersion(splicingVersion);
  }

  // 当前线上版本高
  if (onlineData.lessThen) {
    return await chooseVersion();
  }

  if (versions.includes(version)) {
    return;
  }
  /// 本地的版本展示
  const localVersion = bgBlackPen.hex('#f31')(
    `${'\x20'.repeat(12)}当前包本地版本为: ${version}`,
  );

  // 线上版本
  const onlineVersion = bgBlackPen.hex('#6f9')(
    `${'\x20'.repeat(18)}线上版本为：${tempInfo.version}`,
  );
  const blank = ' '.repeat(getBlank());
  _p();
  _p();
  _p();

  _p(colorLine());
  _p();
  _p(blackBg);
  _p(blackBg);
  _p(blackBg);
  _p(blackBg);
  _p(blackBg);
  cursorMoveUp(3);
  _p(blank, false);
  _p(strInOneLineOnTerminal(localVersion));
  _p(blackBg);
  _p(blank, false);
  _p(strInOneLineOnTerminal(onlineVersion));
  _p(blackBg);
  _p(blackBg);
  _p(blackBg);
  _p();
  _p(colorLine());
  _p();
  _p();
}
