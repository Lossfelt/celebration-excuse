import type { Holiday } from "../types";
import { curateResearchedFixedFunHoliday } from "./researchedFun";

// The original data file mixed well-established observances with a long tail of
// novelty days. Keep only the fun observances we have explicitly vetted.
export const approvedFixedFunHolidayNames = new Set<string>([
  "Science Fiction-dagen",
  "Groundhog Day",
  "Nutella-dagen",
  "Darwin-dagen",
  "Galentine's Day",
  "Random Acts of Kindness Day",
  "Pokémon Day",
  "Skuddårsdag",
  "Verdens komplimentdag",
  "Dr. Seuss-dagen",
  "Mario Day",
  "Pi-dagen",
  "Tolkien-lesedagen",
  "Aprilsnarr",
  "Yuris natt",
  "Sykkel-dagen",
  "Star Wars Day",
  "World Turtle Day",
  "Towel Day",
  "Geek Pride Day",
  "Internasjonal piknikdag",
  "World Chocolate Day",
  "World Emoji Day",
  "Månelands-dagen",
  "International Cat Day",
  "Internasjonal venstrehendt-dag",
  "Verdens fotodag",
  "National Dog Day",
  "Dot Day",
  "Talk Like a Pirate Day",
  "Hobbit-dagen",
  "Internasjonal podcastdag",
  "Internasjonal kaffedag",
  "World Bread Day",
  "World Pasta Day",
  "Singles' Day",
  "Pepero Day",
  "World Hello Day",
  "Caps Lock-dagen",
  "Mol-dagen",
  "Fibonacci-dagen",
  "Tango Day",
  "Festivus",
  "Wright-brødrenes dag",
  "Tick Tock Day",
]);

export function curateFixedHoliday(holiday: Holiday): Holiday | null {
  if (holiday.type !== "fun") {
    return holiday;
  }

  const researched = curateResearchedFixedFunHoliday(holiday);
  if (researched) {
    return researched;
  }

  if (approvedFixedFunHolidayNames.has(holiday.name)) {
    return holiday;
  }

  return null;
}
