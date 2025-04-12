import { main } from 'src';

(async () => {
  try {
    await main();
  } catch (error) {
    if (
      (process.env.VJJ_DEV === 'true' &&
        process.env.npm_lifecycle_event === 'dev') ||
      process.env.VJJ_LOG === 'error'
    ) {
      console.log(error);
    }

    process.exit(0);
  }
})();
