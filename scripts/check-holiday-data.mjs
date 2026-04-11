import { fixedHolidays } from "../src/holidays/fixed.ts";
import { researchedFixedFunHolidayResults } from "../src/holidays/researchedFun.ts";
import { getMovableHolidays } from "../src/holidays/movable.ts";
import fs from "node:fs";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertHttpsSource(source, context) {
  assert(typeof source.label === "string" && source.label.trim().length > 0, `Missing source label for ${context}`);
  assert(typeof source.url === "string" && source.url.startsWith("https://"), `Source URL must use https for ${context}: ${source.url}`);
}

function loadApprovedFixedFunHolidayNames() {
  const text = fs.readFileSync(new URL("../src/holidays/curation.ts", import.meta.url), "utf8");
  const match = text.match(/approvedFixedFunHolidayNames = new Set<string>\(\[(.*?)\]\);/s);
  assert(match, "Could not parse approvedFixedFunHolidayNames from curation.ts");

  return new Set(
    [...match[1].matchAll(/"([^"]+)"/g)].map((entry) => entry[1]),
  );
}

const approvedFixedFunHolidayNames = loadApprovedFixedFunHolidayNames();

for (const [name, result] of Object.entries(researchedFixedFunHolidayResults)) {
  assert(result.status === "verified" || result.status === "excluded", `Invalid researched status for ${name}`);
  if (result.status === "verified") {
    assert(result.holiday, `Verified researched holiday is missing holiday data for ${name}`);
    assert(result.sources.length > 0, `Verified researched holiday is missing sources for ${name}`);
  }
  for (const source of result.sources) {
    assertHttpsSource(source, `researched holiday ${name}`);
  }
}

for (const [key, holidays] of Object.entries(fixedHolidays)) {
  assert(/^\d{2}-\d{2}$/.test(key), `Invalid fixed-holiday key: ${key}`);

  for (const holiday of holidays) {
    if (holiday.sources) {
      for (const source of holiday.sources) {
        assertHttpsSource(source, `fixed holiday ${holiday.name}`);
      }
    }

    if (holiday.type !== "fun") {
      continue;
    }

    const researched = researchedFixedFunHolidayResults[holiday.name];
    const approved = approvedFixedFunHolidayNames.has(holiday.name);
    const curatedVisible = approved || researched?.status === "verified";

    if (curatedVisible) {
      assert(
        approved || researched?.status === "verified",
        `Visible fun holiday is neither approved nor researched: ${holiday.name}`,
      );
      if (researched?.status === "verified") {
        assert(researched.sources.length > 0, `Researched fun holiday is visible without sources: ${holiday.name}`);
      }
    } else {
      assert(
        !approved,
        `Approved fixed fun holiday was unexpectedly filtered out: ${holiday.name}`,
      );
    }
  }
}

const movableHolidays = getMovableHolidays(new Date().getFullYear());
for (const holiday of movableHolidays) {
  if (holiday.sources) {
    for (const source of holiday.sources) {
      assertHttpsSource(source, `movable holiday ${holiday.name}`);
    }
  }
}

const supportedPrecomputedYearMin = 2024;
const supportedPrecomputedYearMax = 2030;
const currentYear = new Date().getFullYear();
assert(
  currentYear >= supportedPrecomputedYearMin && currentYear <= supportedPrecomputedYearMax,
  `Current year ${currentYear} is outside precomputed holiday coverage ${supportedPrecomputedYearMin}-${supportedPrecomputedYearMax}.`,
);

const visibleResearchedCount = Object.values(researchedFixedFunHolidayResults).filter(
  (result) => result.status === "verified",
).length;

console.log(
  `Holiday data checks passed. ${approvedFixedFunHolidayNames.size} approved fixed fun holidays, ${visibleResearchedCount} researched fixed fun holidays.`,
);
