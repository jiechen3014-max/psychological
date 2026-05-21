import { Solar, Lunar } from 'lunar-typescript';

export interface BaZi {
  year: string;   // 年柱 e.g. "甲子"
  month: string;  // 月柱
  day: string;    // 日柱
  hour: string;   // 时柱
}

export interface LunarInfo {
  bazi: BaZi;
  zodiac: string;       // 生肖
  wuxing: string;       // 纳音五行
  yearGan: string;      // 年天干
  yearZhi: string;      // 年地支
}

/**
 * 将阳历日期+时间转换为农历并推算八字
 */
export function solarToLunar(
  year: number,
  month: number,
  day: number,
  hour: number = 12
): LunarInfo {
  const solar = Solar.fromYmdHms(year, month, day, hour, 0, 0);
  const lunar: Lunar = solar.getLunar();

  // 八字四柱
  const bazi: BaZi = {
    year: lunar.getYearInGanZhi(),
    month: lunar.getMonthInGanZhi(),
    day: lunar.getDayInGanZhi(),
    hour: lunar.getTimeInGanZhi(),
  };

  return {
    bazi,
    zodiac: lunar.getYearShengXiao(),
    wuxing: lunar.getYearNaYin(),
    yearGan: lunar.getYearGan(),
    yearZhi: lunar.getYearZhi(),
  };
}

/**
 * 将八字转换为可读的农历日期描述
 */
export function formatLunarDate(year: number, month: number, day: number, hour: number): string {
  const solar = Solar.fromYmdHms(year, month, day, hour, 0, 0);
  const lunar = solar.getLunar();

  const shichenNames = [
    '子时', '丑时', '寅时', '卯时', '辰时', '巳时',
    '午时', '未时', '申时', '酉时', '戌时', '亥时',
  ];
  const shichenIndex = Math.floor(hour / 2);

  return `${lunar.getYearInGanZhi()}年 ${lunar.getMonthInChinese()}月 ${lunar.getDayInChinese()}日 ${shichenNames[shichenIndex] || ''}`;
}
