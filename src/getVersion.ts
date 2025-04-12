import { getDirectoryBy, pathJoin, readFileToJsonSync } from 'a-node-tools';
import { isUndefined } from 'a-type-of-js';
import { dataStore } from './data-store';

/**
 *
 * 获取当前的版本号
 *
 */
export async function getVersion(): Promise<void> {
  const { originalVersion } = dataStore;

  /**  本地 package.json 文件的上级目录  */
  const currentWordDirectory = getDirectoryBy('package.json', 'file');

  if (isUndefined(currentWordDirectory)) {
    throw new Error('未找到package.json文件');
  }

  const { name, version } = getPkgInfoFromFile(currentWordDirectory);

  originalVersion.version = version;
  dataStore.name = name;
}

/**
 *
 * 获取本地的包信息
 *
 */
function getPkgInfoFromFile(cwd: string) {
  /**  本地 package.json 文件的路径  */
  const packageJsonPath = pathJoin(cwd, 'package.json');
  // 获取文件
  const packageInfo = readFileToJsonSync(packageJsonPath) || {};
  const name = packageInfo.name;
  const version = packageInfo.version;

  if (isUndefined(name) || isUndefined(version)) {
    throw new Error(
      '未获取到 package.json 数据 \n 或package.json 文件格式错误',
    );
  }

  dataStore.packageJson.path = packageJsonPath;

  return { name, version };
}
