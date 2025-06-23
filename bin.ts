#!/usr/bin/env node

import { dog } from './src/dog';
import command from './src/command';
import { main } from './src/main';
import { magentaPen } from 'color-pen';

(async () => {
  try {
    await main();
  } catch (error) {
    dog.error(error);
    command.ERROR(
      '出现运行时错误，调用前添加' + magentaPen`vjj_dev=all ` + '查看错误原因',
    );
    command.end();
  }
})();
