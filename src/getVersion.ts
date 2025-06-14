import {
  getDirectoryBy,
  PackageJson,
  pathJoin,
  readFileToJsonSync,
} from 'a-node-tools';
import { isNull, isUndefined } from 'a-type-of-js';
import { dataStore } from './data-store';
import { originalVersion } from './data-store/originalVersion';
import { exitProgram } from './utils';

/**
 *
 * 获取当前的版本号
 *
 */
export async function getVersion(): Promise<void> {
  /**  本地 package.json 文件的上级目录  */
  const currentWordDirectory = getDirectoryBy('package.json', 'file');

  if (isUndefined(currentWordDirectory)) {
    await exitProgram('未获取到 package.json 数据');
    throw new Error('未找到package.json文件');
  }

  const { name, version } = await getPkgInfoFromFile(currentWordDirectory);
  // 这里将触发给值的操作
  originalVersion.version = version;
  dataStore.name = name;
}

/**
 *
 * 获取本地的包信息
 *
 */
async function getPkgInfoFromFile(cwd: string) {
  /**  本地 package.json 文件的路径  */
  const packageJsonPath = pathJoin(cwd, 'package.json');
  // 获取文件
  const packageInfo = readFileToJsonSync<PackageJson>(packageJsonPath);

  if (isNull(packageInfo)) {
    await exitProgram(
      '未获取到 package.json 数据 \n 或package.json 文件格式错误',
    );
    throw new Error();
  }

  const name = packageInfo?.name;
  const version = packageInfo?.version;

  if (isUndefined(name) || isUndefined(version)) {
    await exitProgram(
      '未获取到 package.json 数据 \n 或package.json 文件格式错误',
    );
    throw new Error();
  }

  dataStore.packageJson.path = packageJsonPath;
  dataStore.packageJson.info = packageInfo;

  return { name, version };
}
