import type { Holiday } from "../types";
import { fixedHolidays } from "./fixed";
import { getMovableHolidaysForDate, getMovableHolidays } from "./movable";
import type { DatedHoliday } from "./movable";
import { curateFixedHoliday } from "./curation";

/**
 * Get all holidays for a specific date.
 * Combines fixed-date holidays with movable ones.
 */
export function getHolidaysForDate(date: Date): Holiday[] {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const key = `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const fixed = (fixedHolidays[key] ?? [])
    .map(curateFixedHoliday)
    .filter((holiday): holiday is Holiday => holiday !== null);
  const movable = getMovableHolidaysForDate(year, month, day);

  return [...fixed, ...movable];
}

export interface DatedHolidayEntry extends Holiday {
  month: number;
  day: number;
}

/**
 * Get every holiday in the database for a given year.
 * Returns a flat array with month/day attached.
 */
export function getAllHolidays(year: number): DatedHolidayEntry[] {
  const result: DatedHolidayEntry[] = [];

  // Fixed holidays
  for (const [key, holidays] of Object.entries(fixedHolidays)) {
    const [mm, dd] = key.split("-").map(Number);
    for (const h of holidays) {
      const curated = curateFixedHoliday(h);
      if (curated) {
        result.push({ ...curated, month: mm, day: dd });
      }
    }
  }

  // Movable holidays for this year
  const movable: DatedHoliday[] = getMovableHolidays(year);
  for (const h of movable) {
    const { month, day, ...rest } = h;
    result.push({ ...rest, month, day });
  }

  return result;
}
