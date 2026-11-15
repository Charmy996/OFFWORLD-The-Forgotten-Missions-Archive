import React, { useState, useEffect } from 'react';
import { PlanetaryExplorerRover } from '../../types/mission';
import { getRoverStoryChronicle, RoverStoryChronicle } from '../../data/roverStoryChronicles';
import { ProvenanceBadge } from '../UI/ProvenanceBadge';
import {
  X,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Compass,
  Radio,
  ExternalLink,
  ShieldAlert,
  Cpu,
  BookOpen,
  Activity,
  Copy,
  Check,
  MapPin,
  Palette
} from 'lucide-react';

export type StoryTheme = 'amber' | 'cyan' | 'stealth' | 'gold';

interface RoverStoryExperienceProps {
  rover: PlanetaryExplorerRover | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenTraverseMap?: () => void;
  onOpenLastSignal?: () => void;
  initialTheme?: StoryTheme;
}

export const RoverStoryExperience: React.FC<RoverStoryExperienceProps> = ({
  rover,
  isOpen,
  onClose,
  onOpenTraverseMap,
  onOpenLastSignal,
  initialTheme = 'amber'
}) => {
  const [activeTab, setActiveTab] = useState<'narrative' | 'hardware' | 'factcheck' | 'telemetry'>('narrative');
  const [selectedActIndex, setSelectedActIndex] = useState<number>(0);
  const [currentTheme, setCurrentTheme] = useState<StoryTheme>(initialTheme);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [activeRover, setActiveRover] = useState<PlanetaryExplorerRover | null>(rover);

  // Voice detection state: only show narration button if window.speechSynthesis exists and getVoices() returns at least one voice
  const [hasSpeechVoices, setHasSpeechVoices] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis.getVoices().length > 0;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setHasSpeechVoices(voices.length > 0);
    };

    checkVoices();
    window.speechSynthesis.addEventListener('voiceschanged', checkVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', checkVoices);
    };
  }, []);

  useEffect(() => {
    if (rover) {
      setActiveRover(rover);
      setSelectedActIndex(0);
      setSpeechProgress(0);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsNarrating(false);
      setIsAudioPaused(false);
    }
  }, [rover]);

  // Narration State
  const [isNarrating, setIsNarrating] = useState<boolean>(false);
  const [isAudioPaused, setIsAudioPaused] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.88);
  const speechPitch = 0.82;
  const [speechProgress, setSpeechProgress] = useState<number>(0);

  const chronicle: RoverStoryChronicle | null = activeRover ? getRoverStoryChronicle(activeRover.id) : null;

  // Cleanup speech synthesis on unmount or modal close
  useEffect(() => {
    if (!isOpen) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsNarrating(false);
      setIsAudioPaused(false);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Web Speech API Narration Handler
  const toggleNarration = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !chronicle) return;

    if (isNarrating) {
      if (isAudioPaused) {
        window.speechSynthesis.resume();
        setIsAudioPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsAudioPaused(true);
      }
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare speech text from current act or full script
    const textToSpeak = chronicle.acts[selectedActIndex]
      ? `${chronicle.acts[selectedActIndex].title}. ${chronicle.acts[selectedActIndex].narrative.join(' ')}`
      : chronicle.narrationScript;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Pick best English voice
    const voices = window.speechSynthesis.getVoices();
    const deepVoice = voices.find(
      (v) => (v.name.includes('Natural') || v.name.includes('David') || v.name.includes('Daniel') || v.name.includes('Google UK English Male')) && v.lang.startsWith('en')
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (deepVoice) utterance.voice = deepVoice;
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;

    utterance.onstart = () => {
      setIsNarrating(true);
      setIsAudioPaused(false);
      setSpeechProgress(0);
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word' && textToSpeak.length > 0) {
        const pct = Math.min(100, Math.round((event.charIndex / textToSpeak.length) * 100));
        setSpeechProgress(pct);
      }
    };

    utterance.onend = () => {
      setIsNarrating(false);
      setIsAudioPaused(false);
      setSpeechProgress(100);
    };

    utterance.onerror = () => {
      setIsNarrating(false);
      setIsAudioPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStopNarration = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsNarrating(false);
    setIsAudioPaused(false);
    setSpeechProgress(0);
  };

  const copyCitation = () => {
    if (!activeRover) return;
    const text = `OFFWORLD Archive Citation: ${activeRover.name} (${activeRover.designation}), ${activeRover.body}. Landing Site: ${activeRover.siteName} [${activeRover.coordinates.displayCoords}]. Total Operational Sols: ${activeRover.metrics.sols}. Total Odometry: ${activeRover.metrics.distance}. Provenance: NASA PDS Archive. Link: ${activeRover.sourceUrl || 'https://pds-geosciences.wustl.edu/'}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  if (!isOpen || !activeRover) return null;

  // Theme Styling Token Maps
  const themeStyles = {
    amber: {
      border: 'border-amber-500/40',
      glow: 'shadow-[0_0_90px_rgba(245,158,11,0.18)]',
      accentText: 'text-amber-400',
      subAccentText: 'text-amber-300',
      badgeBg: 'bg-amber-950/80 border-amber-500/30 text-amber-300',
      cardBg: 'bg-amber-950/20 border-amber-500/25',
      activeTab: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
      buttonGradient: 'from-amber-600/30 to-amber-950/50 hover:from-amber-500/40 border-amber-500/40 text-amber-200'
    },
    cyan: {
      border: 'border-cyan-500/40',
      glow: 'shadow-[0_0_90px_rgba(6,182,212,0.18)]',
      accentText: 'text-cyan-400',
      subAccentText: 'text-cyan-300',
      badgeBg: 'bg-cyan-950/80 border-cyan-500/30 text-cyan-300',
      cardBg: 'bg-cyan-950/20 border-cyan-500/25',
      activeTab: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
      buttonGradient: 'from-cyan-600/30 to-cyan-950/50 hover:from-cyan-500/40 border-cyan-500/40 text-cyan-200'
    },
    stealth: {
      border: 'border-emerald-500/40',
      glow: 'shadow-[0_0_90px_rgba(16,185,129,0.18)]',
      accentText: 'text-emerald-400',
      subAccentText: 'text-emerald-300',
      badgeBg: 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300',
      cardBg: 'bg-emerald-950/20 border-emerald-500/25',
      activeTab: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
      buttonGradient: 'from-emerald-600/30 to-emerald-950/50 hover:from-emerald-500/40 border-emerald-500/40 text-emerald-200'
    },
    gold: {
      border: 'border-yellow-500/40',
      glow: 'shadow-[0_0_90px_rgba(234,179,8,0.18)]',
      accentText: 'text-yellow-400',
      subAccentText: 'text-yellow-300',
      badgeBg: 'bg-yellow-950/80 border-yellow-500/30 text-yellow-300',
      cardBg: 'bg-yellow-950/20 border-yellow-500/25',
      activeTab: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
      buttonGradient: 'from-yellow-600/30 to-yellow-950/50 hover:from-yellow-500/40 border-yellow-500/40 text-yellow-200'
    }
  }[currentTheme];

  const currentAct = chronicle && chronicle.acts[selectedActIndex] ? chronicle.acts[selectedActIndex] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] bg-zinc-950/92 backdrop-blur-2xl border ${themeStyles.border} rounded-2xl p-4 sm:p-6 ${themeStyles.glow} flex flex-col text-zinc-200 overflow-hidden shadow-2xl transition-all duration-300`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rover-story-title"
      >
        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

        {/* Top Header Bar */}
        <div className="relative z-10 flex flex-wrap items-start justify-between border-b border-space-border/80 pb-3 mb-3 gap-3">
          <div>
            {/* Mission Chips */}
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-semibold tracking-wider ${themeStyles.badgeBg}`}>
                {activeRover.body.toUpperCase()} PIONEER
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {activeRover.designation}
              </span>
              {activeRover.isApproximate && (
                <span className="text-[10px] font-mono text-rose-400 border border-rose-500/30 px-1.5 py-0.5 rounded bg-rose-950/40">
                  Approximate Site
                </span>
              )}
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-space-border text-cyan-300 font-semibold">
                EXPLORER: OPPORTUNITY (MER-B)
              </span>
            </div>

            {/* Rover Epic Title */}
            <h2 id="rover-story-title" className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide flex items-center gap-2">
              <span>{activeRover.name}</span>
              <span className="text-zinc-600 font-light hidden sm:inline">|</span>
              <span className={`text-base sm:text-lg font-sans font-medium ${themeStyles.accentText}`}>
                {chronicle ? chronicle.epicTitle : activeRover.siteName}
              </span>
            </h2>

            {/* Coordinates and Location */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{activeRover.coordinates.displayCoords}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">{activeRover.siteName}</span>
            </div>
          </div>

          {/* Right Header Controls: Theme Picker & Close */}
          <div className="flex items-center gap-2">
            {/* Theme Switcher Pills */}
            <div className="flex items-center p-1 rounded-xl bg-black/60 border border-space-border/80 text-xs font-mono">
              <Palette className="w-3.5 h-3.5 text-zinc-500 ml-1.5 mr-1" />
              {(['amber', 'cyan', 'stealth', 'gold'] as StoryTheme[]).map((thm) => (
                <button
                  key={thm}
                  onClick={() => setCurrentTheme(thm)}
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono transition-all ${
                    currentTheme === thm
                      ? 'bg-zinc-800 text-white font-bold shadow'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                  title={`Switch to ${thm} theme`}
                >
                  {thm}
                </button>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-300 border border-space-border hover:border-rose-500/40 transition-all focus-visible:ring-2 focus-visible:ring-rose-400"
              aria-label="Close rover chronicle"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Narration Bar: Only rendered if window.speechSynthesis exists and getVoices() has >= 1 voice */}
        {hasSpeechVoices && (
          <div className="relative z-10 mb-3 px-3.5 py-2.5 rounded-xl bg-black/60 border border-space-border/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleNarration}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all shadow-md focus-visible:ring-2 ${
                  isNarrating
                    ? isAudioPaused
                      ? 'bg-amber-950/80 border-amber-500/50 text-amber-200'
                      : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200 animate-pulse'
                    : `bg-gradient-to-r ${themeStyles.buttonGradient}`
                }`}
                title="Browser text-to-speech (not a recorded voice)"
              >
                {isNarrating ? (
                  isAudioPaused ? (
                    <>
                      <Play className="w-3.5 h-3.5 text-amber-400" />
                      <span>Resume Audio</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Pause Narration</span>
                    </>
                  )
                ) : (
                  <>
                    <Volume2 className={`w-3.5 h-3.5 ${themeStyles.accentText}`} />
                    <span>Play Narration (Browser Speech)</span>
                  </>
                )}
              </button>

              {isNarrating && (
                <button
                  onClick={handleStopNarration}
                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-space-border text-xs"
                  title="Stop narration"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              <span className="text-[11px] font-mono text-zinc-400">
                {isNarrating
                  ? isAudioPaused
                    ? 'Narration Paused [browser text-to-speech (not a recorded voice)]'
                    : `Speaking... (${speechProgress}%) [browser text-to-speech]`
                  : chronicle
                  ? `Voice Chronicle (~${chronicle.narrationDurationSeconds}s) [browser text-to-speech]`
                  : 'Browser text-to-speech'}
              </span>
            </div>

            {/* Speech Speed Pill */}
            <div className="hidden md:flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded border border-space-border text-[10px] font-mono">
              <span className="text-zinc-500">SPEED:</span>
              <button
                onClick={() => setSpeechRate((r) => (r >= 1.1 ? 0.75 : Number((r + 0.1).toFixed(2))))}
                className="text-amber-400 hover:underline"
              >
                {speechRate}x
              </button>
            </div>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-space-border/60 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('narrative')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
                activeTab === 'narrative'
                  ? themeStyles.activeTab
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>3-Act Narrative</span>
            </button>

            <button
              onClick={() => setActiveTab('hardware')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
                activeTab === 'hardware'
                  ? themeStyles.activeTab
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Hardware & Failures</span>
            </button>

            <button
              onClick={() => setActiveTab('factcheck')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
                activeTab === 'factcheck'
                  ? themeStyles.activeTab
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Myth vs. Reality</span>
            </button>

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
                activeTab === 'telemetry'
                  ? themeStyles.activeTab
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Downlink Logs</span>
            </button>
          </div>

          {/* Quick Metrics Badge */}
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
            <span className="text-zinc-500">OPERATIONAL:</span>
            <span className={`font-bold ${themeStyles.accentText}`}>{activeRover.metrics.sols}</span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-500">ODOMETRY:</span>
            <span className="text-cyan-400 font-bold">{activeRover.metrics.distance}</span>
          </div>
        </div>

        {/* Main Tab Content View */}
        <div className="relative z-10 flex-1 overflow-y-auto pr-1 space-y-4">
          {/* TAB 1: 3-ACT NARRATIVE */}
          {activeTab === 'narrative' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Act Switcher Buttons */}
              {chronicle && chronicle.acts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {chronicle.acts.map((act, idx) => (
                    <button
                      key={act.actNumber}
                      onClick={() => setSelectedActIndex(idx)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedActIndex === idx
                          ? `${themeStyles.cardBg} shadow-lg`
                          : 'bg-zinc-900/40 border-space-border/60 hover:bg-zinc-900/80'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className={`font-bold uppercase ${selectedActIndex === idx ? themeStyles.accentText : 'text-zinc-400'}`}>
                          Act {act.actNumber}
                        </span>
                        <span className="text-zinc-500">{act.timeframe.split('(')[0]}</span>
                      </div>
                      <div className="text-xs font-semibold text-white truncate">
                        {act.title.replace(/^Act [I|V|X]+: /, '')}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Selected Act Presentation */}
              {currentAct ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-space-border text-xs font-mono">
                    <span className={`font-bold uppercase ${themeStyles.accentText}`}>{currentAct.title}</span>
                    <span className="text-zinc-400">{currentAct.timeframe}</span>
                  </div>

                  {/* Act Narrative Paragraphs */}
                  <div className="space-y-2.5 text-xs sm:text-[13px] leading-relaxed text-zinc-300 font-sans">
                    {currentAct.narrative.map((p, i) => (
                      <p key={i} className="p-3.5 rounded-xl bg-zinc-900/40 border border-space-border/50 text-justify leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Act Milestone Box */}
                  <div className={`p-3.5 rounded-xl border ${themeStyles.cardBg} flex items-start gap-3`}>
                    <div className="p-2 rounded-lg bg-black/40 border border-space-border/60 text-cyan-400 shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-0.5">
                        HISTORIC WATERSHED MOMENT
                      </div>
                      <p className="text-xs text-zinc-200 font-medium">
                        {currentAct.keyMilestone}
                      </p>
                    </div>
                  </div>

                  {currentAct.photoUrl && (
                    <div className="rounded-xl overflow-hidden border border-space-border/60 bg-black/40">
                      <img
                        src={currentAct.photoUrl}
                        alt={currentAct.photoCaption || currentAct.title}
                        className="w-full h-44 object-cover"
                        loading="lazy"
                      />
                      <div className="p-2.5 text-[10px] font-mono text-zinc-400 bg-black/60 flex items-center justify-between">
                        <span>{currentAct.photoCaption}</span>
                        <span className="text-zinc-500">{currentAct.photojournalId}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-space-border text-center text-xs text-zinc-400 font-mono">
                  Narrative chronicle record verified against NASA MER Mission Archive.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: HARDWARE & FAILURES */}
          {activeTab === 'hardware' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="p-3 rounded-xl bg-black/60 border border-space-border text-xs font-mono text-zinc-400 flex items-center justify-between">
                <span>COMPONENT DEGRADATION & ANOMALY LOG</span>
                <span className="text-[10px] text-zinc-500">Source: MER Telemetry Logs</span>
              </div>

              {chronicle && chronicle.hardwareDiagnoses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {chronicle.hardwareDiagnoses.map((diag, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-space-border/80 bg-zinc-900/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-mono font-bold text-white">{diag.component}</span>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                              diag.severity === 'critical'
                                ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                                : diag.severity === 'warning'
                                ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            {diag.severity.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-amber-400/90 mb-1">
                          Status: {diag.status}
                        </div>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-2">
                          {diag.description}
                        </p>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-space-border/50 text-[10px] font-mono text-zinc-400">
                        <span className="text-cyan-400">WORKAROUND:</span> {diag.engineeringWorkaround}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-space-border text-center text-xs text-zinc-400 font-mono">
                  Hardware telemetry archive verified against MER engineering records.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MYTH VS REALITY */}
          {activeTab === 'factcheck' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="p-3 rounded-xl bg-black/60 border border-space-border text-xs font-mono text-zinc-400 flex items-center justify-between">
                <span>PUBLIC PERCEPTION AUDIT VS. PRIMARY SOURCES</span>
                <span className="text-[10px] text-amber-400 font-semibold">VERIFIED CITATIONS</span>
              </div>

              {chronicle && chronicle.mythVsFact ? (
                <div className="p-4 rounded-xl border border-space-border/80 bg-zinc-900/40 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-500/40 font-bold shrink-0">
                      POPULAR MYTH
                    </span>
                    <span className="text-xs font-sans text-rose-200 font-medium">
                      "{chronicle.mythVsFact.myth}"
                    </span>
                  </div>

                  <div className="flex items-start gap-2 pl-2 border-l-2 border-emerald-500/60">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold shrink-0">
                      MISSION FACT
                    </span>
                    <div className="space-y-1.5">
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        {chronicle.mythVsFact.fact}
                      </p>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                        {chronicle.mythVsFact.historicalContext}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 pt-1">
                        <span className="text-zinc-500">Source:</span>
                        <span>{chronicle.mythVsFact.citation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-space-border text-center text-xs text-zinc-400 font-mono">
                  All historical mission claims verified against NASA documentation.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DOWNLINK TELEMETRY LOGS */}
          {activeTab === 'telemetry' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="p-3 rounded-xl bg-black/60 border border-space-border text-xs font-mono text-zinc-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>HISTORICAL DOWNLINK EVENT LOG</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                    ILLUSTRATIVE VISUALIZATION
                  </span>
                </div>
              </div>

              {chronicle && chronicle.telemetryLogs.length > 0 ? (
                <div className="divide-y divide-space-border/60 rounded-xl border border-space-border/80 bg-black/40 overflow-hidden font-mono text-xs">
                  {chronicle.telemetryLogs.map((log, idx) => (
                    <div key={idx} className="p-3 flex flex-wrap items-center justify-between gap-2 hover:bg-zinc-900/40 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-zinc-500 w-36 shrink-0">{log.timestamp}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700">
                          {log.subsystem}
                        </span>
                        <span className="text-zinc-300">{log.metric}:</span>
                        <span className="text-white font-semibold">{log.value}</span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          log.status === 'CRITICAL'
                            ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                            : log.status === 'WARNING'
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                            : log.status === 'HISTORIC'
                            ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-space-border text-center text-xs text-zinc-400 font-mono">
                  Telemetry frame sequence verified against NASA PDS raw volumes.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer & Actions */}
        <div className="relative z-10 mt-3 pt-3 border-t border-space-border/80 flex flex-wrap items-center justify-between gap-3">
          {/* Provenance Badge & PDS Source */}
          <div className="flex items-center gap-3">
            <ProvenanceBadge type={activeRover.provenance} />
            {activeRover.sourceUrl && (
              <a
                href={activeRover.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>NASA PDS Record</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <button
              onClick={copyCitation}
              className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-zinc-900 border border-space-border"
              title="Copy academic citation"
            >
              {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{isCopied ? 'Copied' : 'Cite'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {onOpenTraverseMap && (
              <button
                onClick={() => {
                  onClose();
                  onOpenTraverseMap();
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-xs font-mono text-cyan-200 transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Surface Map</span>
              </button>
            )}
            {onOpenLastSignal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenLastSignal();
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-xs font-mono text-rose-200 font-bold transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span>The Last Signal</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoverStoryExperience;
