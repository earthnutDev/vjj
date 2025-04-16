import { _p } from 'a-node-tools';
import command from 'src/command';
import { main } from 'src/main';

(async () => {
  try {
    await main();
  } catch (error) {
    if (
      (process.env.VJJ_DEV === 'true' &&
        process.env.npm_lifecycle_event === 'dev') ||
      process.env.VJJ_LOG === 'error'
    ) {
      _p(error);
    }

    command.end();
  }
})();
