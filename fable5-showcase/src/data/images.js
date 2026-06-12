// All photos are free Unsplash images, hotlinked via images.unsplash.com.
// Every URL below was verified to load (June 2026).

const u = (id, w = 1600, q = 75) => `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`

// Cinematic hero images sourced from Pinterest (i.pinimg.com, verified June 2026)
const p = (path) => `https://i.pinimg.com/1200x/${path}.jpg`

export const pin = {
  airline: {
    hero: p('80/dd/a1/80dda1b9d4e41dc18258ca258cd117f4'),    // jet over sunset clouds
    window: p('2d/ad/ac/2dadac6d13dc2b5fe9db134b6119e059'),  // clean window, day clouds
    wing: p('4a/c5/fa/4ac5fa4a1e341dc8e27e8bca732b77df'),    // wing at sunset
  },
  fashion: {
    hero: p('d4/94/36/d49436d20137d4ecf764f4c32fe6f789'),    // woman in black, wide hat
    arch: p('7e/6e/0f/7e6e0f76844be5f779711eea7bc3fdcb'),    // white cloaked figure in arch
    gold: p('9f/6e/00/9f6e00e990748c2dbe8ad898fb0b972d'),    // black couture gown, gold cuff
  },
  automobile: {
    hero: p('d7/cd/86/d7cd8600fe291b933993a0ff2ea8417f'),    // black supercar headlights
    porsche: p('d3/90/3b/d3903b601d9d974c5a00afe2c87c9f16'), // GT3 RS rainy night
    city: p('84/86/08/8486088148785538a1a21df740e9596c'),    // supercar city night
  },
  tourism: {
    hero: p('18/9c/f4/189cf4e8a1d6d8a1c8a88932daef7a49'),    // aerial tropical island
    lagoon: p('de/0c/4f/de0c4f9996b51115b8c93420992724c0'),  // island lagoon
    isle1: p('1d/dd/d7/1dddd7e022fba13714e1a9ca2829287a'),   // floating island cutout 1
    isle2: p('26/ae/a5/26aea5628d11fd2e45ec798c6d2cdf47'),   // floating island cutout 2
  },
  realestate: {
    hero: p('d8/7f/d6/d87fd6cec1752816806b80a82f49ac1d'),    // villa pool at night
    dusk: p('ad/68/28/ad68282764f17264e1c564fa585c3702'),    // villa at dusk
    glass: p('d7/a7/25/d7a725f6faca4916af80ddaec737b5b3'),   // glass house pool
  },
  restaurant: {
    hero: p('6f/38/8c/6f388cde39e472cb6080e91ecd11c6d9'),    // dark plate, gold cutlery
    steak: p('db/d3/72/dbd372c07084e64e1df0ed462cba28a3'),   // steak on black plate
  },
  fitness: {
    hero: p('71/db/70/71db70b3b8da3102b59f565a56d7f20d'),    // barbell in foggy dark gym
    fire: p('1a/65/7a/1a657a1d0a4e3352f3528907a4d9b8ce'),    // dumbbell with sparks
    mono: p('70/29/57/702957a55699cc1b763d07a26fd1c7c5'),    // b&w barbell
  },
  tech: {
    hero: p('26/63/91/2663914460623f90453193e234cf04dd'),    // dark hall, blue light
    lines: p('32/89/b5/3289b517cb8dbe5a99d2261b90f65a7e'),   // abstract blue lines
    neon: p('61/0a/6c/610a6c41a83696d5ab6e635d9f4c3ec1'),    // purple neon pipes
  },
  music: {
    hero: p('f6/63/a4/f663a4a0de0f2e0f5e680ca70b956fd8'),    // crowd, orange lasers
    artist: p('9d/f7/f9/9df7f9d7465f6905a38941b8ab352cef'),  // artist above crowd
    neon: p('0e/35/e4/0e35e49ace2218b31f909f9cfd32110d'),    // neon tubes in clouds
  },
  jewelry: {
    hero: p('96/b0/af/96b0af6551ceaed3885333844c92f5e0'),    // solitaire ring, dark
    diamond: p('5c/d6/c8/5cd6c88387c514596a7b7fe94ae6aa6c'), // round diamond
    band: p('03/d2/65/03d265fbeb4e10dc249d0a4c225970e9'),    // diamond band
  },
}

export const images = {
  airline: {
    hero: u('1436491865332-7a61a109cc05', 2000),          // wing over golden clouds
    window: u('1507812984078-917a274065be'),               // cabin window at dusk
    landing: u('1556388158-158ea5ccacbd'),                 // plane landing
    airport: u('1488085061387-422e29b40080'),              // airport window at night
    cabin: u('1540339832862-474599807836'),                // traveler in cabin
    flight: u('1529074963764-98f45c47344b'),               // jet in flight
    runway: u('1569154941061-e231b4725ef1'),               // plane on runway
  },
  fashion: {
    hero: u('1441986300917-64674bd600d8', 2000),           // boutique store interior
    store: u('1567401893414-76b7b1e5a7a5'),                // clothing store
    racks: u('1441984904996-e0b6ba687e04'),                // boutique racks
    shopping: u('1483985988355-763728e1935b'),             // woman with shopping bags
    model1: u('1469334031218-e382a71b716b'),               // editorial model
    model2: u('1496747611176-843222e1e57c'),               // dress by the sea
    model3: u('1509631179647-0177331693ae'),               // fashion editorial
    atelier: u('1445205170230-053b83016050'),              // fashion atelier
  },
  automobile: {
    hero: u('1503376780353-7e6692767b70', 2000),           // sports car at dusk
    yellow: u('1511919884226-fd3cad34687c'),               // yellow supercar
    mclaren: u('1542362567-b07e54358753'),                 // white supercar
    mustang: u('1494976388531-d1058494cdd8'),              // muscle car front
    corvette: u('1552519507-da3b142c6e3d'),                // blue corvette
    bmw: u('1555215695-3004980ad54e'),                     // bmw on road
    road: u('1568605117036-5fe5e7bab0b7'),                 // car on open highway
    night: u('1493238792000-8113da705763'),                // car at night, city lights
  },
  tourism: {
    hero: u('1507525428034-b723cf961d3e', 2000),           // beach at sunset
    boat: u('1476514525535-07fb3b4ae5f1'),                 // boat on alpine lake
    balloons: u('1530789253388-582c481c54b0'),             // hot air balloons
    paris: u('1502602898657-3e91760cbb34'),                // eiffel tower
    venice: u('1523906834658-6e24ef2386f9'),               // venice canal
    bali: u('1537996194471-e657df975ab4'),                 // bali temple
    maldives: u('1512100356356-de1b84283e18'),             // maldives seaplane
    cinqueterre: u('1516483638261-f4dbaf036963'),          // cinque terre
  },
  realestate: {
    hero: u('1512917774080-9991f1c4c750', 2000),           // luxury modern home
    pool: u('1564013799919-ab600027ffc6'),                 // villa with pool
    modern: u('1600596542815-ffad4c1539a9'),               // modern house
    dusk: u('1600585154340-be6161a56a0c'),                 // home at dusk
    villa: u('1613490493576-7fde63acd811'),                // white villa pool
    apartments: u('1545324418-cc1a3fa10c00'),              // apartment building
    skyline: u('1486406146926-c627a92ad1ab'),              // glass towers
    street: u('1449824913935-59a10b8d2000'),               // city street
  },
  restaurant: {
    hero: u('1517248135467-4c7edcad34c4', 2000),           // restaurant interior
    plated: u('1414235077428-338989a2e8c0'),               // plated fine dining
    spread: u('1504674900247-0877df9cc836'),               // food spread
    salmon: u('1467003909585-2f8a72700288'),               // plated salmon
    bowl: u('1546069901-ba9599a7e63c'),                    // healthy bowl
    dining: u('1555396273-367ea4eb4db5'),                  // bright restaurant
    terrace: u('1559339352-11d035aa65de'),                 // terrace with sea view
    chef: u('1551218808-94e220e084d2'),                    // chef plating herbs
  },
  fitness: {
    hero: u('1534438327276-14e5300c3a48', 2000),           // gym dumbbell rack
    situps: u('1571019613454-1cb2f99b2d8b'),               // floor workout
    deadlift: u('1517836357463-d25dfeac3438'),             // barbell deadlift
    curl: u('1583454110551-21f2fa2afe61'),                 // dumbbell training
    barbell: u('1574680096145-d05b474e2155'),              // barbell on back
    studio: u('1540497077202-7c8a3999166f'),               // training studio
    darkgym: u('1558611848-73f7eb4001a1'),                 // moody gym
  },
  tech: {
    hero: u('1451187580459-43490279c0fa', 2000),           // earth from space
    chip: u('1518770660439-4636190af475'),                 // circuit board
    code: u('1526374965328-7f61d4dc18c5'),                 // green code matrix
    circuit: u('1550751827-4bd374c3f58b'),                 // blue circuit macro
    laptop: u('1531297484001-80022131f5a1'),               // glowing laptop
    robot: u('1485827404703-89b55fcc595e'),                // white robot
    team: u('1519389950473-47ba0277781c'),                 // team at laptops
  },
  music: {
    hero: u('1470229722913-7c0e2dbbafd3', 2000),           // concert, orange lights
    stage: u('1459749411175-04bf5292ceea'),                // big stage
    colors: u('1514525253161-7a46d19cd819'),               // colorful concert
    dj: u('1493225457124-a3eb161ffa5f'),                   // dj in smoke
    hands: u('1429962714451-bb934ecdc4ec'),                // hands in the air
    crowd: u('1501386761578-eac5c94b800a'),                // festival crowd
    purple: u('1506157786151-b8491531f063'),               // purple stage
    pink: u('1516450360452-9312f5e86fc7'),                 // pink concert light
  },
  jewelry: {
    hero: u('1605100804763-247f67b3557e', 2000),           // diamond ring macro
    pearls: u('1515562141207-7a88fb7ce338'),               // pearl necklace box
    necklace: u('1599643478518-a784e5dc4c8f'),             // gold necklace
    bracelet: u('1611591437281-460bfbe1220a'),             // gold bracelet
    diamonds: u('1573408301185-9146fe634ad0'),             // diamond bracelet
    rings: u('1617038260897-41a1f14a8ca0'),                // gold rings
  },
}
