import { dog } from './../dog';
import { onlineData } from './../data-store/onlineData';
import { originalVersion } from '../data-store/originalVersion';
import command from '../command';
import { isUndefined, isZero } from 'a-type-of-js';
import { writeToFile } from './writeToFile';

/**  选择正确的版本  */
export async function chooseVersion() {
  const data = [
    `当前本地版本：${originalVersion.version}`,
    `线上最新版本：${onlineData.maxVersion}（选择此项将先写入 package.json）`,
  ];
  dog('当前两个版本号为', originalVersion, onlineData.maxVersion);
  const result = await command.selection(
    {
      info: '当前版本低于线上版本，请选择升级的基准版本号',
      data,
      private: true,
    },
    'number',
  );

  if (isUndefined(result) || isZero(result)) {
    return;
  }

  await writeToFile(onlineData.maxVersion);
}
