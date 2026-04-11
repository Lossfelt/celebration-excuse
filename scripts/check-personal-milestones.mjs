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
  "25 % mot neste bursdag i dag!",
);

assertIncludesMilestone(
  new Date(1990, 0, 1),
  new Date(2021, 8, 9, 12, 0, 0),
  "Gigasecond-dagen din!",
);

assertIncludesMilestone(
  new Date(2010, 5, 6),
  new Date(2026, 3, 11, 12, 0, 0),
  "500 000 000 sekunder gammel i dag!",
);

assertIncludesMilestone(
  new Date(2010, 5, 2),
  new Date(2026, 3, 11, 12, 0, 0),
  "Palindrom-sekunder i dag: 500 343 005!",
);

assertIncludesMilestone(
  new Date(2008, 8, 1),
  new Date(2026, 3, 11, 12, 0, 0),
  "Repdigit-sekunder i dag: 555 555 555!",
);

assertIncludesMilestone(
  new Date(2012, 6, 15),
  new Date(2026, 3, 11, 12, 0, 0),
  "Fibonacci-sekunder i dag: 433 494 437!",
);

assertIncludesMilestone(
  new Date(2026, 0, 26),
  new Date(2026, 3, 11, 12, 0, 0),
  "Palindrom-minutter i dag: 106 601!",
);

assertIncludesMilestone(
  new Date(2026, 0, 23),
  new Date(2026, 3, 11, 12, 0, 0),
  "Repdigit-minutter i dag: 111 111!",
);

assertIncludesMilestone(
  new Date(2026, 0, 16),
  new Date(2026, 3, 11, 12, 0, 0),
  "Fibonacci-minutter i dag: 121 393!",
);

assertIncludesMilestone(
  new Date(2016, 3, 13),
  new Date(2026, 0, 1, 12, 0, 0),
  "10 romerske republikkår gammel i dag!",
);

assertIncludesMilestone(
  new Date(2016, 3, 23),
  new Date(2026, 0, 1, 12, 0, 0),
  "10 Hijri-år gammel i dag!",
);

assertIncludesMilestone(
  new Date(2016, 1, 22),
  new Date(2026, 0, 1, 12, 0, 0),
  "10 maya-tun gammel i dag!",
);

assertIncludesMilestone(
  new Date(2018, 10, 18),
  new Date(2026, 0, 1, 12, 0, 0),
  "10 Tzolk'in-sykluser gammel i dag!",
);

assertIncludesMilestone(
  new Date(2023, 6, 15),
  new Date(2026, 3, 11, 12, 0, 0),
  "100 franske revolusjonsdekader gammel i dag!",
);

assertIncludesMilestone(
  new Date(2006, 6, 24),
  new Date(2026, 3, 11, 12, 0, 0),
  "1 maya-katun gammel i dag!",
);

console.log("Personal milestone checks passed.");
