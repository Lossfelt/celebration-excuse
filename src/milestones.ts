import type { PersonalMilestone } from "./types";

// How close (in days) can a milestone be to count as "today"?
// Since many milestones are in large units, we check if the milestone
// date falls on today's date.
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;
const MS_PER_WEEK = 7 * MS_PER_DAY;

// ── Helper: format large numbers with spaces ──
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

  const targets: bigint[] = [];
  const multipliers = [1n, 2n, 5n];
  const maxDigits = max.toString().length;

  for (let exp = 0; exp <= maxDigits; exp++) {
    const base = 10n ** BigInt(exp);
    for (const multiplier of multipliers) {
      const candidate = multiplier * base;
      if (candidate >= min && candidate <= max) {
        targets.push(candidate);
      }
    }
  }

  return targets;
}

// ── Check if a number is a "round" or special number ──
function isRoundNumber(n: number): boolean {
  if (n <= 0) return false;
  // Powers of 10
  if (Number.isInteger(Math.log10(n))) return true;
  // Multiples of significant round numbers
  const roundMultiples = [
    1_000, 5_000, 10_000, 25_000, 50_000, 100_000,
    250_000, 500_000, 1_000_000, 5_000_000, 10_000_000,
    50_000_000, 100_000_000, 500_000_000, 1_000_000_000,
  ];
  return roundMultiples.includes(n);
}

// ── Powers of 2 ──
function isPowerOf2(n: number): boolean {
  if (n < 1024) return false; // Skip small ones (not interesting)
  return n > 0 && (n & (n - 1)) === 0;
}

// ── Fibonacci numbers (precomputed up to reasonable lifetime) ──
const fibs = new Set<number>();
{
  let a = 1, b = 1;
  while (b <= 50_000) { // ~137 years in days
    if (b >= 100) fibs.add(b); // Skip tiny numbers
    [a, b] = [b, a + b];
  }
}

// ── Perfect squares ──
function isPerfectSquare(n: number): boolean {
  if (n < 100) return false;
  const sqrt = Math.round(Math.sqrt(n));
  return sqrt * sqrt === n;
}

// ── Palindrome check ──
function isPalindrome(n: number): boolean {
  if (n < 100) return false;
  const s = String(n);
  return s === s.split("").reverse().join("");
}

// ── Repdigit (all same digits, like 1111 or 5555) ──
function isRepdigit(n: number): boolean {
  if (n < 11) return false;
  const s = String(n);
  return s.length >= 3 && new Set(s).size === 1;
}

// ── Math constants ──
const PI = Math.PI;
const E = Math.E;
const PHI = (1 + Math.sqrt(5)) / 2; // Golden ratio

export function getPersonalMilestones(
  birthday: Date,
  today: Date
): PersonalMilestone[] {
  const milestones: PersonalMilestone[] = [];
  const diffMs = today.getTime() - birthday.getTime();

  if (diffMs < 0) return milestones; // Birthday is in the future

  const totalSeconds = Math.floor(diffMs / MS_PER_SECOND);
  const totalMinutes = Math.floor(diffMs / MS_PER_MINUTE);
  const totalHours = Math.floor(diffMs / MS_PER_HOUR);
  const totalDays = Math.floor(diffMs / MS_PER_DAY);
  const totalWeeks = Math.floor(diffMs / MS_PER_WEEK);
  const possibleAgeRangeToday = getPossibleAgeRangeDuringToday(birthday, today);

  // Calculate months and years properly
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

  // ── Birthday (same month & day) ──
  if (
    today.getMonth() === birthday.getMonth() &&
    today.getDate() === birthday.getDate() &&
    years > 0
  ) {
    milestones.push({
      name: `${formatNumber(years)}. bursdag!`,
      description: `Gratulerer med dagen! Du fyller ${years} år i dag!`,
      value: years,
      unit: "år",
    });
  }

  // ── Half-birthday ──
  const halfBirthdayMonth = (birthday.getMonth() + 6) % 12;
  if (
    today.getMonth() === halfBirthdayMonth &&
    today.getDate() === birthday.getDate() &&
    totalDays > 180
  ) {
    milestones.push({
      name: "Halvbursdagen din!",
      description: `Du er nøyaktig ${years}.5 år gammel i dag`,
      value: years + 0.5,
      unit: "år",
    });
  }

  // ── Seconds milestones ──
  if (isRoundNumber(totalSeconds)) {
    milestones.push({
      name: `${formatNumber(totalSeconds)} sekunder gammel!`,
      description: `Du har levd i nøyaktig ${formatNumber(totalSeconds)} sekunder`,
      value: totalSeconds,
      unit: "sekunder",
    });
  }
  // Check within ±43200 seconds (12 hours) for very round second milestones
  for (const target of [
    1_000_000, 10_000_000, 100_000_000, 500_000_000, 1_000_000_000,
    1_500_000_000, 2_000_000_000,
  ]) {
    const diff = Math.abs(totalSeconds - target);
    if (diff <= 43200 && diff > 0) {
      // Within 12 hours but not exact
      milestones.push({
        name: `~${formatNumber(target)} sekunder gammel!`,
        description: `Du er omtrent ${formatNumber(target)} sekunder gammel i dag (±${Math.round(diff / 3600)} timer)`,
        value: target,
        unit: "sekunder",
      });
    }
  }

  // Under-second milestones based on an unknown birth time during the birthday.
  // If a round target can be reached at some point today, surface it as "today".
  const subSecondUnits = [
    {
      unit: "millisekunder",
      perMs: 1n,
      minimumTarget: 1_000_000_000n,
    },
    {
      unit: "mikrosekunder",
      perMs: 1_000n,
      minimumTarget: 1_000_000_000_000n,
    },
    {
      unit: "nanosekunder",
      perMs: 1_000_000n,
      minimumTarget: 1_000_000_000_000_000n,
    },
    {
      unit: "femtosekunder",
      perMs: 1_000_000_000_000n,
      minimumTarget: 1_000_000_000_000_000_000_000n,
    },
  ] as const;

  for (const { unit, perMs, minimumTarget } of subSecondUnits) {
    const minTarget = possibleAgeRangeToday.minMs * perMs;
    const maxTarget = possibleAgeRangeToday.maxMs * perMs;
    const relevantMin = minTarget > minimumTarget ? minTarget : minimumTarget;
    const targets = getRoundBigIntTargetsInRange(relevantMin, maxTarget);

    for (const target of targets) {
      milestones.push({
        name: `${formatBigInt(target)} ${unit} gammel i dag!`,
        description: `Du blir ${formatBigInt(target)} ${unit} gammel en gang i løpet av dagen, avhengig av når på bursdagen du ble født.`,
        value: target,
        unit,
      });
    }
  }

  // ── Minutes milestones ──
  if (isRoundNumber(totalMinutes)) {
    milestones.push({
      name: `${formatNumber(totalMinutes)} minutter gammel!`,
      description: `Du har levd i nøyaktig ${formatNumber(totalMinutes)} minutter`,
      value: totalMinutes,
      unit: "minutter",
    });
  }

  // ── Hours milestones ──
  if (isRoundNumber(totalHours)) {
    milestones.push({
      name: `${formatNumber(totalHours)} timer gammel!`,
      description: `Du har levd i nøyaktig ${formatNumber(totalHours)} timer`,
      value: totalHours,
      unit: "timer",
    });
  }

  // ── Days milestones ──
  if (isRoundNumber(totalDays)) {
    milestones.push({
      name: `${formatNumber(totalDays)} dager gammel!`,
      description: `Du har levd i nøyaktig ${formatNumber(totalDays)} dager`,
      value: totalDays,
      unit: "dager",
    });
  }
  if (isPowerOf2(totalDays)) {
    milestones.push({
      name: `2^${Math.log2(totalDays)} dager gammel!`,
      description: `Antall dager du har levd (${formatNumber(totalDays)}) er en potens av 2!`,
      value: totalDays,
      unit: "dager (potens av 2)",
    });
  }
  if (fibs.has(totalDays)) {
    milestones.push({
      name: `Fibonacci-dag: ${formatNumber(totalDays)} dager!`,
      description: `Antall dager du har levd er et Fibonacci-tall!`,
      value: totalDays,
      unit: "dager (Fibonacci)",
    });
  }
  if (isPerfectSquare(totalDays)) {
    const sqrt = Math.round(Math.sqrt(totalDays));
    milestones.push({
      name: `${sqrt}² dager gammel!`,
      description: `${sqrt} × ${sqrt} = ${formatNumber(totalDays)} dager – et perfekt kvadrattall!`,
      value: totalDays,
      unit: "dager (kvadrattall)",
    });
  }
  if (isPalindrome(totalDays)) {
    milestones.push({
      name: `Palindrom-dag: ${formatNumber(totalDays)} dager!`,
      description: `${totalDays} leses likt begge veier – en palindromdag!`,
      value: totalDays,
      unit: "dager (palindrom)",
    });
  }
  if (isRepdigit(totalDays)) {
    milestones.push({
      name: `Repdigit-dag: ${formatNumber(totalDays)} dager!`,
      description: `Alle sifrene er like! ${totalDays} dager gammel!`,
      value: totalDays,
      unit: "dager (repdigit)",
    });
  }

  // ── Weeks milestones ──
  if (isRoundNumber(totalWeeks)) {
    milestones.push({
      name: `${formatNumber(totalWeeks)} uker gammel!`,
      description: `Du har levd i nøyaktig ${formatNumber(totalWeeks)} uker`,
      value: totalWeeks,
      unit: "uker",
    });
  }

  // ── Months milestones ──
  if (months > 0 && isRoundNumber(months)) {
    milestones.push({
      name: `${formatNumber(months)} måneder gammel!`,
      description: `Du har levd i nøyaktig ${formatNumber(months)} måneder`,
      value: months,
      unit: "måneder",
    });
  }

  // ── Pi-related milestones ──
  // π × 10^N days
  for (const exp of [3, 4]) {
    const target = Math.round(PI * Math.pow(10, exp));
    if (totalDays === target) {
      milestones.push({
        name: `π × 10^${exp} dager gammel!`,
        description: `Du har levd i π × ${formatNumber(Math.pow(10, exp))} = ${formatNumber(target)} dager!`,
        value: target,
        unit: "dager (π)",
      });
    }
  }
  // π billion seconds
  const piBillionSec = Math.round(PI * 1_000_000_000);
  if (Math.abs(totalSeconds - piBillionSec) <= 43200) {
    milestones.push({
      name: "π milliarder sekunder gammel!",
      description: `Du er omtrent π × 1 milliard = ${formatNumber(piBillionSec)} sekunder gammel!`,
      value: piBillionSec,
      unit: "sekunder (π)",
    });
  }

  // ── e-related ──
  for (const exp of [3, 4]) {
    const target = Math.round(E * Math.pow(10, exp));
    if (totalDays === target) {
      milestones.push({
        name: `e × 10^${exp} dager gammel!`,
        description: `Du har levd i e × ${formatNumber(Math.pow(10, exp))} = ${formatNumber(target)} dager!`,
        value: target,
        unit: "dager (e)",
      });
    }
  }

  // ── Golden ratio ──
  for (const exp of [3, 4]) {
    const target = Math.round(PHI * Math.pow(10, exp));
    if (totalDays === target) {
      milestones.push({
        name: `φ × 10^${exp} dager gammel!`,
        description: `Du har levd i φ (det gylne snitt) × ${formatNumber(Math.pow(10, exp))} = ${formatNumber(target)} dager!`,
        value: target,
        unit: "dager (φ)",
      });
    }
  }

  // ── Planet years ──
  const planetOrbits: { name: string; days: number; emoji: string }[] = [
    { name: "Merkur", days: 87.97, emoji: "☿" },
    { name: "Venus", days: 224.7, emoji: "♀" },
    { name: "Mars", days: 687.0, emoji: "♂" },
    { name: "Jupiter", days: 4332.59, emoji: "♃" },
    { name: "Saturn", days: 10759.22, emoji: "♄" },
  ];
  for (const planet of planetOrbits) {
    const planetYears = totalDays / planet.days;
    const rounded = Math.round(planetYears);
    if (rounded > 0 && Math.abs(planetYears - rounded) < 0.5 / planet.days * 1) {
      // Check if we're within ~1 day of an exact planet year
      const daysOff = Math.abs(totalDays - rounded * planet.days);
      if (daysOff < 1) {
        milestones.push({
          name: `${rounded} ${planet.name}-år gammel! ${planet.emoji}`,
          description: `I dag fyller du ${rounded} år i ${planet.name}-tid (ett ${planet.name}-år = ${planet.days} jorddager)`,
          value: rounded,
          unit: `${planet.name}-år`,
        });
      }
    }
  }

  // ── "Golden birthday" – turning the age of your birth date ──
  if (years === birthday.getDate() &&
      today.getMonth() === birthday.getMonth() &&
      today.getDate() === birthday.getDate()) {
    milestones.push({
      name: "Gullbursdagen din!",
      description: `Du fyller ${years} år på den ${birthday.getDate()}. – din gullbursdag!`,
      value: years,
      unit: "gullbursdag",
    });
  }

  // ── "Champagne birthday" – turning a double-digit repeat of birth date ──
  const birthDate = birthday.getDate();
  if (
    today.getMonth() === birthday.getMonth() &&
    today.getDate() === birthday.getDate()
  ) {
    const doubleAge = birthDate * 2;
    const tripleAge = birthDate * 3;
    if (years === doubleAge) {
      milestones.push({
        name: `Dobbel gullbursdag!`,
        description: `Du fyller ${years}, som er 2 × ${birthDate} (fødselsdatoen din)!`,
        value: years,
        unit: "dobbel gullbursdag",
      });
    }
    if (years === tripleAge) {
      milestones.push({
        name: `Trippel gullbursdag!`,
        description: `Du fyller ${years}, som er 3 × ${birthDate} (fødselsdatoen din)!`,
        value: years,
        unit: "trippel gullbursdag",
      });
    }
  }

  return milestones;
}
