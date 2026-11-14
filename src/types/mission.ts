export type ProvenanceType = 
  | 'AUTHENTIC_PHOTOGRAPH_PDS_EDR'
  | 'AUTHENTIC_TELEMETRY_JPL_RMC'
  | 'NASA_PHOTOJOURNAL_PIA'
  | 'SONIFIED_SENSOR_DATA'
  | 'AUTHENTIC_VOICE_AUDIO'
  | 'UNVERIFIED_ENGINEERING_ESTIMATE'
  | 'HISTORICAL_RECONSTRUCTION';

export interface TraverseWaypoint {
  id: string;
  sol: number;
  dateEarth: string;
  siteName: string;
  coordinates: [number, number]; // [Longitude (East or -180..180), Latitude]
  elevationMolaM: number;
  odometryTotalM: number;
  eventHighlight: string;
  description: string;
  scientificDiscovery?: string;
  imageUrl?: string;
  imageCaption?: string;
  provenance: ProvenanceType;
  category: 'landing' | 'discovery' | 'hazard' | 'milestone' | 'final';
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface MissionChapter {
  id: string;
  title: string;
  solRange: string;
  dateRange: string;
  subtitle: string;
  narrativeText: string[];
  keyHighlight: string;
  telemetryMetrics?: {
    distanceKm?: number;
    solsPassed: number;
    dustFactor?: string;
  };
  sources: SourceLink[];
  provenance: ProvenanceType;
}

export interface VerifiedEvent {
  date: string;
  timePdt?: string;
  sol?: number;
  title: string;
  description: string;
  sourceUrl: string;
  sourceLabel: string;
}

export type FactCheckVerdict =
  | 'MYTH'
  | 'NOT CONFIRMED BY NASA'
  | 'UNCONFIRMED'
  | 'OUT OF DATE'
  | 'BOTH CORRECT';

export interface FactCheckRow {
  claim: string;
  verdict: FactCheckVerdict;
  record: string;
  sources: SourceLink[];
}

export interface LastSignalMetadata {
  atmosphericTauValue: number;
  atmosphericTauNominal: number;
  atmosphericTauNote: string;
  powerWattHours: number;
  powerNote: string;
  powerStatusLabel: string;
  powerStatusDetail: string;
  teamAssumption: string;
  temperatureLabel: string;
  temperatureNote: string;
  acquisitionTimes: string;
  mroRelayTime: string;
  earthReceiptTime: string;
  finalFullFrame: {
    id: 'PIA22929';
    title: string;
    instrument: string;
    status: string;
    description: string;
    imageUrl: string;
    provenance: ProvenanceType;
  };
  subsequentThumbnails: {
    id: 'PIA22930';
    title: string;
    instrument: string;
    status: string;
    description: string;
    imageUrl: string;
    provenance: ProvenanceType;
  };
  verifiedEventLog: VerifiedEvent[];
  factCheck: FactCheckRow[];
  lastCommandsNote: string;
}
