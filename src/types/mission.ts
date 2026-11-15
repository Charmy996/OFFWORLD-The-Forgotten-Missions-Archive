export type ProvenanceType = 
  | 'AUTHENTIC_PHOTOGRAPH_PDS_EDR'
  | 'AUTHENTIC_TELEMETRY_JPL_RMC'
  | 'NASA_PHOTOJOURNAL_PIA'
  | 'SONIFIED_SENSOR_DATA'
  | 'AUTHENTIC_VOICE_AUDIO'
  | 'UNVERIFIED_ENGINEERING_ESTIMATE'
  | 'HISTORICAL_RECONSTRUCTION';

export type CelestialBody = 'Mars' | 'Moon' | 'Venus' | 'Titan';

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
  imageCredit?: string;
  sourceUrl?: string;
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

export interface MythVsFactItem {
  id: string;
  subject: string;
  myth: string;
  fact: string;
}

export interface LastSignalMetadata {
  atmosphericTauValue: number;
  tauNote?: string;
  atmosphericTauNominal: number;
  atmosphericTauNote?: string;
  powerWattHours?: number;
  powerNote?: string;
  powerValueWh?: number;
  powerWhNote?: string;
  powerStatusLabel: string;
  powerStatusDetail: string;
  teamAssumption?: string;
  batteryAssumptionNote?: string;
  temperatureLabel?: string;
  temperatureNote?: string;
  temperatureEstimate?: string;
  acquisitionTimes?: string;
  mroRelayTime?: string;
  earthReceiptTime?: string;
  acquisitionTimeMars?: string;
  relayTimeMro?: string;
  carrierLossTimeEarth?: string;
  dsnStation?: string;
  frequencyBand?: string;
  finalFullFrame: {
    id: 'PIA22929';
    title: string;
    instrument: string;
    status: string;
    description: string;
    imageUrl: string;
    provenance: ProvenanceType;
    sourceUrl?: string;
    imageCredit?: string;
  };
  subsequentThumbnails: {
    id: 'PIA22930';
    title: string;
    instrument: string;
    status: string;
    description: string;
    imageUrl: string;
    provenance: ProvenanceType;
    sourceUrl?: string;
    imageCredit?: string;
  };
  verifiedEventLog: VerifiedEvent[];
  factCheck: FactCheckRow[];
  lastCommandsNote?: string;
  telemetryStream?: Array<{
    timestampUtc: string;
    source: string;
    message: string;
    level: 'INFO' | 'WARN' | 'CRIT';
  }>;
  poeticMythClarification?: {
    popularLegend: string;
    verifiedFact: string;
    originAuthor: string;
  };
  mythsVsFacts?: MythVsFactItem[];
}

export interface PlanetaryExplorerRover {
  id: string;
  name: string;
  designation: string;
  body: CelestialBody;
  coordinates: {
    lat: number;
    lon: number;
    displayCoords: string;
  };
  siteName: string;
  isApproximate?: boolean;
  statusText: string;
  shortSnippet: string;
  handwrittenStory: string[];
  metrics: {
    sols: string;
    distance: string;
    lifespan: string;
    dates: string;
    keyDiscovery: string;
  };
  provenance: ProvenanceType;
  sourceUrl?: string;
}

export interface CelestialBodyData {
  id: CelestialBody;
  name: string;
  designation: string;
  type: string;
  radiusKm: number;
  atmosphere: string;
  surfaceTemp: string;
  gravity: string;
  datumName: string;
  accentColor: string;
  secondaryColor: string;
  description: string;
}
