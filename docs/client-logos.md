# Client logos

The client list lives in `src/content/clients.js` and is shared by the landing page, the legacy clients section, and the generated static homepage content. The displayed list contains Poytaxt Parking, Qwatt, IMAN, Unicon, Alphacon, OSON, and FOM Group. INSON Insurance is hidden pending permission, with its entry and asset retained. Thompson School has been removed from the displayed and generated lists.

## Sources

Retrieved on 2026-09-20. Assets are stored locally in `public/partners` so page rendering does not depend on external image hosts.

| Client | Official source | Local asset |
| --- | --- | --- |
| Poytaxt Parking | [Website](https://poytaxtparking.uz/), [header SVG](https://static.tildacdn.net/tild3237-3362-4930-b131-393433323065/logo_Poytext__.svg) | `poytaxt-parking.svg` |
| Qwatt | Inline header SVG from [official website](https://qwatt.uz/), retrieved 2026-09-23; existing supplied white logo retained for dark surfaces | `qwatt-on-light.svg`, `qwatt_logo.webp` |
| IMAN | Inline header SVG from [website](https://iman.uz/) | `iman-color.svg` |
| Unicon | [Website](https://unicon.uz/), [header SVG](https://unicon.uz/static/media/logo.3354b9c4391bb47654d6f701ec47aa74.svg) | `unicon-color.svg` |
| INSON Insurance | [Website](https://insuranceon.uz/), [Russian header SVG](https://insuranceon.uz/images/logo_ru.svg) | `inson.svg` |
| Alphacon | Inline header SVG from [website](https://alphacon.uz/en); light-surface variant uses the same paths with a dark fill | `alphacon-on-light.svg`, `alphacon.svg` |
| OSON | [Website](https://oson.com/uz-ru), [header PNG](https://oson.com/build/assets/logo-COlGQwRV.png) | `oson.png` |
| FOM Group | [Website](https://www.fom.group/ru), [header SVG](https://static.tildacdn.one/tild3533-3430-4938-b035-333530626135/fom.svg) | `fom-group.svg` |

IMAN's extracted SVG dimensions were normalized to its existing viewBox to remove letterboxing. Alphacon's framework-specific attributes were removed; its light-surface variant changes only the white fill to `#313131`. Qwatt's official SVG retains its yellow symbol and dark lettering; class-based fills were converted to presentation attributes. Brand shapes are preserved. The downloaded SVGs were checked for XML validity and executable or external embedded content.

## Display behavior

`ClientLogo` displays muted grayscale logos at rest. Hover and keyboard focus remove the filter and restore full opacity. Qwatt and Alphacon use dark lettering on light surfaces, so removing or failing to render a CSS filter cannot make their wordmarks disappear. The component's `dark` prop selects the retained white artwork via `darkLogo`; the Qwatt case study uses this variant. Touch devices show the colors immediately. Reduced-motion preferences disable the transitions.

Both copies of the scrolling client marquee use the light-surface assets. With reduced motion, the marquee becomes a four-column grid on desktop and two columns on smaller screens. Logo proportions are preserved. Case-study logos remain in full color on their respective light and dark backgrounds.
