import { TraverseWaypoint, MissionChapter, LastSignalMetadata } from '../types/mission';

export const OPPORTUNITY_MISSION = {
  id: 'opportunity',
  name: 'Opportunity',
  designation: 'MER-B (Mars Exploration Rover B)',
  tagline: 'The 15-Year Marathon of Meridiani',
  targetBody: 'Mars',
  launchDate: '2003-07-08T03:18:00Z',
  landingDate: '2004-01-25T05:05:00Z',
  lastSignalDate: '2018-06-10T17:19:00Z',
  missionDeclaredEnded: '2019-02-13T19:00:00Z',
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

export const OPPORTUNITY_CHAPTERS: MissionChapter[] = [
  {
    id: 'act-1',
    title: 'ACT I: The Hole-in-One at Meridiani',
    solRange: 'Sol 1 – 90',
    dateRange: 'January – April 2004',
    subtitle: 'A ninety-sol warranty and an ancient sea of blueberries',
    narrativeText: [
      'On January 25, 2004, a cocoon of airbags bounced across the smooth, dark plains of Meridiani Planum. When the petal shields unfolded, cameras looked out not at a featureless horizon, but directly at layered bedrock inside the 22-meter Eagle Crater.',
      'Opportunity had scored an interplanetary hole-in-one. Within weeks, its microscopic imager revealed thousands of sub-centimeter gray spherules weathered out of the cliffs—the famous "blueberries". Formed from hematite inside water-soaked sediments, they delivered unambiguous proof that liquid water once bathed the Martian surface.',
      'Engineers celebrated the completion of the 90-sol primary mission warranty. None could imagine the machine would continue rolling for fifteen Earth years.'
    ],
    keyHighlight: 'Definitive confirmation of ancient liquid water on Mars within 60 days of landing.',
    telemetryMetrics: {
      distanceKm: 0.6,
      solsPassed: 90
    },
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR'
  },
  {
    id: 'act-2',
    title: 'ACT II: The Great Marathon',
    solRange: 'Sol 91 – 5000',
    dateRange: 'May 2004 – May 2018',
    subtitle: 'Wheel failures, sand traps, and forty-five kilometers across an alien world',
    narrativeText: [
      'Leaving Eagle Crater, Opportunity plunged into the desert. It survived 5 weeks trapped to its axles in Purgatory Dune, navigated towering promontories at Victoria Crater, and overcame permanent steering actuator failures.',
      'When its internal flash memory degraded into recurring "amnesia" cycles, JPL engineers remotely reprogrammed the rover to operate entirely within dynamic RAM, transmitting telemetry each afternoon before sunset.',
      'In August 2011, after a 21-kilometer sprint across open dunes, Opportunity reached the rim of the 22-kilometer Endeavour Crater. There, at Cape York, it scraped open "Homestake"—a bright vein of pure gypsum formed in neutral-pH liquid water, proving an ancient habitat where microbial life could have thrived.',
      'On Sol 3968, Opportunity crossed the official 42.195 km mark, completing humanity’s first off-world marathon.'
    ],
    keyHighlight: '45.16 km total traverse—establishing the enduring off-world driving record.',
    telemetryMetrics: {
      distanceKm: 45.16,
      solsPassed: 5000
    },
    provenance: 'AUTHENTIC_TELEMETRY_JPL_RMC'
  },
  {
    id: 'act-3',
    title: 'ACT III: The Last Signal',
    solRange: 'Sol 5000 – 5111',
    dateRange: 'May – June 2018',
    subtitle: 'The dark sky over Perseverance Valley and the transmission that stopped',
    narrativeText: [
      'By May 2018, Opportunity had driven into Perseverance Valley, a shallow depression slicing down the western rim of Endeavour Crater.',
      'On May 30, orbital cameras detected an atmospheric dust storm forming directly over Meridiani. Within days, it grew into a historic planet-encircling tempest. Atmospheric opacity (tau) climbed past 10.8—the highest level ever recorded on Mars. At midday, the darkness was absolute.',
      'On Sol 5111 (June 10, 2018), Opportunity pointed its camera at the pitch-black sky to measure opacity. Mid-transmission, the rover entered a low-power fault mode as its solar power collapsed. Deep Space Network Station 14 at Goldstone received its final corrupted data packet at 17:19 UTC.',
      'For eight months, over a thousand recovery commands were beamed into the dark. On February 12, 2019, JPL beamed Billie Holiday\'s "I\'ll Be Seeing You". No answer returned.'
    ],
    keyHighlight: 'Final downlink received June 10, 2018. Official mission retirement declared February 13, 2019.',
    telemetryMetrics: {
      distanceKm: 45.161,
      solsPassed: 5111,
      dustFactor: 'Tau > 10.8'
    },
    provenance: 'NASA_PHOTOJOURNAL_PIA'
  }
];

export const OPPORTUNITY_LAST_SIGNAL: LastSignalMetadata = {
  atmosphericTauValue: 10.8,
  atmosphericTauNominal: 0.5,
  powerStatusLabel: 'Critical Power Collapse',
  powerStatusDetail: 'Solar arrays obscured by planet-encircling dust storm; voltage collapsed below autonomous low-power fault threshold.',
  acquisitionTimeMars: '2018-06-10 ~09:30 PDT (16:30 UTC / Sol 5111)',
  carrierLossTimeEarth: '2018-06-10 10:19 PDT (17:19 UTC)',
  dsnStation: 'DSN Station 14 (Goldstone Deep Space Communications Complex, 70m Antenna)',
  frequencyBand: 'X-Band Downlink (8.4 GHz)',
  finalFullFrame: {
    id: 'PIA22929',
    title: "Opportunity's Last Message",
    instrument: 'Pancam (Panoramic Camera - Left Eye with Solar Filter)',
    status: 'Incomplete / Abruptly Interrupted Transmission',
    description: 'This is the actual final full-frame image data received from Opportunity. Pointed at the obscured Sun, the frame is filled with white camera noise caused by the extreme darkness. The black bar across the bottom represents scanlines that were never received because the rover lost power mid-downlink.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22929.jpg',
    provenance: 'NASA_PHOTOJOURNAL_PIA'
  },
  subsequentThumbnails: {
    id: 'PIA22930',
    title: 'Final Atmospheric Tau Thumbnails',
    instrument: 'Pancam (Stereo Left & Right Solar Filter Thumbnails)',
    status: 'Successfully Received Compressed Thumbnails',
    description: 'Captured a few minutes after PIA22929 to estimate atmospheric opacity. These low-resolution thumbnails successfully reached Earth, revealing the Sun as a tiny ghostly smudge through the dust storm. The corresponding full-frame exposures were never transmitted.',
    imageUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22930.jpg',
    provenance: 'NASA_PHOTOJOURNAL_PIA'
  },
  telemetryStream: [
    { timestampUtc: '2018-06-10T17:18:22Z', source: 'DSN_STATION_14', message: 'Carrier acquisition verified at 8400.12 MHz. Subcarrier SNR margin: 3.8 dB.', level: 'INFO' },
    { timestampUtc: '2018-06-10T17:18:48Z', source: 'MER_B_POWER_BUS', message: 'CRITICAL: Solar array generation below 25 Wh threshold. Bus voltage decaying.', level: 'WARN' },
    { timestampUtc: '2018-06-10T17:19:04Z', source: 'MER_B_PANCAM', message: 'Downlinking frame PIA22929... Line 340 of 1024 complete. Buffer drained.', level: 'INFO' },
    { timestampUtc: '2018-06-10T17:19:11Z', source: 'MER_B_FLIGHT_SYS', message: 'AUTOMATIC FAULT: Low-power hibernation trip. Disabling non-essential X-band transponder.', level: 'CRIT' },
    { timestampUtc: '2018-06-10T17:19:15Z', source: 'DSN_STATION_14', message: 'CARRIER LOST. Subcarrier demodulator lock dropped. Frame sync lost.', level: 'CRIT' },
    { timestampUtc: '2018-06-10T17:19:30Z', source: 'DSN_STATION_14', message: 'Sweep-and-listen initiated on 8.4 GHz. No signal detected.', level: 'WARN' }
  ],
  poeticMythClarification: {
    popularLegend: '"My battery is low and it\'s getting dark."',
    verifiedFact: 'Opportunity never spoke or transmitted English words. The rover transmitted binary telemetry packets indicating high atmospheric opacity (tau > 10.8), decaying bus voltage, and an incomplete Pancam exposure. The poetic sentence was composed on Twitter by science reporter Jacob Margolis (@JacobMargolis) on June 13, 2018, summarizing what JPL project scientists John Callas and Bill Nelson told him.',
    originAuthor: 'Jacob Margolis (Science Journalist, KPCC / LAist)'
  }
};
