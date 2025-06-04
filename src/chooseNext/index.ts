import { dog } from './../dog';
import { selection, SelectionParamDataType } from 'a-command';
import { dataStore } from '../data-store';
import { getPreid } from './preid';
import { Semver } from '../types';
import { isUndefined } from 'a-type-of-js';
import { exitPogrom } from '../utils';
import {
  brightBluePen,
  brightGreenPen,
  brightMagentaPen,
  brightRedPen,
  cyanPen,
  greenPen,
  hexPen,
  magentaPen,
  redPen,
} from 'color-pen';
import { originalVersion } from '../data-store/originalVersion';
import { commandParameters } from '../data-store/commandParameters';

/** 未来版本预估 */
export async function chooseNext(): Promise<boolean | void> {
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
      tip: `使用 ${greenPen`prerelease`} 进行测试迭代 `,
      value: 'prerelease',
      label: `${hexPen('#666')(version)} ${arrowhead} ${major}.${minor}.${patch}-${preidOriginal}.${prereleaseNumber + 1}`,
    },
    {
      tip: `使用 ${hasPrerelease ? brightBluePen`patch` : greenPen`patch`} 进行${hasPrerelease ? '测试转正' : '修复 bug'} `,
      value: 'patch',
      label: `${hexPen('#666')(version)} ${arrowhead} ${major}.${minor}.${patch + Number(!hasPrerelease)}`,
    },

    {
      tip: `使用 ${magentaPen`minor`} 进行${hasPrerelease ? '测试转正' : '功能添加'}`,
      value: 'minor',
      label: `${hexPen('#666')(version)} ${arrowhead} ${major}.${minor + Number(!hasPrerelease || !!patch)}.0`,
    },
    {
      tip: `使用 ${redPen`major`} 进行${hasPrerelease ? '测试转正' : '迭代更新'}  `,
      value: 'major',
      label: `${hexPen('#666')(version)} ${arrowhead} ${major + Number(!hasPrerelease || !!(patch + minor))}.0.0`,
    },
    {
      tip: `使用 ${brightGreenPen`prepatch`} 发布修复测试`,
      value: 'prepatch',
      label: `${hexPen('#666')(version)} ${arrowhead} ${major}.${minor}.${patch + 1}-${currentPreid}.0`,
    },
    {
      tip: `使用 ${brightMagentaPen`preminor`} 发布新功能测试`,
      value: 'preminor',
      label: `${hexPen('#666')(version)} ${arrowhead} ${major}.${minor + 1}.0-${currentPreid}.0`,
    },
    {
      tip: `使用 ${brightRedPen`premajor`} 发布大版本迭代测试`,
      value: 'premajor',
      label: `${hexPen('#666')(version)} ${arrowhead} ${major + 1}.0.0-${currentPreid}.0`,
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
