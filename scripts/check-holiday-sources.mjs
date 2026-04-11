import { fixedHolidays } from "../src/holidays/fixed.ts";
import { researchedFixedFunHolidayResults } from "../src/holidays/researchedFun.ts";
import { getMovableHolidays } from "../src/holidays/movable.ts";
import fs from "node:fs";

function loadApprovedFixedFunHolidayNames() {
  const text = fs.readFileSync(new URL("../src/holidays/curation.ts", import.meta.url), "utf8");
  const match = text.match(/approvedFixedFunHolidayNames = new Set<string>\(\[(.*?)\]\);/s);
  if (!match) {
    throw new Error("Could not parse approvedFixedFunHolidayNames from curation.ts");
  }

  return new Set(
    [...match[1].matchAll(/"([^"]+)"/g)].map((entry) => entry[1]),
  );
}

function collectSourceUrls() {
  const approvedFixedFunHolidayNames = loadApprovedFixedFunHolidayNames();
  const urls = new Set();

  for (const holidays of Object.values(fixedHolidays)) {
    for (const holiday of holidays) {
      const researched = researchedFixedFunHolidayResults[holiday.name];
      const curatedSources =
        holiday.type !== "fun"
          ? holiday.sources ?? []
          : researched?.status === "verified"
            ? researched.sources
            : approvedFixedFunHolidayNames.has(holiday.name)
              ? holiday.sources ?? []
              : [];

      for (const source of curatedSources) {
        urls.add(source.url);
      }
    }
  }

  for (const holiday of getMovableHolidays(new Date().getFullYear())) {
    for (const source of holiday.sources ?? []) {
      urls.add(source.url);
    }
  }

  for (const result of Object.values(researchedFixedFunHolidayResults)) {
    for (const source of result.sources) {
      urls.add(source.url);
    }
  }

  return [...urls].sort();
}

const urls = collectSourceUrls();
const failures = [];

for (const url of urls) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "CelebrationExcuseSourceCheck/1.0" },
    });

    if (response.status >= 400) {
      failures.push(`${response.status} ${url}`);
    }
  } catch (error) {
    failures.push(`${url} (${error instanceof Error ? error.message : String(error)})`);
  }
}

if (failures.length > 0) {
  throw new Error(`Source validation failed:\n${failures.join("\n")}`);
}

console.log(`Source validation passed for ${urls.length} unique URLs.`);
