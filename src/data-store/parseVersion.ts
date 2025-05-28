import { _p } from 'a-node-tools';
import { VersionDetail } from '../types';
import { bluePen, brightRedPen, greenPen, hexPen } from 'color-pen';

/**  解析参数  */
export function parseVersion(version: string): VersionDetail {
  let prerelease,
    hasPrerelease = false,
    preidOriginal = '',
    prereleaseNumber = 0,
    major = 0,
    minor = 0,
    patch = 0;

  if (!/^(\d+\.?){3}(-([\w|\d]+\.)?\d+)?$/.test(version)) {
    _p(
      `您好，当前版本号 ${brightRedPen(version)} 不符合 \n\n${greenPen`nn.nn.nn`}\n\n或\n\n${bluePen`nn.nn.nn-xx.nn`}\n\n\r（n 需要为正整数，x 为英文或数字） 要求`,
    );
    _p(hexPen('#666').italic`本应用使用受限，对给你带来的不便，深表歉意。`);
    _p('劳烦更正版本号或是使用其他方式更新版本号');

    throw new Error('版本号格式错误');
  }

  // 包含预发布版本号信息
  if (version.includes('-')) {
    hasPrerelease = true;
    [version, prerelease] = version.split('-');
    if (prerelease.includes('.')) {
      const prereleaseArray = prerelease.split('.');
      preidOriginal = prereleaseArray[0];
      prereleaseNumber = Number(prereleaseArray[1]);
    } else {
      // 如果包含字母
      if (/^[a-zA-Z]+$/.test(prerelease)) {
        preidOriginal = prerelease;
        prereleaseNumber = 0;
      }

      // 如果仅包含数字
      else if (/^[0-9]+$/.test(prerelease)) {
        preidOriginal = '';
        prereleaseNumber = Number(prerelease);
      }
    }
  }

  [major, minor, patch] = version.split('.').map(v => Number(v));
  return {
    hasPrerelease,
    preidOriginal,
    prereleaseNumber,
    major,
    minor,
    patch,
  };
}
