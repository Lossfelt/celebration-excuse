import { getPersonalMilestones } from "../src/milestones.ts";

const SAMPLE_BIRTHDAYS = [
  new Date(1965, 0, 1),
  new Date(1978, 2, 14),
  new Date(1984, 8, 22),
  new Date(1990, 0, 1),
  new Date(1996, 5, 30),
  new Date(2000, 1, 29),
  new Date(2000, 5, 15),
  new Date(2005, 10, 5),
  new Date(2010, 4, 1),
  new Date(2012, 6, 15),
  new Date(2018, 10, 18),
  new Date(2020, 0, 1),
];

const ANALYSIS_YEAR = 2026;
const DAYS_TO_ANALYZE = 60;
const NOISY_RATE_THRESHOLD = 0.05;
const STREAK_THRESHOLD = 7;

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function formatPercent(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function longestConsecutiveRun(dayIndexes) {
  if (dayIndexes.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < dayIndexes.length; i++) {
    if (dayIndexes[i] === dayIndexes[i - 1] + 1) {
      current++;
      if (current > longest) longest = current;
      continue;
    }

    current = 1;
  }

  return longest;
}

function getStatsContainer(store, name) {
  const existing = store.get(name);
  if (existing) return existing;

  const created = {
    occurrences: 0,
    birthdays: new Set(),
    dayIndexesByBirthday: new Map(),
  };
  store.set(name, created);
  return created;
}

function analyzeMilestoneFrequency() {
  const stats = new Map();
  const start = new Date(ANALYSIS_YEAR, 0, 1, 12, 0, 0);

  SAMPLE_BIRTHDAYS.forEach((birthday, birthdayIndex) => {
    for (let dayOffset = 0; dayOffset < DAYS_TO_ANALYZE; dayOffset++) {
      const today = new Date(start);
      today.setDate(start.getDate() + dayOffset);

      const milestones = getPersonalMilestones(birthday, today);

      for (const milestone of milestones) {
        const stat = getStatsContainer(stats, milestone.name);
        stat.occurrences++;
        stat.birthdays.add(birthdayIndex);

        const dayIndexes = stat.dayIndexesByBirthday.get(birthdayIndex) ?? [];
        dayIndexes.push(dayOffset);
        stat.dayIndexesByBirthday.set(birthdayIndex, dayIndexes);
      }
    }
  });

  return [...stats.entries()]
    .map(([name, stat]) => {
      const maxStreak = Math.max(
        0,
        ...[...stat.dayIndexesByBirthday.values()].map(longestConsecutiveRun),
      );

      return {
        name,
        occurrences: stat.occurrences,
        rate: stat.occurrences / (SAMPLE_BIRTHDAYS.length * DAYS_TO_ANALYZE),
        birthdayCoverage: stat.birthdays.size / SAMPLE_BIRTHDAYS.length,
        maxStreak,
      };
    })
    .sort((a, b) => {
      if (a.occurrences !== b.occurrences) return b.occurrences - a.occurrences;
      return a.name.localeCompare(b.name, "nb");
    });
}

const results = analyzeMilestoneFrequency();
const noisy = results.filter(
  (result) => result.rate >= NOISY_RATE_THRESHOLD || result.maxStreak >= STREAK_THRESHOLD,
);

console.log(
  `Analyzed ${SAMPLE_BIRTHDAYS.length} birthdays x ${DAYS_TO_ANALYZE} days in ${ANALYSIS_YEAR} (${SAMPLE_BIRTHDAYS.length * DAYS_TO_ANALYZE} birthday-days).`,
);
console.log(
  `Sample birthdays: ${SAMPLE_BIRTHDAYS.map(isoDate).join(", ")}`,
);
console.log("");
console.log("Most frequent milestones:");

for (const result of results.slice(0, 20)) {
  console.log(
    `- ${result.name}: ${result.occurrences} hits, ${formatPercent(result.rate)} of birthday-days, ` +
      `${formatPercent(result.birthdayCoverage)} birthday coverage, max streak ${result.maxStreak} days`,
  );
}

console.log("");
console.log(`Potentially noisy milestones (rate >= ${formatPercent(NOISY_RATE_THRESHOLD)} or streak >= ${STREAK_THRESHOLD} days):`);

for (const result of noisy) {
  console.log(
    `- ${result.name}: ${result.occurrences} hits, ${formatPercent(result.rate)} of birthday-days, ` +
      `${formatPercent(result.birthdayCoverage)} birthday coverage, max streak ${result.maxStreak} days`,
  );
}
