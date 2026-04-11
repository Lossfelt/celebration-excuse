import type { PersonalMilestone } from "./types";

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;
const MS_PER_WEEK = 7 * MS_PER_DAY;

const BIGINT_MS_PER_SECOND = 1000n;
const BIGINT_MS_PER_MINUTE = 60n * BIGINT_MS_PER_SECOND;
const BIGINT_MS_PER_HOUR = 60n * BIGINT_MS_PER_MINUTE;
const BIGINT_MS_PER_DAY = 24n * BIGINT_MS_PER_HOUR;
const BIGINT_MS_PER_WEEK = 7n * BIGINT_MS_PER_DAY;

const MOON_CYCLE_DAYS = 29.530588;
const MARS_SOL_DAYS = 1.02749125;
const HIJRI_YEAR_DAYS = 354;
const ROMAN_REPUBLICAN_YEAR_DAYS = 355;
const MAYA_TUN_DAYS = 360;
const TZOLKIN_DAYS = 260;
const FRENCH_REPUBLICAN_DECADE_DAYS = 10;
const MAYA_KATUN_DAYS = 7200;

interface DraftMilestone extends PersonalMilestone {
  id: string;
  priority: number;
}

const fibonacciCache = [1, 1];

function isFibonacciNumber(n: number): boolean {
  if (n < 1) return false;

  while (fibonacciCache[fibonacciCache.length - 1] < n) {
    const last = fibonacciCache[fibonacciCache.length - 1];
    const previous = fibonacciCache[fibonacciCache.length - 2];
    fibonacciCache.push(last + previous);
  }

  return fibonacciCache.includes(n);
}

function formatNumber(n: number): string {
  return n.toLocaleString("nb-NO");
}

function formatBigInt(n: bigint): string {
  return n.toLocaleString("nb-NO");
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfNextDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

function isRoundNumber(n: number): boolean {
  if (n <= 0) return false;
  if (Number.isInteger(Math.log10(n))) return true;

  const roundMultiples = [
    1_000, 5_000, 10_000, 25_000, 50_000, 100_000,
    250_000, 500_000, 1_000_000, 5_000_000, 10_000_000,
    50_000_000, 100_000_000, 500_000_000, 1_000_000_000,
  ];

  return roundMultiples.includes(n);
}

function isPowerOf2(n: number): boolean {
  if (n < 1024) return false;
  return n > 0 && (n & (n - 1)) === 0;
}

function isPerfectSquare(n: number): boolean {
  if (n < 100) return false;
  const sqrt = Math.round(Math.sqrt(n));
  return sqrt * sqrt === n;
}

function isPalindrome(n: number): boolean {
  if (n < 100) return false;
  const s = String(n);
  return s === s.split("").reverse().join("");
}

function isRepdigit(n: number): boolean {
  if (n < 11) return false;
  const s = String(n);
  return s.length >= 3 && new Set(s).size === 1;
}

function getPossibleAgeRangeDuringToday(
  birthday: Date,
  today: Date,
): { minMs: bigint; maxMs: bigint } {
  const birthdayStart = startOfDay(birthday).getTime();
  const birthdayEnd = startOfNextDay(birthday).getTime();
  const todayStart = startOfDay(today).getTime();
  const todayEnd = startOfNextDay(today).getTime();

  return {
    minMs: BigInt(Math.max(0, todayStart - birthdayEnd)),
    maxMs: BigInt(Math.max(0, todayEnd - birthdayStart)),
  };
}

function getRoundBigIntTargetsInRange(min: bigint, max: bigint): bigint[] {
  if (max < min) return [];

  const targets = new Set<bigint>();
  const mantissas = [1n, 2n, 5n, 10n, 25n, 50n];
  const maxDigits = max.toString().length;

  for (let exp = 0; exp <= maxDigits; exp++) {
    const base = 10n ** BigInt(exp);
    for (const mantissa of mantissas) {
      const candidate = mantissa * base;
      if (candidate >= min && candidate <= max) {
        targets.add(candidate);
      }
    }
  }

  return [...targets].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

function ceilDiv(a: bigint, b: bigint): bigint {
  return (a + b - 1n) / b;
}

function floorDiv(a: bigint, b: bigint): bigint {
  return a / b;
}

function getRoundUnitTargetsDuringToday(
  possibleAgeRangeToday: { minMs: bigint; maxMs: bigint },
  unitMs: bigint,
  minimumTarget: bigint,
): bigint[] {
  const minTarget = ceilDiv(possibleAgeRangeToday.minMs, unitMs);
  const maxTarget = floorDiv(possibleAgeRangeToday.maxMs, unitMs);
  const relevantMin = minTarget > minimumTarget ? minTarget : minimumTarget;
  return getRoundBigIntTargetsInRange(relevantMin, maxTarget);
}

function findInterestingNumberTargetsInRange(
  min: number,
  max: number,
  predicate: (value: number) => boolean,
  maxResults = 1,
): number[] {
  if (max < min) return [];

  const results: number[] = [];
  for (let value = min; value <= max; value++) {
    if (!predicate(value)) continue;
    results.push(value);
    if (results.length >= maxResults) break;
  }

  return results;
}

function anniversaryInYear(birthday: Date, year: number): Date {
  return new Date(year, birthday.getMonth(), birthday.getDate());
}

function getBirthdayProgressRangeToday(
  birthday: Date,
  today: Date,
): { minMs: bigint; maxMs: bigint; yearLengthMs: bigint } {
  const thisYearBirthday = anniversaryInYear(birthday, today.getFullYear());
  const hasHadBirthdayThisYear =
    today.getMonth() > birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() && today.getDate() >= birthday.getDate());

  const lastBirthday = hasHadBirthdayThisYear
    ? thisYearBirthday
    : anniversaryInYear(birthday, today.getFullYear() - 1);
  const nextBirthday = anniversaryInYear(lastBirthday, lastBirthday.getFullYear() + 1);

  return {
    ...getPossibleAgeRangeDuringToday(lastBirthday, today),
    yearLengthMs: BigInt(nextBirthday.getTime() - startOfDay(lastBirthday).getTime()),
  };
}

function addMilestone(store: Map<string, DraftMilestone>, milestone: DraftMilestone) {
  const existing = store.get(milestone.id);
  if (!existing || milestone.priority >= existing.priority) {
    store.set(milestone.id, milestone);
  }
}

function addTodayMilestone(
  store: Map<string, DraftMilestone>,
  id: string,
  name: string,
  description: string,
  value: number | bigint,
  unit: string,
  priority: number,
) {
  addMilestone(store, {
    id,
    name,
    description,
    value,
    unit,
    priority,
  });
}

function addRoundTodayMilestones(
  store: Map<string, DraftMilestone>,
  possibleAgeRangeToday: { minMs: bigint; maxMs: bigint },
  currentWholeUnits: number,
  unitMs: bigint,
  unitName: string,
  minimumTarget: bigint,
  priority: number,
) {
  if (isRoundNumber(currentWholeUnits)) {
    addTodayMilestone(
      store,
      `${unitName}:${currentWholeUnits}`,
      `${formatNumber(currentWholeUnits)} ${unitName} gammel i dag!`,
      `Du passerer ${formatNumber(currentWholeUnits)} ${unitName} en gang i løpet av dagen.`,
      currentWholeUnits,
      unitName,
      priority,
    );
  }

  const targets = getRoundUnitTargetsDuringToday(possibleAgeRangeToday, unitMs, minimumTarget);
  for (const target of targets) {
    addTodayMilestone(
      store,
      `${unitName}:${target}`,
      `${formatBigInt(target)} ${unitName} gammel i dag!`,
      `Du blir ${formatBigInt(target)} ${unitName} gammel en gang i løpet av dagen, avhengig av når på bursdagen du ble født.`,
      target,
      unitName,
      priority,
    );
  }
}

function addProgressMilestones(
  store: Map<string, DraftMilestone>,
  birthday: Date,
  today: Date,
) {
  const progressRange = getBirthdayProgressRangeToday(birthday, today);
  const checkpoints = [
    { numerator: 1n, denominator: 4n, label: "25 %" },
    { numerator: 1n, denominator: 2n, label: "50 %" },
    { numerator: 3n, denominator: 4n, label: "75 %" },
  ];

  for (const checkpoint of checkpoints) {
    const target =
      (progressRange.yearLengthMs * checkpoint.numerator) / checkpoint.denominator;
    if (target >= progressRange.minMs && target <= progressRange.maxMs) {
      addTodayMilestone(
        store,
        `progress:${checkpoint.label}`,
        `${checkpoint.label} mot neste bursdag i dag!`,
        `Du passerer ${checkpoint.label} av veien fra forrige til neste bursdag en gang i løpet av dagen.`,
        Number(checkpoint.numerator * 100n / checkpoint.denominator),
        "bursdagsprogresjon",
        72,
      );
    }
  }
}

function addInterestingPatternMilestones(
  store: Map<string, DraftMilestone>,
  possibleAgeRangeToday: { minMs: bigint; maxMs: bigint },
  unitMs: bigint,
  unitName: string,
  minimumTarget: number,
  maxResults: number,
  patterns: Array<{
    idPrefix: string;
    predicate: (value: number) => boolean;
    name: (value: number) => string;
    description: (value: number) => string;
    unit: string;
    priority: number;
  }>,
) {
  const minTarget = Number(ceilDiv(possibleAgeRangeToday.minMs, unitMs));
  const maxTarget = Number(floorDiv(possibleAgeRangeToday.maxMs, unitMs));
  const relevantMin = Math.max(minTarget, minimumTarget);

  for (const pattern of patterns) {
    const targets = findInterestingNumberTargetsInRange(
      relevantMin,
      maxTarget,
      pattern.predicate,
      maxResults,
    );

    for (const target of targets) {
      addTodayMilestone(
        store,
        `${pattern.idPrefix}:${unitName}:${target}`,
        pattern.name(target),
        pattern.description(target),
        target,
        pattern.unit,
        pattern.priority,
      );
    }
  }
}

function addRecurringCycleMilestone(
  store: Map<string, DraftMilestone>,
  possibleAgeRangeToday: { minMs: bigint; maxMs: bigint },
  cycleMs: number,
  minimumCount: number,
  shouldIncludeCount: (count: number) => boolean,
  idPrefix: string,
  build: (count: number) => Omit<DraftMilestone, "id" | "priority"> & { idSuffix: string; priority: number },
) {
  const minMs = Number(possibleAgeRangeToday.minMs);
  const maxMs = Number(possibleAgeRangeToday.maxMs);
  const minCount = Math.ceil(minMs / cycleMs);
  const maxCount = Math.floor(maxMs / cycleMs);

  for (let count = minCount; count <= maxCount; count++) {
    if (count < minimumCount) continue;
    if (!shouldIncludeCount(count)) continue;
    const milestone = build(count);
    addTodayMilestone(
      store,
      `${idPrefix}:${milestone.idSuffix}`,
      milestone.name,
      milestone.description,
      milestone.value,
      milestone.unit,
      milestone.priority,
    );
  }
}

function addAlternativeCalendarMilestones(
  store: Map<string, DraftMilestone>,
  possibleAgeRangeToday: { minMs: bigint; maxMs: bigint },
) {
  const calendars = [
    {
      id: "hijri-years",
      cycleDays: HIJRI_YEAR_DAYS,
      minimumCount: 10,
      unit: "Hijri-år",
      priority: 53,
      name: (count: number) => `${count} Hijri-år gammel i dag!`,
      description: (count: number) =>
        `Du passerer ${count} år regnet med et hijri/lunarår på 354 dager en gang i løpet av dagen.`,
    },
    {
      id: "roman-republican-years",
      cycleDays: ROMAN_REPUBLICAN_YEAR_DAYS,
      minimumCount: 10,
      unit: "romerske republikkår",
      priority: 52,
      name: (count: number) => `${count} romerske republikkår gammel i dag!`,
      description: (count: number) =>
        `Du passerer ${count} år regnet med et romersk republikkår på 355 dager en gang i løpet av dagen.`,
    },
    {
      id: "maya-tun-years",
      cycleDays: MAYA_TUN_DAYS,
      minimumCount: 10,
      unit: "tun",
      priority: 51,
      name: (count: number) => `${count} maya-tun gammel i dag!`,
      description: (count: number) =>
        `Du passerer ${count} tun i dag. Ett tun i Maya Long Count er 360 dager.`,
    },
    {
      id: "tzolkin-cycles",
      cycleDays: TZOLKIN_DAYS,
      minimumCount: 10,
      unit: "Tzolk'in-sykluser",
      priority: 50,
      name: (count: number) => `${count} Tzolk'in-sykluser gammel i dag!`,
      description: (count: number) =>
        `Du passerer ${count} Tzolk'in-sykluser i dag. Hver syklus er 260 dager.`,
    },
    {
      id: "french-republican-decades",
      cycleDays: FRENCH_REPUBLICAN_DECADE_DAYS,
      minimumCount: 100,
      unit: "franske revolusjonsdekader",
      priority: 49,
      name: (count: number) => `${count} franske revolusjonsdekader gammel i dag!`,
      description: (count: number) =>
        `Du passerer ${count} franske kalender-dekader i dag. En décade i den franske revolusjonskalenderen er 10 dager.`,
    },
    {
      id: "maya-katun",
      cycleDays: MAYA_KATUN_DAYS,
      minimumCount: 1,
      unit: "katun",
      priority: 48,
      name: (count: number) => `${count} maya-katun gammel i dag!`,
      description: (count: number) =>
        `Du passerer ${count} katun i dag. Ett katun i Maya Long Count er 7 200 dager.`,
    },
  ] as const;

  for (const calendar of calendars) {
    addRecurringCycleMilestone(
      store,
      possibleAgeRangeToday,
      calendar.cycleDays * MS_PER_DAY,
      calendar.minimumCount,
      (count) => calendar.unit === "katun" ? count <= 10 : isRoundNumber(count),
      calendar.id,
      (count) => ({
        idSuffix: String(count),
        name: calendar.name(count),
        description: calendar.description(count),
        value: count,
        unit: calendar.unit,
        priority: calendar.priority,
      }),
    );
  }
}

export function getPersonalMilestones(
  birthday: Date,
  today: Date,
): PersonalMilestone[] {
  const milestoneMap = new Map<string, DraftMilestone>();
  const diffMs = today.getTime() - birthday.getTime();

  if (diffMs < 0) return [];

  const totalSeconds = Math.floor(diffMs / MS_PER_SECOND);
  const totalMinutes = Math.floor(diffMs / MS_PER_MINUTE);
  const totalHours = Math.floor(diffMs / MS_PER_HOUR);
  const totalDays = Math.floor(diffMs / MS_PER_DAY);
  const totalWeeks = Math.floor(diffMs / MS_PER_WEEK);
  const possibleAgeRangeToday = getPossibleAgeRangeDuringToday(birthday, today);

  let years = today.getFullYear() - birthday.getFullYear();
  let months =
    (today.getFullYear() - birthday.getFullYear()) * 12 +
    (today.getMonth() - birthday.getMonth());
  if (today.getDate() < birthday.getDate()) {
    months--;
  }
  if (
    today.getMonth() < birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() &&
      today.getDate() < birthday.getDate())
  ) {
    years--;
  }

  if (
    today.getMonth() === birthday.getMonth() &&
    today.getDate() === birthday.getDate() &&
    years > 0
  ) {
    addTodayMilestone(
      milestoneMap,
      `birthday:${years}`,
      `${formatNumber(years)}. bursdag!`,
      `Gratulerer med dagen! Du fyller ${years} år i dag.`,
      years,
      "år",
      100,
    );
  }

  const halfBirthdayMonth = (birthday.getMonth() + 6) % 12;
  if (
    today.getMonth() === halfBirthdayMonth &&
    today.getDate() === birthday.getDate() &&
    totalDays > 180
  ) {
    addTodayMilestone(
      milestoneMap,
      `half-birthday:${years + 0.5}`,
      "Halvbursdagen din!",
      `Du er nøyaktig ${years}.5 år gammel i dag.`,
      years + 0.5,
      "år",
      85,
    );
  }

  addRoundTodayMilestones(
    milestoneMap,
    possibleAgeRangeToday,
    totalSeconds,
    BIGINT_MS_PER_SECOND,
    "sekunder",
    1_000n,
    62,
  );

  addRoundTodayMilestones(
    milestoneMap,
    possibleAgeRangeToday,
    totalMinutes,
    BIGINT_MS_PER_MINUTE,
    "minutter",
    1_000n,
    58,
  );

  addRoundTodayMilestones(
    milestoneMap,
    possibleAgeRangeToday,
    totalHours,
    BIGINT_MS_PER_HOUR,
    "timer",
    1_000n,
    56,
  );

  addRoundTodayMilestones(
    milestoneMap,
    possibleAgeRangeToday,
    totalDays,
    BIGINT_MS_PER_DAY,
    "dager",
    100n,
    60,
  );

  addRoundTodayMilestones(
    milestoneMap,
    possibleAgeRangeToday,
    totalWeeks,
    BIGINT_MS_PER_WEEK,
    "uker",
    100n,
    45,
  );

  const subSecondUnits = [
    { unit: "millisekunder", factor: 1n, minimumTarget: 1_000_000_000n, priority: 52 },
    { unit: "mikrosekunder", factor: 1_000n, minimumTarget: 1_000_000_000_000n, priority: 51 },
    { unit: "nanosekunder", factor: 1_000_000n, minimumTarget: 1_000_000_000_000_000n, priority: 50 },
    { unit: "femtosekunder", factor: 1_000_000_000_000n, minimumTarget: 1_000_000_000_000_000_000_000n, priority: 49 },
  ] as const;

  for (const { unit, factor, minimumTarget, priority } of subSecondUnits) {
    const minTarget = possibleAgeRangeToday.minMs * factor;
    const maxTarget = possibleAgeRangeToday.maxMs * factor;
    const relevantMin = minTarget > minimumTarget ? minTarget : minimumTarget;
    const targets = getRoundBigIntTargetsInRange(relevantMin, maxTarget);

    for (const target of targets) {
      addTodayMilestone(
        milestoneMap,
        `${unit}:${target}`,
        `${formatBigInt(target)} ${unit} gammel i dag!`,
        `Du blir ${formatBigInt(target)} ${unit} gammel en gang i løpet av dagen, avhengig av når på bursdagen du ble født.`,
        target,
        unit,
        priority,
      );
    }
  }

  if (isPowerOf2(totalDays)) {
    addTodayMilestone(
      milestoneMap,
      `power-of-two-days:${totalDays}`,
      `2^${Math.log2(totalDays)} dager gammel i dag!`,
      `Du passerer ${formatNumber(totalDays)} dager i dag, og tallet er en potens av 2.`,
      totalDays,
      "dager (potens av 2)",
      66,
    );
  }

  if (isFibonacciNumber(totalDays)) {
    addTodayMilestone(
      milestoneMap,
      `fibonacci-days:${totalDays}`,
      `Fibonacci-dag: ${formatNumber(totalDays)} dager i dag!`,
      `Du passerer ${formatNumber(totalDays)} dager i dag, og tallet er et Fibonacci-tall.`,
      totalDays,
      "dager (Fibonacci)",
      61,
    );
  }

  if (isPerfectSquare(totalDays)) {
    const sqrt = Math.round(Math.sqrt(totalDays));
    addTodayMilestone(
      milestoneMap,
      `square-days:${totalDays}`,
      `${sqrt}² dager gammel i dag!`,
      `Du passerer ${formatNumber(totalDays)} dager i dag, og ${sqrt} × ${sqrt} = ${formatNumber(totalDays)}.`,
      totalDays,
      "dager (kvadrattall)",
      58,
    );
  }

  if (isPalindrome(totalDays)) {
    addTodayMilestone(
      milestoneMap,
      `palindrome-days:${totalDays}`,
      `Palindrom-dag: ${formatNumber(totalDays)} dager i dag!`,
      `Du passerer ${formatNumber(totalDays)} dager i dag, og tallet leses likt begge veier.`,
      totalDays,
      "dager (palindrom)",
      55,
    );
  }

  if (isRepdigit(totalDays)) {
    addTodayMilestone(
      milestoneMap,
      `repdigit-days:${totalDays}`,
      `Repdigit-dag: ${formatNumber(totalDays)} dager i dag!`,
      `Du passerer ${formatNumber(totalDays)} dager i dag, og alle sifrene er like.`,
      totalDays,
      "dager (repdigit)",
      54,
    );
  }

  if (months > 0 && isRoundNumber(months)) {
    addTodayMilestone(
      milestoneMap,
      `months:${months}`,
      `${formatNumber(months)} måneder gammel i dag!`,
      `Du passerer ${formatNumber(months)} måneder en gang i løpet av dagen.`,
      months,
      "måneder",
      57,
    );
  }

  addProgressMilestones(milestoneMap, birthday, today);
  addAlternativeCalendarMilestones(milestoneMap, possibleAgeRangeToday);

  addInterestingPatternMilestones(
    milestoneMap,
    possibleAgeRangeToday,
    BIGINT_MS_PER_SECOND,
    "sekunder",
    100_000,
    1,
    [
      {
        idPrefix: "palindrome",
        predicate: isPalindrome,
        name: (value) => `Palindrom-sekunder i dag: ${formatNumber(value)}!`,
        description: (value) => `Du passerer ${formatNumber(value)} sekunder i dag, og tallet leses likt begge veier.`,
        unit: "sekunder (palindrom)",
        priority: 59,
      },
      {
        idPrefix: "repdigit",
        predicate: isRepdigit,
        name: (value) => `Repdigit-sekunder i dag: ${formatNumber(value)}!`,
        description: (value) => `Du passerer ${formatNumber(value)} sekunder i dag, og alle sifrene er like.`,
        unit: "sekunder (repdigit)",
        priority: 58,
      },
      {
        idPrefix: "fibonacci",
        predicate: isFibonacciNumber,
        name: (value) => `Fibonacci-sekunder i dag: ${formatNumber(value)}!`,
        description: (value) => `Du passerer ${formatNumber(value)} sekunder i dag, og tallet er et Fibonacci-tall.`,
        unit: "sekunder (Fibonacci)",
        priority: 57,
      },
    ],
  );

  addInterestingPatternMilestones(
    milestoneMap,
    possibleAgeRangeToday,
    BIGINT_MS_PER_MINUTE,
    "minutter",
    10_000,
    1,
    [
      {
        idPrefix: "palindrome",
        predicate: isPalindrome,
        name: (value) => `Palindrom-minutter i dag: ${formatNumber(value)}!`,
        description: (value) => `Du passerer ${formatNumber(value)} minutter i dag, og tallet leses likt begge veier.`,
        unit: "minutter (palindrom)",
        priority: 56,
      },
      {
        idPrefix: "repdigit",
        predicate: isRepdigit,
        name: (value) => `Repdigit-minutter i dag: ${formatNumber(value)}!`,
        description: (value) => `Du passerer ${formatNumber(value)} minutter i dag, og alle sifrene er like.`,
        unit: "minutter (repdigit)",
        priority: 55,
      },
      {
        idPrefix: "fibonacci",
        predicate: isFibonacciNumber,
        name: (value) => `Fibonacci-minutter i dag: ${formatNumber(value)}!`,
        description: (value) => `Du passerer ${formatNumber(value)} minutter i dag, og tallet er et Fibonacci-tall.`,
        unit: "minutter (Fibonacci)",
        priority: 54,
      },
    ],
  );

  const gigasecond = 1_000_000_000n * BIGINT_MS_PER_SECOND;
  if (
    gigasecond >= possibleAgeRangeToday.minMs &&
    gigasecond <= possibleAgeRangeToday.maxMs
  ) {
    addTodayMilestone(
      milestoneMap,
      "sekunder:1000000000",
      "Gigasecond-dagen din!",
      "Du passerer 1 000 000 000 sekunder gammel en gang i løpet av dagen.",
      1_000_000_000,
      "sekunder",
      76,
    );
  }

  addRecurringCycleMilestone(
    milestoneMap,
    possibleAgeRangeToday,
    MOON_CYCLE_DAYS * MS_PER_DAY,
    12,
    (count) => count % 25 === 0,
    "moon-cycles",
    (count) => ({
      idSuffix: String(count),
      name: `${count} månesykluser siden du ble født!`,
      description: `Du fullfører ${count} synodiske månesykluser en gang i løpet av dagen.`,
      value: count,
      unit: "månesykluser",
      priority: 48,
    }),
  );

  addRecurringCycleMilestone(
    milestoneMap,
    possibleAgeRangeToday,
    MARS_SOL_DAYS * MS_PER_DAY,
    100,
    (count) => count % 100 === 0,
    "mars-sols",
    (count) => ({
      idSuffix: String(count),
      name: `${count} Mars-sols gammel i dag!`,
      description: `Du passerer ${count} marsdøgn (sols) en gang i løpet av dagen.`,
      value: count,
      unit: "Mars-sols",
      priority: 47,
    }),
  );

  const planetOrbits = [
    { name: "Merkur", days: 87.97, emoji: "☿" },
    { name: "Venus", days: 224.7, emoji: "♀" },
    { name: "Mars", days: 687.0, emoji: "♂" },
    { name: "Jupiter", days: 4332.59, emoji: "♃" },
    { name: "Saturn", days: 10759.22, emoji: "♄" },
  ];

  for (const planet of planetOrbits) {
    const planetYears = totalDays / planet.days;
    const rounded = Math.round(planetYears);
    if (rounded <= 0) continue;

    const daysOff = Math.abs(totalDays - rounded * planet.days);
    if (daysOff < 1) {
      addTodayMilestone(
        milestoneMap,
        `planet-year:${planet.name}:${rounded}`,
        `${rounded} ${planet.name}-år gammel i dag! ${planet.emoji}`,
        `Du passerer ${rounded} ${planet.name}-år i dag (ett ${planet.name}-år = ${planet.days} jorddager).`,
        rounded,
        `${planet.name}-år`,
        46,
      );
    }
  }

  if (
    years === birthday.getDate() &&
    today.getMonth() === birthday.getMonth() &&
    today.getDate() === birthday.getDate()
  ) {
    addTodayMilestone(
      milestoneMap,
      `golden-birthday:${years}`,
      "Gullbursdagen din!",
      `Du fyller ${years} år på den ${birthday.getDate()}. – din gullbursdag!`,
      years,
      "gullbursdag",
      90,
    );
  }

  const birthDate = birthday.getDate();
  if (
    today.getMonth() === birthday.getMonth() &&
    today.getDate() === birthday.getDate()
  ) {
    const doubleAge = birthDate * 2;
    const tripleAge = birthDate * 3;

    if (years === doubleAge) {
      addTodayMilestone(
        milestoneMap,
        `double-golden-birthday:${years}`,
        "Dobbel gullbursdag!",
        `Du fyller ${years}, som er 2 × ${birthDate} (fødselsdatoen din).`,
        years,
        "dobbel gullbursdag",
        84,
      );
    }

    if (years === tripleAge) {
      addTodayMilestone(
        milestoneMap,
        `triple-golden-birthday:${years}`,
        "Trippel gullbursdag!",
        `Du fyller ${years}, som er 3 × ${birthDate} (fødselsdatoen din).`,
        years,
        "trippel gullbursdag",
        83,
      );
    }
  }

  const birthMonthDay = `${String(birthday.getDate()).padStart(2, "0")}${String(birthday.getMonth() + 1).padStart(2, "0")}`;
  if (String(totalDays).includes(birthMonthDay) && totalDays >= 1_000) {
    addTodayMilestone(
      milestoneMap,
      `birth-code-days:${totalDays}`,
      "Fødselsdatoen din skjuler seg i dagtallet i dag!",
      `Tallet du passerer i dag (${formatNumber(totalDays)} dager) inneholder ${birthMonthDay}, altså dag og måned fra fødselsdatoen din.`,
      totalDays,
      "dager (fødselsdato-kode)",
      44,
    );
  }

  if (String(totalSeconds).includes(birthMonthDay) && totalSeconds >= 100_000) {
    addTodayMilestone(
      milestoneMap,
      `birth-code-seconds:${totalSeconds}`,
      "Fødselsdatoen din skjuler seg i sekundtallet i dag!",
      `Sekundtallet du passerer i dag (${formatNumber(totalSeconds)}) inneholder ${birthMonthDay}.`,
      totalSeconds,
      "sekunder (fødselsdato-kode)",
      43,
    );
  }

  return [...milestoneMap.values()]
    .sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      return a.name.localeCompare(b.name, "nb");
    })
    .map(({ id: _id, priority: _priority, ...milestone }) => milestone);
}
