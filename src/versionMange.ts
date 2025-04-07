import { question, selection } from 'a-command';
import { dataStore } from './data-store';
import { isUndefined } from 'a-type-of-js';

/** 未来版本预估 */
export async function versionMange(): Promise<boolean | void> {
  const {
    major,
    minor,
    patch,
    hasPrerelease,
    preidOriginal,
    prereleaseNumber,
    versionOriginal,
    preid,
  } = dataStore;

  const currentPreid = preid || preidOriginal || '??';

  const data = [
    `🐛 修复  (patch)  ☞☞ ${major}.${minor}.${hasPrerelease ? patch : patch + 1}`,
    `新增内容 (minor)  ☞☞ ${major}.${hasPrerelease && patch === 0 ? minor : minor + 1}.0`,
    `重大更新 (major)  ☞☞ ${hasPrerelease && patch === 0 && minor === 0 ? major : major + 1}.0.0`,
    `🐛 测试 (prepatch)  ☞☞ ${major}.${minor}.${patch + 1}-${currentPreid}.0`,
    `新增测试 (preminor)  ☞☞ ${major}.${minor + 1}.0-${currentPreid}.0`,
    `重大测试 (premajor)  ☞☞ ${major + 1}.0.0-${currentPreid}.0`,
    `测试迭代 (prerelease)  ☞☞ ${major}.${minor}.${
      hasPrerelease ? patch : patch + 1
    }-${currentPreid}.${hasPrerelease && (preid == preidOriginal || isUndefined(preid)) ? prereleaseNumber + 1 : 0}`,
  ];

  const selectVersionType = (await selection({
    data,
    info: `当前版本为（${versionOriginal}），请选择下一个版本号`,
    resultText: '您选择了',
  })) as string;

  const semver = selectVersionType.replace(/^.*\((.*)\).*$/g, '$1');

  dataStore.semver = semver as
    | 'patch'
    | 'minor'
    | 'major'
    | 'prepatch'
    | 'preminor'
    | 'premajor'
    | 'prerelease'
    | undefined;

  if (selectVersionType.includes('??')) {
    await getPreid();
  }

  return true;
}

/**
 * 获取预发布版本号
 */
async function getPreid() {
  const preidOriginal = await question({
    text: '请输入预发布版本号',
    resultText: '您输入的预发布版本号为',
  });
  dataStore.preid = preidOriginal as string;
}
