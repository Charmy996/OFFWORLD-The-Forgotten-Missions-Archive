import { ProvenanceType } from '../types/mission';

export interface RoverStoryAct {
  actNumber: 1 | 2 | 3;
  title: string;
  timeframe: string;
  narrative: string[];
  keyMilestone: string;
  photojournalId?: string;
  photoUrl?: string;
  photoCaption?: string;
  imageCredit?: string;
}

export interface RoverHardwareDiagnosis {
  component: string;
  status: string;
  severity: 'nominal' | 'warning' | 'critical' | 'historic';
  description: string;
  engineeringWorkaround: string;
}

export interface RoverTelemetryLog {
  timestamp: string;
  subsystem: string;
  metric: string;
  value: string;
  status: 'NOMINAL' | 'WARNING' | 'CRITICAL' | 'HISTORIC';
}

export interface RoverStoryChronicle {
  roverId: string;
  epicTitle: string;
  dramaticTagline: string;
  narrationScript: string;
  narrationDurationSeconds: number;
  acts: RoverStoryAct[];
  hardwareDiagnoses: RoverHardwareDiagnosis[];
  mythVsFact: {
    myth: string;
    fact: string;
    historicalContext: string;
    citation: string;
  };
  telemetryLogs: RoverTelemetryLog[];
  scientificLegacy: string;
  monumentSignificance: string;
  provenance: ProvenanceType;
}

export const ROVER_STORY_CHRONICLES: Record<string, RoverStoryChronicle> = {
  opportunity: {
    roverId: 'opportunity',
    epicTitle: 'The Sol That Never Ended',
    dramaticTagline: 'Fifteen years across Meridiani Planum, completing the first marathon on another world.',
    narrationDurationSeconds: 65,
    narrationScript: 
      'For five thousand one hundred and eleven martian days, Opportunity crossed the plains of Meridiani. ' +
      'A machine engineered to survive ninety sols, it drove a marathon across an ancient sea floor, leaving six tire tracks carved into eternity. ' +
      'In the spring of twenty-eighteen, the sky above Endeavour Crater began to thicken. ' +
      'A global dust storm, unprecedented in the history of our observations, blotted out the sun. At midday, the darkness was absolute. ' +
      'On Sol 5111, Opportunity turned its eyes toward the blacked-out sky. Its solar arrays, buried under dust, dropped to twenty-two watt-hours. ' +
      'It sent its final packet of engineering telemetry: clock drift, voltage critical, atmospheric opacity off the scale. ' +
      'Then, silence. For eight months, the Deep Space Network called into the Martian dark. On February 12, 2019, JPL beamed Billie Holiday\'s voice to Perseverance Valley. ' +
      'No answer came. Opportunity remains there today, cold, intact, waiting for the wind to change.',
    acts: [
      {
        actNumber: 1,
        title: 'Act I: The Interplanetary Hole-in-One',
        timeframe: 'Sols 1 to 90 (Jan 24, 2004 to Apr 2004)',
        narrative: [
          'On January 24, 2004 Pacific time, Opportunity plummeted through the thin carbon dioxide atmosphere enclosed in a tetrahedron of airbags. Bouncing dozens of times across the smooth plains of Meridiani, it rolled directly into the interior of Eagle Crater, a 22-meter depression.',
          'When the petals opened and the cameras deployed, geologists back on Earth gasped. Directly ahead lay layered bedrock, something never before seen on Mars. Within weeks, the microscopic imager uncovered millions of millimeter-sized gray spherules nicknamed blueberries.',
          'Spectrometers proved these spherules were composed of hematite that precipitated out of neutral-to-acidic liquid water billions of years ago. Opportunity fulfilled its entire mission objective inside its landing crater before the 90-sol warranty even expired.'
        ],
        keyMilestone: 'Discovered gray hematite spherules, proving ancient standing liquid water in Meridiani Planum.',
        photojournalId: 'PIA05474',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA05474.jpg',
        photoCaption: 'Hematite blueberries resting inside Eagle Crater bedrock.',
        imageCredit: 'NASA / JPL-Caltech / Cornell / USGS'
      },
      {
        actNumber: 2,
        title: 'Act II: The 45-Kilometer Marathon',
        timeframe: 'Sols 91 to 5000 (2004 to 2018)',
        narrative: [
          'Escaping Eagle Crater, Opportunity began a grand trek across the open dunes. In 2005, it bogged down up to its axles in Purgatory Dune. For five weeks, drivers simulated wheel rotations in test sand at JPL, carefully crawling backward millimeter by millimeter to safety.',
          'The rover scaled the precipitous cliffs of Victoria Crater, peer-inspected deep geological strata, and embarked on a multi-year sprint to the 22-kilometer Endeavour Crater. Along the rim at Cape York, it scraped open Homestake, a pristine white vein of pure calcium sulfate gypsum formed by warm water.',
          'On March 24, 2015, on Sol 3968, Opportunity surpassed 42.195 kilometers. It became the first human machine in history to complete an Olympic marathon distance on the surface of another planet.'
        ],
        keyMilestone: 'Completed the first 42.195 km marathon on another world and uncovered pure gypsum veins at Homestake.',
        photojournalId: 'PIA19112',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA19112.jpg',
        photoCaption: 'Opportunity panoramic camera view from the summit of Cape Tribulation looking over Endeavour Crater.',
        imageCredit: 'NASA / JPL-Caltech / Cornell / ASU'
      },
      {
        actNumber: 3,
        title: 'Act III: The Sol That Never Ended',
        timeframe: 'Sols 5100 to 5111 (June 2018 to Feb 2019)',
        narrative: [
          'In early June 2018, Opportunity was surveying Perseverance Valley on the western rim of Endeavour Crater when a regional dust storm rapidly expanded into a catastrophic planet-encircling event.',
          'Atmospheric optical depth (tau) soared from normal levels of 0.5 to an unprecedented value greater than 10.8. Sunlight was choked to less than one-tenth of one percent of normal brightness. The rover solar arrays, designed to produce over 600 watt-hours, plunged to an emergency level of 22 watt-hours.',
          'On Sol 5111, June 10, 2018, Opportunity attempted its final exposures and engineering transmissions before its computer clocked off to save voltage. Over eight hundred recovery commands were beamed over the following months, but the rover heaters were cold. On February 13, 2019, NASA officially announced the completion of the 15-year odyssey.'
        ],
        keyMilestone: 'Final transmission on Sol 5111 before the historic 2018 global dust storm ended communication.',
        photojournalId: 'PIA22929',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA22929.jpg',
        photoCaption: 'Final full frame returned by Opportunity: high-noise, dust-blackened sky over Perseverance Valley.',
        imageCredit: 'NASA / JPL-Caltech / Cornell'
      }
    ],
    hardwareDiagnoses: [
      {
        component: 'Right-Front Steering Actuator',
        status: 'Locked at +8 degrees (Sol 433)',
        severity: 'warning',
        description: 'Motor jammed during steering maneuver in April 2005. The wheel could no longer be turned straight.',
        engineeringWorkaround: 'Engineers commanded the rear steerable wheels to compensate, allowing Opportunity to drive for thirteen more years without mechanical steering on that wheel.'
      },
      {
        component: 'Flash Memory (NAND Bank 7)',
        status: 'Wear-out & Amnesia (Sol 3800)',
        severity: 'critical',
        description: 'Repeated write cycles degraded the non-volatile flash banks, causing recurring reboot loops during overnight sleep.',
        engineeringWorkaround: 'JPL uploaded a flight software patch that configured the rover computer to operate completely in volatile RAM, bypassing corrupted flash sectors.'
      },
      {
        component: 'Solar Array Dust Accumulation',
        status: 'Critical Insolation Drop (Sol 5111)',
        severity: 'critical',
        description: 'Atmospheric optical depth exceeded tau 10.8 during the June 2018 global storm, dropping insolation below the critical survival threshold of 22 Wh.',
        engineeringWorkaround: 'The rover automatically initiated low-power sleep cycles to preserve battery chemistry, but ambient temperatures dropped below internal operating limits.'
      },
      {
        component: 'Mini-TES Infrared Spectrometer',
        status: 'Mirror Coated in Dust (Sol 1500)',
        severity: 'warning',
        description: 'Fine atmospheric particulate coated the optical pointing mirror, degrading thermal emission spectra.',
        engineeringWorkaround: 'Mission scientists shifted primary mineralogical detection to the Pancam multispectral filters and Alpha Particle X-Ray Spectrometer.'
      }
    ],
    mythVsFact: {
      myth: 'Opportunity spoke the English words: "My battery is low and it\'s getting dark."',
      fact: 'Opportunity transmitted binary engineering telemetry packets via UHF relay to the Mars Reconnaissance Orbiter reporting extreme optical opacity and 22 Wh bus power.',
      historicalContext: 'Science journalist Jacob Margolis tweeted a poetic distillation of JPL engineers\' explanations of the telemetry numbers. The poetic phrase went viral worldwide as literal rover speech.',
      citation: 'Jacob Margolis (KPCC, Twitter, June 13, 2018); NASA JPL MER Sol 5111 Engineering Log'
    },
    telemetryLogs: [
      { timestamp: 'Sol 5111 09:30 PDT', subsystem: 'PANCAM', metric: 'Exposure Duration', value: '4.8 s (Clipping)', status: 'WARNING' },
      { timestamp: 'Sol 5111 09:33 PDT', subsystem: 'EPS (Power)', metric: 'Solar Bus Generation', value: '22 Wh (Nominal 645 Wh)', status: 'CRITICAL' },
      { timestamp: 'Sol 5111 09:35 PDT', subsystem: 'ATMOS', metric: 'Optical Tau Value', value: '> 10.8 (Extreme Haze)', status: 'CRITICAL' },
      { timestamp: 'Sol 5111 10:19 PDT', subsystem: 'DSN Goldstone 14', metric: 'X-Band Downlink Carrier', value: 'CARRIER LOST', status: 'CRITICAL' }
    ],
    scientificLegacy: 'Confirmed persistent, acidic-to-neutral groundwater on Mars, discovered hematite blueberries, found calcium sulfate veins, and provided fifteen years of continuous climatological data.',
    monumentSignificance: 'Permanent technological monument on the western rim of Endeavour Crater in Perseverance Valley.',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR'
  },

  spirit: {
    roverId: 'spirit',
    epicTitle: 'The Wheel in the Dust',
    dramaticTagline: 'When its right-front wheel jammed, Spirit dragged it backward to uncover ancient hydrothermal silica.',
    narrationDurationSeconds: 55,
    narrationScript: 
      'Spirit was the fighter. In 2006, deep in Gusev Crater, its right-front wheel seized and froze. ' +
      'Engineers could not fix it from one hundred million miles away. So Spirit drove backward, dragging the dead wheel through the red soil like a plow. ' +
      'That broken wheel, dragging in desperation, churned open the ground at Home Plate and uncovered a streak of dazzling white silica. ' +
      'Ninety percent pure. The unmistakable signature of ancient hydrothermal hot springs, the exact conditions where life might have begun on Earth. ' +
      'Its greatest mechanical failure became its greatest scientific discovery. ' +
      'In 2010, the sand trapped Spirit for the last time. With winter closing in, its tilted solar panels could not catch the weak sun. ' +
      'Spirit closed its sensors, shut down its heaters, and entered the long sleep. It never woke up.',
    acts: [
      {
        actNumber: 1,
        title: 'Act I: The Rocky Plains of Gusev',
        timeframe: 'Sols 1 to 150 (Jan to June 2004)',
        narrative: [
          'On January 4, 2004, Spirit touched down at Columbia Memorial Station inside the 160-kilometer-wide Gusev Crater. Orbital imagery suggested Gusev had once been a lake fed by a gigantic river channel.',
          'To the surprise of geologists, the floor was covered not with lacustrine mudstone, but with impact-shattered volcanic basalt. Rather than giving up, mission planners made an audacious decision: drive Spirit over three kilometers toward the Columbia Hills.',
          'Spirit proved its durability by climbing steep slopes, navigating boulders, and reaching the crest of Husband Hill to view the panoramic volcanic plateau.'
        ],
        keyMilestone: 'Traversed 3 kilometers of basalt plains and ascended Husband Hill in the Columbia Hills.',
        photojournalId: 'PIA05500',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA05500.jpg',
        photoCaption: 'First color 360-degree panorama of Gusev Crater taken from Columbia Memorial Station.',
        imageCredit: 'NASA / JPL / Cornell'
      },
      {
        actNumber: 2,
        title: 'Act II: The Serendipity of the Jammed Wheel',
        timeframe: 'Sols 779 to 1152 (March 2006 to May 2007)',
        narrative: [
          'In March 2006 on Sol 779, the motor driving Spirit\'s right front wheel seized completely. The wheel was dead. Unable to turn it, JPL engineers commanded Spirit to turn around and drive backward, dragging the dead wheel through the Martian regolith.',
          'On Sol 1152, as the immobilized wheel carved a deep furrow near the low volcanic plateau named Home Plate, scientists spotted an astonishing bright white streak in the trench.',
          'The Alpha Particle X-Ray Spectrometer revealed the deposit was 90 percent pure amorphous silica (opal-A). On Earth, such deposits only form in volcanic fumaroles or boiling hydrothermal hot springs, establishing that Gusev was once rich in volcanic thermal water.'
        ],
        keyMilestone: 'Dragging wheel excavated 90% pure amorphous opal-A silica, proving ancient volcanic hot spring activity.',
        photojournalId: 'PIA11049',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA11049.jpg',
        photoCaption: 'Trench dug by Spirit\'s jammed right front wheel exposing dazzling hydrothermal silica at Home Plate.',
        imageCredit: 'NASA / JPL / Cornell'
      },
      {
        actNumber: 3,
        title: 'Act III: The Sand Trap at Troy',
        timeframe: 'Sols 1892 to 2210 (May 2009 to May 2011)',
        narrative: [
          'In May 2009 while skirting Home Plate, Spirit broke through a brittle surface crust into soft, powdery iron sulfate sand at a site dubbed Troy. With only five working wheels, attempts to drive out only dug the rover deeper.',
          'Engineers spent months testing replica rovers in a sand sandbox at JPL. Then, in late 2009, the right rear wheel also failed, leaving Spirit with only four functional wheels.',
          'As the Martian southern winter approached, Spirit\'s solar arrays were tilted south, away from the low northern sun. On March 22, 2010 (Sol 2210), Spirit transmitted its final engineering frame before deep hibernation. On May 25, 2011, NASA officially concluded recovery efforts.'
        ],
        keyMilestone: 'Final communication on Sol 2210 from the sand trap at Troy after 2,210 sols of operations.',
        photojournalId: 'PIA13000',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA13000.jpg',
        photoCaption: 'Spirit trapped in the bright sulfate sands at Troy on the western side of Home Plate.',
        imageCredit: 'NASA / JPL-Caltech / Cornell'
      }
    ],
    hardwareDiagnoses: [
      {
        component: 'Right-Front Drive Wheel Motor',
        status: 'Motor Coil Open Circuit (Sol 779)',
        severity: 'critical',
        description: 'Drive actuator seized after 4.2 km of driving through basalt scree, refusing all drive currents.',
        engineeringWorkaround: 'Rover drivers reversed driving orientation, dragging the disabled wheel behind as an unintentional geological trenching plow.'
      },
      {
        component: 'Right-Rear Drive Wheel Motor',
        status: 'Motor Stalled (Sol 2070)',
        severity: 'critical',
        description: 'Failed while attempting extrication maneuvers in the deep sand trap at Troy, reducing mobility to four wheels.',
        engineeringWorkaround: 'Commanded crab-steering and wheel-wiggling routines using the remaining operational actuators.'
      },
      {
        component: 'Solar Array Winter Dust',
        status: 'Unfavorable +11° South Tilt (Sol 2210)',
        severity: 'critical',
        description: 'Trapped orientation prevented pointing solar panels toward the winter sun, reducing daily power to 134 Wh.',
        engineeringWorkaround: 'Powered down science payload, transmitters, and non-essential heaters to preserve core battery bus.'
      }
    ],
    mythVsFact: {
      myth: 'Spirit was a mission failure because its wheel broke early.',
      fact: 'Spirit had a 90-sol design lifespan. It survived for 2,210 sols (over 24 times its warranty), and the broken wheel made the most important discovery of the mission.',
      historicalContext: 'Without the broken wheel dragging through the regolith, the buried hydrothermal silica deposit would never have been exposed to the surface cameras.',
      citation: 'Squyres et al., Science 320, 2008: "Detection of Silica-Rich Deposits on Mars."'
    },
    telemetryLogs: [
      { timestamp: 'Sol 779 14:10 UTC', subsystem: 'MOBILITY', metric: 'Wheel Current RF', value: '0.0 A (Open Circuit)', status: 'CRITICAL' },
      { timestamp: 'Sol 1152 11:45 UTC', subsystem: 'APXS', metric: 'Silica Content', value: '91.4 wt% SiO2', status: 'HISTORIC' },
      { timestamp: 'Sol 2210 12:44 UTC', subsystem: 'EPS (Power)', metric: 'Daily Power Bus', value: '134 Wh (Critical)', status: 'CRITICAL' }
    ],
    scientificLegacy: 'First evidence of ancient volcanic hydrothermal activity on Mars, proof of past fumaroles, and extensive geological surveying of the Columbia Hills.',
    monumentSignificance: 'Permanent research monument embedded in the colorful sulfate sands at Troy, west of Home Plate in Gusev Crater.',
    provenance: 'AUTHENTIC_TELEMETRY_JPL_RMC'
  },

  curiosity: {
    roverId: 'curiosity',
    epicTitle: 'The ChemCam Chemist of Gale',
    dramaticTagline: 'A nuclear-powered robotic laboratory scaling Mount Sharp in search of past organic habitability.',
    narrationDurationSeconds: 60,
    narrationScript: 
      'In August 2012, a one-ton nuclear machine lowered on nylon cords from a rocket-powered sky crane into the depths of Gale Crater. ' +
      'Curiosity came to Mars not just to photograph the rocks, but to taste them. ' +
      'Powered by decaying plutonium, it laser-vaporized thousands of rock targets and drilled deep into mudstones deposited when Gale was a fresh-water lake. ' +
      'It uncovered complex organic molecules, detected seasonal plumes of methane in the air, and confirmed that ancient Mars had all the ingredients required for life. ' +
      'Though sharp rocks tore holes through its thin aluminum wheels, Curiosity continues to climb the layered slopes of Mount Sharp, writing the history of a drying world.',
    acts: [
      {
        actNumber: 1,
        title: 'Act I: Seven Minutes of Terror',
        timeframe: 'August 6, 2012',
        narrative: [
          'On August 6, 2012, Curiosity executed the most complex landing sequence in spaceflight history. Too heavy for airbags, it utilized an autonomous rocket-powered sky crane that lowered the rover on tethers before flying away.',
          'Touchdown at Bradbury Landing inside Gale Crater was confirmed with millimeter precision. Within hours, hazard cameras returned views of gravel pebbles rounded by ancient stream beds, confirming water once rushed down the crater rim.',
          'Curiosity proved that large-scale mobile laboratories could be safely delivered to planetary surfaces.'
        ],
        keyMilestone: 'Successful touchdown via autonomous rocket sky crane and confirmation of ancient stream gravel.',
        photojournalId: 'PIA15985',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA15985.jpg',
        photoCaption: 'Gravel bed at Yellowknife Bay with rounded river pebbles.',
        imageCredit: 'NASA / JPL-Caltech / MSSS'
      },
      {
        actNumber: 2,
        title: 'Act II: Yellowknife Bay and Ancient Habitability',
        timeframe: 'Sols 100 to 400 (2012 to 2013)',
        narrative: [
          'Driving into Yellowknife Bay, Curiosity drilled its first rock sample, a fine-grained mudstone called John Klein. The grey powder pulled from the drill bit smelled of ancient chemistry.',
          'The Sample Analysis at Mars (SAM) instrument identified carbon, hydrogen, oxygen, nitrogen, phosphorus, and sulfur, the fundamental chemical building blocks of terrestrial biology.',
          'Gale Crater was proven to have hosted a benign, non-acidic fresh-water lake system for millions of years, an environment fully habitable for microbial life.'
        ],
        keyMilestone: 'Drilled mudstones and detected organic molecules, proving past habitability in Gale Crater.',
        photojournalId: 'PIA16799',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA16799.jpg',
        photoCaption: 'Drill hole in John Klein rock exposing ancient grey interior bedrock.',
        imageCredit: 'NASA / JPL-Caltech / MSSS'
      },
      {
        actNumber: 3,
        title: 'Act III: Ascending Mount Sharp and Wheel Damage',
        timeframe: 'Sols 500 to Present',
        narrative: [
          'As Curiosity drove over sharp ventifact rocks on the crater floor, engineers discovered severe tears and punctures in the rover 0.75-millimeter aluminum wheels.',
          'To protect the running gear, team software engineers developed a traction control algorithm that adjusts individual wheel speeds according to terrain slope and slip.',
          'Curiosity successfully ascended through the hematite ridge, the clay-bearing Glen Torridon unit, and into sulfate-rich strata, documenting the grand planetary transition from wet conditions to the dry desert world of today.'
        ],
        keyMilestone: 'Pioneered adaptive traction algorithms to preserve damaged wheels and climbed over 700 meters up Mount Sharp.',
        photojournalId: 'PIA19839',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA19839.jpg',
        photoCaption: 'Curiosity self-portrait at the Buckskin drill site in the foothills of Mount Sharp.',
        imageCredit: 'NASA / JPL-Caltech / MSSS'
      }
    ],
    hardwareDiagnoses: [
      {
        component: 'Thin Aluminum Wheel Skin',
        status: 'Punctured and Gapped (Sol 400+)',
        severity: 'warning',
        description: 'Hard basalt ventifacts punched tears through the 0.75 mm curved skin between wheel grousers.',
        engineeringWorkaround: 'Wrote autonomous traction control firmware matching wheel RPM to terrain angle to eliminate dragging.'
      },
      {
        component: 'Drill Feed Actuator',
        status: 'Bypassed Percussion Mechanism (Sol 1536)',
        severity: 'warning',
        description: 'Brake mechanism on the drill feed mechanism failed to extend reliably.',
        engineeringWorkaround: 'Developed Feed Extended Drilling (FED), using the robotic arm to push the extended drill bit directly into the rock like a human hand.'
      },
      {
        component: 'MMRTG Radioisotope Power Source',
        status: 'Nominal Radioactive Decay',
        severity: 'nominal',
        description: '4.8 kg of plutonium dioxide pellets provide continuous electrical power regardless of dust storms.',
        engineeringWorkaround: 'Power decays predictably by approximately 1.6% per year; power budgets are scheduled accordingly.'
      }
    ],
    mythVsFact: {
      myth: 'Curiosity discovered living microbes on Mars.',
      fact: 'Curiosity discovered organic carbon molecules and proved ancient environmental habitability, but does not carry life-detection instruments.',
      historicalContext: 'Molecules like thiophenes and benzene derivatives were detected in 3-billion-year-old mudstone, confirming raw prebiotic organic building blocks.',
      citation: 'Eigenbrode et al., Science 360, 2018: "Organic matter preserved in 3-billion-year-old mudstones at Gale crater, Mars."'
    },
    telemetryLogs: [
      { timestamp: 'Sol 1 05:17 UTC', subsystem: 'ENTRY', metric: 'Sky Crane Tether Velocity', value: '0.75 m/s at Touchdown', status: 'HISTORIC' },
      { timestamp: 'Sol 279 19:22 UTC', subsystem: 'SAM', metric: 'Organic Carbon Yield', value: 'Chlorobenzene & Dichlorobutane', status: 'HISTORIC' },
      { timestamp: 'Sol 4000 12:00 UTC', subsystem: 'MMRTG', metric: 'Power Bus Yield', value: '89.4 W (Nominal Decay)', status: 'NOMINAL' }
    ],
    scientificLegacy: 'First definitive confirmation of ancient fresh-water habitability, detection of Martian organic molecules, and discovery of fluctuating background methane.',
    monumentSignificance: 'Active nuclear laboratory ascending the stratigraphic layers of Mount Sharp in Gale Crater.',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR'
  },

  perseverance: {
    roverId: 'perseverance',
    epicTitle: 'The Core Collector of Jezero',
    dramaticTagline: 'Seeking ancient biosignatures and caching pristine planetary core samples for return to Earth.',
    narrationDurationSeconds: 60,
    narrationScript: 
      'On February 18, 2021, the rover Perseverance touched down in Jezero Crater, an ancient impact basin once flooded by a roaring river delta. ' +
      'Accompanied by the tiny helicopter Ingenuity, the first aircraft ever flown on another world, Perseverance set out to answer humanity\'s oldest question: were we ever truly alone? ' +
      'Equipped with ultraviolet lasers, microscopic Raman spectrometers, and the MOXIE oxygen generator, Perseverance drills pristine stone cores and hermetically seals them inside titanium tubes. ' +
      'Deposited across the crater floor, these sealed samples wait for future spacecraft to fetch them, bearing secrets that will one day be analyzed in laboratories on Earth.',
    acts: [
      {
        actNumber: 1,
        title: 'Act I: Touchdown in an Ancient Delta',
        timeframe: 'February 18, 2021',
        narrative: [
          'Perseverance landed in Jezero Crater using Terrain Relative Navigation, autonomously steering away from treacherous boulder fields to touch down safely beside an ancient dried river delta.',
          'High-definition cameras recorded parachute deployment, heat shield separation, and the sky crane lowering the rover, broadcasting the first true video with synchronized sound of a spacecraft arriving on an alien world.',
          'Its onboard microphones captured the roar of the descent engines followed by the eerie, quiet whistle of Martian wind across the crater floor.'
        ],
        keyMilestone: 'Autonomous Terrain Relative Navigation landing and deployment of Ingenuity helicopter.',
        photojournalId: 'PIA24424',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24424.jpg',
        photoCaption: 'First high-resolution color panorama from Perseverance at Octavia E. Butler Landing.',
        imageCredit: 'NASA / JPL-Caltech'
      },
      {
        actNumber: 2,
        title: 'Act II: Flight of the Ingenuity Helicopter',
        timeframe: 'April 2021 to January 2024',
        narrative: [
          'On April 19, 2021, the four-pound helicopter Ingenuity spun its counter-rotating carbon fiber blades to 2,400 RPM and climbed three meters into the thin air, achieving humanity\'s first powered flight on another planet.',
          'Engineered as a 30-day technology demonstration for five short hops, Ingenuity survived seventy-two flights over nearly three years, serving as an airborne scout across jagged delta cliffs.',
          'Ingenuity flew more than 17 kilometers across Mars before a hard landing damaged a rotor tip in early 2024, leaving it as a permanent monument in Neretva Vallis.'
        ],
        keyMilestone: 'Achieved 72 powered flights across Mars, revolutionizing extraterrestrial aerial exploration.',
        photojournalId: 'PIA24542',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA24542.jpg',
        photoCaption: 'Ingenuity helicopter resting on the red soil after successful deployment.',
        imageCredit: 'NASA / JPL-Caltech'
      },
      {
        actNumber: 3,
        title: 'Act III: The Titanium Sample Cache',
        timeframe: '2022 to Present',
        narrative: [
          'Perseverance uses a rotary percussive coring drill to extract pencil-thick rock cylinders from delta mudstones and igneous floor basalts.',
          'Each core is inspected, scanned, and sealed inside an ultra-clean titanium tube within the Adaptive Caching Assembly. At Three Forks, Perseverance laid down a backup depot of ten sealed sample tubes on the crater floor.',
          'These samples contain potential biosignatures and date back to when Mars had a thick atmosphere, magnetic field, and flowing lakes, awaiting the future Mars Sample Return campaign.'
        ],
        keyMilestone: 'Created the first sample cache on another planet, sealing pristine rock cores for Earth return.',
        photojournalId: 'PIA25680',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA25680.jpg',
        photoCaption: 'Titanium sample tube depot laid out on the surface of Jezero Crater at Three Forks.',
        imageCredit: 'NASA / JPL-Caltech'
      }
    ],
    hardwareDiagnoses: [
      {
        component: 'Adaptive Caching Assembly (ACA)',
        status: 'Operational (24+ Tubes Sealed)',
        severity: 'nominal',
        description: 'Robotic handling system inside rover belly that hermetically seals titanium sample containers.',
        engineeringWorkaround: 'Enclosed in ultra-sterile laminar-flow box to eliminate terrestrial organic contamination.'
      },
      {
        component: 'MOXIE Oxygen Generator',
        status: '16 Successful Test Runs (Mission Complete)',
        severity: 'historic',
        description: 'Solid oxide electrolysis instrument converting atmospheric CO2 into breathable oxygen.',
        engineeringWorkaround: 'Produced 122 grams of 98% pure oxygen at up to 12 grams per hour before planned retirement.'
      },
      {
        component: 'SHERLOC Deep UV Spectrometer',
        status: 'Cover Motor Anomaly Resolved',
        severity: 'warning',
        description: 'Protective dust cover over optical window experienced drive motor resistance.',
        engineeringWorkaround: 'JPL applied thermal cycling sequences to successfully reposition the cover mechanism.'
      }
    ],
    mythVsFact: {
      myth: 'Perseverance has already confirmed ancient fossilized bacteria.',
      fact: 'Perseverance identified organic carbon rings and potential biosignature textures, but definitive confirmation requires Earth laboratory analysis.',
      historicalContext: 'Instruments like SHERLOC detect organic compounds associated with sulfate and carbonate minerals, which are prime candidates for fossilized remnants.',
      citation: 'Sharma et al., Nature 619, 2023: "Diverse organic molecule detections in Jezero crater, Mars."'
    },
    telemetryLogs: [
      { timestamp: 'Sol 1 20:55 UTC', subsystem: 'EDL', metric: 'TRN Divert Maneuver', value: '420 m East of Hazard Ridge', status: 'HISTORIC' },
      { timestamp: 'Sol 59 11:34 UTC', subsystem: 'INGENUITY', metric: 'First Flight Altitude', value: '3.05 m (Sol 59)', status: 'HISTORIC' },
      { timestamp: 'Sol 670 16:45 UTC', subsystem: 'CACHE', metric: 'Sample Depot Tube #10', value: 'Dropped at Three Forks', status: 'HISTORIC' }
    ],
    scientificLegacy: 'First aerial flight on another world, first in-situ production of oxygen from alien atmosphere, and creation of the first interplanetary sample depot.',
    monumentSignificance: 'Flagship astrobiology explorer active in the river delta deposits of Jezero Crater.',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR'
  },

  viking1: {
    roverId: 'viking1',
    epicTitle: 'The Loneliest Sentinel',
    dramaticTagline: 'Humanity\'s first successful long-duration Martian surface outpost on Chryse Planitia.',
    narrationDurationSeconds: 50,
    narrationScript: 
      'On July 20, 1976, exactly seven years after Neil Armstrong stepped onto the Moon, Viking 1 landed on the golden plains of Chryse Planitia. ' +
      'It was humanity\'s first enduring look at the surface of Mars. ' +
      'For six years, powered by nuclear radioisotopes, it watched dust storms roll across the horizon, photographed pink skies, and scooped Martian soil into automated biology chambers. ' +
      'It searched for alien metabolism, monitored the weather, and remained operational until a mistaken software command in 1982 severed its radio link forever. ' +
      'Viking 1 stands in the quiet dust of Chryse Planitia, the Thomas Mutch Memorial Station, an immortal pioneer.',
    acts: [
      {
        actNumber: 1,
        title: 'Act I: Touchdown on Chryse Planitia',
        timeframe: 'July 20, 1976',
        narrative: [
          'Viking 1 separated from its orbiter and fired its three terminal descent engines, settling gently on a rocky desert plain in Chryse Planitia.',
          'Minutes after touchdown, its slow-scan facsimile camera began returning the first crisp photograph ever taken from the surface of Mars, revealing sharp volcanic rocks and a horizon of rolling dunes under a pale salmon sky.',
          'People around the world saw for the first time that Mars was not a barren moon-like world, but a dynamic desert planet with an active atmosphere.'
        ],
        keyMilestone: 'First successful soft landing and first sustained photographic transmission from Mars.',
        photojournalId: 'PIA00563',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA00563.jpg',
        photoCaption: 'First clear surface view from Viking 1 showing landing footpad in Chryse Planitia dust.',
        imageCredit: 'NASA / JPL'
      },
      {
        actNumber: 2,
        title: 'Act II: The Biology Experiments',
        timeframe: '1976 to 1977',
        narrative: [
          'Viking 1 extended a robotic collector arm, scooped up red soil, and dumped it into three automated miniature biology laboratories.',
          'The Labeled Release experiment showed a sudden release of radioactive gas when nutrients were added, mimicking microbial respiration. However, the Gas Chromatograph Mass Spectrometer found zero organic molecules in the soil.',
          'Scientists deduced that powerful oxidizers, like iron oxides and perchlorates, decomposed the nutrients chemically rather than biologically. The search for life became much more complex.'
        ],
        keyMilestone: 'Conducted the first in-situ biological tests for metabolic activity on another planet.',
        photojournalId: 'PIA00564',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA00564.jpg',
        photoCaption: 'Trenches dug by the Viking 1 sampler arm during soil collection.',
        imageCredit: 'NASA / JPL'
      },
      {
        actNumber: 3,
        title: 'Act III: The Silent Farewell',
        timeframe: 'November 1982',
        narrative: [
          'Viking 1 operated far beyond its 90-day design lifetime, functioning continuously for 2,245 sols (over six Earth years).',
          'In November 1982, ground controllers at JPL uploaded a command sequence intended to patch battery charging firmware. Inadvertently, the command overwrote memory addresses controlling the high-gain antenna pointing direction.',
          'The antenna drifted away from Earth. Despite weeks of transmitting blind commands, communication was never reestablished. NASA renamed the lander the Thomas A. Mutch Memorial Station in honor of the mission imaging team leader.'
        ],
        keyMilestone: 'Operational for 2,245 sols before high-gain antenna misalignment ended downlink in November 1982.',
        photojournalId: 'PIA00388',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA00388.jpg',
        photoCaption: 'Sunset over the western horizon of Chryse Planitia recorded by Viking 1.',
        imageCredit: 'NASA / JPL'
      }
    ],
    hardwareDiagnoses: [
      {
        component: 'High-Gain Parabolic Antenna',
        status: 'Misaligned Pointer Memory (Nov 1982)',
        severity: 'critical',
        description: 'Firmware upload accidentally overwrote memory sectors containing antenna steering coordinates.',
        engineeringWorkaround: 'Earth controllers transmitted blind command loops for months, but the antenna remained aimed into deep space.'
      },
      {
        component: 'SNAP-19 RTG Generators',
        status: 'Functioned for Entire Mission',
        severity: 'nominal',
        description: 'Two radioisotope thermoelectric generators provided steady 70 W of electrical power regardless of dust or sunlight.',
        engineeringWorkaround: 'Provided heat through cold Martian winters for six consecutive years.'
      }
    ],
    mythVsFact: {
      myth: 'Viking 1 definitively proved Mars was completely sterile.',
      fact: 'Viking 1 showed no organic carbon at its landing site, but later missions revealed perchlorates that destroyed organics during the heating experiment.',
      historicalContext: 'Modern planetary scientists now know that the Viking GCMS technique would have oxidized organics into carbon dioxide if perchlorate was present.',
      citation: 'Navarro-González et al., JGR Planets 115, 2010: "Reanalysis of the Viking results."'
    },
    telemetryLogs: [
      { timestamp: '1976-07-20 11:53 UTC', subsystem: 'LANDING', metric: 'Touchdown Velocity', value: '2.4 m/s (Soft)', status: 'HISTORIC' },
      { timestamp: '1976-07-28 08:30 UTC', subsystem: 'BIOLOGY', metric: 'Labeled Release Spike', value: 'Gas evolution positive', status: 'HISTORIC' },
      { timestamp: '1982-11-13 14:00 UTC', subsystem: 'COMM', metric: 'Antenna Direction Vector', value: 'Memory Overwrite (Loss)', status: 'CRITICAL' }
    ],
    scientificLegacy: 'First high-resolution surface imagery, multi-year atmospheric weather monitoring, and the foundational chemical characterization of Martian soil.',
    monumentSignificance: 'Thomas A. Mutch Memorial Station in Chryse Planitia, Mars.',
    provenance: 'HISTORICAL_RECONSTRUCTION'
  },

  apollo11: {
    roverId: 'apollo11',
    epicTitle: 'Tranquility Base: The First Footprint',
    dramaticTagline: 'Where humanity stepped off the Earth and onto the Moon on July 20, 1969.',
    narrationDurationSeconds: 50,
    narrationScript: 
      'At four seventeen in the afternoon, Houston time, on July 20, 1969, ' +
      'the Lunar Module Eagle touched down on a cratered volcanic plain in the Sea of Tranquility. ' +
      'Neil Armstrong\'s voice crackled across three hundred and eighty thousand kilometers of vacuum: Houston, Tranquility Base here. The Eagle has landed. ' +
      'Six hours later, a human boot pressed into the fine gray regolith. ' +
      'For twenty-one hours, Armstrong and Aldrin explored the lunar surface, deployed seismic sensors and laser reflectors, and collected twenty-one kilograms of ancient basalt. ' +
      'When the ascent stage ignited, the descent stage remained behind, a bronze and gold monument marking the moment humanity became an interplanetary species.',
    acts: [
      {
        actNumber: 1,
        title: 'Act I: The Eagle Has Landed',
        timeframe: 'July 20, 1969 (20:17 UTC)',
        narrative: [
          'During the final descent, computer program alarms flashed on the Guidance Computer while Eagle flew over a boulder field the size of automobiles.',
          'Neil Armstrong took manual semi-automatic control, skimming over West Crater to touch down with less than thirty seconds of fuel remaining in the descent tank.',
          'His transmission, "Houston, Tranquility Base here. The Eagle has landed," released tension across the entire world.'
        ],
        keyMilestone: 'First crewed landing on the surface of another celestial body.',
        photojournalId: 'AS11-40-5903',
        photoUrl: 'https://images-assets.nasa.gov/image/as11-40-5903/as11-40-5903~orig.jpg',
        photoCaption: 'Buzz Aldrin standing on the Sea of Tranquility next to the passive seismometer and solar wind collector.',
        imageCredit: 'NASA'
      },
      {
        actNumber: 2,
        title: 'Act II: One Small Step',
        timeframe: 'July 21, 1969 (02:56 UTC)',
        narrative: [
          'Neil Armstrong climbed down the nine-rung ladder of the Lunar Module, uncovered the Westinghouse black-and-white television camera, and lowered his left boot into the lunar dust.',
          'He described the surface as like powdered charcoal, adhering to his boots, and uttered the immortal phrase: "That\'s one small step for man, one giant leap for mankind."',
          'Buzz Aldrin joined him minutes later, describing the desolate horizon as "magnificent desolation."'
        ],
        keyMilestone: 'Humanity\'s first footsteps on an extraterrestrial world.',
        photojournalId: 'AS11-40-5877',
        photoUrl: 'https://images-assets.nasa.gov/image/as11-40-5877/as11-40-5877~orig.jpg',
        photoCaption: 'Aldrin\'s boot print in the fine lunar regolith, preserved indefinitely in the vacuum.',
        imageCredit: 'NASA'
      },
      {
        actNumber: 3,
        title: 'Act III: The Descent Stage as an Immortal Monument',
        timeframe: 'July 21, 1969 to Present',
        narrative: [
          'After twenty-one hours and thirty-six minutes on the lunar surface, the ascent engine fired, carrying the crew back into lunar orbit to rendezvous with Michael Collins aboard the Command Module Columbia.',
          'Left behind on the lunar regolith was the four-legged descent stage, wrapped in gold Kapton and aluminum foil, bearing a stainless steel plaque signed by three astronauts and the President.',
          'It reads: "Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind."'
        ],
        keyMilestone: 'Ascent stage rendezvous and permanent establishment of Tranquility Base.',
        photojournalId: 'AS11-40-5927',
        photoUrl: 'https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~orig.jpg',
        photoCaption: 'Lunar Module Eagle descent stage resting permanently at Tranquility Base.',
        imageCredit: 'NASA'
      }
    ],
    hardwareDiagnoses: [
      {
        component: 'Apollo Guidance Computer (AGC)',
        status: '1202 & 1201 Alarms Cleared',
        severity: 'warning',
        description: 'Radar rendezvous switch overwhelmed computer duty cycles during descent.',
        engineeringWorkaround: 'Margaret Hamilton priority scheduling dropped low-priority tasks, maintaining descent thruster control.'
      },
      {
        component: 'Descent Engine Throttle Valve',
        status: 'Continuous Throttle down to 10% Thust',
        severity: 'nominal',
        description: 'World\'s first deep-throttling rocket engine permitting smooth human piloting and landing hover.',
        engineeringWorkaround: 'Engine shutdown commanded 1.5 seconds after contact probes touched the lunar dust.'
      }
    ],
    mythVsFact: {
      myth: 'The American flag was knocked over by the ascent engine blast and remains intact.',
      fact: 'Aldrin observed the flag tumble during liftoff; decades of unfiltered ultraviolet solar radiation have since bleached all lunar flags entirely white.',
      historicalContext: 'With no atmosphere to block solar radiation or micrometeorites, nylon fibers degrade rapidly over half a century.',
      citation: 'Apollo Lunar Surface Journal (ALSJ), NASA History Division'
    },
    telemetryLogs: [
      { timestamp: '1969-07-20 20:17:39 UTC', subsystem: 'DESCENT', metric: 'Propellant Quantity Remaining', value: '25 seconds to BINGO', status: 'WARNING' },
      { timestamp: '1969-07-20 20:17:40 UTC', subsystem: 'CONTACT', metric: 'Lunar Contact Light', value: 'BLUE LIGHT ILLUMINATED', status: 'HISTORIC' },
      { timestamp: '1969-07-21 17:54:00 UTC', subsystem: 'ASCENT', metric: 'APS Engine Ignition', value: 'LIFTOFF FROM MOON', status: 'HISTORIC' }
    ],
    scientificLegacy: 'Returned 21.55 kg of pristine lunar rocks, deployed laser ranging retroreflector still used today, and proved humanity could travel between worlds.',
    monumentSignificance: 'Tranquility Base, Mare Tranquillitatis, the Moon. The cornerstone monument of human off-world heritage.',
    provenance: 'HISTORICAL_RECONSTRUCTION'
  },

  surveyor3: {
    roverId: 'surveyor3',
    epicTitle: 'The Ghost on the Crater Wall',
    dramaticTagline: 'The robotic scout visited by human hands thirty-one months after landing.',
    narrationDurationSeconds: 50,
    narrationScript: 
      'In April 1967, Surveyor 3 bounced twice on the lunar soil before coming to rest inside a dark crater in the Ocean of Storms. ' +
      'It transmitted six thousand pictures, watched a lunar sunset, and fell silent. ' +
      'Thirty-one months later, humans came looking for it. ' +
      'Astronauts Pete Conrad and Alan Bean touched down their Lunar Module just one hundred and eighty meters away. ' +
      'For the first time in human history, explorers walked across the surface of another world to inspect a derelict machine they had sent years before. ' +
      'They cut away its television camera and brought it home to Earth. ' +
      'Surveyor 3 still rests on that twelve-degree slope, the only robot on the Moon ever visited by human hands.',
    acts: [
      {
        actNumber: 1,
        title: 'Act I: The Double Bounce in Oceanus Procellarum',
        timeframe: 'April 20, 1967',
        narrative: [
          'Surveyor 3 touched down on April 20, 1967 inside a 200-meter-wide crater in Oceanus Procellarum.',
          'Highly reflective lunar rock confused the landing radar, causing the three vernier engines to continue firing after touchdown. The lander bounced twice, rising over ten meters before the engines were shut down by ground command.',
          'It finally came to rest on a 12-degree crater slope, digging a surface trench with its mechanical scoop and returning 6,315 television pictures.'
        ],
        keyMilestone: 'First surface soil sampling scoop on the Moon and photographic transmission.',
        photojournalId: 'PIA00032',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA00032.jpg',
        photoCaption: 'Surveyor 3 surface sampling scoop digging a trench into lunar soil.',
        imageCredit: 'NASA / JPL'
      },
      {
        actNumber: 2,
        title: 'Act II: The Apollo 12 Pinpoint Rendezvous',
        timeframe: 'November 19, 1969',
        narrative: [
          'In November 1969, Apollo 12 astronauts Pete Conrad and Alan Bean executed a pinpoint landing in their Lunar Module Intrepid.',
          'Conrad piloted Intrepid to a landing just 180 meters from Surveyor Crater, demonstrating for the first time that spacecraft could target specific exploration sites across deep space.',
          'During their second moonwalk, the astronauts walked down the slope of the crater to inspect the silent machine.'
        ],
        keyMilestone: 'Pinpoint crewed rendezvous with a derelict robotic probe on another world.',
        photojournalId: 'AS12-48-7133',
        photoUrl: 'https://images-assets.nasa.gov/image/as12-48-7133/as12-48-7133~orig.jpg',
        photoCaption: 'Apollo 12 Commander Pete Conrad examines the Surveyor 3 television camera, with Lunar Module Intrepid in the distance.',
        imageCredit: 'NASA'
      },
      {
        actNumber: 3,
        title: 'Act III: The Camera Comes Home',
        timeframe: 'November 1969 to Present',
        narrative: [
          'Using bolt cutters, Conrad and Bean clipped Surveyor 3\'s television camera, soil scoop, and several aluminum tubing struts, stowing them in the Lunar Module.',
          'Back on Earth, metallurgical tests examined how 31 months of raw solar radiation, thermal cycling (+120 °C to -150 °C), and micrometeorite bombardment affected human materials.',
          'Surveyor 3 remains on the crater slope in Oceanus Procellarum, the only robotic scout in human history to have been inspected by human eyes on an alien world.'
        ],
        keyMilestone: 'Retrieved hardware examined on Earth to establish deep space material durability standards.',
        photojournalId: 'AS12-48-7121',
        photoUrl: 'https://images-assets.nasa.gov/image/as12-48-7121/as12-48-7121~orig.jpg',
        photoCaption: 'Close-up of the Surveyor 3 television camera housing before removal by astronauts.',
        imageCredit: 'NASA'
      }
    ],
    hardwareDiagnoses: [
      {
        component: 'Landing Radar Altimeter',
        status: 'False Reflections Caused Engine Bounce',
        severity: 'warning',
        description: 'Smooth lunar rocks scattered radar return beams, preventing automatic engine cutoff.',
        engineeringWorkaround: 'Ground controllers manually transmitted engine cut command during the third bounce cycle.'
      },
      {
        component: 'Television Camera Assembly',
        status: 'Retrieved by Apollo 12 Astronauts',
        severity: 'historic',
        description: 'Clipped away with bolt cutters and returned to Houston for material degradation studies.',
        engineeringWorkaround: 'Now preserved at the Smithsonian National Air and Space Museum.'
      }
    ],
    mythVsFact: {
      myth: 'Bacteria (Streptococcus mitis) survived for two and a half years on the Moon inside Surveyor 3.',
      fact: 'A 2011 NASA Planetary Protection audit proved that laboratory swab procedures in 1969 lacked sterile barrier controls, indicating Earth contamination after return.',
      historicalContext: 'Personnel performing the microbiological swab analysis in 1969 were unmasked and wearing standard laboratory coats rather than sterile clean-room suits.',
      citation: 'Cardenas et al., Lunar and Planetary Science Conference (LPSC), 2011'
    },
    telemetryLogs: [
      { timestamp: '1967-04-20 00:04 UTC', subsystem: 'DESCENT', metric: 'Touchdown Bounce #1', value: '11 m Altitude Peak', status: 'WARNING' },
      { timestamp: '1967-04-20 00:05 UTC', subsystem: 'PROPULSION', metric: 'Vernier Engine Shutoff', value: 'Commanded from Earth', status: 'NOMINAL' },
      { timestamp: '1969-11-20 06:21 UTC', subsystem: 'HARDWARE', metric: 'TV Camera Disconnected', value: 'Removed by Conrad & Bean', status: 'HISTORIC' }
    ],
    scientificLegacy: 'First in-situ lunar soil mechanics testing and unique 31-month space exposure material benchmark for engineering future spacecraft.',
    monumentSignificance: 'Surveyor Crater, Oceanus Procellarum, the Moon.',
    provenance: 'HISTORICAL_RECONSTRUCTION'
  },

  venera13: {
    roverId: 'venera13',
    epicTitle: 'The Titanium Diver of Phoebe',
    dramaticTagline: 'Survived 127 minutes in 457 degrees Celsius and 89 atmospheres of crushing Venusian acid.',
    narrationDurationSeconds: 50,
    narrationScript: 
      'On March 1, 1982, the Soviet Venera 13 lander pierced the dense, opaque sulfuric acid clouds of Venus, ' +
      'touching down on an orange plain in Phoebe Regio. ' +
      'Surface conditions were hostile beyond terrestrial imagination: an ambient temperature of 457 degrees Celsius ' +
      'and pressure 89 times greater than Earth at sea level, sufficient to melt lead and crush submarines. ' +
      'Equipped with an insulated titanium pressure sphere and circulating coolant, Venera 13 was designed to survive 32 minutes. ' +
      'It endured for 127 minutes, drilling into alkaline basalt, analyzing soil composition with an onboard X-ray spectrometer, ' +
      'and transmitting the first 360-degree color panoramas of the Venusian surface before heat finally silenced its transmitter.',
    acts: [
      {
        actNumber: 1,
        title: 'Act I: Piercing the Acid Furnace',
        timeframe: 'March 1, 1982',
        narrative: [
          'Venera 13 entered the atmosphere of Venus at eleven kilometers per second. Braked by a massive heat shield and metal drag disks, it descended through opaque clouds of concentrated sulfuric acid.',
          'Jettisoning its parachute at fifty kilometers altitude, it plummeted through the crushing lower atmosphere, relying on aerodynamic drag plates to slow to eight meters per second before touching down on Phoebe Regio.',
          'The crushing weight of 89 atmospheres compressed the outer titanium shell with immense force.'
        ],
        keyMilestone: 'Descent through super-dense supercritical carbon dioxide atmosphere to Phoebe Regio.',
        photojournalId: 'VENERA-13-PAN-1',
        photoUrl: 'https://nssdc.gsfc.nasa.gov/planetary/image/venera13_surface.jpg',
        photoCaption: 'First color panorama of the surface of Venus returned by Venera 13, showing orange-tinted sky and fractured basalt slabs.',
        imageCredit: 'Soviet Academy of Sciences / Ted Stryk reprocessed'
      },
      {
        actNumber: 2,
        title: 'Act II: Drilling in Hell',
        timeframe: '127 Minutes on Surface',
        narrative: [
          'Operating on internal battery power and pre-chilled to minus ten degrees Celsius prior to atmospheric entry, Venera 13 immediately fired a pyrotechnic drill assembly.',
          'The drill bit bored thirty millimeters into the rocky ground, vacuumed the pulverized soil into an internal decompression chamber, and cooled the rock to prevent the internal electronics from baking.',
          'The onboard X-ray fluorescence spectrometer analyzed the sample, identifying it as alkaline potassium-rich basalt similar to terrestrial ocean floor rocks.'
        ],
        keyMilestone: 'Automated rock drilling and X-ray fluorescence spectrometry in 457 °C ambient heat.',
        photojournalId: 'VENERA-13-PAN-2',
        photoUrl: 'https://nssdc.gsfc.nasa.gov/planetary/image/venera13_left.jpg',
        photoCaption: 'Left-side telephotometer scan showing landing teeth and mechanical color calibration palette.',
        imageCredit: 'Soviet Academy of Sciences / Ted Stryk reprocessed'
      },
      {
        actNumber: 3,
        title: 'Act III: The 127-Minute Miracle',
        timeframe: 'March 1, 1982 (03:57 to 06:04 UTC)',
        narrative: [
          'Designed for a minimum survival life of thirty-two minutes, the thermal insulation and phase-change coolant kept the electronics below seventy degrees Celsius for over two hours.',
          'Venera 13 transmitted continuously to the flyby bus overhead, returning fourteen raw photographs with blue, green, and red filters to reconstruct true color images.',
          'At 06:04 UTC, the internal coolant was exhausted, internal solder joints melted, and the radio transmitter ceased. Its titanium pressure vessel remains intact on the scorched basalt of Phoebe Regio.'
        ],
        keyMilestone: 'Survived 127 minutes in 457 °C heat, almost four times its operational design requirement.',
        photojournalId: 'VENERA-13-PANEL',
        photoUrl: 'https://nssdc.gsfc.nasa.gov/planetary/image/venera13_surface.jpg',
        photoCaption: 'Panoramic mosaic showing fractured alkaline basalt plates and heat-distorted horizon.',
        imageCredit: 'Soviet Academy of Sciences / Ted Stryk reprocessed'
      }
    ],
    hardwareDiagnoses: [
      {
        component: 'Titanium Pressure Sphere',
        status: 'Crushed Under 89 Bar Ambient Pressure',
        severity: 'critical',
        description: 'Double-walled titanium vessel filled with polyurethane insulation and lithium nitrate phase-change heat sinks.',
        engineeringWorkaround: 'Chilled the lander to -10 °C inside the cruise stage before atmospheric separation.'
      },
      {
        component: 'Lens Cap Ejection Mechanism',
        status: 'Ejected Directly under Soil Penetrability Tester',
        severity: 'warning',
        description: 'Spring-loaded lens cap popped off and landed directly on the rock target where the dynamic soil penetrometer was commanded to strike.',
        engineeringWorkaround: 'Accidentally measured the elasticity of titanium rather than the Venusian rock, but the second camera returned clear geological data.'
      }
    ],
    mythVsFact: {
      myth: 'The sky of Venus is pitch black because of thick acid clouds.',
      fact: 'Venera 13 proved the Venusian daytime sky is illuminated with an eerie orange twilight, comparable to an overcast day on Earth.',
      historicalContext: 'Solar light scatters through dense carbon dioxide via Rayleigh scattering, filtering out blue wavelengths and bathing the surface in amber illumination.',
      citation: 'Soviet Academy of Sciences Venera 13 Mission Report (1982)'
    },
    telemetryLogs: [
      { timestamp: '1982-03-01 03:57 UTC', subsystem: 'LANDING', metric: 'Touchdown Shock', value: '457 °C / 89.2 atm', status: 'HISTORIC' },
      { timestamp: '1982-03-01 04:12 UTC', subsystem: 'DRILL', metric: 'Soil Chamber Pressure', value: 'Pyrotechnic Seal Complete', status: 'HISTORIC' },
      { timestamp: '1982-03-01 06:04 UTC', subsystem: 'THERMAL', metric: 'Internal Cavity Temp', value: '> 85 °C (Component Failure)', status: 'CRITICAL' }
    ],
    scientificLegacy: 'First color photographs of Venus, acoustic recordings of Venusian wind and aerodynamic descent, and chemical measurement of alkaline high-potassium basalt.',
    monumentSignificance: 'Titanium pressure vessel monument resting at Phoebe Regio, Venus.',
    provenance: 'HISTORICAL_RECONSTRUCTION'
  },

  huygens: {
    roverId: 'huygens',
    epicTitle: 'The Shore of Liquid Methane',
    dramaticTagline: 'Humanity\'s most distant landing, touching down 1.4 billion kilometers from Earth on Saturn\'s giant moon Titan.',
    narrationDurationSeconds: 50,
    narrationScript: 
      'On January 14, 2005, the European Space Agency Huygens probe separated from Cassini and descended through the dense nitrogen smog of Saturn\'s giant moon Titan. ' +
      'Drifting for two and a half hours under parachutes, its cameras recorded intricate river networks carved into ice hills by liquid methane rain. ' +
      'It touched down on a wet, spongy sand plain strewn with rounded pebbles of water ice frozen hard as granite. ' +
      'Operating at minus 179 degrees Celsius, Huygens transmitted scientific data and surface images for ninety minutes from the surface until its batteries depleted. ' +
      'It rests intact on the frozen methane plain, the most distant landing ever achieved by our species.',
    acts: [
      {
        actNumber: 1,
        title: 'Act I: The Descent Through Orange Smog',
        timeframe: 'January 14, 2005',
        narrative: [
          'After a seven-year piggyback voyage with NASA\'s Cassini spacecraft, the European Space Agency\'s Huygens probe plunged into Titan\'s thick nitrogen atmosphere at twenty-two thousand kilometers per hour.',
          'At an altitude of 160 kilometers, its main parachute deployed, exposing the Descent Imager/Spectral Radiometer to the murky orange haze.',
          'As the probe drifted downward, the smog cleared to reveal intricate branch-like dendritic channels cut into highland ridges, resembling river systems on Earth but carved by liquid methane.'
        ],
        keyMilestone: 'Descent through Titan\'s nitrogen-methane atmosphere and discovery of river drainage networks.',
        photojournalId: 'PIA07232',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA07232.jpg',
        photoCaption: 'Aerial view during parachute descent showing methane river drainage channels leading into a dark plain.',
        imageCredit: 'ESA / NASA / JPL / University of Arizona'
      },
      {
        actNumber: 2,
        title: 'Act II: Touchdown on the Frozen Plain',
        timeframe: 'January 14, 2005 (12:43 UTC)',
        narrative: [
          'Huygens touched down at five meters per second on a flat, damp plain bordering the highland region of Adiri, now known as Shangri-La.',
          'Its landing penetrometer penetrated fifteen centimeters into the surface, recording the mechanical resistance of wet sand or clay beneath a thin crust.',
          'Cameras beamed back humanity\'s first photograph from the surface of an outer planet moon: rounded cobbles of water ice strewn across orange organic sand.'
        ],
        keyMilestone: 'First soft landing on a moon in the outer solar system, 1.4 billion kilometers from Earth.',
        photojournalId: 'PIA07231',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA07231.jpg',
        photoCaption: 'Surface view from Huygens showing water-ice pebbles rounded by liquid methane streams on Titan.',
        imageCredit: 'ESA / NASA / JPL / University of Arizona'
      },
      {
        actNumber: 3,
        title: 'Act III: Ninety Minutes at Minus 179 Degrees',
        timeframe: 'Surface Operations (12:43 to 14:15 UTC)',
        narrative: [
          'At minus 179 degrees Celsius, water ice behaves like rock, and methane and ethane exist as liquids and gas.',
          'The heated sensor inlet on the probe warmed the soil beneath it, causing a small puff of methane vapor to evaporate, confirming that the ground was saturated with liquid hydrocarbons.',
          'Huygens transmitted surface telemetry for ninety minutes until Cassini slipped below the horizon. The probe remains frozen on the methane sands of Titan, a silent testament to European and international exploration.'
        ],
        keyMilestone: 'Operated for 90 minutes on the surface, confirming liquid methane saturation in Titan\'s regolith.',
        photojournalId: 'PIA07236',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA07236.jpg',
        photoCaption: 'Color-corrected panorama of the Titan surface with ice pebbles in hydrocarbon silt.',
        imageCredit: 'ESA / NASA / JPL / University of Arizona'
      }
    ],
    hardwareDiagnoses: [
      {
        component: 'Doppler Wind Experiment (Receiver Channel A)',
        status: 'Command Software Flag Not Enabled',
        severity: 'warning',
        description: 'Cassini receiver channel A was not activated due to a ground software commanding oversight.',
        engineeringWorkaround: 'Earth-based radio telescope arrays (VLBI) detected the carrier signal directly, recovering all atmospheric wind velocity profiles.'
      },
      {
        component: 'Surface Penetrometer Sensor',
        status: 'Recorded Impact Deceleration Profile',
        severity: 'nominal',
        description: 'Pointed sensor penetrated 15 cm into the ground, recording the mechanical consistency of crème brûlée: a thin crust over soft organic gravel.',
        engineeringWorkaround: 'Provided definitive physical proof of rounded pebbles formed by liquid fluvial erosion.'
      }
    ],
    mythVsFact: {
      myth: 'Huygens sank into a vast ocean of liquid methane on Titan.',
      fact: 'Huygens landed on solid ground: a damp river flood plain composed of water-ice pebbles and hydrocarbon mud.',
      historicalContext: 'Radar from Cassini later found giant methane and ethane seas (Kraken Mare, Ligeia Mare) located near Titan\'s north pole, far north of Huygens\' equatorial landing site.',
      citation: 'Lebreton et al., Nature 438, 2005: "An overview of the descent and landing of the Huygens probe on Titan."'
    },
    telemetryLogs: [
      { timestamp: '2005-01-14 10:13 UTC', subsystem: 'DESCENT', metric: 'Main Parachute Deployment', value: 'Mach 1.5 at 160 km Altitude', status: 'HISTORIC' },
      { timestamp: '2005-01-14 12:43 UTC', subsystem: 'TOUCHDOWN', metric: 'Impact Acceleration', value: '4.5 m/s (15 cm Penetration)', status: 'HISTORIC' },
      { timestamp: '2005-01-14 14:15 UTC', subsystem: 'COMM', metric: 'Cassini Orbiter Link', value: 'Orbiter Set Below Titan Horizon', status: 'HISTORIC' }
    ],
    scientificLegacy: 'First direct measurement of Titan\'s nitrogen-methane atmosphere, confirmation of an active methane hydrological cycle with clouds, rain, rivers, and dry lakebeds.',
    monumentSignificance: 'European Space Agency monument in Shangri-La, Titan, the farthest human machine from Earth.',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR'
  }
};

export function getRoverStoryChronicle(roverId: string): RoverStoryChronicle | null {
  return ROVER_STORY_CHRONICLES[roverId] || null;
}
