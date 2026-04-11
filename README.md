# Celebration Excuse

Liten Vite-app som finner grunner til å feire i dag, både fra personlige milepæler og en kuratert høytidsdatabase.

## Utvikling

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run check:holidays`
- `npm run check:sources`

## Datamodell

- Faste datoer ligger i [src/holidays/fixed.ts](src/holidays/fixed.ts).
- Bevegelige datoer og forhåndsberegnede religiøse/lunare datoer ligger i [src/holidays/movable.ts](src/holidays/movable.ts).
- Høytider returneres via [src/holidays/index.ts](src/holidays/index.ts).
- Personlige milepæler ligger i [src/milestones.ts](src/milestones.ts).

## Kuratering av `fun`-dager

Prosjektet skiller mellom tre typer morsomme merkedager:

1. Direkte godkjente dager i [src/holidays/curation.ts](src/holidays/curation.ts).
2. Tidligere usikre dager som er undersøkt og dokumentert i [src/holidays/researchedFun.ts](src/holidays/researchedFun.ts).
3. Dager som fortsatt holdes skjult fordi dato eller eksistens ikke er godt nok underbygget.

Hvis en `fun`-dag vises i UI-et, skal den enten være eksplisitt godkjent eller ha en forskningsoppføring med kilder.

## Kilder

- `Holiday.sources` brukes når vi har en konkret kilde til observansen.
- Første kilde brukes som lenke i UI-et.
- For uoffisielle eller lett forvekslede dager bør flere kilder vurderes.
- Kilder skal bruke `https`.

## Begrensninger

- Forhåndsberegnede islamske, hebraiske, kinesiske og enkelte hinduistiske/buddhistiske datoer dekker foreløpig bare `2024–2030`.
- Islamske datoer kan variere med lokal måneobservasjon.
- Personlige milepæler baseres på fødselsdato uten klokkeslett, så veldig små tidsenheter er bare så presise som datoinputen tillater.
