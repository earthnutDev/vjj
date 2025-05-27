import { dataStore } from './../data-store';
import { dog, dun } from './../dog';
import { onlineData } from './../onlineData';
import { originalVersion } from '../originalVersion';
import command from '../command';
import { isNull, isUndefined, isZero } from 'a-type-of-js';
import { writeFileSync } from 'node:fs';

/**  选择正确的版本  */
export async function chooseVersion() {
  const { packageJson } = dataStore;
  const data = [
    `当前本地版本：${originalVersion.version}`,
    `线上最新版本：${onlineData.maxVersion}（选择此项将先写入 package.json）`,
  ];

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

  try {
    if (dun) {
      const { path, info } = packageJson;
      if (isNull(info)) {
        dog.error(
          '没有获取到本地的 package.json 的数据。然而，这里不应该出现这样的错误的呀！',
        );
        throw new RangeError('错了就是错了，何必纠结错在哪里了');
      }
      info.version = onlineData.maxVersion;
      writeFileSync(path, JSON.stringify(info, null, 2));
    }
    originalVersion.version = onlineData.maxVersion;
  } catch (error) {
    dog.error(
      '向用户 package.json 文件写入版本号',
      onlineData.maxVersion,
      '出错',
      error,
    );
    command.error();
  }
}
