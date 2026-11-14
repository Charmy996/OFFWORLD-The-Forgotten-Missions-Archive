import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import { Style, Stroke, Fill, Circle as CircleStyle, Text } from 'ol/style';
import Projection from 'ol/proj/Projection';
import { addProjection } from 'ol/proj';
import { 
  OPPORTUNITY_MISSION, 
  OPPORTUNITY_WAYPOINTS, 
  OPPORTUNITY_ROUTE_COORDINATES 
} from '../../data/opportunityData';
import { TraverseWaypoint } from '../../types/mission';
import { ProvenanceBadge } from '../UI/ProvenanceBadge';
import { 
  Compass, 
  Crosshair, 
  Maximize2, 
  MapPin, 
  Radio, 
  Layers, 
  ExternalLink,
  X,
  Sparkles
} from 'lucide-react';

// IAU 2000 Mars Equirectangular Projection Definition
const marsProjection = new Projection({
  code: 'IAU2000:Mars_EQ',
  units: 'degrees',
  extent: [-180, -90, 180, 90],
  worldExtent: [-180, -90, 180, 90],
  global: true
});
addProjection(marsProjection);

interface MarsSurfaceMapProps {
  selectedWaypoint: TraverseWaypoint | null;
  onSelectWaypoint: (wp: TraverseWaypoint | null) => void;
  onOpenLastSignal: () => void;
}

export const MarsSurfaceMap: React.FC<MarsSurfaceMapProps> = ({
  selectedWaypoint,
  onSelectWaypoint,
  onOpenLastSignal
}) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [activeLayer, setActiveLayer] = useState<'mola' | 'hrsc'>('mola');
  const [mapZoom, setMapZoom] = useState<number>(10);
  const [cursorCoords, setCursorCoords] = useState<{ lon: string; lat: string }>({ lon: '0.0000°', lat: '0.0000°' });

  // Initialize Map
  useEffect(() => {
    if (!mapElement.current || mapRef.current) return;

    // Verified NASA Mars Trek Tile Source
    // Trek uses WMTS scheme: {TileMatrix}/{TileRow}/{TileCol}.jpg
    // OpenLayers XYZ tileUrlFunction maps:
    // tileCoord[0] = z (TileMatrix)
    // tileCoord[1] = col (TileCol / X)
    // tileCoord[2] = row (TileRow / Y)
    const molaSource = new XYZ({
      projection: marsProjection,
      wrapX: true,
      maxZoom: 18,
      minZoom: 0,
      attributions: 'NASA / JPL / GSFC / Mars Global Surveyor MOLA Team',
      tileUrlFunction: (tileCoord) => {
        if (!tileCoord) return undefined;
        const z = tileCoord[0];
        const col = tileCoord[1];
        // Note: Trek row indexing is positive from top
        const row = tileCoord[2];
        return `https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/${z}/${row}/${col}.jpg`;
      }
    });

    const baseTileLayer = new TileLayer({
      source: molaSource,
      zIndex: 1
    });

    // Traverse Vector Layer
    const vectorSource = new VectorSource();

    // 1. Add Traverse Route Line
    const routeFeature = new Feature({
      geometry: new LineString(OPPORTUNITY_ROUTE_COORDINATES),
      name: 'Opportunity 45.16 km Traverse Route'
    });
    routeFeature.setStyle(
      new Style({
        stroke: new Stroke({
          color: '#38bdf8', // Cyan glow
          width: 3.5,
          lineCap: 'round',
          lineJoin: 'round'
        })
      })
    );
    vectorSource.addFeature(routeFeature);

    // 2. Add Waypoint Points
    OPPORTUNITY_WAYPOINTS.forEach((wp) => {
      const pointFeature = new Feature({
        geometry: new Point(wp.coordinates),
        waypointData: wp
      });

      let strokeColor = '#38bdf8';
      let fillColor = '#0c4a6e';
      let radius = 6;

      if (wp.category === 'landing') {
        strokeColor = '#10b981'; // Green
        fillColor = '#064e3b';
        radius = 9;
      } else if (wp.category === 'final') {
        strokeColor = '#f43f5e'; // Red/Rose
        fillColor = '#881337';
        radius = 10;
      } else if (wp.category === 'discovery') {
        strokeColor = '#f59e0b'; // Amber
        fillColor = '#78350f';
        radius = 7;
      } else if (wp.category === 'hazard') {
        strokeColor = '#ef4444'; // Red hazard
        fillColor = '#450a0a';
        radius = 7;
      }

      pointFeature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: radius,
            fill: new Fill({ color: fillColor }),
            stroke: new Stroke({ color: strokeColor, width: 2 })
          }),
          text: new Text({
            text: `Sol ${wp.sol}: ${wp.siteName.split(' ')[0]}`,
            font: '10px JetBrains Mono, monospace',
            fill: new Fill({ color: '#f1f5f9' }),
            stroke: new Stroke({ color: '#090a0f', width: 3 }),
            offsetY: -14
          })
        })
      );

      vectorSource.addFeature(pointFeature);
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 10
    });

    // Create Map Instance
    // Center initially on Meridiani Planum & Opportunity Route [-5.37, -2.10]
    const map = new Map({
      target: mapElement.current,
      layers: [baseTileLayer, vectorLayer],
      view: new View({
        projection: marsProjection,
        center: [-5.37, -2.10],
        zoom: 9.5,
        minZoom: 1,
        maxZoom: 16
      })
    });

    // Pointer move coordinates listener
    map.on('pointermove', (evt) => {
      const coords = evt.coordinate;
      if (coords) {
        const lon = coords[0];
        const lat = coords[1];
        const lonStr = lon >= 0 ? `${lon.toFixed(4)}°E` : `${Math.abs(lon).toFixed(4)}°W`;
        const latStr = lat >= 0 ? `${lat.toFixed(4)}°N` : `${Math.abs(lat).toFixed(4)}°S`;
        setCursorCoords({ lon: lonStr, lat: latStr });
      }
    });

    // Click on features
    map.on('click', (evt) => {
      let clickedFeature: any = null;
      map.forEachFeatureAtPixel(evt.pixel, (feat: any) => {
        if (feat && typeof feat.get === 'function' && feat.get('waypointData')) {
          clickedFeature = feat;
          return true; // Stop after finding first
        }
      });

      if (clickedFeature) {
        const wp = clickedFeature.get('waypointData') as TraverseWaypoint;
        onSelectWaypoint(wp);
      }
    });

    // Zoom listener
    map.getView().on('change:resolution', () => {
      const z = map.getView().getZoom();
      if (z !== undefined) setMapZoom(Math.round(z * 10) / 10);
    });

    mapRef.current = map;

    return () => {
      map.setTarget(undefined);
      mapRef.current = null;
    };
  }, []);

  // Pan to selected waypoint when changed from outside
  useEffect(() => {
    if (!mapRef.current || !selectedWaypoint) return;
    mapRef.current.getView().animate({
      center: selectedWaypoint.coordinates,
      zoom: 12,
      duration: 1000
    });
  }, [selectedWaypoint]);

  // Jump to Landmark Presets
  const jumpTo = (coords: [number, number], zoomLevel: number) => {
    if (!mapRef.current) return;
    mapRef.current.getView().animate({
      center: coords,
      zoom: zoomLevel,
      duration: 1200
    });
  };

  return (
    <div className="relative w-full h-full bg-[#07080b] overflow-hidden">
      {/* OpenLayers Map Canvas */}
      <div ref={mapElement} className="w-full h-full cursor-crosshair" />

      {/* Atmospheric Vignette & Scanlines */}
      <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />

      {/* Top HUD: Coordinates & Navigation State */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-space-card/90 backdrop-blur-md border border-space-border/80 text-xs font-mono shadow-xl">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span className="text-zinc-400">CURSOR:</span>
          <span className="text-cyan-300 font-bold">{cursorCoords.lat}, {cursorCoords.lon}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">ZOOM:</span>
          <span className="text-amber-400">{mapZoom}x</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-space-card/90 backdrop-blur-md border border-space-border/80 text-xs font-mono shadow-xl">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-zinc-400">BASEMAP:</span>
          <span className="text-zinc-200">NASA MGS MOLA (463m/px)</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>
      </div>

      {/* Landmark Quick Jump Drawer */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
        <div className="px-3 py-2 rounded-lg bg-space-card/90 backdrop-blur-md border border-space-border/80 shadow-2xl flex flex-col gap-1.5 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-zinc-400 font-bold uppercase tracking-wider text-[10px] pb-1 border-b border-space-border">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Mission Trajectory Jump</span>
          </div>

          <button 
            onClick={() => jumpTo([OPPORTUNITY_MISSION.landingCoordinates.lon, OPPORTUNITY_MISSION.landingCoordinates.lat], 13)}
            className="flex items-center justify-between gap-3 px-2 py-1 rounded bg-zinc-900/60 hover:bg-emerald-950/60 hover:text-emerald-300 text-zinc-300 transition-colors text-left"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Sol 1: Eagle Crater</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">0.0 km</span>
          </button>

          <button 
            onClick={() => jumpTo([-5.5050, -1.9540], 13)}
            className="flex items-center justify-between gap-3 px-2 py-1 rounded bg-zinc-900/60 hover:bg-amber-950/60 hover:text-amber-300 text-zinc-300 transition-colors text-left"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Sol 134: Endurance</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">0.9 km</span>
          </button>

          <button 
            onClick={() => jumpTo([-5.5000, -2.0500], 12.5)}
            className="flex items-center justify-between gap-3 px-2 py-1 rounded bg-zinc-900/60 hover:bg-amber-950/60 hover:text-amber-300 text-zinc-300 transition-colors text-left"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Sol 951: Victoria</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">9.3 km</span>
          </button>

          <button 
            onClick={() => jumpTo([-5.3200, -2.1800], 11.5)}
            className="flex items-center justify-between gap-3 px-2 py-1 rounded bg-zinc-900/60 hover:bg-amber-950/60 hover:text-amber-300 text-zinc-300 transition-colors text-left"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Sol 2680: Endeavour Rim</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">33.4 km</span>
          </button>

          <button 
            onClick={() => jumpTo([OPPORTUNITY_MISSION.restingCoordinates.lon, OPPORTUNITY_MISSION.restingCoordinates.lat], 13.5)}
            className="flex items-center justify-between gap-3 px-2 py-1 rounded bg-zinc-900/60 hover:bg-rose-950/60 hover:text-rose-300 text-zinc-300 transition-colors text-left"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Sol 5111: Perseverance Valley</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">45.2 km</span>
          </button>

          <div className="pt-1 mt-1 border-t border-space-border/60 flex items-center justify-between">
            <button 
              onClick={() => jumpTo([-5.37, -2.10], 9.5)}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 py-0.5"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Fit Entire Route</span>
            </button>
            <button 
              onClick={() => jumpTo([0, 0], 2)}
              className="text-[11px] text-zinc-400 hover:text-zinc-200"
            >
              Global View
            </button>
          </div>
        </div>

        {/* Dedicated "The Last Signal" Quick Access Button */}
        <button
          onClick={onOpenLastSignal}
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-rose-950/90 to-amber-950/90 hover:from-rose-900 hover:to-amber-900 border border-rose-500/50 text-rose-200 text-xs font-mono font-bold tracking-wider shadow-2xl transition-all group"
        >
          <Radio className="w-4 h-4 text-rose-400 animate-pulse group-hover:scale-110 transition-transform" />
          <span>ACCESS: THE LAST SIGNAL</span>
        </button>
      </div>

      {/* Selected Waypoint Detail Card Overlay */}
      {selectedWaypoint && (
        <div className="absolute bottom-6 left-6 z-30 max-w-md w-full rounded-xl bg-space-card/95 backdrop-blur-xl border border-space-border p-4 shadow-2xl text-zinc-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between gap-2 border-b border-space-border pb-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  SOL {selectedWaypoint.sol}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {selectedWaypoint.dateEarth}
                </span>
              </div>
              <h3 className="text-base font-display font-semibold text-white tracking-wide">
                {selectedWaypoint.siteName}
              </h3>
            </div>
            <button
              onClick={() => onSelectWaypoint(null)}
              className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close waypoint detail"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 mb-3 bg-zinc-900/60 p-2 rounded-lg">
            <div>
              <span className="text-zinc-500">ODOMETER: </span>
              <span className="text-amber-400 font-bold">{(selectedWaypoint.odometryTotalM / 1000).toFixed(2)} km</span>
            </div>
            <div>
              <span className="text-zinc-500">ELEVATION: </span>
              <span className="text-cyan-400">{selectedWaypoint.elevationMolaM.toFixed(1)} m</span>
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed mb-3">
            {selectedWaypoint.description}
          </p>

          {selectedWaypoint.scientificDiscovery && (
            <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 mb-3">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SCIENTIFIC DISCOVERY</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-normal">
                {selectedWaypoint.scientificDiscovery}
              </p>
            </div>
          )}

          {selectedWaypoint.imageUrl && (
            <div className="mb-3 rounded-lg overflow-hidden border border-space-border bg-black/60">
              <img 
                src={selectedWaypoint.imageUrl} 
                alt={selectedWaypoint.imageCaption || selectedWaypoint.siteName}
                className="w-full h-36 object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {selectedWaypoint.imageCaption && (
                <div className="p-2 text-[10px] font-mono text-zinc-400 bg-space-surface/90 border-t border-space-border">
                  {selectedWaypoint.imageCaption}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-space-border/60">
            <ProvenanceBadge type={selectedWaypoint.provenance} />
            {selectedWaypoint.category === 'final' && (
              <button
                onClick={onOpenLastSignal}
                className="text-xs font-mono text-rose-400 hover:text-rose-300 underline font-semibold flex items-center gap-1"
              >
                <span>View Final Transmission</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Map Legend (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-20 px-3 py-2 rounded-lg bg-space-card/85 backdrop-blur-md border border-space-border/80 text-[10px] font-mono text-zinc-400 flex flex-col gap-1 shadow-lg pointer-events-none">
        <span className="text-zinc-500 uppercase font-bold tracking-wider mb-0.5">Map Cartography</span>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-cyan-400 rounded" />
          <span>45.16 km Reconstructed Traverse</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Landing Site (Challenger Station)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>Final Location (Perseverance Valley)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Major Scientific Discoveries</span>
        </div>
      </div>
    </div>
  );
};
