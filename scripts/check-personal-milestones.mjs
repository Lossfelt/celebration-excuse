import { getPersonalMilestones } from "../src/milestones.ts";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function milestoneNames(birthday, today) {
  return getPersonalMilestones(birthday, today).map((milestone) => milestone.name);
}

function assertIncludesMilestone(birthday, today, expectedName) {
  const names = milestoneNames(birthday, today);
  assert(
    names.includes(expectedName),
    `Expected milestone "${expectedName}" for birthday ${birthday.toISOString()} and today ${today.toISOString()}, got: ${names.join(" | ")}`,
  );
}

assertIncludesMilestone(
  new Date(1994, 3, 11),
  new Date(2026, 3, 11, 12, 0, 0),
  "32. bursdag!",
);

assertIncludesMilestone(
  new Date(1980, 0, 1),
  new Date(2026, 3, 2, 12, 0, 0),
  "Kvart til neste bursdag",
);

assertIncludesMilestone(
  new Date(1990, 0, 1),
  new Date(2021, 8, 9, 12, 0, 0),
  "Gigasekund-dag",
);

assertIncludesMilestone(
  new Date(2010, 5, 6),
  new Date(2026, 3, 11, 12, 0, 0),
  "500 000 000 sekunder",
);

assertIncludesMilestone(
  new Date(2008, 8, 1),
  new Date(2026, 3, 11, 12, 0, 0),
  "Repdigit-sekund-dag",
);

assertIncludesMilestone(
  new Date(2012, 6, 15),
  new Date(2026, 3, 11, 12, 0, 0),
  "Fibonacci-sekund-dag",
);

assertIncludesMilestone(
  new Date(2026, 0, 23),
  new Date(2026, 3, 11, 12, 0, 0),
  "Repdigit-minutt-dag",
);

assertIncludesMilestone(
  new Date(2026, 0, 16),
  new Date(2026, 3, 11, 12, 0, 0),
  "Fibonacci-minutt-dag",
);

assertIncludesMilestone(
  new Date(2016, 3, 13),
  new Date(2026, 0, 1, 12, 0, 0),
  "Romersk republikkår-dag",
);

assertIncludesMilestone(
  new Date(2016, 3, 23),
  new Date(2026, 0, 1, 12, 0, 0),
  "Hijri-år-dag",
);

assertIncludesMilestone(
  new Date(2016, 1, 22),
  new Date(2026, 0, 1, 12, 0, 0),
  "Maya-tun-dag",
);

assertIncludesMilestone(
  new Date(2018, 10, 18),
  new Date(2026, 0, 1, 12, 0, 0),
  "Tzolk'in-syklus-dag",
);

assertIncludesMilestone(
  new Date(2023, 6, 15),
  new Date(2026, 3, 11, 12, 0, 0),
  "Fransk revolusjonsdekade-dag",
);

assertIncludesMilestone(
  new Date(2006, 6, 24),
  new Date(2026, 3, 11, 12, 0, 0),
  "Maya-katun-dag",
);

console.log("Personal milestone checks passed.");
