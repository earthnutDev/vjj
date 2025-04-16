import { fileExist, pathJoin } from 'a-node-tools';
import { dataStore } from '../data-store';
import { fileNotExist } from './fileNotExist';
import { appendNewVersion } from './appendNewVersion';

/**
 *
 * 将新版本的内容写入 CHANGELOG.md
 *
 */
export async function writeToCHANGELOG() {
  const { newVersion, packageJson } = dataStore;

  const { path } = packageJson;
  /**  文件路径  */
  const filePath = pathJoin(path, '../CHANGELOG.md');

  /**  判断文件是否存在  */
  const fileIsExist = fileExist(filePath);

  // 文件不存在直接新建该文件
  if (!fileIsExist) {
    return fileNotExist(filePath, newVersion);
  }

  await appendNewVersion(filePath, newVersion);
}
