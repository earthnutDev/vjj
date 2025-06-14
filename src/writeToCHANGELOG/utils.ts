/**
 *
 * 获取时间 ⌚️
 *
 */
export function getTime(): string {
  const time = new Date();
  // const timeList = [
  //   '零',
  //   '一',
  //   '二',
  //   '三',
  //   '四',
  //   '五',
  //   '六',
  //   '七',
  //   '八',
  //   '九',
  //   '十',
  //   '十一',
  //   '十二',
  //   '十三',
  //   '十四',
  //   '十五',
  //   '十六',
  //   '十七',
  //   '十八',
  //   '十九',
  //   '二十',
  //   '二十一',
  //   '二十二',
  //   '二十三',
  //   '二十四',
  //   '二十五',
  //   '二十六',
  //   '二十七',
  //   '二十八',
  //   '二十九',
  //   '三十',
  //   '三十一',
  // ];
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  return `${year}-${month}-${day}`;
}
