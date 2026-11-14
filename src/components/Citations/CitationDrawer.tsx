import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck, Database, X } from 'lucide-react';

interface CitationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CitationDrawer: React.FC<CitationDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl h-full bg-space-surface border-l border-space-border p-6 overflow-y-auto flex flex-col shadow-2xl text-zinc-200">
        <div className="flex items-center justify-between pb-4 border-b border-space-border mb-6">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-display font-bold text-white tracking-wide">
              NASA Primary Sources & Data Provenance Register
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
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

          {/* Primary Data Sources */}
          <div>
            <h3 className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-3">
              1. Planetary Surface Imagery & Cartography
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
                  Layer: <code className="text-amber-300">Mars_MGS_MOLA_ClrShade_merge_global_463m</code> (463 m/px global MOLA shaded relief, OGC WMTS REST service).
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
                  Simple cylindrical Mars projection and IAU 2000 planetocentric coordinate datums.
                </p>
              </li>
            </ul>
          </div>

          {/* Mission Telemetry & Photography */}
          <div>
            <h3 className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-3">
              2. Mission Science & Rover Telemetry
            </h3>
            <ul className="space-y-2.5">
              <li className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between font-bold text-white mb-1">
                  <span>NASA PDS Analyst's Notebook (MER-B)</span>
                  <a href="https://an.rsl.wustl.edu/mer/merb/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                    <span>an.rsl.wustl.edu</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Washington University in St. Louis / NASA PDS Geosciences Node. Sol-by-sol Rover Motion Counter (RMC) files, APXS spectra, and Pancam EDR data products.
                </p>
              </li>

              <li className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between font-bold text-white mb-1">
                  <span>NASA Jet Propulsion Laboratory Photojournal</span>
                  <a href="https://photojournal.jpl.nasa.gov/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                    <span>photojournal.jpl.nasa.gov</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Calibrated imagery citations: <code className="text-cyan-300">PIA05474</code> (Blueberries), <code className="text-cyan-300">PIA06757</code> (Endurance), <code className="text-cyan-300">PIA15032</code> (Homestake Gypsum), <code className="text-rose-400">PIA22929</code> (The Last Message), and <code className="text-cyan-300">PIA22930</code> (Tau Thumbnails).
                </p>
              </li>
            </ul>
          </div>

          {/* Sound & Music Licensing */}
          <div>
            <h3 className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-3">
              3. Audio Architecture & Copyright Compliance
            </h3>
            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 font-sans text-[11px] text-zinc-300 space-y-1.5">
              <p>
                <strong>Procedural Synthesizer:</strong> Ambient Martian wind and sub-bass carrier drones are generated programmatically in real-time via the Web Audio API.
              </p>
              <p>
                <strong>Commercial Music Exclusion:</strong> In strict compliance with competition rules, no commercial copyrighted music (such as Billie Holiday's master recording of <em>"I'll Be Seeing You"</em>) is streamed or bundled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
