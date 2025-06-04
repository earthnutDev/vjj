import { dog } from './../dog';
import { onlineData } from './../data-store/onlineData';
import { originalVersion } from '../data-store/originalVersion';
import command from '../command';
import { isUndefined } from 'a-type-of-js';
import { writeToFile } from './writeToFile';
import { magentaPen } from 'color-pen';

/**  选择正确的版本  */
export async function chooseVersion() {
  const data = [
    {
      label: `当前本地版本：${originalVersion.version}`,
      value: originalVersion.version,
      tip: '保持本地版本，可能会造成发布版本' + magentaPen`冲突`,
    },
    {
      label: `线上最新版本：${onlineData.maxVersion}`,
      value: onlineData.maxVersion,
      tip: '确认将先重写 package.json 中版本号',
    },
  ];
  dog('当前两个版本号为', originalVersion, onlineData.maxVersion);
  const result = await command.selection({
    info: '当前版本低于线上版本，请选择升级的基准版本号',
    data,
  });

  if (isUndefined(result) || result === originalVersion.version) {
    return;
  }

  await writeToFile(result);
}
