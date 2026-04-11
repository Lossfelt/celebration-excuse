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
- [ ] Undersøk alternative kalendere med annen årslengde enn 365 dager, og vurder personlige jubileer basert på dem.

## Personlige Jubileer

- [ ] Del milepælmotoren tydelig i `exact-now` og `sometime-today`, med deduplisering, prioritering og maks antall personlige kort.
- [ ] Lag felles hjelpefunksjoner for intervallbaserte milepæler, `number`/`bigint`, runde tall, palindromer, repdigits, Fibonacci og prosent/progresjon.
- [ ] Legg til `sometime-today`-logikk for runde sekunder, minutter og timer, ikke bare treff akkurat nå.
- [ ] Utvid SI-baserte tidsmilepæler med tydelige terskler og god presentasjon, for eksempel giga-/tera-/petasekunder samt milli-/mikro-/nano-/femtosekunder.
- [ ] Legg til flere tallmønstre for tid, spesielt palindromer, repdigits og Fibonacci for sekunder, minutter og utvalgte undersekund-enheter.
- [ ] Legg til brøk- og progresjonsmilepæler, som 25/50/75 % mot neste bursdag og halvveis til neste runde dag-, uke-, måned- eller årstall.
- [ ] Legg til måned- og årsmilepæler med `sometime-today`-logikk, for eksempel `400 måneder gammel i dag`.
- [ ] Legg til standard- og systemrelaterte milepæler som er lette å forklare, for eksempel eksplisitt `gigasekund-dag` og eventuelt andre enkle tidsstandarder.
- [ ] Utvid de astronomiske milepælene med ting som Mars-sols, månesykluser og andre ikke-jordiske tidsenheter som faktisk er morsomme og forståelige.
- [ ] Legg til flere personlige "nerde-jubileer" knyttet til fødselsdatoen, som at alder eller antall dager inneholder eller speiler deler av fødselsdatoen.
- [ ] Legg til tester og dokumentasjon for personlige jubileer, inkludert representative bursdager som skal treffe bestemte regler.

## Prosjekt

- [x] Legg til en kort `README.md` som forklarer datamodellen, kurateringsreglene og hvordan høytider verifiseres.
- [ ] Vurder å vise kildeetikett eller antall kilder i browse-listen, ikke bare på kortlenken.
- [ ] Vurder om forskningsdataene i `researchedFun.ts` bør splittes opp i mindre filer hvis listen fortsetter å vokse.
