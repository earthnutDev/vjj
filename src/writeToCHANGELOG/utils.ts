/**
 *
 * 获取时间 ⌚️
 *
 */
export function getTime(): string {
  const time = new Date();

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  return `${month} 🈷️ ${day} 日 ${year} 年`;
}
