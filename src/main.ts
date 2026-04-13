import { getHolidaysForDate, getAllHolidays } from "./holidays";
import type { DatedHolidayEntry } from "./holidays";
import { getPersonalMilestones } from "./milestones";
import { initConfetti, burstConfetti } from "./confetti";
import { HERO_QUOTES } from "./quotes";
import type { Celebration, Holiday } from "./types";
import "./style.css";

// ── State ──
let currentFilter: "all" | "personal" | "global" = "all";
let birthday: Date | null = null;
let celebrations: Celebration[] = [];

// ── Icon mapping ──
function getIcon(type: string, category: string): string {
  if (category === "personal") return "🎂";
  switch (type) {
    case "religious": return "🙏";
    case "national": return "🏳️";
    case "cultural": return "🎭";
    case "international": return "🌍";
    case "fun": return "🎉";
    default: return "✨";
  }
}

// ── Type label mapping ──
function getTypeLabel(type: string, category: string): string {
  if (category === "personal") return "Personlig";
  switch (type) {
    case "religious": return "Religiøs";
    case "national": return "Nasjonal";
    case "cultural": return "Kulturell";
    case "international": return "Internasjonal";
    case "fun": return "Morsom";
    default: return type;
  }
}

// ── Format a number with Norwegian locale ──
function formatNumber(n: number): string {
  return n.toLocaleString("nb-NO");
}

function formatBigInt(n: bigint): string {
  return n.toLocaleString("nb-NO");
}

function formatDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateInputValue(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

// ── Update birthday input styling ──
function updateBirthdayInputStyle() {
  const input = document.getElementById("birthday-input") as HTMLInputElement;
  if (birthday) {
    input.classList.add("registered");
  } else {
    input.classList.remove("registered");
  }
}

function renderHeroQuote() {
  const quoteElement = document.getElementById("hero-quote-text");
  if (!quoteElement) return;

  const randomIndex = Math.floor(Math.random() * HERO_QUOTES.length);
  quoteElement.textContent = HERO_QUOTES[randomIndex];
}

// ── Build age summary card (always shown when birthday is set) ──
function buildAgeSummaryContent(): string {
  if (!birthday) {
    return `
      <p class="age-summary-empty">
        Legg inn fødselsdatoen din for å se alderen din i tall.
      </p>
    `;
  }

  const today = new Date();
  const diffMs = today.getTime() - birthday.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMilliseconds = BigInt(diffMs);
  const totalMicroseconds = totalMilliseconds * 1_000n;
  const totalNanoseconds = totalMilliseconds * 1_000_000n;
  const totalFemtoseconds = totalMilliseconds * 1_000_000_000_000n;

  let years = today.getFullYear() - birthday.getFullYear();
  let months =
    (today.getFullYear() - birthday.getFullYear()) * 12 +
    (today.getMonth() - birthday.getMonth());
  if (today.getDate() < birthday.getDate()) months--;
  if (
    today.getMonth() < birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() &&
      today.getDate() < birthday.getDate())
  ) {
    years--;
  }

  return `
    <div class="age-summary-grid">
      <div class="age-summary-item">
        <span class="age-summary-label">År</span>
        <strong class="age-summary-value">${formatNumber(years)}</strong>
      </div>
      <div class="age-summary-item">
        <span class="age-summary-label">Måneder</span>
        <strong class="age-summary-value">${formatNumber(months)}</strong>
      </div>
      <div class="age-summary-item">
        <span class="age-summary-label">Uker</span>
        <strong class="age-summary-value">${formatNumber(totalWeeks)}</strong>
      </div>
      <div class="age-summary-item">
        <span class="age-summary-label">Dager</span>
        <strong class="age-summary-value">${formatNumber(totalDays)}</strong>
      </div>
      <div class="age-summary-item">
        <span class="age-summary-label">Timer</span>
        <strong class="age-summary-value">${formatNumber(totalHours)}</strong>
      </div>
      <div class="age-summary-item">
        <span class="age-summary-label">Sekunder</span>
        <strong class="age-summary-value">${formatNumber(totalSeconds)}</strong>
      </div>
      <div class="age-summary-item">
        <span class="age-summary-label">Millisekunder</span>
        <strong class="age-summary-value">${formatBigInt(totalMilliseconds)}</strong>
      </div>
      <div class="age-summary-item">
        <span class="age-summary-label">Mikrosekunder</span>
        <strong class="age-summary-value">${formatBigInt(totalMicroseconds)}</strong>
      </div>
      <div class="age-summary-item">
        <span class="age-summary-label">Nanosekunder</span>
        <strong class="age-summary-value">${formatBigInt(totalNanoseconds)}</strong>
      </div>
      <div class="age-summary-item">
        <span class="age-summary-label">Femtosekunder</span>
        <strong class="age-summary-value">${formatBigInt(totalFemtoseconds)}</strong>
      </div>
    </div>
  `;
}

// ── Generate a lookup URL for a holiday ──
function getHolidayLink(holiday: Holiday): { url: string; label: string } {
  if (holiday.sources?.[0]) {
    return { url: holiday.sources[0].url, label: "Kilde ↗" };
  }
  if (holiday.url) {
    return { url: holiday.url, label: "Les mer ↗" };
  }
  const query = encodeURIComponent(holiday.name);
  return { url: `https://www.google.com/search?q=${query}`, label: "Søk ↗" };
}

// ── Build celebrations ──
function buildCelebrations(): Celebration[] {
  const today = new Date();
  const result: Celebration[] = [];

  // Global holidays
  const holidays = getHolidaysForDate(today);
  for (const h of holidays) {
    const regionText = h.regions?.length ? ` (${h.regions.join(", ")})` : "";
    const link = getHolidayLink(h);
    result.push({
      name: h.name,
      description: h.description + regionText,
      category: "global",
      type: h.type,
      icon: getIcon(h.type, "global"),
      url: link.url,
      linkLabel: link.label,
    });
  }

  // Personal milestones
  if (birthday) {
    const milestones = getPersonalMilestones(birthday, today);
    for (const m of milestones) {
      result.push({
        name: m.name,
        description: m.description,
        category: "personal",
        type: "personal",
        icon: "🎂",
      });
    }
  }

  return result;
}

function renderAgeSummaryOverlay() {
  const content = document.getElementById("age-summary-content");
  if (!content) return;
  content.innerHTML = buildAgeSummaryContent();
}

// ── Render ──
function render() {
  const list = document.getElementById("celebration-list")!;
  const noResults = document.getElementById("no-results")!;

  const filtered =
    currentFilter === "all"
      ? celebrations
      : celebrations.filter((c) => c.category === currentFilter);

  if (filtered.length === 0) {
    list.innerHTML = "";
    noResults.hidden = false;
    return;
  }

  noResults.hidden = true;

  // Sort: personal first, then by type
  const sorted = [...filtered].sort((a, b) => {
    if (a.category === "personal" && b.category !== "personal") return -1;
    if (a.category !== "personal" && b.category === "personal") return 1;
    return 0;
  });

  list.innerHTML = sorted
    .map(
      (c) => `
    <article class="celebration-card ${c.category}">
      <div class="card-icon">${c.icon}</div>
      <div class="card-content">
        <h3 class="card-title">${c.name}</h3>
        <p class="card-description">${c.description}</p>
        <div class="card-footer">
          <span class="card-badge ${c.type}">${getTypeLabel(c.type, c.category)}</span>
          ${c.url ? `<a href="${c.url}" target="_blank" rel="noopener noreferrer" class="card-link" title="Les mer om ${c.name}">${c.linkLabel ?? "Les mer ↗"}</a>` : ""}
        </div>
      </div>
    </article>
  `
    )
    .join("");
}

// ── Browse all holidays ──
const MONTH_NAMES = [
  "", "Januar", "Februar", "Mars", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Desember",
];

const TYPE_LABELS: Record<string, string> = {
  religious: "Religiøs",
  national: "Nasjonal",
  cultural: "Kulturell",
  international: "Internasjonal",
  fun: "Morsom",
};

const TYPE_ORDER = ["religious", "national", "cultural", "international", "fun"];

let browseSort: "date" | "alpha" | "type" = "date";
let allHolidays: DatedHolidayEntry[] = [];

function renderBrowseList() {
  const list = document.getElementById("browse-list")!;
  const count = document.getElementById("browse-count")!;
  count.textContent = `${allHolidays.length} høytider`;

  let html = "";

  if (browseSort === "date") {
    const byMonth = new Map<number, DatedHolidayEntry[]>();
    for (const h of allHolidays) {
      const arr = byMonth.get(h.month) ?? [];
      arr.push(h);
      byMonth.set(h.month, arr);
    }

    for (let m = 1; m <= 12; m++) {
      const entries = byMonth.get(m);
      if (!entries) continue;
      entries.sort((a, b) => a.day - b.day);
      html += `<h3 class="browse-group-heading">${MONTH_NAMES[m]}</h3>`;
      html += entries.map((h) => browseRow(h, `${h.day}. ${MONTH_NAMES[h.month].slice(0, 3).toLowerCase()}`)).join("");
    }
  } else if (browseSort === "alpha") {
    const sorted = [...allHolidays].sort((a, b) => a.name.localeCompare(b.name, "nb"));
    let currentLetter = "";
    for (const h of sorted) {
      const letter = h.name[0].toUpperCase();
      if (letter !== currentLetter) {
        currentLetter = letter;
        html += `<h3 class="browse-group-heading">${letter}</h3>`;
      }
      html += browseRow(h, `${h.day}. ${MONTH_NAMES[h.month].slice(0, 3).toLowerCase()}`);
    }
  } else {
    for (const type of TYPE_ORDER) {
      const entries = allHolidays.filter((h) => h.type === type);
      if (entries.length === 0) continue;
      entries.sort((a, b) => a.name.localeCompare(b.name, "nb"));
      html += `<details class="browse-group">`;
      html += `<summary class="browse-group-heading browse-group-toggle">${getIcon(type, "global")} ${TYPE_LABELS[type]} <span class="browse-group-count">(${entries.length})</span></summary>`;
      html += `<div class="browse-group-body">`;
      html += entries.map((h) => browseRow(h, `${h.day}. ${MONTH_NAMES[h.month].slice(0, 3).toLowerCase()}`)).join("");
      html += `</div></details>`;
    }
  }

  list.innerHTML = html;
}

function browseRow(h: DatedHolidayEntry, dateStr: string): string {
  const link = getHolidayLink(h);
  return `
    <div class="browse-row">
      <span class="browse-row-icon">${getIcon(h.type, "global")}</span>
      <div class="browse-row-content">
        <span class="browse-row-name">${h.name}</span>
        <span class="browse-row-date">${dateStr}</span>
      </div>
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="browse-row-link" title="${link.label}">↗</a>
    </div>`;
}

function updateBodyScrollLock() {
  const hasOpenOverlay = document.querySelector(".browse-overlay.open");
  document.body.style.overflow = hasOpenOverlay ? "hidden" : "";
}

function openOverlay(overlayId: string) {
  const overlay = document.getElementById(overlayId);
  if (!overlay) return;
  overlay.classList.add("open");
  updateBodyScrollLock();
}

function closeOverlay(overlayId: string) {
  const overlay = document.getElementById(overlayId);
  if (!overlay) return;
  overlay.classList.remove("open");
  updateBodyScrollLock();
}

function openBrowseOverlay() {
  allHolidays = getAllHolidays(new Date().getFullYear());
  renderBrowseList();
  openOverlay("browse-overlay");
}

function closeBrowseOverlay() {
  closeOverlay("browse-overlay");
}

function openAgeOverlay() {
  renderAgeSummaryOverlay();
  openOverlay("age-overlay");
}

function closeAgeOverlay() {
  closeOverlay("age-overlay");
}

function updateAgeSummaryLinkVisibility() {
  const ageLink = document.getElementById("age-summary-link");
  if (!ageLink) return;
  ageLink.hidden = !birthday;
}

// ── Init ──
function init() {
  initConfetti("confetti-canvas");
  renderHeroQuote();

  const birthdayInput = document.getElementById(
    "birthday-input"
  ) as HTMLInputElement;
  const clearBtn = document.getElementById("clear-birthday") as HTMLButtonElement;
  const filterTabs = document.querySelectorAll<HTMLButtonElement>(".filter-tab");
  const ageLink = document.getElementById("age-summary-link") as HTMLAnchorElement;

  // Set max date to today
  const todayStr = formatDateInputValue(new Date());
  birthdayInput.max = todayStr;

  // Restore saved birthday
  const saved = localStorage.getItem("celebration-excuse-birthday");
  if (saved) {
    const parsed = parseDateInputValue(saved);
    if (parsed && parsed <= new Date()) {
      birthdayInput.value = saved;
      birthday = parsed;
      clearBtn.hidden = false;
    } else {
      localStorage.removeItem("celebration-excuse-birthday");
    }
  }

  updateAgeSummaryLinkVisibility();
  renderAgeSummaryOverlay();

  // Birthday input
  birthdayInput.addEventListener("change", () => {
    const val = birthdayInput.value;
    const parsed = parseDateInputValue(val);
    if (val && parsed) {
      birthday = parsed;
      localStorage.setItem("celebration-excuse-birthday", val);
      clearBtn.hidden = false;
      celebrations = buildCelebrations();
      updateBirthdayInputStyle();
      updateAgeSummaryLinkVisibility();
      renderAgeSummaryOverlay();
      render();
      burstConfetti(120);
    }
  });

  // Clear birthday
  clearBtn.addEventListener("click", () => {
    birthday = null;
    birthdayInput.value = "";
    localStorage.removeItem("celebration-excuse-birthday");
    clearBtn.hidden = true;
    celebrations = buildCelebrations();
    updateBirthdayInputStyle();
    updateAgeSummaryLinkVisibility();
    renderAgeSummaryOverlay();
    closeAgeOverlay();
    render();
  });

  // Filter tabs
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilter = tab.dataset.filter as "all" | "personal" | "global";
      render();
    });
  });

  // Browse overlay
  const browseLink = document.getElementById("browse-all-link")!;
  const browseCloseBtn = document.getElementById("browse-close")!;
  const browseOverlay = document.getElementById("browse-overlay")!;
  const ageCloseBtn = document.getElementById("age-close")!;
  const ageOverlay = document.getElementById("age-overlay")!;
  const browseTabs = document.querySelectorAll<HTMLButtonElement>(".browse-tab");

  browseLink.addEventListener("click", (e) => {
    e.preventDefault();
    openBrowseOverlay();
  });

  ageLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (!birthday) return;
    openAgeOverlay();
  });

  browseCloseBtn.addEventListener("click", closeBrowseOverlay);
  ageCloseBtn.addEventListener("click", closeAgeOverlay);

  browseOverlay.addEventListener("click", (e) => {
    if (e.target === browseOverlay) closeBrowseOverlay();
  });

  ageOverlay.addEventListener("click", (e) => {
    if (e.target === ageOverlay) closeAgeOverlay();
  });

  browseTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      browseTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      browseSort = tab.dataset.sort as "date" | "alpha" | "type";
      renderBrowseList();
    });
  });

  // Initial build
  celebrations = buildCelebrations();
  updateBirthdayInputStyle();
  updateAgeSummaryLinkVisibility();
  renderAgeSummaryOverlay();
  render();

  // Welcome confetti
  if (celebrations.length > 0) {
    setTimeout(() => burstConfetti(60), 500);
  }
}

document.addEventListener("DOMContentLoaded", init);
