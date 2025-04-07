import { Command } from 'a-command';

const command = new Command('vjj');

// 初始化一个命令
export default command;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
command
  .bind([
    'preid <-id> (用于 semver 🉐 `prerelease` 部分的前缀)',
    'updateDependence <-u> (是否执行 `npm update --save` 更新依赖，默认不会触发更新)',
    'buildCheck <-b> (是否执行 `npm run build` 构建项目，默认构建以检测代码是否正确)',
    'publish <-p> (是否执行 `npm publish` 发布项目，默认不会触发发布)',
  ])
  .run().isEnd.end;
