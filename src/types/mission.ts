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

export interface MissionChapter {
  id: string;
  title: string;
  solRange: string;
  dateRange: string;
  subtitle: string;
  narrativeText: string[];
  keyHighlight: string;
  telemetryMetrics?: {
    distanceKm: number;
    solsPassed: number;
    dustFactor?: string;
  };
  provenance: ProvenanceType;
}

export interface LastSignalMetadata {
  atmosphericTauValue: number;
  atmosphericTauNominal: number;
  powerStatusLabel: string;
  powerStatusDetail: string;
  acquisitionTimeMars: string;
  carrierLossTimeEarth: string;
  dsnStation: string;
  frequencyBand: string;
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
  telemetryStream: Array<{
    timestampUtc: string;
    source: string;
    message: string;
    level: 'INFO' | 'WARN' | 'CRIT';
  }>;
  poeticMythClarification: {
    popularLegend: string;
    verifiedFact: string;
    originAuthor: string;
  };
}
