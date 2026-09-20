# Client logos

The client list lives in `src/content/clients.js` and is shared by the landing page, the legacy clients section, and the generated static homepage content. The list contains Poytaxt Parking, Qwatt, IMAN, Unicon, INSON Insurance, Alphacon, OSON, and FOM Group. Thompson School has been removed from the displayed and generated lists.

## Sources

Retrieved on 2026-09-20. Assets are stored locally in `public/partners` so page rendering does not depend on external image hosts.

| Client | Official source | Local asset |
| --- | --- | --- |
| Poytaxt Parking | [Website](https://poytaxtparking.uz/), [header SVG](https://static.tildacdn.net/tild3237-3362-4930-b131-393433323065/logo_Poytext__.svg) | `poytaxt-parking.svg` |
| Qwatt | Existing supplied logo retained; company identity checked against [official company profile](https://www.linkedin.com/company/qwatt/) | `qwatt_logo.webp` |
| IMAN | Inline header SVG from [website](https://iman.uz/) | `iman-color.svg` |
| Unicon | [Website](https://unicon.uz/), [header SVG](https://unicon.uz/static/media/logo.3354b9c4391bb47654d6f701ec47aa74.svg) | `unicon-color.svg` |
| INSON Insurance | [Website](https://insuranceon.uz/), [Russian header SVG](https://insuranceon.uz/images/logo_ru.svg) | `inson.svg` |
| Alphacon | Inline header SVG from [website](https://alphacon.uz/en) | `alphacon.svg` |
| OSON | [Website](https://oson.com/uz-ru), [header PNG](https://oson.com/build/assets/logo-COlGQwRV.png) | `oson.png` |
| FOM Group | [Website](https://www.fom.group/ru), [header SVG](https://static.tildacdn.one/tild3533-3430-4938-b035-333530626135/fom.svg) | `fom-group.svg` |

IMAN's extracted SVG dimensions were normalized to its existing viewBox to remove letterboxing. Alphacon's framework-specific attributes were removed. Brand shapes and colors are preserved. The downloaded SVGs were checked for XML validity and executable or external embedded content.

## Display behavior

`ClientLogo` displays muted grayscale logos at rest. Hover and keyboard focus remove the filter and restore full opacity. Qwatt and Alphacon have white lettering in their originals: their neutral silhouette is replaced by the original artwork on a dark surface when active. Touch devices show the original colors immediately. Reduced-motion preferences disable the transitions.

The client list uses four columns on desktop and two on smaller screens. Logo proportions are preserved. The same color behavior applies to the Poytaxt demo identity and Poytaxt/Qwatt case-study logos.
