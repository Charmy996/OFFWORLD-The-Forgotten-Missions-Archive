import React, { useEffect, useRef } from 'react';
import { OPPORTUNITY_LAST_SIGNAL } from '../../data/opportunityData';
import { ProvenanceBadge } from '../UI/ProvenanceBadge';
import { 
  Radio, 
  X, 
  AlertTriangle, 
  Clock, 
  WifiOff, 
  Sun, 
  Layers, 
  HelpCircle,
  Activity,
  Maximize2
} from 'lucide-react';

interface LastSignalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LastSignalModal: React.FC<LastSignalModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Manage native dialog open/close per modern-web-guidance
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle native cancel (Esc key)
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  // Light dismiss on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const data = OPPORTUNITY_LAST_SIGNAL;

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-labelledby="last-signal-title"
      className="m-auto p-0 max-w-4xl w-[92vw] max-h-[90vh] bg-space-surface border border-rose-500/30 rounded-2xl shadow-[0_0_80px_rgba(244,63,94,0.15)] text-zinc-100 backdrop:bg-black/85 backdrop:backdrop-blur-md outline-none overflow-hidden"
    >
      {/* Modal Header */}
      <div className="relative px-6 py-4 bg-gradient-to-r from-rose-950/80 via-space-card to-space-card border-b border-space-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-rose-400 font-bold">
                SPECIAL HISTORICAL ARCHIVE // SOL 5111
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            </div>
            <h2 id="last-signal-title" className="text-xl font-display font-bold text-white tracking-wide">
              The Last Signal: Opportunity at Perseverance Valley
            </h2>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Modal Scrollable Body */}
      <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] space-y-6">
        
        {/* Banner: Reconciled Sequential Timestamps */}
        <div className="p-4 rounded-xl bg-space-card/80 border border-space-border grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
            <div>
              <div className="text-[11px] font-mono text-zinc-400">STEP 1: MARS ACQUISITION TIME</div>
              <div className="text-sm font-bold font-mono text-cyan-300">{data.acquisitionTimeMars}</div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Pancam exposures acquired toward the obscured Sun from Perseverance Valley rim.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <WifiOff className="w-4 h-4 text-rose-400 mt-1 shrink-0" />
            <div>
              <div className="text-[11px] font-mono text-zinc-400">STEP 2: EARTH CARRIER LOSS TIME</div>
              <div className="text-sm font-bold font-mono text-rose-400">{data.carrierLossTimeEarth}</div>
              <div className="text-xs text-zinc-400 mt-0.5">
                DSN Station 14 (Goldstone, California) received final telemetry before permanent carrier loss.
              </div>
            </div>
          </div>
        </div>

        {/* Critical Telemetry Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Atmospheric Tau */}
          <div className="p-4 rounded-xl bg-zinc-900/70 border border-space-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>ATMOSPHERIC OPACITY (TAU)</span>
                <span className="text-rose-400 font-bold">RECORD HIGH</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-extrabold text-rose-400">
                  {data.atmosphericTauValue}+
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  (Nominal: ~{data.atmosphericTauNominal})
                </span>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div className="bg-rose-500 h-2 rounded-full w-full animate-pulse" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                Sunlight blocked completely; midday darkness absolute.
              </span>
            </div>
          </div>

          {/* System Power State */}
          <div className="p-4 rounded-xl bg-zinc-900/70 border border-space-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>SOLAR POWER GENERATION</span>
                <span className="text-rose-400 font-bold">FAULT TRIP</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-display font-bold text-amber-400">
                  {data.powerStatusLabel}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-zinc-400 leading-snug">
                {data.powerStatusDetail}
              </p>
              <div className="mt-2">
                <ProvenanceBadge type="UNVERIFIED_ENGINEERING_ESTIMATE" />
              </div>
            </div>
          </div>

          {/* Deep Space Network Station */}
          <div className="p-4 rounded-xl bg-zinc-900/70 border border-space-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>DSN GROUND STATION</span>
                <span className="text-cyan-400 font-bold">{data.frequencyBand}</span>
              </div>
              <div className="text-sm font-mono font-semibold text-zinc-200">
                {data.dsnStation}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>70m Parabolic Reflector</span>
            </div>
          </div>
        </div>

        {/* Image Evidence: PIA22929 vs. PIA22930 Comparison */}
        <div className="p-5 rounded-xl bg-space-card/90 border border-space-border">
          <div className="flex items-center justify-between border-b border-space-border pb-3 mb-4">
            <div>
              <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>The Final Photographic Evidence: Full Frame vs. Thumbnails</span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Comparing the cut-off full-frame image with the subsequent thumbnail downlink
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PIA22929: Final Incomplete Full Frame */}
            <div className="p-4 rounded-xl bg-black/60 border border-rose-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-rose-400">
                    {data.finalFullFrame.id}: {data.finalFullFrame.title}
                  </span>
                  <ProvenanceBadge type={data.finalFullFrame.provenance} />
                </div>
                <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-black aspect-video mb-3 flex items-center justify-center">
                  <img 
                    src={data.finalFullFrame.imageUrl} 
                    alt="PIA22929: Opportunity's Last Message"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-rose-400 border border-rose-500/40">
                    BLACK BAR: TRANSMISSION CUT OFF HERE
                  </div>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {data.finalFullFrame.description}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                Instrument: {data.finalFullFrame.instrument}
              </div>
            </div>

            {/* PIA22930: Subsequent Atmospheric Tau Thumbnails */}
            <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {data.subsequentThumbnails.id}: {data.subsequentThumbnails.title}
                  </span>
                  <ProvenanceBadge type={data.subsequentThumbnails.provenance} />
                </div>
                <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-black aspect-video mb-3 flex items-center justify-center">
                  <img 
                    src={data.subsequentThumbnails.imageUrl} 
                    alt="PIA22930: Opportunity Atmospheric Tau Thumbnails"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cyan-400 border border-cyan-500/40">
                    THUMBNAILS COMPLETED SUCCESSFULLY
                  </div>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {data.subsequentThumbnails.description}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                Instrument: {data.subsequentThumbnails.instrument}
              </div>
            </div>
          </div>
        </div>

        {/* Myth vs. Reality Fact Check Card */}
        <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-sm mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>HISTORICAL FACT-CHECK // THE "LAST WORDS" CONTROVERSY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-rose-400 font-bold uppercase block mb-1">
                POPULAR INTERNET MYTH
              </span>
              <p className="text-sm font-serif italic text-zinc-300">
                {data.poeticMythClarification.popularLegend}
              </p>
              <span className="text-[10px] font-mono text-zinc-500 mt-2 block">
                Often misattributed as a spoken sentence or autonomous rover farewell transmission.
              </span>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block mb-1">
                NASA VERIFIED REALITY
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {data.poeticMythClarification.verifiedFact}
              </p>
              <div className="mt-2 text-[10px] font-mono text-zinc-400">
                Phrase Author: <span className="text-cyan-300">{data.poeticMythClarification.originAuthor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Log Terminal Readout */}
        <div className="rounded-xl overflow-hidden border border-space-border bg-black font-mono">
          <div className="px-4 py-2 bg-zinc-900 border-b border-space-border flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>TERMINAL TELEMETRY LOG // DSN RECEPTION RECORD</span>
            </div>
            <span className="text-[10px] text-zinc-500">SOL 5111 PASS 1</span>
          </div>
          <div className="p-4 space-y-2 text-xs">
            {data.telemetryStream.map((log, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-zinc-600 shrink-0">{log.timestampUtc.split('T')[1].replace('Z', '')}</span>
                <span className={`shrink-0 px-1 py-0.2 rounded text-[10px] ${
                  log.level === 'CRIT' ? 'bg-rose-950 text-rose-400' :
                  log.level === 'WARN' ? 'bg-amber-950 text-amber-400' : 'bg-cyan-950 text-cyan-400'
                }`}>
                  [{log.source}]
                </span>
                <span className={log.level === 'CRIT' ? 'text-rose-300 font-semibold' : 'text-zinc-300'}>
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Postscript: The Silent Monument */}
        <div className="p-4 rounded-xl bg-space-card/60 border border-space-border text-xs text-zinc-400 leading-relaxed font-mono">
          <span className="text-zinc-300 font-bold block mb-1">THE FINAL FAREWELL TRANSMISSION:</span>
          Over the following eight months, NASA engineers sent over 1,000 sweep-and-beep revival commands via DSN antennas. On the evening of February 12, 2019, JPL beamed Billie Holiday's <em>"I'll Be Seeing You"</em> to Perseverance Valley. On February 13, 2019, NASA officially declared the mission concluded. Opportunity remains intact on the western slope of Endeavour Crater.
        </div>

      </div>
    </dialog>
  );
};
