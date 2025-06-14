import { estimatedVersion } from './../data-store/estimatedVersion';
import { dog } from './../dog';
import { selection } from 'a-command';
import { dataStore } from '../data-store';
import { getPreid } from './preid';
import { Semver } from '../types';
import { isUndefined } from 'a-type-of-js';
import { exitProgram } from '../utils';
import { magentaPen } from 'color-pen';
import { originalVersion } from '../data-store/originalVersion';

/** 未来版本预估 */
export async function chooseNext(): Promise<boolean | void> {
  const { version } = originalVersion;

  const selectVersionType = await selection<Semver>({
    data: estimatedVersion.run(),
    info: `当前版本为（${version}），请选择下一个版本号`,
    private: true,
  });

  // 用户选择了退出
  if (isUndefined(selectVersionType)) return await exitProgram();

  dog('当前用户选择了 ', magentaPen`>`, selectVersionType);

  dataStore.semver = selectVersionType;

  // 如果选择自定义版本号的预发布版本
  if (selectVersionType.startsWith('pre') && selectVersionType !== 'prerelease')
    await getPreid();

  return true;
}
