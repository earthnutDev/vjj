import { onlineData } from './../data-store/onlineData';
import { dataStore } from './../data-store/index';
import { isNull } from 'a-type-of-js';
import { dog, dun } from '../dog';
import { writeFileSync } from 'node:fs';
import { originalVersion } from '../data-store/originalVersion';
import { exitProgram } from '../utils';
import { checkVersion } from './checkVersion';

/**  写入 package.json 文件  */
export async function writeToFile(newVersion: string) {
  const { packageJson } = dataStore;
  try {
    if (dun) {
      const { path, info } = packageJson;
      if (isNull(info)) {
        dog.error(
          '没有获取到本地的 package.json 的数据。然而，这里不应该出现这样的错误的呀！',
        );
        return await exitProgram('错了就是错了，何必纠结错在哪里了');
      }
      info.version = newVersion;
      writeFileSync(path, JSON.stringify(info, null, 2));
    }
    originalVersion.version = newVersion;
    // eslint-disable-next-line no-self-assign
    onlineData.info = onlineData.info;

    const { info } = onlineData;

    if (isNull(info)) {
      dog.error('已拥有数据现在非法报空', info);
      return await exitProgram('又是不该出现的错误出现在了这里，已有数据报空');
    }

    await checkVersion(newVersion, info);
  } catch (error) {
    dog.error('向用户 package.json 文件写入版本号', newVersion, '出错', error);
    return await exitProgram('写入 package.json 文件出错');
  }
}
