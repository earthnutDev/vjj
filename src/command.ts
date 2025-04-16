import { Command } from 'a-command';

const command = new Command<{
  '--preid': undefined;
  '--buildCheck': undefined;
  '--publish': undefined;
  '--no-changelog': undefined;
  '--no-diff': undefined;
}>('vjj');

// 初始化一个命令
export default command;

command
  .bind([
    '--preid <-id> (用于 semver 🉐 `prerelease` 部分的前缀)',
    '--buildCheck <-b> (是否执行 `npm run build` 构建项目，默认构建以检测代码是否正确)',
    '--no-diff <-nd> (是否不执行包版本的变更检测，默认触发变更检测)',
    '--no-changelog <-nc> (是否不执行 `writeToCHANGELOG` 写入 CHANGELOG.md 文件，默认触发写入)',
    '--publish <-p> (是否执行 `npm publish` 发布项目，默认不会触发发布)',
  ])
  .run()
  .isEnd(true);
