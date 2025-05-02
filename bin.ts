#!/usr/bin/env node

import { dog } from './src/dog';
import command from './src/command';
import { main } from './src/main';

(async () => {
  try {
    await main();
  } catch (error) {
    dog.error(error);

    command.end();
  }
})();
