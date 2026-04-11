# TODO

## Datakvalitet

- [ ] Legg til `sources` for de allerede godkjente faste `fun`-dagene som fortsatt bare har navn/beskrivelse.
- [ ] Legg til `sources` for resten av høytidene (`religious`, `national`, `cultural`, `international`) slik at hele datasettet blir sporbar.
- [ ] Gå gjennom de 7 fortsatt ekskluderte `fun`-dagene på nytt senere hvis det dukker opp bedre kilder: `Verdens pizzadag`, `Internasjonal operaprimadonnadag`, `Frokostflesk-dagen`, `Ørepropp-dagen`, `Verdens dag for linser`, `Verdens tedag (alternativ)`, `Juleøldag`.
- [ ] Vurder å lagre flere kilder per høytid når observansen er uoffisiell eller datoen ofte forveksles.

## Validering

- [x] Utvid `scripts/check-holiday-data.mjs` til å validere strukturen rundt kilder og kuratering.
- [x] Legg til egen nettverkssjekk for at `sources.url` bruker `https` og svarer med gyldig HTTP-status.
- [ ] Legg inn en sjekk som varsler når en fast dato burde vært modellert som bevegelig dato i stedet.
- [ ] Legg inn enkel coverage-test for at alle viste `fun`-dager enten er eksplisitt godkjent eller finnes i `researchedFun.ts`.

## Kalenderdekning

- [ ] Erstatt eller utvid de forhåndsberegnede lunare/religiøse tabellene slik at appen ikke stopper ved `2024-2030`.
- [ ] Dokumenter tydelig hvilke datoer som er omtrentlige, særlig islamske observanser som kan variere med måneobservasjon.
- [x] Legg til en første runde alternative kalendere/sykluser med annen lengde enn 365 dager, blant annet Hijri-år, romerske republikkår, Maya `tun` og Tzolk'in.
- [ ] Vurder om flere alternative kalendere bør inn, og hvor presise/forklarlige de må være før de fortjener egne jubilekort.
- [ ] Vurder noen få flere alternative kalendere eller tidsregimer som fortsatt er enkle å forklare i UI-et.

## Personlige Jubileer

- [x] Del milepælmotoren tydelig i en konsekvent `sometime-today`-modell, med deduplisering og prioritering.
- [x] Lag felles hjelpefunksjoner for intervallbaserte milepæler, `number`/`bigint`, runde tall, palindromer, repdigits, Fibonacci og progresjon.
- [x] Legg til `sometime-today`-logikk for runde sekunder, minutter og timer, ikke bare treff akkurat nå.
- [ ] Utvid SI-baserte tidsmilepæler med tydelige terskler og god presentasjon, for eksempel giga-/tera-/petasekunder samt milli-/mikro-/nano-/femtosekunder.
- [x] Legg til palindromer, repdigits og Fibonacci for sekunder og minutter.
- [ ] Vurder om slike mønstre også bør brukes på utvalgte undersekund-enheter, eller om det bare blir støy.
- [ ] Legg til brøk- og progresjonsmilepæler, som 25/50/75 % mot neste bursdag og halvveis til neste runde dag-, uke-, måned- eller årstall.
- [ ] Legg til flere halvveis-/progresjonsmilepæler utover 25/50/75 %, særlig mot neste runde dag-, måned- og sekundtall.
- [ ] Legg til måned- og årsmilepæler med `sometime-today`-logikk, for eksempel `400 måneder gammel i dag`.
- [ ] Legg til standard- og systemrelaterte milepæler som er lette å forklare, for eksempel eksplisitt `gigasekund-dag` og eventuelt andre enkle tidsstandarder.
- [ ] Utvid de astronomiske milepælene med ting som Mars-sols, månesykluser og andre ikke-jordiske tidsenheter som faktisk er morsomme og forståelige.
- [ ] Legg til flere personlige "nerde-jubileer" knyttet til fødselsdatoen, som at alder eller antall dager inneholder eller speiler deler av fødselsdatoen.
- [x] Legg til en enkel regresjonssjekk for personlige jubileer med representative bursdager som skal treffe bestemte regler.
- [ ] Utvid dokumentasjonen og testdekningen for personlige jubileer videre etter hvert som flere regler kommer til.
- [ ] Stram inn prioritering/filtrering hvis det viser seg at noen brukere får for mange samtidige jubilekort.

## Prosjekt

- [x] Legg til en kort `README.md` som forklarer datamodellen, kurateringsreglene og hvordan høytider verifiseres.
- [ ] Vurder å vise kildeetikett eller antall kilder i browse-listen, ikke bare på kortlenken.
- [ ] Vurder om forskningsdataene i `researchedFun.ts` bør splittes opp i mindre filer hvis listen fortsetter å vokse.
