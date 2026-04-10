// Comprehensive database of fixed-date holidays and celebrations worldwide.
// Keyed by "MM-DD" → array of holidays on that date.

import type { Holiday } from "../types";

export const fixedHolidays: Record<string, Holiday[]> = {
  // ──────────────── JANUAR ────────────────
  "01-01": [
    { name: "Nyttårsdag", description: "Feiring av det nye året", type: "international", regions: ["Globalt"] },
    { name: "Solemnity of Mary", description: "Katolsk høytidsdag for Jomfru Maria", type: "religious", regions: ["Katolske land"] },
    { name: "Gantan-sai", description: "Japansk nyttårsfeiring (Shōgatsu)", type: "cultural", regions: ["Japan"] },
    { name: "Jour de l'An", description: "Nyttårsdag med familiesammenkomster", type: "cultural", regions: ["Frankrike"] },
    { name: "Hogmanay avsluttes", description: "Skotsk nyttårsfeiring", type: "cultural", regions: ["Skottland"] },
  ],
  "01-02": [
    { name: "Berchtoldstag", description: "Sveitsisk høytidsdag", type: "cultural", regions: ["Sveits"] },
    { name: "Hatsumōde", description: "Første tempelbesøk i det nye året", type: "cultural", regions: ["Japan"] },
  ],
  "01-04": [
    { name: "Verdens braille-dag", description: "FN-dag for å hedre Louis Braille og blindeskrift", type: "international" },
  ],
  "01-05": [
    { name: "Twelfth Night", description: "Kvelden før Helligtrekonger, avsluttes juletiden", type: "religious", regions: ["Kristne land"] },
  ],
  "01-06": [
    { name: "Helligtrekongersdag", description: "Feiring av de tre vise menns besøk til Jesusbarnet", type: "religious", regions: ["Kristne land"] },
    { name: "Armensk julaften", description: "Jul feires 6. januar i den armenske kirken", type: "religious", regions: ["Armenia"] },
    { name: "Día de los Reyes", description: "Spansk helligtrekongersdag med gaver til barn", type: "cultural", regions: ["Spania", "Latin-Amerika"] },
  ],
  "01-07": [
    { name: "Ortodoks jul", description: "Julaften feires etter den julianske kalenderen", type: "religious", regions: ["Russland", "Serbia", "Etiopia", "Egypt"] },
    { name: "Genna", description: "Etiopisk julfeiring", type: "religious", regions: ["Etiopia"] },
  ],
  "01-11": [
    { name: "Kagami Biraki", description: "Japansk seremoni for å bryte årets første mochi-kake", type: "cultural", regions: ["Japan"] },
  ],
  "01-13": [
    { name: "Gammel nyttårsdag", description: "Nyttår etter den julianske kalenderen", type: "cultural", regions: ["Russland", "Georgia", "Serbia"] },
    { name: "Lohri", description: "Punjabisk vinterhøstfestival med bål og dans", type: "cultural", regions: ["India (Punjab)"] },
  ],
  "01-14": [
    { name: "Makar Sankranti", description: "Hinduistisk høstfestival – solen beveger seg inn i Steinbukken", type: "religious", regions: ["India"] },
    { name: "Pongal", description: "Tamilsk takkefest for ris-innhøsting", type: "cultural", regions: ["India (Tamil Nadu)"] },
  ],
  "01-15": [
    { name: "Seijin no Hi", description: "Myndighetsdagen i Japan for alle som fyller 20", type: "cultural", regions: ["Japan"] },
  ],
  "01-17": [
    { name: "Verdens pizzadag", description: "Internasjonal feiring av pizza", type: "fun" },
  ],
  "01-20": [
    { name: "Pengvinbevissthetsdagen", description: "Dag for å øke bevisstheten om pingviner", type: "fun" },
  ],
  "01-21": [
    { name: "Internasjonal krammedag", description: "En dag for å gi noen en klem", type: "fun" },
  ],
  "01-25": [
    { name: "Burns Night", description: "Skotsk feiring av poeten Robert Burns med haggis og whisky", type: "cultural", regions: ["Skottland"] },
    { name: "Tatjanas dag", description: "Russisk studentdag", type: "cultural", regions: ["Russland"] },
  ],
  "01-26": [
    { name: "Australia Day", description: "Australias nasjonaldag", type: "national", regions: ["Australia"] },
    { name: "Republic Day", description: "Indias republikk-dag", type: "national", regions: ["India"] },
    { name: "Internasjonal tolldag", description: "FN-dag for å anerkjenne tollvesenets rolle", type: "international" },
  ],
  "01-27": [
    { name: "Holocaustminnedagen", description: "Internasjonal minnedag for ofrene for Holocaust", type: "international" },
    { name: "Sjokoladekakedag", description: "En dag for å feire sjokoladekake!", type: "fun" },
  ],
  "01-28": [
    { name: "Personverndag", description: "Europeisk/internasjonal dag for datasikkerhet", type: "international" },
  ],

  // ──────────────── FEBRUAR ────────────────
  "02-01": [
    { name: "Imbolc", description: "Keltisk vårfest og markering av St. Brigid", type: "cultural", regions: ["Irland", "Skottland"] },
    { name: "Nasjonaldag i frihet", description: "Nasjonal frigjøringsdag", type: "national", regions: ["USA"] },
  ],
  "02-02": [
    { name: "Kyndelsmesse", description: "Kristen høytid 40 dager etter jul – Jesu fremstilling i tempelet", type: "religious", regions: ["Kristne land"] },
    { name: "Groundhog Day", description: "Amerikansk tradisjon der en murmeldy spår været", type: "fun", regions: ["USA", "Canada"] },
    { name: "Verdens våtmarksdag", description: "FN-dag for å beskytte våtmarksområder", type: "international" },
  ],
  "02-03": [
    { name: "Setsubun", description: "Japansk vårfestival – kaste bønner for å jage bort onde ånder", type: "cultural", regions: ["Japan"] },
  ],
  "02-04": [
    { name: "Verdens kreftdag", description: "Internasjonal bevisstgjøringsdag om kreft", type: "international" },
    { name: "Sri Lankas uavhengighetsdag", description: "Feiring av uavhengighet fra Storbritannia (1948)", type: "national", regions: ["Sri Lanka"] },
  ],
  "02-05": [
    { name: "Nutella-dagen", description: "Internasjonal dag for å feire Nutella", type: "fun" },
    { name: "Sámi nasjonaldag", description: "Samenes nasjonaldag i Norge, Sverige, Finland og Russland", type: "national", regions: ["Norge", "Sverige", "Finland"] },
  ],
  "02-06": [
    { name: "Waitangi Day", description: "New Zealands nasjonaldag", type: "national", regions: ["New Zealand"] },
  ],
  "02-09": [
    { name: "Pizzadag", description: "Verdens pizzadag (alternativ dato)", type: "fun" },
  ],
  "02-10": [
    { name: "Verdens dag for belgfrukter", description: "FN-dag for å anerkjenne belgfrukters rolle i ernæring", type: "international" },
  ],
  "02-11": [
    { name: "Kenkoku Kinen no Hi", description: "Japans grunnleggelsesdag", type: "national", regions: ["Japan"] },
    { name: "Internasjonal dag for kvinner og jenter i vitenskap", description: "FN-dag for å fremme kvinner i vitenskap", type: "international" },
  ],
  "02-13": [
    { name: "Verdens radiodag", description: "FN-dag for radiomediets rolle", type: "international" },
    { name: "Galentine's Day", description: "Uoffisiell dag for venninnefeiring", type: "fun" },
  ],
  "02-14": [
    { name: "Valentinsdag", description: "Kjærlighetens dag – feiring av romantisk kjærlighet", type: "cultural", regions: ["Globalt"] },
    { name: "Fettisdagen", description: "Svensk tradisjon med semla-boller", type: "cultural", regions: ["Sverige"] },
  ],
  "02-17": [
    { name: "Random Acts of Kindness Day", description: "Dag for tilfeldige vennlige handlinger", type: "fun" },
  ],
  "02-20": [
    { name: "Verdens dag for sosial rettferdighet", description: "FN-dag for sosial rettferdighet", type: "international" },
  ],
  "02-21": [
    { name: "Internasjonal morsmålsdag", description: "FN-dag for å fremme språklig mangfold", type: "international" },
  ],
  "02-22": [
    { name: "World Thinking Day", description: "Internasjonal dag for speiderbevegelsen", type: "international" },
  ],
  "02-23": [
    { name: "Forsvarernes dag", description: "Russisk feiring av militæret", type: "national", regions: ["Russland"] },
  ],
  "02-24": [
    { name: "Estlands uavhengighetsdag", description: "Estlands nasjonaldag", type: "national", regions: ["Estland"] },
  ],
  "02-27": [
    { name: "Pokémon Day", description: "Feiring av Pokémon-franchisens utgivelsesdato (1996)", type: "fun" },
  ],
  "02-29": [
    { name: "Skuddårsdag", description: "Den sjeldne ekstra dagen som bare finnes hvert 4. år!", type: "fun" },
  ],

  // ──────────────── MARS ────────────────
  "03-01": [
    { name: "St. David's Day", description: "Nasjonaldag for Wales", type: "national", regions: ["Wales"] },
    { name: "Marțișor", description: "Rumensk/moldovsk vårfestival med røde og hvite armbånd", type: "cultural", regions: ["Romania", "Moldova"] },
    { name: "Baba Marta", description: "Bulgarsk vårfestival med røde og hvite tråder", type: "cultural", regions: ["Bulgaria"] },
  ],
  "03-03": [
    { name: "Hinamatsuri", description: "Japansk dukkefestival for jenter", type: "cultural", regions: ["Japan"] },
    { name: "Verdens viltdag", description: "FN-dag for bevaring av dyreliv", type: "international" },
  ],
  "03-04": [
    { name: "Verdens ingeniørdag", description: "FN-dag for å feire ingeniørers bidrag", type: "international" },
  ],
  "03-08": [
    { name: "Internasjonal kvinnedag", description: "FN-dag for kvinners rettigheter og likestilling", type: "international", regions: ["Globalt"] },
  ],
  "03-14": [
    { name: "Pi-dagen", description: "Feiring av det matematiske tallet π (3.14)", type: "fun" },
    { name: "Hvit dag", description: "Japansk/koreansk svardag til valentinsdag", type: "cultural", regions: ["Japan", "Sør-Korea"] },
  ],
  "03-15": [
    { name: "Verdens forbrukerrettighetsdag", description: "Internasjonal dag for forbrukerbeskyttelse", type: "international" },
  ],
  "03-17": [
    { name: "St. Patrick's Day", description: "Irsk kulturfestival med grønne klær og parader", type: "cultural", regions: ["Irland", "Globalt"] },
  ],
  "03-20": [
    { name: "Verdens lykkedag", description: "FN-dag for å feire lykke som mål", type: "international" },
    { name: "Vårjevndøgn", description: "Dag og natt er like lange – våren begynner", type: "cultural" },
    { name: "Nowruz", description: "Persisk nyttår – feiring av vårens ankomst", type: "cultural", regions: ["Iran", "Afghanistan", "Sentral-Asia", "Kurdistan"] },
  ],
  "03-21": [
    { name: "Nowruz (alternativ dato)", description: "Persisk nyttår, kan falle 20. eller 21. mars", type: "cultural", regions: ["Iran", "Afghanistan", "Sentral-Asia"] },
    { name: "Verdens poesidag", description: "FN-dag for poesi", type: "international" },
    { name: "Verdens Down syndrom-dag", description: "Dag for å øke bevisstheten om Down syndrom", type: "international" },
    { name: "Human Rights Day (Sør-Afrika)", description: "Sør-Afrikansk nasjonaldag for menneskerettigheter", type: "national", regions: ["Sør-Afrika"] },
  ],
  "03-22": [
    { name: "Verdens vanndag", description: "FN-dag for å fokusere på ferskvannressurser", type: "international" },
  ],
  "03-23": [
    { name: "Verdens meteorologidag", description: "FN-dag for meteorologi og klima", type: "international" },
  ],
  "03-25": [
    { name: "Vaffeldagen", description: "Norsk/skandinavisk tradisjon med vafler", type: "cultural", regions: ["Norge", "Sverige"] },
    { name: "Maria bebudelsesdag", description: "Kristen høytid – engelens budskap til Maria", type: "religious", regions: ["Kristne land"] },
    { name: "Gresk uavhengighetsdag", description: "Grekenlands nasjonaldag", type: "national", regions: ["Hellas"] },
  ],
  "03-26": [
    { name: "Purpurdagen", description: "Internasjonal epilepsibevisstgjøringsdag", type: "international" },
  ],
  "03-27": [
    { name: "Verdens teaterdag", description: "Internasjonal dag for teaterkunst", type: "international" },
  ],

  // ──────────────── APRIL ────────────────
  "04-01": [
    { name: "Aprilsnarr", description: "Tradisjon med spøk og narrestreker", type: "fun", regions: ["Globalt"] },
  ],
  "04-02": [
    { name: "Verdens autismebevisstgjøringsdag", description: "FN-dag for autismebevissthet", type: "international" },
    { name: "Internasjonal barnebokdag", description: "Dag for å fremme barns leseglede", type: "international" },
  ],
  "04-04": [
    { name: "Verdens rottedyr-dag", description: "Dag for å feire rotter som kjæledyr", type: "fun" },
  ],
  "04-05": [
    { name: "Qingming-festivalen", description: "Kinesisk gravrengjøringsdag – hedring av forfedre", type: "cultural", regions: ["Kina"] },
  ],
  "04-06": [
    { name: "Internasjonal sportdag", description: "FN-dag for idrett for utvikling og fred", type: "international" },
  ],
  "04-07": [
    { name: "Verdens helsedag", description: "FN/WHO-dag for global helse", type: "international" },
    { name: "Rwandas minnedag", description: "Minnedag for folkemordet i Rwanda (1994)", type: "international" },
  ],
  "04-10": [
    { name: "Søskendag", description: "Dag for å feire søskenrelasjoner", type: "fun" },
  ],
  "04-12": [
    { name: "Verdens romfartsdag", description: "FN-dag – Juri Gagarin ble første menneske i rommet (1961)", type: "international" },
  ],
  "04-13": [
    { name: "Songkran", description: "Thailandsk nyttår med vannkamper", type: "cultural", regions: ["Thailand"] },
  ],
  "04-14": [
    { name: "Songkran (dag 2)", description: "Thailandsk nyttårsfeiring fortsetter", type: "cultural", regions: ["Thailand"] },
    { name: "Baisakhi", description: "Sikh nyttår og høstfestival", type: "religious", regions: ["India (Punjab)"] },
    { name: "Ambedkar Jayanti", description: "Feiring av B.R. Ambedkars fødsel i India", type: "national", regions: ["India"] },
  ],
  "04-15": [
    { name: "Songkran (dag 3)", description: "Thailandsk nyttårsfeiring avsluttes", type: "cultural", regions: ["Thailand"] },
    { name: "Tax Day", description: "Frist for selvangivelsen i USA", type: "cultural", regions: ["USA"] },
  ],
  "04-16": [
    { name: "World Voice Day", description: "Internasjonal dag for stemmen", type: "international" },
  ],
  "04-17": [
    { name: "World Haemophilia Day", description: "Internasjonal dag for hemofili-bevissthet", type: "international" },
  ],
  "04-18": [
    { name: "Verdens kulturarvsdag", description: "FN-dag for bevaring av kulturminner", type: "international" },
  ],
  "04-22": [
    { name: "Jordens dag", description: "Internasjonal miljøbevisstgjøringsdag", type: "international", regions: ["Globalt"] },
  ],
  "04-23": [
    { name: "Verdens bokdag", description: "FN-dag for bøker og opphavsrett", type: "international" },
    { name: "St. George's Day", description: "Englands skytshelgendag", type: "national", regions: ["England"] },
    { name: "Tyrkias barnedag", description: "Nasjonal suverenitet og barnedag", type: "national", regions: ["Tyrkia"] },
  ],
  "04-25": [
    { name: "ANZAC Day", description: "Australsk/nyzealandsk minnedag for falne soldater", type: "national", regions: ["Australia", "New Zealand"] },
    { name: "World Malaria Day", description: "Internasjonal dag mot malaria", type: "international" },
    { name: "Italias frigjøringsdag", description: "Feiring av frigjøringen fra nazismen (1945)", type: "national", regions: ["Italia"] },
  ],
  "04-26": [
    { name: "Verdens dag for åndsverk", description: "FN-dag for immaterielle rettigheter", type: "international" },
  ],
  "04-27": [
    { name: "Koningsdag", description: "Nederlandsk kongedag med oransje festligheter", type: "national", regions: ["Nederland"] },
    { name: "Freedom Day (Sør-Afrika)", description: "Sør-Afrikas frigjøringsdag", type: "national", regions: ["Sør-Afrika"] },
  ],
  "04-28": [
    { name: "Verdens dag for sikkerhet og helse på arbeidsplassen", description: "FN/ILO-dag for arbeidstakeres sikkerhet", type: "international" },
  ],
  "04-29": [
    { name: "Internasjonal dansedag", description: "Dag for å feire dansekunst", type: "international" },
    { name: "Shōwa no Hi", description: "Japansk nasjonaldag – start på Golden Week", type: "national", regions: ["Japan"] },
  ],
  "04-30": [
    { name: "Valborg", description: "Skandinavisk vårfeiring med bål", type: "cultural", regions: ["Sverige", "Finland", "Norge"] },
    { name: "Barnedag (Mexico)", description: "Meksikansk barnedag", type: "national", regions: ["Mexico"] },
  ],

  // ──────────────── MAI ────────────────
  "05-01": [
    { name: "Arbeidernes dag", description: "Internasjonal arbeiderdag", type: "international", regions: ["Globalt"] },
    { name: "May Day", description: "Tradisjonell vårfeiring med maistang", type: "cultural", regions: ["Europa"] },
    { name: "Lei Day", description: "Hawaiisk feiring med blomsterkranser", type: "cultural", regions: ["Hawaii"] },
    { name: "Beltane", description: "Keltisk vårfest med bål", type: "cultural", regions: ["Irland", "Skottland"] },
  ],
  "05-03": [
    { name: "Verdens pressefrihetdag", description: "FN-dag for ytringsfrihet og pressefrihet", type: "international" },
    { name: "Grunnlovsdagen (Japan)", description: "Japansk grunnlovsdag", type: "national", regions: ["Japan"] },
  ],
  "05-04": [
    { name: "Star Wars Day", description: "May the Fourth be with you! Feiring av Star Wars", type: "fun" },
    { name: "Midori no Hi", description: "Japansk naturdag (Greenery Day)", type: "national", regions: ["Japan"] },
  ],
  "05-05": [
    { name: "Cinco de Mayo", description: "Meksikansk feiring av seieren ved Puebla (1862)", type: "cultural", regions: ["Mexico", "USA"] },
    { name: "Kodomo no Hi", description: "Japansk barnedag med karpeflagg", type: "national", regions: ["Japan"] },
    { name: "Frigjøringsdagen (Nederland)", description: "Nederlandsk frigjøringsdag (1945)", type: "national", regions: ["Nederland"] },
  ],
  "05-08": [
    { name: "Frigjøringsdagen", description: "Markering av slutten på andre verdenskrig i Europa", type: "international", regions: ["Europa"] },
    { name: "Verdens Røde Kors-dag", description: "Feiring av Røde Kors-bevegelsen", type: "international" },
  ],
  "05-09": [
    { name: "Europadagen", description: "Feiring av fred og enhet i Europa", type: "international", regions: ["EU"] },
    { name: "Seiersdagen", description: "Russisk feiring av seieren i andre verdenskrig", type: "national", regions: ["Russland"] },
  ],
  "05-12": [
    { name: "Internasjonal sykepleierdag", description: "Dag for å hedre sykepleiere – Florence Nightingales fødselsdag", type: "international" },
  ],
  "05-15": [
    { name: "Internasjonal familiedag", description: "FN-dag for å feire familiens rolle", type: "international" },
  ],
  "05-16": [
    { name: "Verdens lysdag", description: "FN-dag for å feire lysets rolle i vitenskap", type: "international" },
  ],
  "05-17": [
    { name: "Grunnlovsdagen", description: "Norges nasjonaldag – feiring av grunnloven fra 1814!", type: "national", regions: ["Norge"] },
    { name: "Verdens telekommunikasjonsdag", description: "FN-dag for telekommunikasjon", type: "international" },
  ],
  "05-18": [
    { name: "Internasjonal museumsdag", description: "Dag for å feire museer", type: "international" },
  ],
  "05-20": [
    { name: "Verdens biedag", description: "FN-dag for bier og pollinering", type: "international" },
  ],
  "05-21": [
    { name: "Verdens dag for kulturelt mangfold", description: "FN-dag for dialog og utvikling", type: "international" },
    { name: "Internasjonal tedag", description: "FN-dag for te", type: "international" },
  ],
  "05-22": [
    { name: "Internasjonal dag for biologisk mangfold", description: "FN-dag for biodiversitet", type: "international" },
  ],
  "05-23": [
    { name: "World Turtle Day", description: "Dag for å feire skilpadder", type: "fun" },
  ],
  "05-25": [
    { name: "Towel Day", description: "Feiring av Douglas Adams – ta med et håndkle!", type: "fun" },
    { name: "Africa Day", description: "Afrikansk unionsdag", type: "international", regions: ["Afrika"] },
    { name: "Geek Pride Day", description: "Dag for å feire nerdekulturen", type: "fun" },
  ],
  "05-28": [
    { name: "Verdens spilldag", description: "Dag for å spille brettspill og leker", type: "fun" },
  ],
  "05-29": [
    { name: "Internasjonal FN-fredsbevarer dag", description: "FN-dag for å hedre fredsstyrker", type: "international" },
  ],
  "05-31": [
    { name: "Verdens tobakksfrie dag", description: "WHO-dag mot tobakk", type: "international" },
  ],

  // ──────────────── JUNI ────────────────
  "06-01": [
    { name: "Internasjonal barnedag", description: "Dag for barns rettigheter (feires i mange land)", type: "international" },
    { name: "Verdens melkedag", description: "FN/FAO-dag for melk", type: "international" },
  ],
  "06-02": [
    { name: "Festa della Repubblica", description: "Italias republikk-dag", type: "national", regions: ["Italia"] },
  ],
  "06-03": [
    { name: "Verdens sykkeldag", description: "FN-dag for å fremme sykling", type: "international" },
  ],
  "06-05": [
    { name: "Verdens miljødag", description: "FN-dag for miljøbevissthet", type: "international", regions: ["Globalt"] },
    { name: "Grunnlovsdagen (Danmark)", description: "Danmarks grunnlovsdag", type: "national", regions: ["Danmark"] },
  ],
  "06-06": [
    { name: "Sveriges nasjonaldag", description: "Sveriges nasjonaldag", type: "national", regions: ["Sverige"] },
    { name: "D-dagen", description: "Minne om den allierte invasjonen av Normandie (1944)", type: "international" },
  ],
  "06-07": [
    { name: "Verdens matsikkerhetsdag", description: "FN-dag for trygg mat", type: "international" },
  ],
  "06-08": [
    { name: "Verdens havdag", description: "FN-dag for å beskytte verdens hav", type: "international" },
  ],
  "06-10": [
    { name: "Portugals dag", description: "Portugals nasjonaldag – feiring av Camões", type: "national", regions: ["Portugal"] },
  ],
  "06-12": [
    { name: "Russlands dag", description: "Russlands nasjonaldag", type: "national", regions: ["Russland"] },
    { name: "Filippinenes uavhengighetsdag", description: "Filippinsk nasjonaldag", type: "national", regions: ["Filippinene"] },
  ],
  "06-14": [
    { name: "Verdens blodgiverdag", description: "FN/WHO-dag for å takke blodgivere", type: "international" },
    { name: "Flag Day", description: "Dag for det amerikanske flagget", type: "national", regions: ["USA"] },
  ],
  "06-17": [
    { name: "Islands nasjonaldag", description: "Feiring av Islands selvstendighet", type: "national", regions: ["Island"] },
    { name: "Verdens dag mot ørkenspredning", description: "FN-dag mot ørkenspredning og tørke", type: "international" },
  ],
  "06-19": [
    { name: "Juneteenth", description: "Feiring av slutten på slaveriet i USA (1865)", type: "national", regions: ["USA"] },
  ],
  "06-20": [
    { name: "Verdens flyktningdag", description: "FN-dag for verdens flyktninger", type: "international" },
  ],
  "06-21": [
    { name: "Sommersolverv", description: "Årets lengste dag – sommerens start!", type: "cultural", regions: ["Nordlige halvkule"] },
    { name: "Fête de la Musique", description: "Internasjonal musikkfest med gratis konserter", type: "cultural", regions: ["Frankrike", "Globalt"] },
    { name: "Internasjonal yogadag", description: "FN-dag for yoga", type: "international" },
    { name: "National Indigenous Peoples Day", description: "Kanadisk dag for urfolk", type: "national", regions: ["Canada"] },
  ],
  "06-23": [
    { name: "Sankthansaften", description: "Skandinavisk midtsommerfeiring med bål", type: "cultural", regions: ["Norge", "Danmark"] },
    { name: "Midsommarafton", description: "Svensk midtsommerfeiring med maistang og dans", type: "cultural", regions: ["Sverige"] },
    { name: "Verdens olympiske dag", description: "Dag for å feire den olympiske bevegelsen", type: "international" },
  ],
  "06-24": [
    { name: "Jonsok / Sankthans", description: "Norsk/nordisk midtsommerfeiring", type: "cultural", regions: ["Norge"] },
    { name: "Inti Raymi", description: "Inkaenes solhøytid i Peru", type: "cultural", regions: ["Peru"] },
    { name: "Saint-Jean-Baptiste", description: "Quebecs nasjonaldag", type: "national", regions: ["Canada (Quebec)"] },
  ],
  "06-25": [
    { name: "Sjømannsdag", description: "Internasjonal dag for å hedre sjøfolk", type: "international" },
  ],
  "06-26": [
    { name: "Internasjonal dag mot narkotika", description: "FN-dag mot narkotikamisbruk", type: "international" },
  ],
  "06-30": [
    { name: "Asteroid Day", description: "FN-dag for asteroide-bevissthet", type: "international" },
  ],

  // ──────────────── JULI ────────────────
  "07-01": [
    { name: "Canada Day", description: "Canadas nasjonaldag", type: "national", regions: ["Canada"] },
  ],
  "07-04": [
    { name: "Independence Day", description: "USAs nasjonaldag – uavhengighetserklæringen (1776)", type: "national", regions: ["USA"] },
  ],
  "07-06": [
    { name: "Verdens kyssedagen", description: "Dag for å feire kyss", type: "fun" },
  ],
  "07-07": [
    { name: "Tanabata", description: "Japansk stjernefestival – kjærestenes møte på himmelen", type: "cultural", regions: ["Japan"] },
    { name: "World Chocolate Day", description: "Internasjonal dag for å feire sjokolade", type: "fun" },
  ],
  "07-10": [
    { name: "Piña Colada Day", description: "Dag for å feire den tropiske cocktailen", type: "fun" },
  ],
  "07-11": [
    { name: "Verdens befolkningsdag", description: "FN-dag for befolkningsspørsmål", type: "international" },
  ],
  "07-14": [
    { name: "Bastilledagen", description: "Frankrikes nasjonaldag – stormingen av Bastillen (1789)", type: "national", regions: ["Frankrike"] },
  ],
  "07-17": [
    { name: "World Emoji Day", description: "Internasjonal dag for å feire emojier 📱", type: "fun" },
  ],
  "07-18": [
    { name: "Nelson Mandela-dagen", description: "FN-dag for å hedre Mandela", type: "international" },
  ],
  "07-20": [
    { name: "Internasjonal sjakk-dag", description: "FN-dag for sjakk", type: "international" },
    { name: "Månelands-dagen", description: "Dagen Apollo 11 landet på månen (1969)", type: "fun" },
  ],
  "07-21": [
    { name: "Belgias nasjonaldag", description: "Belgisk nasjonaldag", type: "national", regions: ["Belgia"] },
  ],
  "07-23": [
    { name: "Gumi no Hi", description: "Japans havdag (Marine Day)", type: "national", regions: ["Japan"] },
  ],
  "07-26": [
    { name: "Internasjonal dag for mangroveskoger", description: "FN-dag for å beskytte mangroveskog", type: "international" },
  ],
  "07-28": [
    { name: "Perus uavhengighetsdag", description: "Peruansk nasjonaldag", type: "national", regions: ["Peru"] },
  ],
  "07-29": [
    { name: "Internasjonal tigerdag", description: "Dag for å beskytte tigere", type: "international" },
  ],
  "07-30": [
    { name: "Internasjonal vennskapsdag", description: "FN-dag for vennskap", type: "international" },
  ],

  // ──────────────── AUGUST ────────────────
  "08-01": [
    { name: "Sveits' nasjonaldag", description: "Sveitsisk forbundsdag", type: "national", regions: ["Sveits"] },
    { name: "Yorkshire Day", description: "Feiring av Yorkshire i England", type: "cultural", regions: ["England"] },
  ],
  "08-05": [
    { name: "Verdens øldag", description: "Internasjonal dag for å feire øl", type: "fun" },
  ],
  "08-06": [
    { name: "Hiroshima-minnedagen", description: "Minne om atombomben over Hiroshima (1945)", type: "international" },
  ],
  "08-08": [
    { name: "International Cat Day", description: "Internasjonal kattedag", type: "fun" },
    { name: "Teng Chieh", description: "Kinesisk lyktfestival for de døde", type: "cultural", regions: ["Kina"] },
  ],
  "08-09": [
    { name: "Internasjonal dag for urfolk", description: "FN-dag for verdens urfolk", type: "international" },
    { name: "Singapores nasjonaldag", description: "Singaporsk nasjonaldag", type: "national", regions: ["Singapore"] },
  ],
  "08-10": [
    { name: "Ecuadors uavhengighetsdag", description: "Ecuadoriansk nasjonaldag", type: "national", regions: ["Ecuador"] },
  ],
  "08-11": [
    { name: "Yama no Hi", description: "Japans fjelldag (Mountain Day)", type: "national", regions: ["Japan"] },
  ],
  "08-12": [
    { name: "Internasjonal ungdomsdag", description: "FN-dag for ungdom", type: "international" },
    { name: "World Elephant Day", description: "Dag for å beskytte elefanter", type: "international" },
  ],
  "08-13": [
    { name: "Internasjonal venstrehendt-dag", description: "Dag for å feire venstrehendte", type: "fun" },
    { name: "Obon (start)", description: "Japansk festival for å ære forfedre", type: "cultural", regions: ["Japan"] },
  ],
  "08-15": [
    { name: "Maria himmelfartsdag", description: "Kristen høytid – Jomfru Marias opptagelse til himmelen", type: "religious", regions: ["Katolske land"] },
    { name: "Indias uavhengighetsdag", description: "Indisk nasjonaldag (1947)", type: "national", regions: ["India"] },
    { name: "Koreas frigjøringsdag", description: "Koreansk frigjøringsdag", type: "national", regions: ["Sør-Korea", "Nord-Korea"] },
    { name: "VJ-dagen", description: "Seiersdagen over Japan i andre verdenskrig", type: "international" },
  ],
  "08-17": [
    { name: "Indonesias uavhengighetsdag", description: "Indonesisk nasjonaldag", type: "national", regions: ["Indonesia"] },
  ],
  "08-19": [
    { name: "Verdens humanitære dag", description: "FN-dag for humanitære hjelpearbeidere", type: "international" },
    { name: "Verdens fotodag", description: "Dag for å feire fotografikunst", type: "fun" },
  ],
  "08-23": [
    { name: "Internasjonal dag for slaveriets avskaffelse", description: "FN-dag mot slavehandel", type: "international" },
  ],
  "08-26": [
    { name: "National Dog Day", description: "Internasjonal hundedag", type: "fun" },
    { name: "Women's Equality Day", description: "Dag for kvinners likestilling", type: "international", regions: ["USA"] },
  ],
  "08-29": [
    { name: "Verdens dag mot atomprøvesprengninger", description: "FN-dag mot kjernefysiske tester", type: "international" },
  ],

  // ──────────────── SEPTEMBER ────────────────
  "09-01": [
    { name: "Kunnskapsdag", description: "Russisk skolestart-feiring", type: "cultural", regions: ["Russland"] },
  ],
  "09-02": [
    { name: "VJ-dagen (alternativ)", description: "Alternativ markering av seieren over Japan", type: "international" },
    { name: "Vietnams nasjonaldag", description: "Vietnamesisk nasjonaldag", type: "national", regions: ["Vietnam"] },
  ],
  "09-05": [
    { name: "Internasjonal dag for veldedighet", description: "FN-dag for veldedighet", type: "international" },
  ],
  "09-07": [
    { name: "Brasils uavhengighetsdag", description: "Brasiliansk nasjonaldag", type: "national", regions: ["Brasil"] },
  ],
  "09-08": [
    { name: "Internasjonal lese- og skrivedyktig dag", description: "FN-dag for leseferdigheter", type: "international" },
  ],
  "09-10": [
    { name: "Verdens dag for suicidforebygging", description: "Internasjonal dag for å forebygge selvmord", type: "international" },
  ],
  "09-15": [
    { name: "Internasjonal demokratidag", description: "FN-dag for demokrati", type: "international" },
    { name: "Mellom-Amerikas uavhengighetsdag", description: "Nasjonaldag i Costa Rica, Guatemala, Honduras, El Salvador, Nicaragua", type: "national", regions: ["Mellom-Amerika"] },
    { name: "Dot Day", description: "Kreativ dag inspirert av barneboken The Dot", type: "fun" },
  ],
  "09-16": [
    { name: "Mexicos uavhengighetsdag", description: "Meksikansk nasjonaldag", type: "national", regions: ["Mexico"] },
    { name: "Internasjonal dag for bevaring av ozonlaget", description: "FN-dag for ozonlaget", type: "international" },
  ],
  "09-18": [
    { name: "Chiles nasjonaldag", description: "Chilensk uavhengighetsdag", type: "national", regions: ["Chile"] },
  ],
  "09-19": [
    { name: "Talk Like a Pirate Day", description: "Snakk som en pirat! Arrr!", type: "fun" },
  ],
  "09-21": [
    { name: "Verdens fredsdag", description: "FN-dag for fred", type: "international" },
  ],
  "09-22": [
    { name: "Høstjevndøgn", description: "Dag og natt er like lange – høsten begynner", type: "cultural" },
    { name: "Bilens dag", description: "Verdens bilfrie dag", type: "international" },
  ],
  "09-23": [
    { name: "Shūbun no Hi", description: "Japansk høstjevndøgnsdag", type: "national", regions: ["Japan"] },
    { name: "Internasjonal tegnspråkdag", description: "FN-dag for tegnspråk", type: "international" },
    { name: "Saudi-Arabias nasjonaldag", description: "Saudi-Arabisk nasjonaldag", type: "national", regions: ["Saudi-Arabia"] },
  ],
  "09-27": [
    { name: "Verdens turismedag", description: "FN-dag for turisme", type: "international" },
  ],
  "09-28": [
    { name: "Verdens rabiesdag", description: "Dag for bevissthet om rabies", type: "international" },
  ],
  "09-29": [
    { name: "Verdens hjertedag", description: "Internasjonal dag for hjertehelse", type: "international" },
    { name: "Mikkelsmess", description: "Kristen festdag for erkeengelen Mikael", type: "religious" },
  ],
  "09-30": [
    { name: "Internasjonal oversettelsesdag", description: "FN-dag for oversettere", type: "international" },
    { name: "Internasjonal podcastdag", description: "Dag for å feire podcasting", type: "fun" },
  ],

  // ──────────────── OKTOBER ────────────────
  "10-01": [
    { name: "Internasjonal kaffedag", description: "Dag for å feire kaffe!", type: "fun" },
    { name: "Internasjonal musikkdag", description: "Dag for å feire musikk", type: "international" },
    { name: "Kinas nasjonaldag", description: "Folkerepublikken Kinas nasjonaldag", type: "national", regions: ["Kina"] },
    { name: "Internasjonal eldre-dag", description: "FN-dag for eldre", type: "international" },
  ],
  "10-02": [
    { name: "Gandhi Jayanti", description: "Mahatma Gandhis fødselsdag – Indias ikke-voldsdag", type: "national", regions: ["India"] },
    { name: "Verdens dag for ikke-vold", description: "FN-dag for ikke-vold", type: "international" },
  ],
  "10-03": [
    { name: "Tag der Deutschen Einheit", description: "Tysk gjenforeningsdag", type: "national", regions: ["Tyskland"] },
  ],
  "10-04": [
    { name: "Verdens dyredag", description: "Dag for å feire og beskytte dyr", type: "international" },
    { name: "Verdens romfartsuke (start)", description: "FN-uke for romfart", type: "international" },
  ],
  "10-05": [
    { name: "Verdens lærerdag", description: "FN-dag for å hedre lærere", type: "international" },
  ],
  "10-06": [
    { name: "Deutsch-Amerikanischer Tag", description: "Tysk-Amerikansk dag i USA", type: "cultural", regions: ["USA"] },
  ],
  "10-09": [
    { name: "Hangul Day", description: "Koreansk dag for det koreanske alfabetet", type: "national", regions: ["Sør-Korea"] },
    { name: "Verdens postdag", description: "FN-dag for post og postverket", type: "international" },
  ],
  "10-10": [
    { name: "Verdens psykisk helsedag", description: "FN-dag for psykisk helse", type: "international" },
    { name: "Taiwans nasjonaldag", description: "Taiwansk nasjonaldag", type: "national", regions: ["Taiwan"] },
    { name: "Fiji Day", description: "Fijis uavhengighetsdag", type: "national", regions: ["Fiji"] },
  ],
  "10-11": [
    { name: "Internasjonal jentedag", description: "FN-dag for jenters rettigheter", type: "international" },
  ],
  "10-12": [
    { name: "Día de la Raza", description: "Latinamerikansk kulturdag (Columbus-dagen)", type: "cultural", regions: ["Latin-Amerika"] },
    { name: "Spanias nasjonaldag", description: "Spansk nasjonaldag (Fiesta Nacional)", type: "national", regions: ["Spania"] },
  ],
  "10-14": [
    { name: "World Standards Day", description: "Dag for å feire standardisering", type: "international" },
  ],
  "10-15": [
    { name: "Global Handwashing Day", description: "Dag for håndvask-bevissthet", type: "international" },
  ],
  "10-16": [
    { name: "Verdens matdag", description: "FN/FAO-dag for matsikkerhet", type: "international" },
    { name: "World Bread Day", description: "Dag for å feire brød", type: "fun" },
  ],
  "10-17": [
    { name: "Internasjonal dag for bekjempelse av fattigdom", description: "FN-dag mot fattigdom", type: "international" },
  ],
  "10-20": [
    { name: "Verdens statistikkdag", description: "FN-dag for statistikk", type: "international" },
  ],
  "10-24": [
    { name: "FN-dagen", description: "FNs fødselsdag – FN-pakten trådte i kraft (1945)", type: "international" },
    { name: "Verdens poliodag", description: "Dag for å bekjempe polio", type: "international" },
  ],
  "10-25": [
    { name: "World Pasta Day", description: "Internasjonal pastadag", type: "fun" },
  ],
  "10-26": [
    { name: "Østerrikes nasjonaldag", description: "Østerriksk nasjonaldag", type: "national", regions: ["Østerrike"] },
  ],
  "10-27": [
    { name: "Verdens dag for audiovisuell arv", description: "FN-dag for bevaring av audiovisuelt materiale", type: "international" },
  ],
  "10-29": [
    { name: "Tyrkias republikk-dag", description: "Tyrkisk nasjonaldag", type: "national", regions: ["Tyrkia"] },
    { name: "Verdens internetdag", description: "Dag for å feire internett", type: "fun" },
  ],
  "10-31": [
    { name: "Halloween", description: "Feiret med kostymer, godteri og skumle dekorasjoner", type: "cultural", regions: ["USA", "Europa", "Globalt"] },
    { name: "Reformasjonsdagen", description: "Luthers 95 teser (1517) – feires av protestanter", type: "religious", regions: ["Protestantiske land"] },
    { name: "Samhain", description: "Keltisk nyttår og de dødes fest", type: "cultural", regions: ["Irland", "Skottland"] },
    { name: "Día de los Muertos (start)", description: "Meksikansk de dødes dag begynner", type: "cultural", regions: ["Mexico"] },
  ],

  // ──────────────── NOVEMBER ────────────────
  "11-01": [
    { name: "Allehelgensdag", description: "Kristen dag for å minne alle helgener", type: "religious", regions: ["Kristne land"] },
    { name: "Día de los Muertos", description: "Meksikansk de dødes dag – fargerik feiring av livet", type: "cultural", regions: ["Mexico"] },
  ],
  "11-02": [
    { name: "Allesjelers dag", description: "Kristen dag for å minne alle avdøde", type: "religious", regions: ["Kristne land"] },
    { name: "Día de los Muertos (dag 2)", description: "De dødes dag fortsetter", type: "cultural", regions: ["Mexico"] },
  ],
  "11-03": [
    { name: "Bunka no Hi", description: "Japans kulturdag", type: "national", regions: ["Japan"] },
  ],
  "11-05": [
    { name: "Guy Fawkes Night", description: "Britisk tradisjon med bål og fyrverkeri", type: "cultural", regions: ["Storbritannia"] },
    { name: "Verdens tsunamibevisstgjøringsdag", description: "FN-dag for tsunami-bevissthet", type: "international" },
  ],
  "11-09": [
    { name: "Berlinmurens fall", description: "Minne om Berlinmurens fall (1989)", type: "international" },
  ],
  "11-10": [
    { name: "Verdens vitenskapsdag", description: "FN-dag for vitenskap for fred og utvikling", type: "international" },
  ],
  "11-11": [
    { name: "Veteranenes dag", description: "Dag for å hedre veteraner", type: "national", regions: ["USA", "Canada", "Storbritannia", "Frankrike"] },
    { name: "Polens uavhengighetsdag", description: "Polsk nasjonaldag", type: "national", regions: ["Polen"] },
    { name: "Singles' Day", description: "Kinesisk dag for single – verdens største shoppingdag", type: "fun", regions: ["Kina"] },
    { name: "Pepero Day", description: "Koreansk dag med sjokoladepinner", type: "fun", regions: ["Sør-Korea"] },
  ],
  "11-13": [
    { name: "World Kindness Day", description: "Verdens vennlighetsdag", type: "international" },
  ],
  "11-14": [
    { name: "Verdens diabetesdag", description: "FN-dag for diabetes-bevissthet", type: "international" },
    { name: "Barnedag (India)", description: "Jawaharlal Nehrus fødselsdag – barnedag i India", type: "national", regions: ["India"] },
  ],
  "11-15": [
    { name: "Shichi-Go-San", description: "Japansk feiring for barn på 3, 5 og 7 år", type: "cultural", regions: ["Japan"] },
  ],
  "11-16": [
    { name: "Internasjonal toleransedag", description: "FN-dag for toleranse", type: "international" },
  ],
  "11-17": [
    { name: "International Students' Day", description: "Internasjonal studentdag", type: "international" },
  ],
  "11-19": [
    { name: "Internasjonal mannsdag", description: "Dag for menns helse og bidrag", type: "international" },
    { name: "World Toilet Day", description: "FN-dag for sanitær", type: "international" },
  ],
  "11-20": [
    { name: "Verdens barnedag", description: "FN-dag for barnerettigheter", type: "international" },
    { name: "Mexicos revolusjonsdag", description: "Meksikansk nasjonaldag", type: "national", regions: ["Mexico"] },
  ],
  "11-21": [
    { name: "Verdens TV-dag", description: "FN-dag for TV-mediet", type: "international" },
    { name: "World Hello Day", description: "Si hei til 10 personer i dag!", type: "fun" },
  ],
  "11-23": [
    { name: "Kinrō Kansha no Hi", description: "Japans dag for takknemlighet for arbeid", type: "national", regions: ["Japan"] },
  ],
  "11-25": [
    { name: "Internasjonal dag mot vold mot kvinner", description: "FN-dag for å bekjempe vold mot kvinner", type: "international" },
  ],
  "11-30": [
    { name: "St. Andrew's Day", description: "Skottlands nasjonaldag", type: "national", regions: ["Skottland"] },
    { name: "Barbados' uavhengighetsdag", description: "Barbadisk nasjonaldag", type: "national", regions: ["Barbados"] },
  ],

  // ──────────────── DESEMBER ────────────────
  "12-01": [
    { name: "Verdens aidsdag", description: "Internasjonal dag for HIV/AIDS-bevissthet", type: "international" },
    { name: "Romanias nasjonaldag", description: "Rumensk nasjonaldag", type: "national", regions: ["Romania"] },
  ],
  "12-02": [
    { name: "Internasjonal dag for avskaffelse av slaveri", description: "FN-dag mot moderne slaveri", type: "international" },
    { name: "De forente arabiske emiraters nasjonaldag", description: "UAEs nasjonaldag", type: "national", regions: ["UAE"] },
  ],
  "12-03": [
    { name: "Internasjonal dag for funksjonshemmede", description: "FN-dag for funksjonshemmedes rettigheter", type: "international" },
  ],
  "12-05": [
    { name: "Verdens jorddag", description: "FN-dag for bærekraftig jordbruk", type: "international" },
    { name: "Sinterklaas", description: "Nederlandsk julegave-tradisjon", type: "cultural", regions: ["Nederland", "Belgia"] },
    { name: "Thailands fardag / nasjonaldag", description: "Thailands nasjonaldag og kongens fødselsdag", type: "national", regions: ["Thailand"] },
  ],
  "12-06": [
    { name: "Finlands uavhengighetsdag", description: "Finsk nasjonaldag (1917)", type: "national", regions: ["Finland"] },
    { name: "Mikkelsdagen (Nikolaus)", description: "St. Nikolaus-dag – barn får godteri i skoene", type: "cultural", regions: ["Tyskland", "Østerrike", "Sveits"] },
  ],
  "12-07": [
    { name: "Internasjonal dag for sivil luftfart", description: "FN-dag for sivil luftfart", type: "international" },
  ],
  "12-08": [
    { name: "Bodhi Day", description: "Buddhistisk høytid – Buddhas opplysning", type: "religious", regions: ["Buddhistiske land"] },
    { name: "Inmaculada Concepción", description: "Katolsk høytid for Marias uplettede unnfangelse", type: "religious", regions: ["Katolske land"] },
  ],
  "12-10": [
    { name: "Nobeldagen", description: "Utdeling av Nobelprisen i Stockholm og Oslo", type: "international", regions: ["Norge", "Sverige"] },
    { name: "Menneskerettighetsdagen", description: "FN-dag for menneskerettigheter", type: "international" },
  ],
  "12-11": [
    { name: "Internasjonal fjelldag", description: "FN-dag for fjell og fjellmiljø", type: "international" },
    { name: "Tango Day", description: "Dag for å feire tango-dans", type: "fun" },
  ],
  "12-12": [
    { name: "Día de la Virgen de Guadalupe", description: "Meksikansk katolsk fest for Jomfru Maria av Guadalupe", type: "religious", regions: ["Mexico", "Latin-Amerika"] },
    { name: "Kenyas uavhengighetsdag", description: "Kenyansk nasjonaldag", type: "national", regions: ["Kenya"] },
  ],
  "12-13": [
    { name: "Luciadagen", description: "Skandinavisk lysfest med Lucia-tog", type: "cultural", regions: ["Sverige", "Norge", "Finland"] },
  ],
  "12-16": [
    { name: "Bahrain nasjonaldag", description: "Bahrainsk nasjonaldag", type: "national", regions: ["Bahrain"] },
    { name: "Las Posadas (start)", description: "Meksikansk ni-dagers feiring før jul", type: "cultural", regions: ["Mexico"] },
    { name: "Day of Reconciliation", description: "Sør-Afrikansk forsoningsdag", type: "national", regions: ["Sør-Afrika"] },
  ],
  "12-18": [
    { name: "Internasjonal dag for migranter", description: "FN-dag for migranter", type: "international" },
  ],
  "12-20": [
    { name: "Internasjonal solidaritetsdag", description: "FN-dag for solidaritet", type: "international" },
  ],
  "12-21": [
    { name: "Vintersolverv", description: "Årets korteste dag – midtvinteren", type: "cultural" },
    { name: "Yule / Jólablót", description: "Norrøn/neopaganistisk midtvinterfeiring", type: "cultural", regions: ["Skandinavia"] },
  ],
  "12-23": [
    { name: "Lillejulaften", description: "Norsk tradisjon – siste forberedelser til jul", type: "cultural", regions: ["Norge"] },
    { name: "Festivus", description: "Humoristisk anti-jul fra Seinfeld: 'A Festivus for the rest of us!'", type: "fun" },
  ],
  "12-24": [
    { name: "Julaften", description: "Hovedfeiringen av jul i Skandinavia med julemat og gaver", type: "cultural", regions: ["Norge", "Sverige", "Danmark", "Finland", "Tyskland"] },
    { name: "Nochebuena", description: "Spansk/latinamerikansk julaften", type: "cultural", regions: ["Spania", "Latin-Amerika"] },
  ],
  "12-25": [
    { name: "Juledag", description: "Kristen feiring av Jesu fødsel", type: "religious", regions: ["Globalt"] },
  ],
  "12-26": [
    { name: "Andre juledag", description: "Fortsettelse av julefeiringen", type: "cultural", regions: ["Norge", "Europa"] },
    { name: "Boxing Day", description: "Britisk tradisjon med gaver og shopping", type: "cultural", regions: ["Storbritannia", "Canada", "Australia"] },
    { name: "Kwanzaa (start)", description: "Afroamerikansk feiring av afrikansk kultur og arv (26. des – 1. jan)", type: "cultural", regions: ["USA"] },
    { name: "St. Stephen's Day", description: "Kristen dag for St. Stefan", type: "religious", regions: ["Irland", "Italia"] },
  ],
  "12-27": [
    { name: "Kwanzaa (dag 2)", description: "Prinsipp: Kujichagulia (selvbestemmelse)", type: "cultural", regions: ["USA"] },
  ],
  "12-31": [
    { name: "Nyttårsaften", description: "Siste dag i året – feiring med fyrverkeri og nedtelling", type: "cultural", regions: ["Globalt"] },
    { name: "Ōmisoka", description: "Japansk nyttårsaften med tempelklokker og soba", type: "cultural", regions: ["Japan"] },
    { name: "Hogmanay", description: "Skotsk nyttårsfeiring", type: "cultural", regions: ["Skottland"] },
  ],
};
