// Original brand assets and source notes: docs/client-logos.md.
export const clients = [
    { id: 'poytaxt', name: 'Poytaxt Parking', logo: '/partners/poytaxt-parking.svg', url: 'https://poytaxtparking.uz/', width: 172, height: 54 },
    { id: 'qwatt', name: 'Qwatt', logo: '/partners/qwatt_logo.webp', url: 'https://www.linkedin.com/company/qwatt/', width: 134, height: 38, darkBackground: true },
    { id: 'iman', name: 'IMAN', logo: '/partners/iman-color.svg', url: 'https://iman.uz/', width: 140, height: 36 },
    { id: 'unicon', name: 'Unicon', logo: '/partners/unicon-color.svg', url: 'https://unicon.uz/', width: 174, height: 32 },
    // Awaiting permission to display the logo; keep the asset and details for later.
    { id: 'inson', name: 'INSON Insurance', logo: '/partners/inson.svg', url: 'https://insuranceon.uz/', width: 144, height: 42, hidden: true },
    { id: 'alphacon', name: 'Alphacon', logo: '/partners/alphacon.svg', url: 'https://alphacon.uz/', width: 142, height: 40, darkBackground: true },
    { id: 'oson', name: 'OSON', logo: '/partners/oson.png', url: 'https://oson.com/uz-ru', width: 114, height: 40 },
    { id: 'fom', name: 'FOM Group', logo: '/partners/fom-group.svg', url: 'https://www.fom.group/ru', width: 120, height: 52 },
].filter(({ hidden }) => !hidden);

export const poytaxtClient = clients.find(({ id }) => id === 'poytaxt');
export const qwattClient = clients.find(({ id }) => id === 'qwatt');
