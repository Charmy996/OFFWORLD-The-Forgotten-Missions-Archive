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
      'On Sol 5111, Opportunity turned its eyes toward the blacked-out sky. Its solar arrays, buried under dust, dropped into a low-power fault condition as power collapsed. ' +
      'It sent its final packet of engineering telemetry: clock drift, low-power fault condition, atmospheric opacity off the scale. ' +
      'Then, silence. For eight months, the Deep Space Network called into the Martian dark. On February 12, 2019, the final recovery commands went out via the 70-meter Goldstone antenna, ending the eight-month effort (press accounts reported Billie Holiday\'s "I\'ll Be Seeing You" was transmitted or played, though NASA\'s official release does not mention the song). ' +
      'No answer came. Opportunity remains there today, cold, intact, waiting for the wind to change.',
    acts: [
      {
        actNumber: 1,
        title: 'Act I: The Interplanetary Hole-in-One',
        timeframe: 'Sols 1 to 90 (Jan 24, 2004 to Apr 2004)',
        narrative: [
          'On January 24, 2004 Pacific time, Opportunity plummeted through the thin carbon dioxide atmosphere enclosed in a tetrahedron of airbags. Bouncing dozens of times across the smooth plains of Meridiani, it rolled directly into the interior of Eagle Crater, a 22-meter depression.',
          'When the petals opened and the cameras deployed, geologists back on Earth gasped. Directly ahead lay layered bedrock, something never before seen on Mars. Within weeks, the microscopic imager uncovered millions of millimeter-sized gray spherules nicknamed blueberries.',
          'Spectrometers proved these spherules were composed of hematite that precipitated out of liquid water billions of years ago. Opportunity fulfilled its entire mission objective inside its landing crater before the 90-sol warranty even expired.'
        ],
        keyMilestone: 'Discovered gray hematite spherules, proving ancient standing liquid water in Meridiani Planum.',
        photojournalId: 'PIA18885',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA18885.jpg',
        photoCaption: 'Clues to wet history in texture of Martian rock: hematite blueberries and sulfate matrix at Eagle Crater.',
        imageCredit: 'NASA / JPL-Caltech'
      },
      {
        actNumber: 2,
        title: 'Act II: The 45-Kilometer Marathon',
        timeframe: 'Sols 91 to 5000 (2004 to 2018)',
        narrative: [
          'Escaping Eagle Crater, Opportunity began a grand trek across the open dunes. In 2005, it bogged down up to its axles in Purgatory Dune. For five weeks, drivers simulated wheel rotations in test sand at JPL, carefully crawling backward millimeter by millimeter to safety.',
          'The rover scaled the precipitous cliffs of Victoria Crater, peer-inspected deep geological strata, and embarked on a multi-year sprint to the 22-kilometer Endeavour Crater. Along the rim at Cape York and Matijevic Hill (PIA16703), it discovered ancient clay minerals formed in water that was not strongly acidic.',
          'On March 24, 2015, on Sol 3968, Opportunity surpassed 42.195 kilometers. It became the first human machine in history to complete an Olympic marathon distance on the surface of another planet.'
        ],
        keyMilestone: 'Completed the first 42.195 km marathon on another world and uncovered ancient clay minerals formed in water that was not strongly acidic at Endeavour Crater.',
        photojournalId: 'PIA19158',
        photoUrl: 'https://photojournal.jpl.nasa.gov/jpeg/PIA19158.jpg',
        photoCaption: 'Opportunity\'s Marathon Journey: traverse map and vista overlooking Marathon Valley and Endeavour Crater.',
        imageCredit: 'NASA / JPL-Caltech'
      },
      {
        actNumber: 3,
        title: 'Act III: The Sol That Never Ended',
        timeframe: 'Sols 5100 to 5111 (June 2018 to Feb 2019)',
        narrative: [
          'In early June 2018, Opportunity was surveying Perseverance Valley on the western rim of Endeavour Crater when a regional dust storm rapidly expanded into a catastrophic planet-encircling event.',
          'Atmospheric optical depth (tau) soared from normal levels of 0.5 to an unprecedented value greater than 10.8. Sunlight was choked to less than one-tenth of one percent of normal brightness. The rover solar arrays plunged into a low-power fault mode as available power collapsed.',
          'On Sol 5111, June 10, 2018, Opportunity attempted its final exposures and engineering transmissions before its computer clocked off to save power. Over one thousand recovery commands were transmitted over the following months via the Deep Space Network, but the rover heaters were cold. On February 13, 2019, NASA officially announced the completion of the 15-year odyssey.'
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
        description: 'Atmospheric optical depth exceeded tau 10.8 during the June 2018 global storm, dropping insolation and causing a catastrophic power collapse.',
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
      fact: 'Opportunity transmitted binary engineering telemetry packets via UHF relay to the Mars Reconnaissance Orbiter reporting extreme optical opacity and a low-power fault condition.',
      historicalContext: 'Science journalist Jacob Margolis tweeted a poetic distillation of JPL engineers\' explanations of the telemetry numbers. The poetic phrase went viral worldwide as literal rover speech.',
      citation: 'Jacob Margolis (KPCC, Twitter, June 13, 2018); NASA JPL MER Sol 5111 Engineering Log'
    },
    telemetryLogs: [
      { timestamp: 'Sol 5111 ~09:30 PDT', subsystem: 'PANCAM', metric: 'Final Full-Frame Exposure (PIA22929)', value: 'Interrupted Partial Frame', status: 'WARNING' },
      { timestamp: 'Sol 5111 ~09:33 PDT', subsystem: 'PANCAM', metric: 'Tau Thumbnails (PIA22930)', value: 'Sun Spot Acquired', status: 'NOMINAL' },
      { timestamp: 'Sol 5111 ~09:45 PDT', subsystem: 'MRO UHF', metric: 'Orbiter Relay Pass', value: 'Downlink Relayed to Earth', status: 'NOMINAL' },
      { timestamp: 'Sol 5111 ~10:05 PDT', subsystem: 'EARTH DSN', metric: 'Ground Station Reception', value: 'Transmission Stopped Mid-Frame', status: 'CRITICAL' }
    ],
    scientificLegacy: 'Confirmed persistent groundwater on Mars, discovered hematite blueberries, discovered ancient clay minerals formed in water that was not strongly acidic, and provided fifteen years of continuous climatological data.',
    monumentSignificance: 'Permanent technological monument on the western rim of Endeavour Crater in Perseverance Valley.',
    provenance: 'AUTHENTIC_PHOTOGRAPH_PDS_EDR'
  }
};

export function getRoverStoryChronicle(roverId: string): RoverStoryChronicle | null {
  return ROVER_STORY_CHRONICLES[roverId] || null;
}
