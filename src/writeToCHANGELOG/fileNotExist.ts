import { writeFileSync } from 'node:fs';
import { dataStore } from '../data-store';
import { getTime } from './utils';

/**
 * 文件不存在
 */
export function fileNotExist(filePath: string, newVersion: string) {
  const { name } = dataStore.originalVersion;

  const time = getTime();

  writeFileSync(filePath, `# ${name}\n\r\n## ${newVersion} (${time})\n\n`);
}
