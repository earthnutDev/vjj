import { selection } from 'a-command';
import { dataStore } from '../data-store';
import { getPreid } from './preid';
import { Semver } from 'src/types';

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

  const data = [
    `🥜 测试 (prerelease)  ☞☞ ${major}.${minor}.${patch}-${preidOriginal}.${prereleaseNumber + 1}`,
    `🐛 修复 (patch)  ☞☞ ${major}.${minor}.${patch + Number(!hasPrerelease)}`,
    `✨ 新增 (minor)  ☞☞ ${major}.${minor + Number(!hasPrerelease || !!patch)}.0`,
    `⚠️  迭代 (major)  ☞☞ ${major + Number(!hasPrerelease || !!(patch + minor))}.0.0`,
    `🐛 测试 (prepatch)  ☞☞ ${major}.${minor}.${patch + 1}-${currentPreid}.0`,
    `✨ 测试 (preminor)  ☞☞ ${major}.${minor + 1}.0-${currentPreid}.0`,
    `⚠️  迭代 (premajor)  ☞☞ ${major + 1}.0.0-${currentPreid}.0`,
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

  const selectVersionType = (await selection({
    data: data.filter(item => item !== ''),
    info: `当前版本为（${version}），请选择下一个版本号`,
    resultText: '您选择了',
  })) as string;

  dataStore.semver = selectVersionType.replace(
    /^.*\((.*)\).*$/g,
    '$1',
  ) as Semver;

  // 如果选择自定义版本号的预发布版本
  if (selectVersionType.includes('??')) {
    await getPreid();
  }

  return true;
}
