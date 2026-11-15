import React, { useEffect, useRef } from 'react';
import { OPPORTUNITY_LAST_SIGNAL } from '../../data/opportunityData';
import { ProvenanceBadge } from '../UI/ProvenanceBadge';
import { 
  Radio, 
  X, 
  Clock, 
  WifiOff, 
  Layers, 
  HelpCircle,
  Activity,
  ExternalLink,
  ShieldCheck
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
        
        {/* Banner: Sequential Timestamps (PDT, from the verified dossier) */}
        <div className="p-4 rounded-xl bg-space-card/80 border border-space-border grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
            <div>
              <div className="text-[11px] font-mono text-zinc-400">STEP 1: IMAGES TAKEN ON MARS</div>
              <div className="text-sm font-bold font-mono text-cyan-300">{data.acquisitionTimes}</div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Pancam exposures of the dark sky from Perseverance Valley.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Radio className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
            <div>
              <div className="text-[11px] font-mono text-zinc-400">STEP 2: ORBITER RELAY</div>
              <div className="text-sm font-bold font-mono text-amber-300">{data.mroRelayTime}</div>
              <div className="text-xs text-zinc-400 mt-0.5">
                The transmission stopped before the image finished.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <WifiOff className="w-4 h-4 text-rose-400 mt-1 shrink-0" />
            <div>
              <div className="text-[11px] font-mono text-zinc-400">STEP 3: RECEIVED ON EARTH</div>
              <div className="text-sm font-bold font-mono text-rose-400">{data.earthReceiptTime}</div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Last data received from Opportunity (June 10, 2018, sol 5,111).
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
                <span className="text-rose-400 font-bold">JUN 10, 2018</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-extrabold text-rose-400">
                  ~{data.atmosphericTauValue}
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
                {data.atmosphericTauNote}
              </span>
            </div>
          </div>

          {/* System Power State */}
          <div className="p-4 rounded-xl bg-zinc-900/70 border border-space-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>SOLAR POWER GENERATION</span>
                <span className="text-rose-400 font-bold">LOWEST AT THE TIME</span>
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
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono tracking-wider bg-emerald-950/70 text-emerald-400 border border-emerald-500/30">
                  {data.powerNote}
                </span>
              </div>
            </div>
          </div>

          {/* Rover Temperature */}
          <div className="p-4 rounded-xl bg-zinc-900/70 border border-space-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>ROVER TEMPERATURE</span>
                <span className="text-cyan-400 font-bold">JUN 10, 2018</span>
              </div>
              <div className="text-2xl font-display font-bold text-cyan-300">
                {data.temperatureLabel}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>{data.temperatureNote}</span>
            </div>
          </div>
        </div>

        {/* Image Evidence: PIA22929 vs. PIA22930 Comparison */}
        <div className="p-5 rounded-xl bg-space-card/90 border border-space-border">
          <div className="flex items-center justify-between border-b border-space-border pb-3 mb-4">
            <div>
              <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>The Final Photographic Evidence: Partial Frame vs. Thumbnails</span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Comparing the cut-off partial frame with the two thumbnails
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
                    PARTIAL FRAME: CUT OFF BEFORE IT FINISHED
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
                    alt="PIA22930: Last Images Opportunity Took"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cyan-400 border border-cyan-500/40">
                    TWO THUMBNAILS RECEIVED
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

        {/* Myths vs. Facts Fact-Check Panel */}
        <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-sm mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>FACT-CHECK // MYTHS VS. FACTS</span>
          </div>

          <div className="space-y-3">
            {data.factCheck.map((row, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-serif italic text-zinc-300">{row.claim}</p>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-amber-500/40 text-amber-300 bg-amber-950/60">
                    {row.verdict}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{row.record}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {row.sources.map((src) => (
                    <a
                      key={src.url}
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 hover:text-cyan-300"
                    >
                      <span>{src.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Event Log */}
        <div className="rounded-xl overflow-hidden border border-space-border bg-space-card/90">
          <div className="px-4 py-3 bg-zinc-900/90 border-b border-space-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold text-white tracking-wide">
                VERIFIED EVENT LOG // NASA PRIMARY SOURCE CHRONOLOGY
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              MAY 2018 TO FEB 2019
            </span>
          </div>

          <div className="p-4 divide-y divide-space-border/60">
            {data.verifiedEventLog.map((event, idx) => (
              <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-start justify-between gap-3 text-xs">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2 font-mono">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-cyan-300 font-bold">
                      {event.date}
                    </span>
                    {event.timePdt && (
                      <span className="text-[11px] text-zinc-400">
                        {event.timePdt}
                      </span>
                    )}
                    {event.sol !== undefined && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-950 text-amber-400 border border-amber-500/30">
                        SOL {event.sol}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-100 font-display">
                    {event.title}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {event.description}
                  </p>
                </div>

                <div className="shrink-0 pt-1 md:self-start">
                  <a
                    href={event.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-space-border text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>{event.sourceLabel}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Postscript: The last recovery attempt */}
        <div className="p-4 rounded-xl bg-space-card/60 border border-space-border text-xs text-zinc-400 leading-relaxed font-mono">
          <span className="text-zinc-300 font-bold block mb-1">THE LAST RECOVERY ATTEMPT:</span>
          {data.lastCommandsNote}
        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t border-space-border flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 transition-colors focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            RETURN TO ARCHIVE
          </button>
        </div>

      </div>
    </dialog>
  );
};
