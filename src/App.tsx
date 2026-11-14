import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { MarsSurfaceMap } from './components/Map/MarsSurfaceMap';
import { MissionStory } from './components/Mission/MissionStory';
import { LastSignalModal } from './components/LastSignal/LastSignalModal';
import { CitationDrawer } from './components/Citations/CitationDrawer';
import { TraverseWaypoint } from './types/mission';
import { OPPORTUNITY_WAYPOINTS, OPPORTUNITY_MISSION } from './data/opportunityData';
import { 
  Radio, 
  MapPin, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Volume2
} from 'lucide-react';

export function App() {
  const [selectedWaypoint, setSelectedWaypoint] = useState<TraverseWaypoint | null>(null);
  const [isLastSignalOpen, setIsLastSignalOpen] = useState<boolean>(false);
  const [isCitationsOpen, setIsCitationsOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isStorySidebarOpen, setIsStorySidebarOpen] = useState<boolean>(true);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState<boolean>(true);

  // Jump from story to site
  const handleJumpToSite = (coords: [number, number], zoom: number) => {
    // Find closest waypoint or default
    const matchingWp = OPPORTUNITY_WAYPOINTS.find(
      (wp) => Math.abs(wp.coordinates[0] - coords[0]) < 0.05 && Math.abs(wp.coordinates[1] - coords[1]) < 0.05
    );
    if (matchingWp) {
      setSelectedWaypoint(matchingWp);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-[#07080b] text-zinc-100 overflow-hidden font-sans">
      {/* Top Mission Header */}
      <Header
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
        onOpenLastSignal={() => setIsLastSignalOpen(true)}
        onOpenCitations={() => setIsCitationsOpen(true)}
      />

      {/* Main Workspace Layout */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Central Map Canvas */}
        <div className="flex-1 relative h-full">
          <MarsSurfaceMap
            selectedWaypoint={selectedWaypoint}
            onSelectWaypoint={setSelectedWaypoint}
            onOpenLastSignal={() => setIsLastSignalOpen(true)}
          />

          {/* Collapsible Story Sidebar Toggle Button */}
          <button
            onClick={() => setIsStorySidebarOpen(!isStorySidebarOpen)}
            className="absolute top-20 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-space-card/90 backdrop-blur-md border border-space-border text-xs font-mono text-zinc-300 hover:text-white shadow-xl transition-all"
            title={isStorySidebarOpen ? 'Collapse Mission Story' : 'Open Mission Story'}
          >
            {isStorySidebarOpen ? (
              <>
                <span>Hide Chronicle</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </>
            ) : (
              <>
                <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>Mission Chronicle</span>
              </>
            )}
          </button>

          {/* Welcome Floating Banner (Dismissible) */}
          {showWelcomeBanner && (
            <div className="absolute bottom-16 left-6 z-20 max-w-lg p-4 rounded-xl bg-space-surface/95 backdrop-blur-md border border-amber-500/30 shadow-2xl text-zinc-200 animate-in fade-in duration-300">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-amber-500/20 text-amber-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs font-bold text-white tracking-wide">
                    OFFWORLD ARCHIVE EXPLORER
                  </span>
                </div>
                <button
                  onClick={() => setShowWelcomeBanner(false)}
                  className="text-zinc-500 hover:text-white text-xs font-mono"
                >
                  [DISMISS]
                </button>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-3">
                Explore the verified 45.16-km traverse of NASA's Mars Exploration Rover Opportunity across Meridiani Planum, from touchdown in Eagle Crater to the final resting site in Perseverance Valley.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsAudioPlaying(true);
                    setShowWelcomeBanner(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-black text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>INITIALIZE AUDIO & EXPLORE</span>
                </button>
                <button
                  onClick={() => setIsLastSignalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-mono font-semibold transition-colors"
                >
                  THE LAST SIGNAL
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Cinematic Documentary Story */}
        {isStorySidebarOpen && (
          <div className="w-full sm:w-96 lg:w-[440px] h-full shrink-0 z-30 animate-in slide-in-from-right duration-300">
            <MissionStory
              onJumpToSite={handleJumpToSite}
              onOpenLastSignal={() => setIsLastSignalOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Bottom Mission Ticker / Status Bar */}
      <footer className="h-9 px-6 bg-space-void border-t border-space-border/80 flex items-center justify-between text-[11px] font-mono text-zinc-400 select-none z-40">
        <div className="flex items-center gap-3">
          <span className="text-zinc-500 uppercase">TAGLINE:</span>
          <span className="text-amber-400/90 italic font-serif">
            "Every mission ends. Its discoveries remain."
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px]">
          <span className="hidden md:inline text-zinc-500">
            DATUM: <span className="text-zinc-300">IAU 2000 Mars Planetocentric Sphere (R=3,396,190m)</span>
          </span>
          <span className="hidden sm:inline text-zinc-500">
            LIFESPAN: <span className="text-cyan-400 font-bold">5,111 Sols</span>
          </span>
          <span className="text-zinc-500">
            ODOMETRY: <span className="text-emerald-400 font-bold">45.161 km</span>
          </span>
        </div>
      </footer>

      {/* "The Last Signal" Dedicated Experience Modal */}
      <LastSignalModal
        isOpen={isLastSignalOpen}
        onClose={() => setIsLastSignalOpen(false)}
      />

      {/* Citations & NASA Provenance Drawer */}
      <CitationDrawer
        isOpen={isCitationsOpen}
        onClose={() => setIsCitationsOpen(false)}
      />
    </div>
  );
}

export default App;
