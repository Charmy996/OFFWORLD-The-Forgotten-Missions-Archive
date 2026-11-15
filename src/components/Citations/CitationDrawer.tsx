import React from 'react';
import { Database, ExternalLink, ShieldCheck, X, Image as ImageIcon } from 'lucide-react';

interface CitationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CitationDrawer: React.FC<CitationDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const verifiedImages = [
    {
      id: 'PIA05474',
      title: 'Hematite Spherules ("Blueberries") at Eagle Crater',
      instrument: 'Opportunity Pancam False Color',
      url: 'https://photojournal.jpl.nasa.gov/catalog/PIA05474',
      credit: 'NASA / JPL / Cornell'
    },
    {
      id: 'PIA06757',
      title: 'Endurance Crater Interior Walls and Dunes',
      instrument: 'Opportunity Pancam Karatepe Ingress View',
      url: 'https://photojournal.jpl.nasa.gov/catalog/PIA06757',
      credit: 'NASA / JPL / Cornell'
    },
    {
      id: 'PIA07997',
      title: 'Deep Wheel Tracks in Purgatory Dune',
      instrument: 'Opportunity Hazcam / Navcam Record',
      url: 'https://photojournal.jpl.nasa.gov/catalog/PIA07997',
      credit: 'NASA / JPL'
    },
    {
      id: 'PIA08813',
      title: 'Cape Verde Promontory at Victoria Crater',
      instrument: 'Opportunity Pancam Perspective View',
      url: 'https://photojournal.jpl.nasa.gov/catalog/PIA08813',
      credit: 'NASA / JPL / Cornell'
    },
    {
      id: 'PIA15032',
      title: '"Homestake" Gypsum Vein at Cape York (Endeavour Rim)',
      instrument: 'Opportunity Pancam False Color',
      url: 'https://photojournal.jpl.nasa.gov/catalog/PIA15032',
      credit: 'NASA / JPL-Caltech / Cornell / ASU'
    },
    {
      id: 'PIA15689',
      title: 'The Greeley Panorama from Cape Tribulation',
      instrument: 'Opportunity Pancam 360-Degree Composite',
      url: 'https://photojournal.jpl.nasa.gov/catalog/PIA15689',
      credit: 'NASA / JPL-Caltech / Cornell / ASU'
    },
    {
      id: 'PIA22929',
      title: '"Opportunity\'s Last Message" (Interrupted Full-Frame)',
      instrument: 'Opportunity Pancam (Left Eye with Solar Filter)',
      url: 'https://photojournal.jpl.nasa.gov/catalog/PIA22929',
      credit: 'NASA / JPL-Caltech'
    },
    {
      id: 'PIA22930',
      title: 'Subsequent Atmospheric Tau Thumbnails',
      instrument: 'Opportunity Pancam (Stereo Solar Filter Thumbnails)',
      url: 'https://photojournal.jpl.nasa.gov/catalog/PIA22930',
      credit: 'NASA / JPL-Caltech'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl h-full bg-space-surface border-l border-space-border p-6 overflow-y-auto flex flex-col shadow-2xl text-zinc-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="citations-drawer-title"
      >
        <div className="flex items-center justify-between pb-4 border-b border-space-border mb-6">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h2 id="citations-drawer-title" className="text-base font-display font-bold text-white tracking-wide">
              NASA Primary Sources & Data Provenance Register
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Close citations drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-xs leading-relaxed font-mono">
          {/* Compliance Notice */}
          <div className="p-4 rounded-xl bg-space-card border border-space-border">
            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>14 CFR PART 1221 COMPLIANCE NOTICE</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-normal font-sans">
              This application is an independent open-source educational archive for NASA Space Apps Challenge 2026. Per 14 CFR Part 1221, official NASA seals and insignia are not used as branding logos or endorsements.
            </p>
          </div>

          {/* Eight Verified Photojournal Images */}
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider mb-3">
              <ImageIcon className="w-4 h-4" />
              <span>1. Verified NASA Photojournal Imagery Records</span>
            </div>
            <div className="space-y-2">
              {verifiedImages.map((img) => (
                <div key={img.id} className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-300 font-bold">{img.id}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">[{img.instrument}]</span>
                    </div>
                    <p className="text-zinc-300 text-[11px] mt-0.5 font-sans">
                      {img.title}
                    </p>
                    <span className="text-[10px] text-zinc-500 block mt-0.5">Credit: {img.credit}</span>
                  </div>
                  <a
                    href={img.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1 shrink-0 pt-0.5"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Planetary Surface Cartography */}
          <div>
            <h3 className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-3">
              2. Planetary Surface Cartography & Tiles
            </h3>
            <ul className="space-y-2.5">
              <li className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between font-bold text-white mb-1">
                  <span>NASA Solar System Treks (Mars Trek WMTS)</span>
                  <a href="https://trek.nasa.gov/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                    <span>trek.nasa.gov</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Layer: <code className="text-amber-300">Mars_MGS_MOLA_ClrShade_merge_global_463m</code> (463 m/px global MOLA shaded relief, OGC WMTS REST service capped at native zoom 7 for smooth interpolation).
                </p>
              </li>

              <li className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between font-bold text-white mb-1">
                  <span>USGS Astrogeology Planetary MapServer</span>
                  <a href="https://planetarymaps.usgs.gov/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                    <span>planetarymaps.usgs.gov</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Simple cylindrical Mars and Moon projections with IAU 2000 planetocentric coordinate datums.
                </p>
              </li>
            </ul>
          </div>

          {/* Mission Telemetry Archives */}
          <div>
            <h3 className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-3">
              3. Mission Science & Rover Telemetry
            </h3>
            <ul className="space-y-2.5">
              <li className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between font-bold text-white mb-1">
                  <span>NASA PDS Analyst's Notebook (MER-B Opportunity)</span>
                  <a href="https://an.rsl.wustl.edu/mer/merb/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                    <span>an.rsl.wustl.edu</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Washington University in St. Louis / NASA PDS Geosciences Node. Sol-by-sol Rover Motion Counter (RMC) records, Pancam EDR data, APXS spectra, and reconstructed traverse coordinates.
                </p>
              </li>

              <li className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between font-bold text-white mb-1">
                  <span>NASA PDS Geosciences Node (Surveyor 3 & Spirit)</span>
                  <a href="https://pds-geosciences.wustl.edu/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                    <span>pds-geosciences.wustl.edu</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Surveyor 3 lunar soil mechanics engineering reports (NASA SP-184) and Spirit (MER-A) Gusev Crater traverse logs.
                </p>
              </li>
            </ul>
          </div>

          {/* Sound & Music Licensing */}
          <div>
            <h3 className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-3">
              4. Audio Architecture & Copyright Compliance
            </h3>
            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 font-sans text-[11px] text-zinc-300 space-y-1.5">
              <p>
                <strong>Procedural Synthesizer:</strong> Ambient Martian wind and sub-bass carrier drones are generated programmatically in real-time via the Web Audio API.
              </p>
              <p>
                <strong>Commercial Music Exclusion:</strong> In strict compliance with competition rules, no commercial copyrighted sound recordings are streamed or bundled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
