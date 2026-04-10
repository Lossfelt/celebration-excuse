import fs from "node:fs";

function assertIncludes(text, values, label) {
  for (const value of values) {
    if (!text.includes(value)) {
      throw new Error(`Missing ${label}: ${value}`);
    }
  }
}

function assertExcludes(text, values, label) {
  for (const value of values) {
    if (text.includes(value)) {
      throw new Error(`Unexpected ${label}: ${value}`);
    }
  }
}

const fixedText = fs.readFileSync("src/holidays/fixed.ts", "utf8");
const movableText = fs.readFileSync("src/holidays/movable.ts", "utf8");
const researchedFunText = fs.readFileSync("src/holidays/researchedFun.ts", "utf8");
const mainText = fs.readFileSync("src/main.ts", "utf8");
const currentYear = new Date().getFullYear();

assertIncludes(
  fixedText,
  [
    "Armenian Christmas Eve",
    "Armenian Christmas",
    "Orthodox Christmas Day",
    "National Freedom Day",
    "World Car Free Day",
    "World Opera Day",
    "World Soil Day",
    "St. Nicholas Day",
    "Veterans Day",
    "Remembrance Day / Armistice Day",
    "Exaltation of the Holy Cross",
    "Kids' Athletics Day",
  ],
  "fixed holiday",
);

assertExcludes(
  fixedText,
  [
    "Armensk julaften",
    "Ortodoks jul",
    "Fettisdagen",
    "Verdens hvaldag",
    "Piano-dagen",
    "Verdens statistikkdag",
    "Internasjonal stressbevisstgjøringsdag",
    "Verdens filosofidag",
    "Verdens atletikkdag",
    "Verdens dag for trekkfugler",
    "Verdens øldag",
    "Internasjonal øldag",
    "Verdens oppryddingsdag",
    "Mikkelsdagen (Nikolaus)",
    "Bilens dag",
    "Internasjonal dag for korsfesting",
  ],
  "legacy fixed holiday",
);

assertIncludes(
  movableText,
  [
    "Seijin no Hi",
    "Fettisdagen",
    "World Whale Day",
    "Piano Day",
    "World Statistics Day",
    "Stress Awareness Day",
    "World Philosophy Day",
    "International Beer Day",
    "World Cleanup Day",
    "Opposite Day",
    "Ice Cream for Breakfast Day",
    "Napping Day",
    "World Honey Bee Day",
  ],
  "movable holiday",
);

assertIncludes(
  researchedFunText,
  [
    "researchedFixedFunHolidayResults",
    "Earth's Rotation Day",
    "World Play Day",
    "Bicarbonate of Soda Day",
    "Tongue Twister Day",
  ],
  "researched fun holiday",
);

assertExcludes(mainText, ['toISOString().split("T")[0]'], "UTC date handling");
assertIncludes(mainText, ["formatDateInputValue", "parseDateInputValue"], "date helper");

const supportedPrecomputedYearMin = 2024;
const supportedPrecomputedYearMax = 2030;
if (currentYear < supportedPrecomputedYearMin || currentYear > supportedPrecomputedYearMax) {
  throw new Error(
    `Current year ${currentYear} is outside precomputed holiday coverage ${supportedPrecomputedYearMin}-${supportedPrecomputedYearMax}.`,
  );
}

console.log("Holiday data checks passed.");
