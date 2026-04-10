// Movable holidays — dates that change every year.
// Includes algorithmic calculations (Easter, etc.) and precomputed dates
// for calendar systems that are complex to compute (Islamic, Hebrew, Chinese).

import type { Holiday } from "../types";

interface DatedHoliday extends Holiday {
  month: number; // 1-12
  day: number;   // 1-31
}

// ── Easter (Western) using the Computus algorithm ──
function westernEaster(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { month, day };
}

// ── Orthodox Easter (Julian calendar → Gregorian date) ──
function orthodoxEaster(year: number): { month: number; day: number } {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  // Convert Julian to Gregorian (add 13 days for 1900-2099)
  const julianDate = new Date(year, month - 1, day + 13);
  return { month: julianDate.getMonth() + 1, day: julianDate.getDate() };
}

function addDays(
  base: { month: number; day: number },
  year: number,
  offset: number
): { month: number; day: number } {
  const d = new Date(year, base.month - 1, base.day + offset);
  return { month: d.getMonth() + 1, day: d.getDate() };
}

// ── Nth weekday of month (e.g., 2nd Monday of October) ──
function nthWeekday(
  year: number,
  month: number,
  weekday: number, // 0=Sun, 1=Mon, ...
  n: number        // 1-based, use -1 for last
): { month: number; day: number } {
  if (n > 0) {
    const first = new Date(year, month - 1, 1);
    let dayOffset = (weekday - first.getDay() + 7) % 7;
    dayOffset += (n - 1) * 7;
    const day = 1 + dayOffset;
    return { month, day };
  } else {
    // Last occurrence
    const last = new Date(year, month, 0); // last day of month
    let dayOffset = (last.getDay() - weekday + 7) % 7;
    const day = last.getDate() - dayOffset;
    return { month, day };
  }
}

// ── Precomputed Islamic holidays (approximate, varies by moon sighting) ──
// Eid al-Fitr (end of Ramadan) and Eid al-Adha
const islamicHolidays: Record<number, { eidFitr: [number, number]; eidAdha: [number, number]; ramadanStart: [number, number] }> = {
  2024: { ramadanStart: [3, 11], eidFitr: [4, 10], eidAdha: [6, 17] },
  2025: { ramadanStart: [2, 28], eidFitr: [3, 30], eidAdha: [6, 6] },
  2026: { ramadanStart: [2, 17], eidFitr: [3, 20], eidAdha: [5, 27] },
  2027: { ramadanStart: [2, 7],  eidFitr: [3, 9],  eidAdha: [5, 16] },
  2028: { ramadanStart: [1, 27], eidFitr: [2, 26], eidAdha: [5, 4] },
  2029: { ramadanStart: [1, 15], eidFitr: [2, 14], eidAdha: [4, 24] },
  2030: { ramadanStart: [1, 5],  eidFitr: [2, 4],  eidAdha: [4, 13] },
};

// ── Precomputed Hebrew holidays ──
const hebrewHolidays: Record<number, {
  roshHashanah: [number, number];
  yomKippur: [number, number];
  sukkot: [number, number];
  hanukkahStart: [number, number];
  passover: [number, number];
  purim: [number, number];
  shavuot: [number, number];
}> = {
  2024: { roshHashanah: [10, 3], yomKippur: [10, 12], sukkot: [10, 17], hanukkahStart: [12, 25], passover: [4, 23], purim: [3, 24], shavuot: [6, 12] },
  2025: { roshHashanah: [9, 23], yomKippur: [10, 2], sukkot: [10, 7], hanukkahStart: [12, 15], passover: [4, 13], purim: [3, 14], shavuot: [6, 2] },
  2026: { roshHashanah: [9, 12], yomKippur: [9, 21], sukkot: [9, 26], hanukkahStart: [12, 5], passover: [4, 2], purim: [3, 3], shavuot: [5, 22] },
  2027: { roshHashanah: [10, 2], yomKippur: [10, 11], sukkot: [10, 16], hanukkahStart: [12, 25], passover: [4, 22], purim: [3, 23], shavuot: [6, 11] },
  2028: { roshHashanah: [9, 21], yomKippur: [9, 30], sukkot: [10, 5], hanukkahStart: [12, 13], passover: [4, 11], purim: [3, 12], shavuot: [5, 31] },
  2029: { roshHashanah: [9, 10], yomKippur: [9, 19], sukkot: [9, 24], hanukkahStart: [12, 2], passover: [3, 31], purim: [3, 1], shavuot: [5, 20] },
  2030: { roshHashanah: [9, 28], yomKippur: [10, 7], sukkot: [10, 12], hanukkahStart: [12, 21], passover: [4, 18], purim: [3, 19], shavuot: [6, 7] },
};

// ── Precomputed Chinese/Lunar calendar holidays ──
const chineseHolidays: Record<number, {
  lunarNewYear: [number, number];
  dragonBoat: [number, number];
  midAutumn: [number, number];
  qixi: [number, number];
}> = {
  2024: { lunarNewYear: [2, 10], dragonBoat: [6, 10], midAutumn: [9, 17], qixi: [8, 10] },
  2025: { lunarNewYear: [1, 29], dragonBoat: [5, 31], midAutumn: [10, 6], qixi: [8, 29] },
  2026: { lunarNewYear: [2, 17], dragonBoat: [6, 19], midAutumn: [9, 25], qixi: [8, 19] },
  2027: { lunarNewYear: [2, 6], dragonBoat: [6, 9], midAutumn: [9, 15], qixi: [8, 8] },
  2028: { lunarNewYear: [1, 26], dragonBoat: [5, 28], midAutumn: [10, 3], qixi: [8, 26] },
  2029: { lunarNewYear: [2, 13], dragonBoat: [6, 16], midAutumn: [9, 22], qixi: [8, 16] },
  2030: { lunarNewYear: [2, 3], dragonBoat: [6, 5], midAutumn: [9, 12], qixi: [8, 5] },
};

// ── Precomputed Hindu holidays (approximate) ──
const hinduHolidays: Record<number, {
  diwali: [number, number];
  holi: [number, number];
  navaratri: [number, number];
  ganeshChaturthi: [number, number];
  rakshabandhan: [number, number];
}> = {
  2024: { diwali: [11, 1], holi: [3, 25], navaratri: [10, 3], ganeshChaturthi: [9, 7], rakshabandhan: [8, 19] },
  2025: { diwali: [10, 20], holi: [3, 14], navaratri: [9, 22], ganeshChaturthi: [8, 27], rakshabandhan: [8, 9] },
  2026: { diwali: [11, 8], holi: [3, 4], navaratri: [10, 12], ganeshChaturthi: [9, 16], rakshabandhan: [8, 28] },
  2027: { diwali: [10, 29], holi: [3, 22], navaratri: [10, 1], ganeshChaturthi: [9, 5], rakshabandhan: [8, 17] },
  2028: { diwali: [10, 17], holi: [3, 11], navaratri: [9, 20], ganeshChaturthi: [8, 25], rakshabandhan: [8, 6] },
  2029: { diwali: [11, 5], holi: [2, 28], navaratri: [10, 9], ganeshChaturthi: [9, 13], rakshabandhan: [8, 25] },
  2030: { diwali: [10, 26], holi: [3, 19], navaratri: [9, 28], ganeshChaturthi: [9, 2], rakshabandhan: [8, 14] },
};

// ── Precomputed Buddhist holidays ──
const buddhistHolidays: Record<number, { vesak: [number, number] }> = {
  2024: { vesak: [5, 22] },
  2025: { vesak: [5, 12] },
  2026: { vesak: [5, 31] },
  2027: { vesak: [5, 20] },
  2028: { vesak: [5, 9] },
  2029: { vesak: [5, 27] },
  2030: { vesak: [5, 17] },
};

export { type DatedHoliday };

export function getMovableHolidays(year: number): DatedHoliday[] {
  const holidays: DatedHoliday[] = [];

  // ── Western Easter and derived holidays ──
  const easter = westernEaster(year);
  const derived: [number, string, string][] = [
    [-47, "Fastelavn", "Karnevalssøndag med utkledd moro – 7 uker før påske"],
    [-46, "Rosenmontag", "Tysk karnevalshøydepunkt med parader og kostymer"],
    [-2, "Langfredag", "Kristen helligdag – Jesu korsfestelse"],
    [0, "Første påskedag", "Kristen høytid – Jesu oppstandelse"],
    [1, "Andre påskedag", "Andre dag i påskefeiringen"],
    [39, "Kristi himmelfartsdag", "Kristen høytid – Jesu himmelfart"],
    [49, "Pinse", "Kristen høytid – Den hellige ånds komme"],
    [50, "Andre pinsedag", "Andre dag i pinsefeiringen"],
    [60, "Corpus Christi", "Katolsk høytid for nattverden"],
  ];
  for (const [offset, name, description] of derived) {
    const d = addDays(easter, year, offset);
    holidays.push({ ...d, name, description, type: "religious", regions: ["Kristne land"] });
  }

  // Palm Sunday
  const palmSunday = addDays(easter, year, -7);
  holidays.push({ ...palmSunday, name: "Palmesøndag", description: "Kristen helligdag – Jesu inntog i Jerusalem", type: "religious", regions: ["Kristne land"] });

  // Mardi Gras / Shrove Tuesday
  const mardiGras = addDays(easter, year, -47);
  holidays.push({ ...mardiGras, name: "Mardi Gras / Fettisdag", description: "Siste festdag før fastetiden – pannekaker og karneval!", type: "cultural", regions: ["USA (New Orleans)", "Frankrike", "Brasil"] });

  // Ash Wednesday
  const ashWed = addDays(easter, year, -46);
  holidays.push({ ...ashWed, name: "Askeonsdag", description: "Start på fastetiden i kristendommen", type: "religious", regions: ["Kristne land"] });

  // ── Orthodox Easter ──
  const orthEaster = orthodoxEaster(year);
  holidays.push({ ...orthEaster, name: "Ortodoks påske", description: "Påskefeiring i ortodokse kirker", type: "religious", regions: ["Russland", "Hellas", "Serbia", "Romania", "Etiopia"] });

  // ── Nth weekday holidays ──
  // MLK Day: 3rd Monday of January
  const mlk = nthWeekday(year, 1, 1, 3);
  holidays.push({ ...mlk, name: "Martin Luther King Jr. Day", description: "Amerikansk helligdag til minne om borgerrettighetslederen", type: "national", regions: ["USA"] });

  // Presidents' Day: 3rd Monday of February
  const presDay = nthWeekday(year, 2, 1, 3);
  holidays.push({ ...presDay, name: "Presidents' Day", description: "Amerikansk helligdag for å hedre presidenter", type: "national", regions: ["USA"] });

  // Mother's Day: 2nd Sunday of May (many countries)
  const motherDay = nthWeekday(year, 5, 0, 2);
  holidays.push({ ...motherDay, name: "Morsdag", description: "Dag for å feire mødre", type: "cultural", regions: ["USA", "Europa", "Globalt"] });

  // Father's Day: 3rd Sunday of June (many countries)
  const fatherDay = nthWeekday(year, 6, 0, 3);
  holidays.push({ ...fatherDay, name: "Farsdag", description: "Dag for å feire fedre", type: "cultural", regions: ["USA", "Storbritannia"] });

  // Norwegian Father's Day: 2nd Sunday of November
  const farsdagNo = nthWeekday(year, 11, 0, 2);
  holidays.push({ ...farsdagNo, name: "Farsdag (Norge)", description: "Norsk farsdag – andre søndag i november", type: "cultural", regions: ["Norge"] });

  // Thanksgiving (US): 4th Thursday of November
  const thanksgiving = nthWeekday(year, 11, 4, 4);
  holidays.push({ ...thanksgiving, name: "Thanksgiving", description: "Amerikansk takkefest med kalkun og familiesamvær", type: "national", regions: ["USA"] });

  // Thanksgiving (Canada): 2nd Monday of October
  const thanksgivingCA = nthWeekday(year, 10, 1, 2);
  holidays.push({ ...thanksgivingCA, name: "Thanksgiving (Canada)", description: "Kanadisk takkefest", type: "national", regions: ["Canada"] });

  // Labour Day (US/CA): 1st Monday of September
  const labourDay = nthWeekday(year, 9, 1, 1);
  holidays.push({ ...labourDay, name: "Labor Day", description: "Arbeidsdag i Nord-Amerika", type: "national", regions: ["USA", "Canada"] });

  // Memorial Day (US): Last Monday of May
  const memorial = nthWeekday(year, 5, 1, -1);
  holidays.push({ ...memorial, name: "Memorial Day", description: "Amerikansk minnedag for falne soldater", type: "national", regions: ["USA"] });

  // Oktoberfest start: Typically 3rd Saturday of September (approximation)
  const oktoberfestStart = nthWeekday(year, 9, 6, 3);
  holidays.push({ ...oktoberfestStart, name: "Oktoberfest (start)", description: "Verdens største ølfestival i München starter!", type: "cultural", regions: ["Tyskland"] });

  // ── Islamic holidays ──
  const islamic = islamicHolidays[year];
  if (islamic) {
    holidays.push({ month: islamic.ramadanStart[0], day: islamic.ramadanStart[1], name: "Ramadan begynner", description: "Islamsk fastemåned – faste fra soloppgang til solnedgang", type: "religious", regions: ["Muslimske land"] });
    holidays.push({ month: islamic.eidFitr[0], day: islamic.eidFitr[1], name: "Eid al-Fitr", description: "Islamsk fest for å markere slutten på ramadan", type: "religious", regions: ["Muslimske land"] });
    holidays.push({ month: islamic.eidAdha[0], day: islamic.eidAdha[1], name: "Eid al-Adha", description: "Islamsk offerfest – en av islams viktigste høytider", type: "religious", regions: ["Muslimske land"] });
  }

  // ── Hebrew holidays ──
  const hebrew = hebrewHolidays[year];
  if (hebrew) {
    holidays.push({ month: hebrew.roshHashanah[0], day: hebrew.roshHashanah[1], name: "Rosh Hashanah", description: "Jødisk nyttår – starten på de hellige dagene", type: "religious", regions: ["Israel", "Jødiske samfunn"] });
    holidays.push({ month: hebrew.yomKippur[0], day: hebrew.yomKippur[1], name: "Yom Kippur", description: "Jødisk forsoningsdag – årets helligste dag", type: "religious", regions: ["Israel", "Jødiske samfunn"] });
    holidays.push({ month: hebrew.sukkot[0], day: hebrew.sukkot[1], name: "Sukkot", description: "Jødisk løvhyttefest", type: "religious", regions: ["Israel", "Jødiske samfunn"] });
    holidays.push({ month: hebrew.hanukkahStart[0], day: hebrew.hanukkahStart[1], name: "Hanukkah begynner", description: "Jødisk lysfest – åtte dager med lystenning", type: "religious", regions: ["Israel", "Jødiske samfunn"] });
    holidays.push({ month: hebrew.passover[0], day: hebrew.passover[1], name: "Pesach (Passover)", description: "Jødisk påske – feiring av utferden fra Egypt", type: "religious", regions: ["Israel", "Jødiske samfunn"] });
    holidays.push({ month: hebrew.purim[0], day: hebrew.purim[1], name: "Purim", description: "Jødisk karneval med kostymer og hamantaschen", type: "religious", regions: ["Israel", "Jødiske samfunn"] });
    holidays.push({ month: hebrew.shavuot[0], day: hebrew.shavuot[1], name: "Shavuot", description: "Jødisk ukefest – mottak av Torahen", type: "religious", regions: ["Israel", "Jødiske samfunn"] });
  }

  // ── Chinese/Lunar holidays ──
  const chinese = chineseHolidays[year];
  if (chinese) {
    holidays.push({ month: chinese.lunarNewYear[0], day: chinese.lunarNewYear[1], name: "Kinesisk nyttår", description: "Lunært nyttår med fyrverkeri, rødt og familiesamvær", type: "cultural", regions: ["Kina", "Sørøst-Asia", "Globalt"] });
    holidays.push({ month: chinese.dragonBoat[0], day: chinese.dragonBoat[1], name: "Drageåtfestivalen", description: "Kinesisk festival med dragebåtløp og zongzi", type: "cultural", regions: ["Kina"] });
    holidays.push({ month: chinese.midAutumn[0], day: chinese.midAutumn[1], name: "Midthøstfestivalen", description: "Kinesisk høstfest med månekaker og lykter", type: "cultural", regions: ["Kina", "Vietnam", "Sørøst-Asia"] });
    holidays.push({ month: chinese.qixi[0], day: chinese.qixi[1], name: "Qixi-festivalen", description: "Kinesisk valentinsdag – historien om kuhyrden og veverjenta", type: "cultural", regions: ["Kina"] });
  }

  // ── Hindu holidays ──
  const hindu = hinduHolidays[year];
  if (hindu) {
    holidays.push({ month: hindu.diwali[0], day: hindu.diwali[1], name: "Diwali", description: "Hinduistisk lysfest – seieren over mørket", type: "religious", regions: ["India", "Nepal", "Globalt"] });
    holidays.push({ month: hindu.holi[0], day: hindu.holi[1], name: "Holi", description: "Hinduistisk fargefest – feiring av vårens ankomst", type: "religious", regions: ["India", "Nepal"] });
    holidays.push({ month: hindu.navaratri[0], day: hindu.navaratri[1], name: "Navaratri", description: "Ni netter med dans og tilbedelse av gudinnen Durga", type: "religious", regions: ["India"] });
    holidays.push({ month: hindu.ganeshChaturthi[0], day: hindu.ganeshChaturthi[1], name: "Ganesh Chaturthi", description: "Fest for elefantguden Ganesha", type: "religious", regions: ["India"] });
    holidays.push({ month: hindu.rakshabandhan[0], day: hindu.rakshabandhan[1], name: "Raksha Bandhan", description: "Hinduistisk fest for søskenforholdet – søstre knytter armbånd", type: "religious", regions: ["India"] });
  }

  // ── Buddhist holidays ──
  const buddhist = buddhistHolidays[year];
  if (buddhist) {
    holidays.push({ month: buddhist.vesak[0], day: buddhist.vesak[1], name: "Vesak", description: "Buddhistisk høytid – Buddhas fødsel, opplysning og død", type: "religious", regions: ["Sørøst-Asia", "Sri Lanka", "Japan"] });
  }

  return holidays;
}

// Get all movable holidays matching a specific month-day
export function getMovableHolidaysForDate(
  year: number,
  month: number,
  day: number
): Holiday[] {
  return getMovableHolidays(year)
    .filter((h) => h.month === month && h.day === day)
    .map(({ month: _, day: _d, ...rest }) => rest);
}
