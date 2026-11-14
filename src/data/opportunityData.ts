import { TraverseWaypoint, MissionChapter, LastSignalMetadata } from '../types/mission';

export const OPPORTUNITY_MISSION = {
  id: 'opportunity',
  name: 'Opportunity',
  designation: 'MER-B (Mars Exploration Rover B)',
  tagline: 'The 15-Year Marathon of Meridiani',
  targetBody: 'Mars',
  launchDate: '2003-07-08T03:18:00Z',
  landingDate: '2004-01-25', // UTC; Jan 24, 2004 in Pacific time
  landingDatePacific: '2004-01-24',
  lastSignalDate: '2018-06-10',
  missionDeclaredEnded: '2019-02-13',
  plannedLifespanSols: 90,
  actualLifespanSols: 5111,
  totalTraverseMeters: 45161.0,
  landingCoordinates: {
    lat: -1.9462,
    lon: -5.5266, // 354.4734° E in IAU 2000 Mars
    elevationMolaM: -1440.2,
    siteName: 'Eagle Crater (Challenger Memorial Station)'
  },
  restingCoordinates: {
    lat: -2.2400,
    lon: -5.2200, // 354.7800° E in IAU 2000 Mars
    elevationMolaM: -1218.4,
    siteName: 'Perseverance Valley (Endeavour Crater Rim)'
  }
};

export const OPPORTUNITY_WAYPOINTS: TraverseWaypoint[] = [
  {
    id: 'wp-01',
    sol: 1,
    dateEarth: '2004-01-25',
    siteName: 'Eagle Crater (Challenger Memorial Station)',
    coordinates: [-5.5266, -1.9462],
    elevationMolaM: -1440.2,
    odometryTotalM: 0.0,
    eventHighlight: 'Touchdown: Interplanetary Hole-in-One',
    description: 'After bouncing on airbags, Opportunity rolled across Meridiani Planum and settled directly inside a 22-meter-wide impact crater, exposing layered sulfate bedrock.',
    scientificDiscovery: 'Discovered sub-centimeter gray hematite spherules ("Blueberries"), the first definitive mineralogical proof of past liquid water on Mars.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA05474.jpg',
    imageCaption: 'Hematite spherules ("blueberries") nestled in rock outcrop at Eagle Crater (Pancam false color).',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR',
    category: 'landing'
  },
  {
    id: 'wp-02',
    sol: 84,
    dateEarth: '2004-04-20',
    siteName: 'Fram Crater',
    coordinates: [-5.5210, -1.9485],
    elevationMolaM: -1438.0,
    odometryTotalM: 450.0,
    eventHighlight: 'First Plains Waypoint',
    description: 'A modest 8-meter crater visited en route to Endurance. Provided early confirmation that the sulfate bedrock continued well beyond Eagle Crater.',
    provenance: 'AUTHENTIC_TELEMETRY_JPL_RMC',
    category: 'milestone'
  },
  {
    id: 'wp-03',
    sol: 134,
    dateEarth: '2004-06-12',
    siteName: 'Endurance Crater (Karatepe Outcrop)',
    coordinates: [-5.5050, -1.9540],
    elevationMolaM: -1448.5,
    odometryTotalM: 920.0,
    eventHighlight: 'Descent into Deep Stratigraphy',
    description: 'Engineers commanded the rover to descend a 25-degree slope into the 130-meter-wide Endurance Crater, examining deep, ancient sedimentary rock strata.',
    scientificDiscovery: 'Chemical analysis showed layers formed under standing acidic water that periodically dried out and flooded.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA06757.jpg',
    imageCaption: 'Endurance Crater interior walls and dunes viewed from Karatepe entry.',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR',
    category: 'discovery'
  },
  {
    id: 'wp-04',
    sol: 446,
    dateEarth: '2005-04-26',
    siteName: 'Purgatory Dune',
    coordinates: [-5.4850, -1.9880],
    elevationMolaM: -1432.0,
    odometryTotalM: 5350.0,
    eventHighlight: 'Trapped in Sand Ripple',
    description: 'All six wheels bogged down up to the axles in fine powdery sand. For five weeks, JPL engineers tested drive maneuvers on Earth before carefully extricating the rover.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA07997.jpg',
    imageCaption: 'Deep wheel ruts left in Purgatory Dune as Opportunity worked itself free.',
    provenance: 'AUTHENTIC_TELEMETRY_JPL_RMC',
    category: 'hazard'
  },
  {
    id: 'wp-05',
    sol: 951,
    dateEarth: '2006-09-27',
    siteName: 'Victoria Crater (Duck Bay)',
    coordinates: [-5.5000, -2.0500],
    elevationMolaM: -1420.0,
    odometryTotalM: 9280.0,
    eventHighlight: 'Arrival at the Promontories',
    description: 'A magnificent 750-meter-wide impact crater featuring jagged alcoves and promontories like Cape Verde. Opportunity explored Victoria for nearly two Earth years.',
    scientificDiscovery: 'Confirmed regional groundwater table fluctuations across kilometers of Martian crust.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA08813.jpg',
    imageCaption: 'Cape Verde promontory rising over the floor of Victoria Crater.',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR',
    category: 'discovery'
  },
  {
    id: 'wp-06',
    sol: 2680,
    dateEarth: '2011-08-09',
    siteName: 'Endeavour Crater (Cape York)',
    coordinates: [-5.3200, -2.1800],
    elevationMolaM: -1350.0,
    odometryTotalM: 33400.0,
    eventHighlight: 'Arrival at the 22-Kilometer Basin',
    description: 'After a grueling 21-kilometer drive across open plains, Opportunity reached the rim of the ancient Noachian-era Endeavour Crater.',
    scientificDiscovery: 'Discovered "Homestake", a pencil-thick mineral vein of pure gypsum (calcium sulfate) precipitated from neutral-pH liquid water.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA15032.jpg',
    imageCaption: 'The "Homestake" gypsum vein at Cape York (Pancam false color).',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR',
    category: 'discovery'
  },
  {
    id: 'wp-07',
    sol: 3800,
    dateEarth: '2014-10-06',
    siteName: 'Cape Tribulation & Marathon Valley',
    coordinates: [-5.2700, -2.2150],
    elevationMolaM: -1280.0,
    odometryTotalM: 41200.0,
    eventHighlight: 'Off-World Marathon Milestone',
    description: 'Opportunity surpassed the official 42.195 km marathon distance on Sol 3968, climbing high along the rim of Endeavour to study ancient smectite clay rocks.',
    scientificDiscovery: 'Evidence of alkaline, non-acidic waters from the earliest chapter of Martian history.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA15689.jpg',
    imageCaption: 'The Greeley Panorama: 360-degree gigapixel view from Cape Tribulation.',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR',
    category: 'milestone'
  },
  {
    id: 'wp-08',
    sol: 5111,
    dateEarth: '2018-06-10',
    siteName: 'Perseverance Valley (Endeavour Rim)',
    coordinates: [-5.2200, -2.2400],
    elevationMolaM: -1218.4,
    odometryTotalM: 45161.0,
    eventHighlight: 'The Last Signal — Final Resting Place',
    description: 'While driving down Perseverance Valley, a planet-encircling dust storm blotted out the Sun. Opportunity entered low-power hibernation and never awoke.',
    scientificDiscovery: 'Valley carved into crater rim possibly by fluid flow or wind deflation before rover fell silent.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22929.jpg',
    imageCaption: 'PIA22929: "Opportunity\'s Last Message" — The final incomplete Pancam frame.',
    provenance: 'NASA_PHOTOJOURNAL_PIA',
    category: 'final'
  }
];

// Continuous route interpolation representing the authentic 45.161 km drive
export const OPPORTUNITY_ROUTE_COORDINATES: Array<[number, number]> = [
  [-5.5266, -1.9462], // Sol 1 - Eagle Crater
  [-5.5240, -1.9470],
  [-5.5210, -1.9485], // Sol 84 - Fram Crater
  [-5.5140, -1.9510],
  [-5.5050, -1.9540], // Sol 134 - Endurance Crater
  [-5.4980, -1.9680],
  [-5.4850, -1.9880], // Sol 446 - Purgatory Dune
  [-5.4890, -2.0120], // Sol 550 - Erebus Crater
  [-5.4940, -2.0310],
  [-5.5000, -2.0500], // Sol 951 - Victoria Crater
  [-5.4800, -2.0750],
  [-5.4450, -2.1050],
  [-5.4050, -2.1380],
  [-5.3650, -2.1620],
  [-5.3200, -2.1800], // Sol 2680 - Endeavour Crater Cape York
  [-5.2950, -2.1950],
  [-5.2700, -2.2150], // Sol 3800 - Cape Tribulation & Marathon Valley
  [-5.2450, -2.2290],
  [-5.2200, -2.2400]  // Sol 5111 - Perseverance Valley (Final Rest)
];

// Source links reused across chapters and the Last Signal panel (all NASA/JPL unless labeled).
const SRC = {
  missionPage: { label: 'NASA Opportunity mission page', url: 'https://science.nasa.gov/mission/mer-opportunity/' },
  endRelease: { label: 'JPL release, Feb 13, 2019', url: 'https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/' },
  statusReport: { label: 'JPL dust storm status report, 2018', url: 'https://www.jpl.nasa.gov/news/opportunity-hunkers-down-during-dust-storm/' },
  lightIsEnergy: { label: 'NASA graphic: On Mars, Light Is Energy', url: 'https://science.nasa.gov/resource/on-mars-light-is-energy/' },
  pia22929: { label: 'PIA22929', url: 'https://www.jpl.nasa.gov/images/pia22929-opportunitys-last-message/' },
  pia22930: { label: 'PIA22930', url: 'https://science.nasa.gov/photojournal/last-images-opportunity-took/' },
  pia19158: { label: 'PIA19158', url: 'https://www.jpl.nasa.gov/images/pia19158-opportunitys-marathon-journey/' },
  pia06739: { label: 'PIA06739', url: 'https://www.jpl.nasa.gov/images/pia06739-opportunity-catches-its-shadow-on-sol-180/' },
  pia16703: { label: 'PIA16703', url: 'https://science.nasa.gov/photojournal/matijevic-hill-panorama-for-rovers-ninth-anniversary/' },
  pia18885: { label: 'PIA18885', url: 'https://science.nasa.gov/photojournal/clues-to-wet-history-in-texture-of-a-martian-rock/' },
  pia22909: { label: 'PIA22909', url: 'https://www.jpl.nasa.gov/images/pia22909-opportunity-legacy-pan-true-color/' },
  waterRelease: { label: 'NASA release of Mar 2, 2004 (republished by SpaceNews)', url: 'https://spacenews.com/?p=40434' },
  perseveranceBlog: { label: 'NASA blog, Oct 12, 2026', url: 'https://science.nasa.gov/blogs/perseverance-mars-rover/2026/10/12/nasas-perseverance-sets-off-world-record-for-total-distance-driven/' },
  newsweek: { label: 'Newsweek (non-NASA)', url: 'https://www.newsweek.com/nasa-mars-opportunity-rover-new-york-daily-news-jet-propulsion-laboratory-1334615' },
  phys: { label: 'JPL release as republished by Phys.org (non-NASA site)', url: 'https://phys.org/news/2018-08-martian-opportunity-rover.html' }
};

// Chapter text follows the verified project dossier script "Ninety Sols".
export const OPPORTUNITY_CHAPTERS: MissionChapter[] = [
  {
    id: 'act-1',
    title: 'ACT I: The Hole-in-One at Meridiani',
    solRange: 'Sol 1 – 90',
    dateRange: 'January – April 2004',
    subtitle: 'A ninety-sol warranty and rocks soaked in water',
    narrativeText: [
      'On Mars, a day is called a sol. Opportunity was built to last ninety of them, and to drive about a kilometer.',
      'It landed on January 24, 2004, Pacific time (January 25 in UTC). Wrapped in airbags, the lander bounced at least 26 times across Meridiani Planum and rolled to a stop inside a small crater called Eagle, about nine miles from where it was aimed. NASA\'s own pages call it a hole-in-one.',
      'In the walls of Eagle lay layered rock, studded with tiny gray spheres the team nicknamed blueberries. They were iron-rich, and they had formed in rock soaked with groundwater. On March 2, 2004, NASA told the world that liquid water once flowed through this place.'
    ],
    keyHighlight: 'On Mar 2, 2004, the science team announced that rocks at the landing site were once soaked in liquid water.',
    telemetryMetrics: {
      solsPassed: 90
    },
    sources: [SRC.missionPage, SRC.pia18885, SRC.waterRelease],
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR'
  },
  {
    id: 'act-2',
    title: 'ACT II: The Great Marathon',
    solRange: 'Sol 91 – 5,083',
    dateRange: 'April 2004 – May 2018',
    subtitle: 'Past the warranty, and the long road to Endeavour',
    narrativeText: [
      'On sol 180, the rover caught its own shadow: twice its promised life. Then the trouble came. In 2005 a front wheel lost its steering, a stuck heater threatened its power, and a sand ripple held the rover for six weeks. In 2007 a dust storm cut its power to 128 watt-hours. Each time, the team on Earth found a way, and Opportunity rolled on.',
      'In 2011 it reached Endeavour Crater, thirteen miles across, where orbiters had spotted clay minerals. There, NASA\'s team found signs of water that was not strongly acidic.',
      'On March 24, 2015, eleven years and two months after landing, the odometer passed 26.2 miles: the first human enterprise to drive a marathon on another world, with Marathon Valley just ahead.'
    ],
    keyHighlight: 'On Mar 24, 2015 (sol 3,968), Opportunity became the first human enterprise to drive a marathon on another world.',
    telemetryMetrics: {
      solsPassed: 5083
    },
    sources: [SRC.pia06739, SRC.missionPage, SRC.pia16703, SRC.pia19158],
    provenance: 'AUTHENTIC_TELEMETRY_JPL_RMC'
  },
  {
    id: 'act-3',
    title: 'ACT III: The Last Signal',
    solRange: 'Sol 5,084 – 5,111',
    dateRange: 'May 13 – June 10, 2018',
    subtitle: 'The dark sky over Perseverance Valley and the data that stopped',
    narrativeText: [
      'On May 30, 2018, an orbiter spotted a dust storm. By June 8 it covered more than 7 million square miles, and by June 12, 14 million, a quarter of the planet. Atmospheric opacity, called tau, normally sits near 0.5 at Opportunity\'s site. On June 10 it was about 10.8 (one NASA graphic prints 10.5). The rover had 21 watt-hours of power, the lowest measured on Opportunity at that time (some press accounts say 22).',
      'It sent engineering data and one last picture: a noisy, partial frame of a dark sky, cut off before it finished. Opportunity never sent a sentence. It sent measurements.',
      'For eight months, JPL listened and sent more than a thousand commands. On February 12, 2019, the last went out through the 70-meter dish at Goldstone. The next day, NASA declared the mission complete. Project manager John Callas closed his remarks with "Farewell, Opportunity, and well done."',
      'Opportunity drove 28.06 miles, sent home more than 217,000 images and 15 color panoramas, and lasted sixty times longer than planned. On October 11, 2026, Perseverance passed its total distance, and NASA said so plainly. But the first marathon on another world still belongs to Opportunity. It was built for ninety sols. Its last contact came on sol 5,111.'
    ],
    keyHighlight: 'Last contact June 10, 2018 (sol 5,111). NASA declared the mission complete on Feb 13, 2019.',
    telemetryMetrics: {
      distanceKm: 45.16,
      solsPassed: 5111,
      dustFactor: 'Tau about 10.8 (one NASA graphic: 10.5)'
    },
    sources: [SRC.statusReport, SRC.lightIsEnergy, SRC.pia22930, SRC.pia22929, SRC.endRelease, SRC.perseveranceBlog, SRC.pia22909],
    provenance: 'NASA_PHOTOJOURNAL_PIA'
  }
];

export const OPPORTUNITY_LAST_SIGNAL: LastSignalMetadata = {
  atmosphericTauValue: 10.8,
  atmosphericTauNominal: 0.5,
  atmosphericTauNote: 'About 10.8 per JPL; one NASA graphic prints 10.5.',
  powerWattHours: 21,
  powerNote: 'NASA graphic: 21 Wh. Some press accounts say 22.',
  powerStatusLabel: '21 Wh on June 10',
  powerStatusDetail: 'Power had dropped significantly by June 6, forcing minimal operations. On June 10 the rover had 21 watt-hours, the lowest measured on Opportunity at that time.',
  teamAssumption: 'Team assumption (June 12): engineers assumed the batteries had dipped below 24 volts and the rover was in low-power fault, with everything off except a mission clock. This was an inference after the silence, not a received message.',
  temperatureLabel: 'About −29 °C',
  temperatureNote: 'Rover temperature in the June 10 transmission (about −20 °F).',
  acquisitionTimes: 'Jun 10, 2018 (sol 5,111): about 9:30 and 9:33 a.m. PDT',
  mroRelayTime: 'Relayed by Mars Reconnaissance Orbiter around 9:45 a.m. PDT',
  earthReceiptTime: 'Received on Earth around 10:05 a.m. PDT',
  finalFullFrame: {
    id: 'PIA22929',
    title: "Opportunity's Last Message",
    instrument: 'Pancam',
    status: 'Partial frame: transmission stopped before the image finished',
    description: 'A noisy, partial dark-sky frame: the last data Opportunity sent. Taken about 9:30 a.m. PDT and relayed by MRO around 9:45 a.m. PDT. The transmission stopped before the image finished.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22929.jpg',
    provenance: 'NASA_PHOTOJOURNAL_PIA'
  },
  subsequentThumbnails: {
    id: 'PIA22930',
    title: 'Last Images Opportunity Took',
    instrument: 'Pancam',
    status: 'Two thumbnails received',
    description: 'Two thumbnails with a faint dot of Sun, taken about 9:33 a.m. PDT and used to estimate a tau of about 10.8. The full-frame versions were never transmitted.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22930.jpg',
    provenance: 'NASA_PHOTOJOURNAL_PIA'
  },
  verifiedEventLog: [
    {
      date: '2018-05-30',
      title: 'Storm first detected',
      description: 'Mars Reconnaissance Orbiter first detects the dust storm.',
      sourceUrl: SRC.statusReport.url,
      sourceLabel: SRC.statusReport.label
    },
    {
      date: '2018-06-06',
      title: 'Minimal operations',
      description: 'Power has dropped significantly; the rover shifts to minimal operations.',
      sourceUrl: SRC.statusReport.url,
      sourceLabel: SRC.statusReport.label
    },
    {
      date: '2018-06-10',
      timePdt: 'about 9:30 and 9:33 a.m. PDT',
      sol: 5111,
      title: 'Last images taken',
      description: 'Pancam takes its last images. The partial dark-sky frame (PIA22929) was relayed by MRO around 9:45 a.m. PDT and received on Earth around 10:05 a.m. PDT; the transmission stopped before the image finished. Two thumbnails (PIA22930) were used to estimate tau.',
      sourceUrl: SRC.pia22929.url,
      sourceLabel: 'NASA PIA22929'
    },
    {
      date: '2018-06-10',
      sol: 5111,
      title: 'Engineering readings in the last transmission',
      description: 'Tau about 10.8 (one NASA graphic prints 10.5); 21 watt-hours of power (some press accounts say 22); rover temperature about −29 °C.',
      sourceUrl: SRC.statusReport.url,
      sourceLabel: SRC.statusReport.label
    },
    {
      date: '2018-06-12',
      title: 'Team assumption after silence',
      description: 'Engineers assumed the batteries had dipped below 24 volts and the rover was in low-power fault, with everything off except a mission clock. This was an assumption, not a received message. On the same day the storm covered 14 million square miles, a quarter of the planet.',
      sourceUrl: SRC.statusReport.url,
      sourceLabel: SRC.statusReport.label
    },
    {
      date: '2018-06-19',
      title: 'Planet-encircling storm',
      description: 'The storm is officially a planet-encircling (global) dust event.',
      sourceUrl: SRC.statusReport.url,
      sourceLabel: SRC.statusReport.label
    },
    {
      date: '2018-07-23',
      title: 'Storm begins to decay',
      description: 'As of July 23, orbiters show more dust falling out than being raised.',
      sourceUrl: SRC.statusReport.url,
      sourceLabel: SRC.statusReport.label
    },
    {
      date: '2019-02-12',
      title: 'Last recovery commands',
      description: 'The last recovery commands go out through the 70-meter Goldstone antenna, ending an eight-month effort of more than 1,000 commands.',
      sourceUrl: SRC.endRelease.url,
      sourceLabel: SRC.endRelease.label
    },
    {
      date: '2019-02-13',
      title: 'Mission declared complete',
      description: 'NASA declares the mission complete; total odometry 28.06 miles (45.16 km).',
      sourceUrl: SRC.endRelease.url,
      sourceLabel: SRC.endRelease.label
    }
  ],
  factCheck: [
    {
      claim: '"Opportunity\'s last words were \'My battery is low and it\'s getting dark.\'"',
      verdict: 'MYTH',
      record: 'A reporter\'s "poetic translation" of the data, not a transmission. NASA\'s own record of the last data is a noisy partial image plus engineering readings.',
      sources: [SRC.newsweek, SRC.pia22929]
    },
    {
      claim: '"NASA\'s final transmission to Opportunity was \'I\'ll Be Seeing You.\'"',
      verdict: 'NOT CONFIRMED BY NASA',
      record: 'NASA\'s release says final commands went out Feb 12 and does not mention the song. Press accounts differ on whether it was played in the control room or uplinked, so it is not presented here as a transmission.',
      sources: [SRC.endRelease]
    },
    {
      claim: '"Dust piled up on the panels and killed the rover."',
      verdict: 'UNCONFIRMED',
      record: 'Before the storm cleared, JPL said it was unlikely dust accumulation would prove the root cause of the silence. NASA\'s final release attributes the end to the storm but names no confirmed failure.',
      sources: [SRC.phys, SRC.endRelease]
    },
    {
      claim: '"Opportunity still holds the off-world driving record."',
      verdict: 'OUT OF DATE',
      record: 'Perseverance passed Opportunity\'s 28.06 miles on Oct 11, 2026, reaching 28.10 miles (45.22 km). Opportunity still holds the "first marathon" title.',
      sources: [SRC.perseveranceBlog]
    },
    {
      claim: '"Opportunity found life on Mars."',
      verdict: 'MYTH',
      record: 'NASA says the findings imply conditions may have been habitable and that Mars may once have sustained microbial life. No life was found.',
      sources: [SRC.endRelease, SRC.missionPage]
    },
    {
      claim: '"It landed on Jan 24." / "It landed on Jan 25."',
      verdict: 'BOTH CORRECT',
      record: 'Jan 24, 2004 in Pacific time; Jan 25 in UTC.',
      sources: [SRC.missionPage, SRC.endRelease]
    }
  ],
  lastCommandsNote: 'On February 12, 2019, the last recovery commands went out through the 70-meter Goldstone antenna, ending an eight-month effort of more than 1,000 commands. NASA declared the mission complete on February 13, 2019, with total odometry of 28.06 miles (45.16 km). Press accounts differ on whether Billie Holiday\'s "I\'ll Be Seeing You" was played in the control room or uplinked; NASA\'s release does not mention it.'
};
