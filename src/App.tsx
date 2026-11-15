import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { MarsSurfaceMap } from './components/Map/MarsSurfaceMap';
import { MissionStory } from './components/Mission/MissionStory';
import { LastSignalModal } from './components/LastSignal/LastSignalModal';
import { CitationDrawer } from './components/Citations/CitationDrawer';
import { PlanetView } from './components/Planet/PlanetView';
import { TraverseWaypoint, PlanetaryExplorerRover } from './types/mission';
import { OPPORTUNITY_WAYPOINTS, PLANETARY_ROVERS } from './data/opportunityData';
import { RoverStoryModal } from './components/Planet/RoverStoryModal';
import { 
  ChevronRight, 
  ChevronLeft
} from 'lucide-react';

// Lazy-loaded 3D Mars Globe compiled from NASA MOLA Level 0 tiles
const MarsGlobe3D = React.lazy(() => import('./components/Planet/MarsGlobe3D'));

export function App() {
  const [currentView, setCurrentView] = useState<'globe' | 'planet' | 'surface'>('globe');
  const [selectedWaypoint, setSelectedWaypoint] = useState<TraverseWaypoint | null>(null);
  const [isLastSignalOpen, setIsLastSignalOpen] = useState<boolean>(false);
  const [isCitationsOpen, setIsCitationsOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isStorySidebarOpen, setIsStorySidebarOpen] = useState<boolean>(true);
  const [isRoverStoryOpen, setIsRoverStoryOpen] = useState<boolean>(false);
  const [selectedStoryRover, setSelectedStoryRover] = useState<PlanetaryExplorerRover>(PLANETARY_ROVERS[0]);

  // Jump from story to site
  const handleJumpToSite = (coords: [number, number], zoom: number) => {
    if (currentView !== 'surface') {
      setCurrentView('surface');
    }
    const matchingWp = OPPORTUNITY_WAYPOINTS.find(
      (wp) => Math.abs(wp.coordinates[0] - coords[0]) < 0.05 && Math.abs(wp.coordinates[1] - coords[1]) < 0.05
    );
    if (matchingWp) {
      setSelectedWaypoint(matchingWp);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-[#050608] text-zinc-100 overflow-hidden font-sans">
      {/* Top Mission Header */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
        onOpenLastSignal={() => setIsLastSignalOpen(true)}
        onOpenCitations={() => setIsCitationsOpen(true)}
        onOpenRoverStories={() => {
          setSelectedStoryRover(PLANETARY_ROVERS[0]);
          setIsRoverStoryOpen(true);
        }}
      />

      {/* Main Workspace Layout */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* View 1: Lazy-Loaded 3D Mars Globe */}
        {currentView === 'globe' ? (
          <div className="flex-1 relative h-full">
            <React.Suspense
              fallback={
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#050608] text-zinc-400 font-mono text-xs">
                  <div className="w-8 h-8 rounded-full border-2 border-rose-500 border-t-transparent animate-spin mb-3" />
                  <span>Loading 3D Mars Globe from NASA MOLA tiles...</span>
                </div>
              }
            >
              <MarsGlobe3D
                onOpen2DMap={(coords, zoom) => {
                  setCurrentView('surface');
                  if (coords) handleJumpToSite(coords, zoom || 13);
                }}
                onOpenLastSignal={() => setIsLastSignalOpen(true)}
                onFallbackTo2DMap={() => setCurrentView('surface')}
                onOpenRoverStory={() => {
                  setSelectedStoryRover(PLANETARY_ROVERS[0]);
                  setIsRoverStoryOpen(true);
                }}
              />
            </React.Suspense>
          </div>
        ) : currentView === 'planet' ? (
          /* View 2: Multi-Body 2D Planetary Explorer */
          <div className="flex-1 relative h-full">
            <PlanetView
              onOpenTraverseMap={() => setCurrentView('surface')}
              onOpenLastSignal={() => setIsLastSignalOpen(true)}
            />
          </div>
        ) : (
          /* View 3: Opportunity 2D Surface Traverse Map */
          <div className="flex-1 relative h-full">
            <MarsSurfaceMap
              selectedWaypoint={selectedWaypoint}
              onSelectWaypoint={setSelectedWaypoint}
              onOpenLastSignal={() => setIsLastSignalOpen(true)}
            />

            {/* Collapsible Story Sidebar Toggle Button: Positioned next to the Trajectory Navigation Panel without overlap */}
            <button
              onClick={() => setIsStorySidebarOpen(!isStorySidebarOpen)}
              className="absolute top-4 right-64 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-space-card/90 backdrop-blur-md border border-space-border text-xs font-mono text-zinc-300 hover:text-white shadow-xl transition-all focus-visible:ring-2 focus-visible:ring-amber-400"
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
          </div>
        )}

        {/* Right Sidebar: Cinematic Documentary Story (Shown in Surface Map mode when open) */}
        {currentView === 'surface' && isStorySidebarOpen && (
          <div className="w-full sm:w-96 lg:w-[440px] h-full shrink-0 z-30 animate-in slide-in-from-right duration-300">
            <MissionStory
              onJumpToSite={handleJumpToSite}
              onOpenLastSignal={() => setIsLastSignalOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Bottom Status Bar (Cleaned up: No taglines, professional metadata) */}
      <footer className="h-8 px-6 bg-space-void border-t border-space-border/80 flex items-center justify-between text-[11px] font-mono text-zinc-400 select-none z-40">
        <div className="flex items-center gap-4">
          <span className="text-zinc-500">CURRENT TARGET:</span>
          <span className="text-amber-400 font-bold uppercase">
            {currentView === 'globe'
              ? '3D Mars Globe (MOLA Level 0)'
              : currentView === 'planet'
              ? '2D Planetary System Overview'
              : 'Opportunity (MER-B) Traverse'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px]">
          <span className="hidden md:inline text-zinc-500">
            GEODETIC DATUM: <span className="text-zinc-300">IAU 2000 Mars Planetocentric Sphere (R=3,396,190m)</span>
          </span>
          <span className="hidden sm:inline text-zinc-500">
            RECORD: <span className="text-cyan-400 font-semibold">First marathon on another world (42.195 km)</span>
          </span>
          <span className="text-zinc-500">
            FINAL TRAVERSE: <span className="text-emerald-400 font-bold">45.161 km</span>
          </span>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <RoverStoryModal
        rover={selectedStoryRover}
        isOpen={isRoverStoryOpen}
        onClose={() => setIsRoverStoryOpen(false)}
        onOpenTraverseMap={() => {
          setIsRoverStoryOpen(false);
          setCurrentView('surface');
        }}
        onOpenLastSignal={() => {
          setIsRoverStoryOpen(false);
          setIsLastSignalOpen(true);
        }}
      />

      <LastSignalModal
        isOpen={isLastSignalOpen}
        onClose={() => setIsLastSignalOpen(false)}
      />

      <CitationDrawer
        isOpen={isCitationsOpen}
        onClose={() => setIsCitationsOpen(false)}
      />
    </div>
  );
}

export default App;
