# TODO

## Datakvalitet

- [ ] Legg til `sources` for de allerede godkjente faste `fun`-dagene som fortsatt bare har navn/beskrivelse.
- [ ] Legg til `sources` for resten av høytidene (`religious`, `national`, `cultural`, `international`) slik at hele datasettet blir sporbar.
- [ ] Gå gjennom de 7 fortsatt ekskluderte `fun`-dagene på nytt senere hvis det dukker opp bedre kilder:
  - `Verdens pizzadag`
  - `Internasjonal operaprimadonnadag`
  - `Frokostflesk-dagen`
  - `Ørepropp-dagen`
  - `Verdens dag for linser`
  - `Verdens tedag (alternativ)`
  - `Juleøldag`
- [ ] Vurder å lagre flere kilder per høytid når observansen er uoffisiell eller datoen ofte forveksles.

## Validering

- [ ] Utvid `scripts/check-holiday-data.mjs` til å validere at alle `sources.url` bruker `https` og svarer med gyldig HTTP-status.
- [ ] Legg inn en sjekk som varsler når en fast dato burde vært modellert som bevegelig dato i stedet.
- [ ] Legg inn enkel coverage-test for at alle viste `fun`-dager enten er eksplisitt godkjent eller finnes i `researchedFun.ts`.

## Kalenderdekning

- [ ] Erstatt eller utvid de forhåndsberegnede lunare/religiøse tabellene slik at appen ikke stopper ved `2024-2030`.
- [ ] Dokumenter tydelig hvilke datoer som er omtrentlige, særlig islamske observanser som kan variere med måneobservasjon.

## Prosjekt

- [ ] Legg til en kort `README.md` som forklarer datamodellen, kurateringsreglene og hvordan høytider verifiseres.
- [ ] Vurder å vise kildeetikett eller antall kilder i browse-listen, ikke bare på kortlenken.
- [ ] Vurder om forskningsdataene i `researchedFun.ts` bør splittes opp i mindre filer hvis listen fortsetter å vokse.
