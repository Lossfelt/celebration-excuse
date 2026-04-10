import { getHolidaysForDate, getAllHolidays } from "./holidays";
import type { DatedHolidayEntry } from "./holidays";
import { getPersonalMilestones } from "./milestones";
import { initConfetti, burstConfetti } from "./confetti";
import type { Celebration } from "./types";
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

// ── Update birthday input styling ──
function updateBirthdayInputStyle() {
  const input = document.getElementById("birthday-input") as HTMLInputElement;
  if (birthday) {
    input.classList.add("registered");
  } else {
    input.classList.remove("registered");
  }
}

// ── Build age summary card (always shown when birthday is set) ──
function buildAgeSummary(): Celebration | null {
  if (!birthday) return null;

  const today = new Date();
  const diffMs = today.getTime() - birthday.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalSeconds = Math.floor(diffMs / 1000);

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

  return {
    name: "Din alder i tall",
    description:
      `${years} år | ${formatNumber(months)} måneder | ${formatNumber(totalWeeks)} uker | ${formatNumber(totalDays)} dager | ${formatNumber(totalHours)} timer | ${formatNumber(totalSeconds)} sekunder`,
    category: "personal",
    type: "personal",
    icon: "📊",
  };
}

// ── Generate a lookup URL for a holiday ──
function holidayUrl(holiday: { name: string; url?: string }): string {
  if (holiday.url) return holiday.url;
  const query = encodeURIComponent(holiday.name);
  return `https://www.google.com/search?q=${query}`;
}

// ── Build celebrations ──
function buildCelebrations(): Celebration[] {
  const today = new Date();
  const result: Celebration[] = [];

  // Global holidays
  const holidays = getHolidaysForDate(today);
  for (const h of holidays) {
    const regionText = h.regions?.length ? ` (${h.regions.join(", ")})` : "";
    result.push({
      name: h.name,
      description: h.description + regionText,
      category: "global",
      type: h.type,
      icon: getIcon(h.type, "global"),
      url: holidayUrl(h),
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

    // Always include age summary as the last personal card
    const summary = buildAgeSummary();
    if (summary) result.push(summary);
  }

  return result;
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
          ${c.url ? `<a href="${c.url}" target="_blank" rel="noopener noreferrer" class="card-link" title="Søk etter ${c.name}">Les mer ↗</a>` : ""}
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
  const url = holidayUrl(h);
  return `
    <div class="browse-row">
      <span class="browse-row-icon">${getIcon(h.type, "global")}</span>
      <div class="browse-row-content">
        <span class="browse-row-name">${h.name}</span>
        <span class="browse-row-date">${dateStr}</span>
      </div>
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="browse-row-link" title="Les mer">↗</a>
    </div>`;
}

function openBrowseOverlay() {
  const overlay = document.getElementById("browse-overlay")!;
  allHolidays = getAllHolidays(new Date().getFullYear());
  renderBrowseList();
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeBrowseOverlay() {
  const overlay = document.getElementById("browse-overlay")!;
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// ── Init ──
function init() {
  initConfetti("confetti-canvas");

  const birthdayInput = document.getElementById(
    "birthday-input"
  ) as HTMLInputElement;
  const clearBtn = document.getElementById("clear-birthday") as HTMLButtonElement;
  const filterTabs = document.querySelectorAll<HTMLButtonElement>(".filter-tab");

  // Set max date to today
  const todayStr = new Date().toISOString().split("T")[0];
  birthdayInput.max = todayStr;

  // Restore saved birthday
  const saved = localStorage.getItem("celebration-excuse-birthday");
  if (saved) {
    birthdayInput.value = saved;
    birthday = new Date(saved + "T00:00:00");
    clearBtn.hidden = false;
  }

  // Birthday input
  birthdayInput.addEventListener("change", () => {
    const val = birthdayInput.value;
    if (val) {
      birthday = new Date(val + "T00:00:00");
      localStorage.setItem("celebration-excuse-birthday", val);
      clearBtn.hidden = false;
      celebrations = buildCelebrations();
      updateBirthdayInputStyle();
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
  const browseTabs = document.querySelectorAll<HTMLButtonElement>(".browse-tab");

  browseLink.addEventListener("click", (e) => {
    e.preventDefault();
    openBrowseOverlay();
  });

  browseCloseBtn.addEventListener("click", closeBrowseOverlay);

  browseOverlay.addEventListener("click", (e) => {
    if (e.target === browseOverlay) closeBrowseOverlay();
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
  render();

  // Welcome confetti
  if (celebrations.length > 0) {
    setTimeout(() => burstConfetti(60), 500);
  }
}

document.addEventListener("DOMContentLoaded", init);
