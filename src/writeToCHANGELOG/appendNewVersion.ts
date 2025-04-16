import { readFileSync, writeFileSync } from 'node:fs';
import { dataStore } from 'src/data-store';
import { getTime } from './utils';

/**
 *
 * 将新的版本追加到文中指定位置
 *
 */
export async function appendNewVersion(filePath: string, newVersion: string) {
  const { version } = dataStore.originalVersion;

  // 在上一个步骤已经判断了该文件存在
  const fileContent = readFileSync(filePath, 'utf-8')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n');

  /**  旧版本在文件 🀄️ 的行数   */
  let oldVersionLine = -1;

  for (let i = 0; i < fileContent.length; i++) {
    if (new RegExp(`^#+\\s+v?${version}`, 'g').test(fileContent[i])) {
      oldVersionLine = i;
      break;
    }
  }

  fileContent.splice(
    oldVersionLine > -1 ? oldVersionLine : 1,
    0,
    `\n## ${newVersion} （${getTime()}）\n`,
  );

  writeFileSync(filePath, fileContent.join('\n').replace(/\n{2,}/g, '\n\n'));
}
