import { originalVersion } from './../data-store/originalVersion';
import command from '../command';
import { cyanPen, greenPen, magentaPen } from 'color-pen';
import { _p } from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { exitPogrom } from '../utils';
import { writeToFile } from './writeToFile';

/**  重写版本号  */
export async function rewriteVersion(slicingVersion: string) {
  const { version } = originalVersion;
  _p(
    `当前本地的版本 ${magentaPen(version)} \n应改写为 ${cyanPen(slicingVersion)}`,
  );

  const tip = ['重写', '退出'];
  const result = await command.question({
    text: `是否改写入 ${greenPen`package.json`} 文件`,
    tip,
  });

  if (isUndefined(result) || result === tip[1]) {
    return await exitPogrom();
  }

  await writeToFile(slicingVersion);
}
