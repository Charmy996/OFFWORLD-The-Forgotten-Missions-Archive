import { TraverseWaypoint, MissionChapter, LastSignalMetadata, PlanetaryExplorerRover } from '../types/mission';

export const OPPORTUNITY_MISSION = {
  id: 'opportunity',
  name: 'Opportunity',
  designation: 'MER-B (Mars Exploration Rover B)',
  targetBody: 'Mars',
  launchDate: '2003-07-08T03:18:00Z',
  landingDate: '2004-01-25', // UTC; Jan 24, 2004 in Pacific time
  landingDatePacific: '2004-01-24',
  landingDateUtc: '2004-01-25T05:05:00Z',
  landingDatePst: '2004-01-24T21:05:00 PST',
  lastSignalDate: '2018-06-10 (Mars exposures ~09:30 and 09:33 PDT, MRO relay ~09:45 PDT, Earth reception ~10:05 PDT)',
  missionDeclaredEnded: '2019-02-13T19:00:00Z',
  plannedLifespanSols: 90,
  actualLifespanSols: 5111,
  totalTraverseMeters: 45161.0,
  marathonMilestoneDate: '2015-03-24 (Sol 3968)',
  landingCoordinates: {
    lat: -1.9462,
    lon: -5.5266, // 354.4734° E in IAU 2000 Mars
    elevationMolaM: -1440.2,
    siteName: 'Eagle Crater (Challenger Memorial Station)',
    accuracy: 'Exact (verified via NASA PDS RMC Site 000)'
  },
  restingCoordinates: {
    lat: -2.2400,
    lon: -5.2200, // 354.7800° E in IAU 2000 Mars
    elevationMolaM: -1218.4,
    siteName: 'Perseverance Valley (approximate, reconstructed)',
    accuracy: 'Approximate (reconstructed traverse endpoint)'
  }
};

export const OPPORTUNITY_WAYPOINTS: TraverseWaypoint[] = [
  {
    id: 'wp-01',
    sol: 1,
    dateEarth: 'Jan 24, 2004 PST / Jan 25, 2004 UTC',
    siteName: 'Eagle Crater (Challenger Memorial Station)',
    coordinates: [-5.5266, -1.9462],
    elevationMolaM: -1440.2,
    odometryTotalM: 0.0,
    eventHighlight: 'Touchdown in Meridiani Planum',
    description: 'After bouncing in its protective airbag cocoon, Opportunity rolled across the dark plains and settled inside the 22-meter Eagle Crater, exposing layered bedrock right in front of its cameras.',
    scientificDiscovery: 'Discovered small hematite spherules nicknamed "blueberries", offering unambiguous proof that liquid water once bathed this ancient Martian plain.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA18885.jpg',
    imageCaption: 'Clues to wet history in texture of Martian rock: hematite blueberries and sulfate matrix at Eagle Crater.',
    imageCredit: 'NASA / JPL-Caltech',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA18885',
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
    description: 'An 8-meter impact crater inspected en route to Endurance. Outcrops confirmed that sulfate bedrock extended far across the plains beyond Eagle Crater.',
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
    eventHighlight: 'Descent into Deep Rock Strata',
    description: 'Engineers commanded Opportunity down a 25-degree slope into the 130-meter crater to study deep sedimentary layers exposed in the cliffs.',
    scientificDiscovery: 'Rock layers proved ancient surface water here was acidic and repeatedly evaporated and flooded before disappearing.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA06739.jpg',
    imageCaption: 'Opportunity catches its own shadow on Sol 180 during its traverse across the Meridiani plains.',
    imageCredit: 'NASA / JPL-Caltech',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA06739',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR',
    category: 'discovery'
  },
  {
    id: 'wp-04',
    sol: 446,
    dateEarth: '2005-04-26 to 2005-06-04',
    siteName: 'Purgatory Dune (Sand Ripple Trap)',
    coordinates: [-5.4850, -1.9880],
    elevationMolaM: -1432.0,
    odometryTotalM: 5350.0,
    eventHighlight: 'Five-Week Sand Extrication',
    description: 'On April 26, 2005 (Sol 446), all six wheels bogged down to their axles in soft drift sand. For five weeks, engineers ran tests in an Earth sandbox before successfully driving the rover free on June 4, 2005 (Sol 484).',
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
    description: 'A 750-meter crater with dramatic layered cliffs and alcoves. Opportunity surveyed the rim and drove inside Duck Bay, operating at Victoria for nearly two Earth years.',
    scientificDiscovery: 'Confirmed regional groundwater fluctuations across kilometers of Martian crust.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA09104.jpg',
    imageCaption: "Panorama from 'Cape Verde' rising over the floor of Victoria Crater.",
    imageCredit: 'NASA / JPL-Caltech / Cornell',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA09104',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR',
    category: 'discovery'
  },
  {
    id: 'wp-06',
    sol: 2680,
    dateEarth: '2011-08-09',
    siteName: 'Endeavour Crater (Cape York & Matijevic Hill)',
    coordinates: [-5.3200, -2.1800],
    elevationMolaM: -1350.0,
    odometryTotalM: 33400.0,
    eventHighlight: 'Arrival at the 22-Kilometer Basin',
    description: 'Following a 21-kilometer crossing of open plains, Opportunity reached the 22-kilometer Endeavour Crater. At Cape York and Matijevic Hill (PIA16703), it discovered ancient clay minerals formed in water that was not strongly acidic.',
    scientificDiscovery: 'Discovered smectite clay minerals at Matijevic Hill. These clay minerals formed in water that was not strongly acidic in Mars\'s earliest Noachian epoch, confirming environments capable of supporting microbial life.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA16703.jpg',
    imageCaption: 'Matijevic Hill panorama on the rim of Endeavour Crater.',
    imageCredit: 'NASA / JPL-Caltech / Cornell / ASU',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA16703',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR',
    category: 'discovery'
  },
  {
    id: 'wp-07',
    sol: 3968,
    dateEarth: '2015-03-24',
    siteName: 'Cape Tribulation & Marathon Valley',
    coordinates: [-5.2700, -2.2150],
    elevationMolaM: -1280.0,
    odometryTotalM: 42195.0,
    eventHighlight: 'First Marathon on Another World',
    description: 'On March 24, 2015 (Sol 3968), Opportunity surpassed 42.195 kilometers (26.219 miles), completing the first marathon on another world. From high on the rim, it surveyed Marathon Valley.',
    scientificDiscovery: 'Identified smectite clay minerals from the ancient Noachian era, confirming early water that was not strongly acidic.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA19158.jpg',
    imageCaption: 'Opportunity\'s Marathon Journey: traverse map and vista overlooking Marathon Valley.',
    imageCredit: 'NASA / JPL-Caltech',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA19158',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR',
    category: 'milestone'
  },
  {
    id: 'wp-08',
    sol: 5111,
    dateEarth: '2018-06-10',
    siteName: 'Perseverance Valley (approximate, reconstructed)',
    coordinates: [-5.2200, -2.2400],
    elevationMolaM: -1218.4,
    odometryTotalM: 45161.0,
    eventHighlight: 'The Last Signal in Perseverance Valley',
    description: 'Descending Perseverance Valley on the western rim of Endeavour Crater, Opportunity was enveloped by a planet-encircling dust storm. After capturing its final opacity measurements on June 10, 2018, the rover entered low-power sleep and never woke up.',
    scientificDiscovery: 'Examined valley floor fluid chutes cut into the ancient rim before the dust storm ended communications.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22929.jpg',
    imageCaption: 'PIA22929: "Opportunity\'s Last Message", final incomplete Pancam frame.',
    imageCredit: 'NASA / JPL-Caltech',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA22929',
    provenance: 'NASA_PHOTOJOURNAL_PIA',
    category: 'final'
  }
];

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
  [-5.2700, -2.2150], // Sol 3968 - Cape Tribulation & Marathon Valley
  [-5.2450, -2.2290],
  [-5.2200, -2.2400]  // Sol 5111 - Perseverance Valley (approximate)
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
    solRange: 'Sol 1 to 90',
    dateRange: 'January to April 2004',
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
    solRange: 'Sol 91 to 5,083',
    dateRange: 'April 2004 to May 2018',
    subtitle: 'Past the warranty, and the long road to Endeavour',
    narrativeText: [
      'On sol 180, the rover caught its own shadow: twice its promised life. Then the trouble came. In 2005 a front wheel lost its steering, a stuck heater threatened its power, and a sand ripple held the rover for six weeks. In 2007 a dust storm drastically cut solar power. Each time, the team on Earth found a way, and Opportunity rolled on.',
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
    solRange: 'Sol 5,084 to 5,111',
    dateRange: 'May 13 to June 10, 2018',
    subtitle: 'The dark sky over Perseverance Valley and the data that stopped',
    narrativeText: [
      'On May 30, 2018, an orbiter spotted a dust storm. By June 8 it covered more than 7 million square miles, and by June 12, 14 million, a quarter of the planet. Atmospheric opacity, called tau, normally sits near 0.5 at Opportunity\'s site. On June 10 it was about 10.8 (one NASA graphic prints 10.5). The rover entered a low-power fault mode as available power collapsed, the lowest level measured on Opportunity.',
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
  tauNote: 'About 10.8 per JPL; one NASA graphic prints 10.5',
  atmosphericTauNominal: 0.5,
  atmosphericTauNote: 'About 10.8 per JPL; one NASA graphic prints 10.5.',
  powerStatusLabel: 'Low-power fault mode',
  powerStatusDetail: 'Power had dropped significantly by June 6, forcing minimal operations. On June 10 the rover experienced a power collapse into low-power fault mode, the lowest power level measured on Opportunity.',
  powerNote: 'Low-power fault mode / power collapse',
  powerWhNote: 'Low-power fault mode / power collapse',
  teamAssumption: 'Team assumption (June 12): engineers assumed the batteries had depleted and the rover was in low-power fault mode, with everything off except a mission clock. This was an inference after the silence, not a received message.',
  batteryAssumptionNote: 'Team assumption: By June 12, 2018, battery levels likely fell below operational thresholds, causing the rover to enter low-power sleep mode.',
  temperatureLabel: 'About −29 °C',
  temperatureNote: 'Rover temperature in the June 10 transmission (about −20 °F).',
  temperatureEstimate: 'about −29 °C',
  acquisitionTimes: 'Jun 10, 2018 (sol 5,111): about 9:30 and 9:33 a.m. PDT',
  mroRelayTime: 'Relayed by Mars Reconnaissance Orbiter around 9:45 a.m. PDT',
  earthReceiptTime: 'Received on Earth around 10:05 a.m. PDT',
  acquisitionTimeMars: '2018-06-10 ~09:30 & ~09:33 PDT (Pancam exposures on Mars)',
  relayTimeMro: '2018-06-10 ~09:45 PDT (Relayed via Mars Reconnaissance Orbiter)',
  carrierLossTimeEarth: '2018-06-10 ~10:05 PDT (Received on Earth; transmission stopped before the image finished)',
  dsnStation: 'Mars Reconnaissance Orbiter relay to Deep Space Network',
  frequencyBand: 'UHF Orbiter Relay to X-Band Ground Downlink',
  finalFullFrame: {
    id: 'PIA22929',
    title: "Opportunity's Last Message",
    instrument: 'Pancam',
    status: 'Partial frame: transmission stopped before the image finished',
    description: 'A noisy, partial dark-sky frame: the last data Opportunity sent. Taken about 9:30 a.m. PDT and relayed by MRO around 9:45 a.m. PDT. The transmission stopped before the image finished.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22929.jpg',
    imageCredit: 'NASA / JPL-Caltech',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA22929',
    provenance: 'NASA_PHOTOJOURNAL_PIA'
  },
  subsequentThumbnails: {
    id: 'PIA22930',
    title: 'Last Images Opportunity Took',
    instrument: 'Pancam',
    status: 'Two thumbnails received',
    description: 'Two thumbnails with a faint dot of Sun, taken about 9:33 a.m. PDT and used to estimate a tau of about 10.8. The full-frame versions were never transmitted.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22930.jpg',
    imageCredit: 'NASA / JPL-Caltech',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA22930',
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
      description: 'Tau about 10.8 (one NASA graphic prints 10.5); low-power fault condition; rover temperature about −29 °C.',
      sourceUrl: SRC.statusReport.url,
      sourceLabel: SRC.statusReport.label
    },
    {
      date: '2018-06-12',
      title: 'Team assumption after silence',
      description: 'Engineers assumed the batteries had depleted and the rover was in low-power fault, with everything off except a mission clock. This was an assumption, not a received message. On the same day the storm covered 14 million square miles, a quarter of the planet.',
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
  lastCommandsNote: 'On February 12, 2019, the last recovery commands went out through the 70-meter Goldstone antenna, ending an eight-month effort of more than 1,000 commands. NASA declared the mission complete on February 13, 2019, with total odometry of 28.06 miles (45.16 km). Press accounts differ on whether Billie Holiday\'s "I\'ll Be Seeing You" was played in the control room or uplinked; NASA\'s release does not mention it.',
  telemetryStream: [
    { timestampUtc: '2018-06-10T16:30:00Z', source: 'PANCAM_MARS', message: 'Left Pancam solar filter exposure initiated (~09:30 PDT). Frame buffer loaded.', level: 'INFO' },
    { timestampUtc: '2018-06-10T16:33:00Z', source: 'PANCAM_MARS', message: 'Stereo tau thumbnail exposures completed (~09:33 PDT). Sun disk obscured.', level: 'INFO' },
    { timestampUtc: '2018-06-10T16:45:00Z', source: 'MRO_UHF_PASS', message: 'Orbiter relay pass initiated (~09:45 PDT). Packet transfer to MRO memory buffer.', level: 'INFO' },
    { timestampUtc: '2018-06-10T17:05:00Z', source: 'DSN_GROUND', message: 'Downlink received on Earth (~10:05 PDT). Transmission stopped before the image finished.', level: 'WARN' },
    { timestampUtc: '2018-06-10T17:05:30Z', source: 'TELEMETRY_LOG', message: 'Solar array output: low-power fault mode / power collapse. Tau: 10.8. Temp: about -29 °C.', level: 'CRIT' },
    { timestampUtc: '2018-06-12T00:00:00Z', source: 'MISSION_TEAM', message: 'Team assumption: Batteries depleted. Autonomous sleep entered.', level: 'WARN' }
  ],
  poeticMythClarification: {
    popularLegend: '"My battery is low and it\'s getting dark."',
    verifiedFact: 'Opportunity never spoke or transmitted words in English. The rover downlinked binary engineering packets indicating atmospheric opacity at 10.8, power collapse into low-power fault mode, temperature near -29 °C, and an incomplete image. The poetic phrase was composed on Twitter by journalist Jacob Margolis (@JacobMargolis) on June 13, 2018, summarizing what mission scientists told him.',
    originAuthor: 'Jacob Margolis (Science Journalist, KPCC / LAist)'
  },
  mythsVsFacts: [
    {
      id: 'myth-oppy',
      subject: 'Opportunity Sol 5111 Transmission',
      myth: 'The rover transmitted the spoken words: "My battery is low and it\'s getting dark."',
      fact: 'Telemetry packets only: Binary telemetry recorded high atmospheric opacity (tau 10.8), power collapse into low-power fault mode, temperature about -29 °C, and an incomplete Pancam frame. The sentence was written by journalist Jacob Margolis on Twitter summarizing conversations with team members.'
    },
    {
      id: 'myth-spirit',
      subject: 'Spirit Wheel Failure at Gusev',
      myth: 'The right front wheel failure was an unmitigated disaster that ended scientific discovery.',
      fact: 'Dragging the jammed right front wheel acted as a trenching tool, scraping open the soil to reveal 90% pure silica. This proved the existence of ancient hydrothermal hot springs, one of the mission greatest discoveries.'
    },
    {
      id: 'myth-insight',
      subject: 'InSight Final Farewell Message',
      myth: 'InSight took a farewell selfie and composed its own emotional goodbye message on Mars.',
      fact: 'The final camera frame was captured on Sol 1438 (Dec 11, 2022). The farewell message was written on Earth by the JPL Social Media and Outreach team to convey the lander engineering condition to the public.'
    },
    {
      id: 'myth-surveyor',
      subject: 'Surveyor 3 Microbes on the Moon',
      myth: 'Streptococcus mitis bacteria survived 2.5 years on the Moon, proving interplanetary panspermia.',
      fact: 'A 2011 NASA planetary protection review found that clean-room handling and swab protocols during the 1969 Apollo 12 examination were unmasked and lacked sterile controls. Contamination in the laboratory after return was the probable source.'
    }
  ]
};

// Planetary rovers data (Opportunity MER-B)
export const PLANETARY_ROVERS: PlanetaryExplorerRover[] = [
  {
    id: 'opportunity',
    name: 'Opportunity',
    designation: 'MER-B',
    body: 'Mars',
    coordinates: {
      lat: -2.2400,
      lon: 354.7800,
      displayCoords: '2.2400° S, 354.7800° E (approximate, reconstructed)'
    },
    siteName: 'Perseverance Valley, Endeavour Crater',
    isApproximate: true,
    statusText: 'Mission Concluded (Feb 13, 2019)',
    shortSnippet: 'Drove 45.161 kilometers over 5,111 sols across Meridiani Planum, uncovering blueberries, gypsum, and smectite clays.',
    handwrittenStory: [
      'Opportunity touched down on January 24, 2004 Pacific time, rolling directly into Eagle Crater. The primary warranty was ninety sols, but the machine kept rolling across the red plain for over fifteen Earth years.',
      'Along the way, it spent five weeks stuck in Purgatory Dune, drove along the jagged cliffs of Victoria Crater, and climbed the rim of Endeavour Crater. At Cape York and Matijevic Hill, it discovered ancient clay minerals, proving that water that was not strongly acidic once flowed here.',
      'On March 24, 2015, Opportunity reached 42.195 kilometers, completing the first marathon on another world.',
      'In June 2018, a planet-encircling dust storm blotted out the Sun. Opportunity sent its final measurements on June 10, 2018, before falling silent in Perseverance Valley.'
    ],
    metrics: {
      sols: '5,111 Sols',
      distance: '45.161 km',
      lifespan: '14 years, 138 days',
      dates: 'Jan 24, 2004 PST to June 10, 2018',
      keyDiscovery: 'Hematite spherules and Endeavour Crater clay minerals'
    },
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR',
    sourceUrl: 'https://an.rsl.wustl.edu/mer/merb/'
  }
];
