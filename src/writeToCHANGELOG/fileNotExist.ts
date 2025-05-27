import { writeFileSync } from 'node:fs';
import { getTime } from './utils';
import { originalVersion } from '../originalVersion';

/**
 * 文件不存在
 */
export function fileNotExist(filePath: string, newVersion: string) {
  const { name } = originalVersion;

  const time = getTime();

  writeFileSync(filePath, `# ${name}\n\r\n## ${newVersion} (${time})\n\n`);
}
