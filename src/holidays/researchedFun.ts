import type { Holiday, HolidaySource } from "../types";

export interface ResearchedFunHolidayResult {
  status: "verified" | "excluded";
  note: string;
  holiday?: Pick<Holiday, "name" | "description">;
  sources: HolidaySource[];
}

function daysOfTheYear(slug: string): HolidaySource[] {
  return [{ label: "Days Of The Year", url: `https://www.daysoftheyear.com/days/${slug}/` }];
}

function nationalToday(slug: string): HolidaySource[] {
  return [{ label: "National Today", url: `https://nationaltoday.com/${slug}/` }];
}

function timeAndDate(slug: string): HolidaySource[] {
  return [{ label: "Time and Date", url: `https://www.timeanddate.com/holidays/fun/${slug}` }];
}

function official(label: string, url: string): HolidaySource[] {
  return [{ label, url }];
}

function verified(
  name: string,
  description: string,
  sources: HolidaySource[],
  note = "Verified on the same calendar date.",
): ResearchedFunHolidayResult {
  return {
    status: "verified",
    note,
    holiday: { name, description },
    sources,
  };
}

function excluded(note: string, sources: HolidaySource[] = []): ResearchedFunHolidayResult {
  return { status: "excluded", note, sources };
}

export const researchedFixedFunHolidayResults: Record<string, ResearchedFunHolidayResult> = {
  "Jordrotasjonsdagen": verified(
    "Earth's Rotation Day",
    "Marks the anniversary of Leon Foucault's 1851 demonstration that Earth rotates on its axis.",
    timeAndDate("earths-rotation-day"),
  ),
  "Ordnerd-dagen": verified(
    "Word Nerd Day",
    "Celebrates word lovers, dictionaries, and playful fascination with language.",
    timeAndDate("word-nerd-day"),
  ),
  "Urtepotteplantedagen": verified(
    "Houseplant Appreciation Day",
    "A day to appreciate houseplants and indoor gardening.",
    daysOfTheYear("houseplant-appreciation-day"),
  ),
  "Internasjonal takk-dag": verified(
    "International Thank-You Day",
    "A reminder to thank someone who deserves it.",
    nationalToday("international-thank-you-day"),
  ),
  "Internasjonal krydderdag": verified(
    "International Hot and Spicy Food Day",
    "A food holiday for spicy dishes and bold flavors.",
    nationalToday("international-hot-and-spicy-food-day"),
  ),
  "Verdens pizzadag": excluded(
    "The documented pizza observance is on February 9, not January 17.",
    daysOfTheYear("pizza-day"),
  ),
  "Tesaurusdagen": verified(
    "Thesaurus Day",
    "Celebrates Peter Roget and the love of synonyms.",
    daysOfTheYear("thesaurus-day"),
  ),
  "Popcorn-dagen": verified(
    "Popcorn Day",
    "Celebrates popcorn as a classic snack.",
    daysOfTheYear("popcorn-day"),
  ),
  "Pengvinbevissthetsdagen": verified(
    "Penguin Awareness Day",
    "Raises awareness of penguins and their habitats.",
    daysOfTheYear("penguin-awareness-day"),
  ),
  "Internasjonal krammedag": verified(
    "National Hugging Day",
    "A day for hugs and warm human connection.",
    nationalToday("national-hugging-day"),
  ),
  "Svardagen": verified(
    "Answer Your Cat's Questions Day",
    "A tongue-in-cheek day for responding to your cat's mysterious questions.",
    daysOfTheYear("answer-your-cats-questions-day"),
  ),
  "Håndskriftsdagen": verified(
    "Handwriting Day",
    "Celebrates handwriting in a digital world.",
    daysOfTheYear("handwriting-day"),
  ),
  "Sjokoladekakedag": verified(
    "Chocolate Cake Day",
    "A day to celebrate chocolate cake.",
    daysOfTheYear("chocolate-cake-day"),
  ),
  "Puslespilldagen": verified(
    "Puzzle Day",
    "Celebrates puzzles and brainteasers.",
    daysOfTheYear("puzzle-day"),
  ),
  "Croissant-dagen": verified(
    "Croissant Day",
    "Celebrates the buttery pastry.",
    daysOfTheYear("croissant-day"),
  ),
  "Baklengs-dagen": verified(
    "Backwards Day",
    "A playful day to do things in reverse.",
    daysOfTheYear("backward-day"),
  ),
  "Internasjonal operaprimadonnadag": excluded(
    "The documented global observance is World Opera Day on October 25, which is already in the dataset.",
    official("Opera Europa", "https://opera-europa.org/world-opera-day-25-october"),
  ),
  "Pizzadag": verified(
    "National Pizza Day",
    "A widely observed pizza celebration on February 9.",
    daysOfTheYear("pizza-day"),
  ),
  "Singeldagen": verified(
    "Singles Awareness Day",
    "A day for people who are single to celebrate themselves.",
    daysOfTheYear("singles-awareness-day"),
  ),
  "Innova-dagen": verified(
    "Innovation Day",
    "Encourages new ideas, experimentation, and creativity.",
    daysOfTheYear("innovation-day"),
  ),
  "Myntedag": verified(
    "Chocolate Mint Day",
    "Celebrates the chocolate-and-mint flavor combination.",
    daysOfTheYear("chocolate-mint-day"),
  ),
  "Fortell et eventyr-dagen": verified(
    "Tell a Fairy Tale Day",
    "A day for sharing fairy tales and folklore.",
    daysOfTheYear("tell-a-fairy-tale-day"),
  ),
  "Tannlegedagen": verified(
    "Dentist's Day",
    "A day to appreciate dentists and oral health.",
    daysOfTheYear("dentists-day"),
  ),
  "Frokostflesk-dagen": excluded(
    "I did not find a reliable March 7 bacon observance to support this entry.",
  ),
  "Verdens rørleggerdag": verified(
    "World Plumbing Day",
    "Recognizes the role of plumbing and sanitation in public health.",
    daysOfTheYear("world-plumbing-day"),
  ),
  "Plant et tre-dagen": verified(
    "Plant a Flower Day",
    "A gardening day focused on planting flowers, not trees.",
    daysOfTheYear("plant-a-flower-day"),
  ),
  "Ørepropp-dagen": excluded(
    "I did not find a reliable observance matching this name and date.",
  ),
  "Pandadagen": verified(
    "National Panda Day",
    "Celebrates pandas and awareness for their protection.",
    daysOfTheYear("panda-day"),
  ),
  "Pinlige øyeblikk-dagen": verified(
    "Awkward Moments Day",
    "A day to laugh at life's awkward moments.",
    daysOfTheYear("awkward-moments-day"),
  ),
  "Mat-på-pinne-dagen": verified(
    "Something on a Stick Day",
    "Celebrates food served on sticks or skewers.",
    daysOfTheYear("something-on-a-stick-day"),
  ),
  "Bunsenbrennerdagen": verified(
    "Bunsen Burner Day",
    "Celebrates Robert Bunsen and chemistry.",
    daysOfTheYear("bunsen-burner-day"),
  ),
  "Verdens festdag": verified(
    "World Party Day",
    "A novelty observance about celebrating together.",
    daysOfTheYear("world-party-day"),
  ),
  "Verdens rottedyr-dag": verified(
    "World Rat Day",
    "A day for appreciating pet rats and learning about them.",
    daysOfTheYear("world-rat-day"),
  ),
  "Enhjørningdagen": verified(
    "Unicorn Day",
    "Celebrates unicorns and playful imagination.",
    daysOfTheYear("unicorn-day"),
  ),
  "Søskendag": verified(
    "National Siblings Day",
    "Celebrates sibling relationships.",
    nationalToday("national-siblings-day"),
  ),
  "Kjæledyrdagen": verified(
    "Pet Day",
    "A day to appreciate pets and the joy they bring.",
    daysOfTheYear("pet-day"),
  ),
  "Hubble-teleskopets dag": verified(
    "Hubble Space Telescope Launch Anniversary",
    "Marks the 1990 launch of the Hubble Space Telescope.",
    official("ESA/Hubble", "https://esahubble.org/announcements/ann2006/"),
  ),
  "Verdens spilldag": verified(
    "World Play Day",
    "Celebrates the importance of play and children's right to play.",
    official("Toy Libraries Australia", "https://www.toylibraries.org.au/wpd"),
  ),
  "Ingen diettdag": verified(
    "No Diet Day",
    "A body-positive day rejecting harmful diet culture.",
    daysOfTheYear("no-diet-day"),
  ),
  "Spis hva du vil-dagen": verified(
    "Eat What You Want Day",
    "A food holiday for enjoying what you want without rules.",
    daysOfTheYear("eat-what-you-want-day"),
  ),
  "Hummus-dagen": verified(
    "International Hummus Day",
    "Celebrates hummus and chickpea-based food culture.",
    daysOfTheYear("international-hummus-day"),
  ),
  "Dans som en kylling-dagen": verified(
    "Dance Like a Chicken Day",
    "A silly day inspired by the chicken dance.",
    daysOfTheYear("dance-like-a-chicken-day"),
  ),
  "Verdens dag for linser": excluded(
    "I did not find a reliable May 26 lentil observance to support this entry.",
  ),
  "Solkrem-dagen": verified(
    "National Sunscreen Day",
    "A reminder to use sunscreen and practice sun safety.",
    nationalToday("sunscreen-day"),
  ),
  "Klem katten din-dagen": verified(
    "Hug Your Cat Day",
    "A cat-themed day for showing affection to feline companions.",
    daysOfTheYear("hug-your-cat-day"),
  ),
  "Donald Duck-dagen": verified(
    "Donald Duck Day",
    "Marks Donald Duck's screen debut in 1934.",
    daysOfTheYear("donald-duck-day"),
  ),
  "Løkringdagen": verified(
    "Onion Rings Day",
    "Celebrates onion rings.",
    daysOfTheYear("onion-rings-day"),
  ),
  "Tau-dagen": verified(
    "Tau Day",
    "Celebrates tau, the mathematical constant equal to 2pi.",
    official("Tau Day", "https://tauday.com/"),
  ),
  "Verdens kyssedagen": verified(
    "International Kissing Day",
    "A day about kisses and affection.",
    daysOfTheYear("international-kissing-day"),
  ),
  "Piña Colada Day": verified(
    "Pina Colada Day",
    "Celebrates the tropical cocktail.",
    daysOfTheYear("pina-colada-day"),
  ),
  "Verdens UFO-dag": verified(
    "World UFO Day",
    "A day for UFO culture and extraterrestrial curiosity.",
    daysOfTheYear("world-ufo-day"),
  ),
  "Bikini-dagen": verified(
    "Bikini Day",
    "Marks the debut of the bikini in 1946.",
    daysOfTheYear("bikini-day"),
  ),
  "Videospilldagen": verified(
    "Video Games Day",
    "Celebrates video games and gaming culture.",
    daysOfTheYear("video-games-day"),
  ),
  "Sukkerbrøddagen": verified(
    "National Sugar Cookie Day",
    "Celebrates sugar cookies on July 9.",
    daysOfTheYear("sugar-cookie-day"),
  ),
  "Enkelhetsdagen": verified(
    "Simplicity Day",
    "Marks Henry David Thoreau's birthday and the ideal of simple living.",
    daysOfTheYear("simplicity-day"),
  ),
  "Omfavn din indre nerd-dag": verified(
    "Embrace Your Geekness Day",
    "A day to be proudly geeky.",
    daysOfTheYear("embrace-your-geekness-day"),
  ),
  "Verdens slangedag": verified(
    "World Snake Day",
    "Raises awareness and appreciation for snakes.",
    daysOfTheYear("world-snake-day"),
  ),
  "Rekk tunge-dagen": verified(
    "Stick Out Your Tongue Day",
    "A playful novelty day for goofy behavior.",
    daysOfTheYear("stick-out-your-tongue-day"),
  ),
  "Pi-tilnærmingsdagen": verified(
    "Pi Approximation Day",
    "Celebrates the fraction 22/7 as an approximation of pi.",
    daysOfTheYear("pi-approximation-day"),
  ),
  "Søskenbarn-dagen": verified(
    "Cousins Day",
    "Celebrates cousin relationships.",
    daysOfTheYear("cousins-day"),
  ),
  "Uvanlige musikkinstrumenter-dagen": verified(
    "Uncommon Instrument Awareness Day",
    "Encourages interest in less common musical instruments.",
    daysOfTheYear("uncommon-instrument-awareness-day"),
  ),
  "Iskrem-sandwich-dagen": verified(
    "Ice Cream Sandwich Day",
    "Celebrates the frozen dessert sandwich.",
    daysOfTheYear("ice-cream-sandwich-day"),
  ),
  "Vannmelondagen": verified(
    "Watermelon Day",
    "Celebrates watermelon in peak summer.",
    daysOfTheYear("watermelon-day"),
  ),
  "Sjokoladebrikkedagen": verified(
    "National Chocolate Chip Cookie Day",
    "Celebrates chocolate chip cookies.",
    daysOfTheYear("national-chocolate-chip-cookie-day"),
  ),
  "Creamsicle-dagen": verified(
    "Creamsicle Day",
    "Celebrates the orange-and-vanilla frozen treat.",
    daysOfTheYear("creamsicle-day"),
  ),
  "Fortell en vits-dagen": verified(
    "Tell a Joke Day",
    "A day for telling jokes and sharing laughs.",
    daysOfTheYear("tell-a-joke-day"),
  ),
  "Dårlig poesi-dag": verified(
    "Bad Poetry Day",
    "Encourages delightfully bad poetry.",
    daysOfTheYear("bad-poetry-day"),
  ),
  "Vær en engel-dagen": verified(
    "Be an Angel Day",
    "A day for small acts of kindness.",
    daysOfTheYear("be-an-angel-day"),
  ),
  "Pluto-degraderingsdagen": verified(
    "Pluto Demoted Day",
    "Marks Pluto's 2006 reclassification as a dwarf planet.",
    daysOfTheYear("pluto-demoted-day"),
  ),
  "Kyss og forson deg-dagen": verified(
    "Kiss and Make Up Day",
    "Encourages reconciliation after conflict.",
    daysOfTheYear("kiss-and-make-up-day"),
  ),
  "Sløyfedagen": verified(
    "Bow Tie Day",
    "Celebrates the classic bow tie.",
    daysOfTheYear("bow-tie-day"),
  ),
  "Frankenstein-dagen": verified(
    "Frankenstein Day",
    "Marks Mary Shelley's birthday and celebrates Frankenstein.",
    daysOfTheYear("frankenstein-day"),
  ),
  "Spis utendørs-dagen": verified(
    "Eat Outside Day",
    "A day for outdoor meals.",
    nationalToday("eat-outside-day"),
  ),
  "Skyskraperdagen": verified(
    "Skyscraper Day",
    "Celebrates tall buildings and architecture.",
    daysOfTheYear("skyscraper-day"),
  ),
  "Spis en ekstra dessert-dagen": verified(
    "Eat an Extra Dessert Day",
    "A dessert holiday for having one more sweet serving.",
    nationalToday("eat-an-extra-dessert-day"),
  ),
  "Les en bok-dagen": verified(
    "Read a Book Day",
    "A day to sit down with a book and read.",
    daysOfTheYear("read-a-book-day"),
  ),
  "Teddybjørndagen": verified(
    "Teddy Bear Day",
    "Celebrates teddy bears and comfort objects.",
    daysOfTheYear("teddy-bear-day"),
  ),
  "Sjokolademilkshake-dagen": verified(
    "Chocolate Milkshake Day",
    "Celebrates the classic milkshake flavor.",
    daysOfTheYear("chocolate-milkshake-day"),
  ),
  "Tegnsettingsdagen": verified(
    "Punctuation Day",
    "A day for appreciating punctuation and clear writing.",
    daysOfTheYear("punctuation-day"),
  ),
  "Tegneserie-dagen": verified(
    "Comic Book Day",
    "Celebrates comic books and graphic storytelling.",
    daysOfTheYear("comic-book-day"),
  ),
  "Pierogi-dagen": verified(
    "Pierogi Day",
    "Celebrates the filled dumpling popular in Central and Eastern Europe.",
    daysOfTheYear("pierogi-day"),
  ),
  "Sjokolade-cupcake-dagen": verified(
    "Chocolate Cupcake Day",
    "Celebrates chocolate cupcakes.",
    daysOfTheYear("chocolate-cupcake-day"),
  ),
  "Evaluer livet ditt-dagen": verified(
    "Evaluate Your Life Day",
    "A day for reflection and reassessment.",
    daysOfTheYear("evaluate-your-life-day"),
  ),
  "Verdens internetdag": verified(
    "Internet Day",
    "Celebrates the internet and its impact on daily life.",
    daysOfTheYear("internet-day"),
  ),
  "Candy Corn-dagen": verified(
    "Candy Corn Day",
    "Celebrates the polarizing Halloween candy.",
    daysOfTheYear("candy-corn-day"),
  ),
  "Sunn fornuft-dagen": verified(
    "Common Sense Day",
    "A novelty day about practical wisdom and common sense.",
    timeAndDate("common-sense-day"),
  ),
  "Saksofondagen": verified(
    "Saxophone Day",
    "Marks Adolphe Sax's birthday and celebrates the instrument.",
    daysOfTheYear("saxophone-day"),
  ),
  "Tungetvisteren-dagen": verified(
    "Tongue Twister Day",
    "A day for saying difficult phrases as fast as possible.",
    timeAndDate("tongue-twister-day"),
  ),
  "Feir ditt unike talent-dagen": verified(
    "Celebrate Your Unique Talent Day",
    "Encourages everyone to show off what makes them special.",
    daysOfTheYear("celebrate-your-unique-talent-day"),
  ),
  "Rød planet-dagen": verified(
    "Red Planet Day",
    "Celebrates Mars and planetary exploration.",
    daysOfTheYear("red-planet-day"),
  ),
  "Elektronisk gratulasjonskort-dag": verified(
    "Electronic Greetings Day",
    "A day for sending digital greeting cards.",
    daysOfTheYear("electronic-greetings-day"),
  ),
  "Datasikkerhetsdag": verified(
    "Computer Security Day",
    "A day for awareness of digital and computer security.",
    daysOfTheYear("computer-security-day"),
  ),
  "Verdens tedag (alternativ)": excluded(
    "I could not validate December 15 with a sufficiently reliable current source.",
  ),
  "Juleøldag": excluded(
    "I did not find a reliable fixed-date source for a December 19 juleol observance.",
  ),
  "Kortspilldagen": verified(
    "Card Playing Day",
    "A day to gather people for card games.",
    daysOfTheYear("card-playing-day"),
  ),
  "Bakepulverdagen": verified(
    "Bicarbonate of Soda Day",
    "Celebrates baking soda rather than baking powder.",
    timeAndDate("bicarbonate-of-soda-day"),
  ),
  "Bestem deg-dagen": verified(
    "Make Up Your Mind Day",
    "Encourages decisiveness on the last day of the year.",
    daysOfTheYear("make-up-your-mind-day"),
  ),
};

export function curateResearchedFixedFunHoliday(holiday: Holiday): Holiday | null {
  const result = researchedFixedFunHolidayResults[holiday.name];
  if (!result || result.status !== "verified" || !result.holiday) {
    return null;
  }

  return {
    ...holiday,
    ...result.holiday,
    sources: result.sources,
  };
}
