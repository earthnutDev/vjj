import { dog } from './../dog';
import { selection, SelectionParamDataType } from 'a-command';
import { dataStore } from '../data-store';
import { getPreid } from './preid';
import { Semver } from '../types';
import { isUndefined } from 'a-type-of-js';
import { exitPogrom } from '../utils';
import { cyanPen, magentaPen } from 'color-pen';

/** 未来版本预估 */
export async function chooseNext(): Promise<boolean | void> {
  const { originalVersion, commandParameters } = dataStore;
  const {
    major,
    minor,
    patch,
    hasPrerelease,
    preidOriginal,
    prereleaseNumber,
    version,
  } = originalVersion;

  const { preid } = commandParameters;

  // 预测版本号
  const currentPreid = preid || '??';
  const arrowhead = cyanPen`>>`;

  /**  数据  */
  const data: SelectionParamDataType = [
    {
      label: `🥜 测试迭代 ${arrowhead}  ${major}.${minor}.${patch}-${preidOriginal}.${prereleaseNumber + 1}`,
      value: 'prerelease',
    },
    {
      label: `🐛 ${hasPrerelease ? '测试转正' : '修复 bug'} ${arrowhead} ${major}.${minor}.${patch + Number(!hasPrerelease)}`,
      value: 'patch',
    },

    {
      label: `✨ ${hasPrerelease ? '测试转正' : '功能添加'}  ${arrowhead} ${major}.${minor + Number(!hasPrerelease || !!patch)}.0`,
      value: 'minor',
    },
    {
      label: `⚠️  ${hasPrerelease ? '测试转正' : '迭代更新'}  ${arrowhead} ${major + Number(!hasPrerelease || !!(patch + minor))}.0.0`,
      value: 'major',
    },
    {
      label: `🐛 测试预发布  ${arrowhead} ${major}.${minor}.${patch + 1}-${currentPreid}.0`,
      value: 'prepatch',
    },
    {
      label: `✨ 新功能测试  ${arrowhead} ${major}.${minor + 1}.0-${currentPreid}.0`,
      value: 'preminor',
    },
    {
      label: `⚠️  迭代测试  ${arrowhead} ${major + 1}.0.0-${currentPreid}.0`,
      value: 'premajor',
    },
  ];

  // 当前是预发布版本的，将根据版本号的
  if (hasPrerelease && patch === 0) {
    // 但是如果是预发布版本，且 patch 为 0，那么就不能选择 patch、minor
    if (minor === 0) {
      data[1] = data[2] = '';
    }
    // 如果是预发布版本，且 patch 为 0，且 minor 不为 0，那么就不能选择 patch
    else {
      data[1] = '';
    }
  }
  // 当前版本号不是预发布版本，那么就不现实 prerelease 的可选项
  else if (hasPrerelease === false) {
    data[0] = '';
  }

  const selectVersionType = await selection<Semver>({
    data: data.filter(item => item !== ''),
    info: `当前版本为（${version}），请选择下一个版本号`,
    private: true,
  });

  // 用户选择了退出
  if (isUndefined(selectVersionType)) {
    return await exitPogrom();
  }

  dog('当前用户选择了 ', magentaPen`>`, selectVersionType);

  dataStore.semver = selectVersionType;

  // 如果选择自定义版本号的预发布版本
  if (
    selectVersionType.startsWith('pre') &&
    selectVersionType !== 'prerelease'
  ) {
    await getPreid();
  }

  return true;
}
