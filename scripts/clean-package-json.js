import {
  pathJoin,
  readFileToJsonSync,
  getDirectoryBy,
  writeJsonFile,
  runOtherCode,
} from 'a-node-tools';
import { writeFileSync } from 'node:fs';

let packageJson = readFileToJsonSync('./package.json');

['scripts', 'devDependencies', 'lint-staged', 'private'].forEach(
  key => delete packageJson[key],
);

packageJson = {
  ...packageJson,
  author: {
    name: 'earthnut',
    email: 'earthnut.dev@outlook.com',
    url: 'https://earthnut.dev',
  },
  files: ['mjs', 'bin'],
  keywords: ['vjj'],
  homepage: 'https://earthnut.dev/vjj',
  bugs: {
    url: 'https://github.com/earthnutDev/vjj/issues',
    email: 'earthnut.dev@outlook.com',
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/earthnutDev/vjj.git',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  bin: {
    vjj: './bin.js',
  },
};

// 写入 dist/package.json
{
  const distPath = getDirectoryBy('dist', 'directory');
  const distPackagePath = pathJoin(distPath, './dist/package.json');
  writeJsonFile(distPackagePath, packageJson);
}

// 写入 dist/bin.js
{
  await runOtherCode({ code: 'mkdir -p ./dist' });
  writeFileSync(
    'dist/bin.js',
    `#!/usr/bin/env node

import './mjs/index.mjs';
  `,
  );
}
