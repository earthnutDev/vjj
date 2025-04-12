import { _p, cursorMoveUp, npmPkgInfoType } from 'a-node-tools';
import { blackPen } from '../pen/blackPen';
import { getBlank } from './getBlank';
import { blackBg } from './blackBg';
import { colorLine } from './colorLine';

/**
 *
 * 检查版本号
 *
 */
export function parseVersion(version: string, tempInfo: npmPkgInfoType) {
  const versions = Object.keys(tempInfo.time);
  if (versions.includes(version)) {
    return;
  }
  /// 本地的版本展示
  const localVersion = blackPen.hex('#f31')(
    `${'\x20'.repeat(12)}当前包本地版本为: ${version}`,
  );

  // 线上版本
  const onlineVersion = blackPen.hex('#6f9')(
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
  _p(localVersion);
  _p(blackBg);
  _p(blank, false);
  _p(onlineVersion);
  _p(blackBg);
  _p(blackBg);
  _p(blackBg);
  _p();
  _p(colorLine());
  _p();
  _p();
}
