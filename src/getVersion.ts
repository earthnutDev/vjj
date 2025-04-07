import {
  _p,
  cursorMoveUp,
  getDirectoryBy,
  getNpmPkgInfo,
  npmPkgInfoType,
  pathJoin,
  readFileToJsonSync,
} from 'a-node-tools';
import { isNull, isUndefined } from 'a-type-of-js';
import pen from 'color-pen';

/**  终端的宽度  */
const terminalWidth = process.stdout.columns;

const blackPen = pen.bgBlack;

const blackBg = ' '.repeat(getBlank()).concat(blackPen(' '.repeat(56)));

/**
 *
 * 获取当前的版本号
 *
 */
export async function getVersion() {
  const currentWordDirectory = getDirectoryBy('package.json', 'file');

  if (isUndefined(currentWordDirectory)) {
    throw new Error('未找到package.json文件');
  }
  const { name, version } = getPkgInfo(currentWordDirectory);

  const tempInfo: npmPkgInfoType | null = await getNpmPkgInfo(name);

  // 未获其线上数据或数据不对
  if (isNull(tempInfo) || tempInfo.name !== name) {
    return version;
  }

  parseVersion(version, tempInfo);

  return version;
}

/**
 *
 * 获取包信息
 *
 */
function getPkgInfo(cwd: string) {
  // 获取文件
  const packageInfo = readFileToJsonSync(pathJoin(cwd, 'package.json')) || {};
  const name = packageInfo.name;
  const version = packageInfo.version;

  if (isUndefined(name) || isUndefined(version)) {
    throw new Error('package.json 文件格式错误');
  }

  return { name, version };
}

/**
 *
 * 检查版本号
 *
 */
function parseVersion(version: string, tempInfo: npmPkgInfoType) {
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

  _p(line());
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
  _p(line());
  _p();
  _p();
  _p(pen.italic.black('请检测包本地版本'));
  _p();
}

/**  画线  */
function line() {
  let str = '';
  for (let i = 0; i < terminalWidth; i++) {
    str += pen.random(i % 3 == 0 ? '*' : '=');
  }
  return str;
}

/**  获取空白的宽度  */
function getBlank() {
  const blank = (terminalWidth - 56) / 2;
  return blank > 0 ? blank : 0;
}
