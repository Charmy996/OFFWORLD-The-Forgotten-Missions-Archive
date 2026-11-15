import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { MarsSurfaceMap } from './components/Map/MarsSurfaceMap';
import { MissionStory } from './components/Mission/MissionStory';
import { LastSignalModal } from './components/LastSignal/LastSignalModal';
import { CitationDrawer } from './components/Citations/CitationDrawer';
import { PlanetView } from './components/Planet/PlanetView';
import { TraverseWaypoint } from './types/mission';
import { OPPORTUNITY_WAYPOINTS, PLANETARY_ROVERS } from './data/opportunityData';
import { RoverStoryModal } from './components/Planet/RoverStoryModal';

export function App() {
  const [currentView, setCurrentView] = useState<'overview' | 'surface'>('surface');
  const [selectedWaypoint, setSelectedWaypoint] = useState<TraverseWaypoint | null>(null);
  const [isLastSignalOpen, setIsLastSignalOpen] = useState<boolean>(false);
  const [isCitationsOpen, setIsCitationsOpen] = useState<boolean>(false);
  const [isStorySidebarOpen, setIsStorySidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });
  const [isRoverStoryOpen, setIsRoverStoryOpen] = useState<boolean>(false);

  // Jump from story to site
  const handleJumpToSite = (coords: [number, number]) => {
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
        onOpenLastSignal={() => setIsLastSignalOpen(true)}
        onOpenCitations={() => setIsCitationsOpen(true)}
        onOpenRoverStories={() => setIsRoverStoryOpen(true)}
      />

      {/* Main Workspace Layout */}
      <div className="relative flex-1 flex overflow-hidden">
        {currentView === 'overview' ? (
          /* View 1: Mars Overview (Illustrative 2D Globe) */
          <div className="flex-1 relative h-full">
            <PlanetView
              onOpenTraverseMap={() => setCurrentView('surface')}
              onOpenLastSignal={() => setIsLastSignalOpen(true)}
              onOpenRoverChronicles={() => setIsRoverStoryOpen(true)}
            />
          </div>
        ) : (
          /* View 2: Opportunity 2D Surface Traverse Map */
          <>
            <div className="flex-1 relative h-full">
              <MarsSurfaceMap
                selectedWaypoint={selectedWaypoint}
                onSelectWaypoint={setSelectedWaypoint}
                onOpenLastSignal={() => setIsLastSignalOpen(true)}
                isStorySidebarOpen={isStorySidebarOpen}
                onToggleStorySidebar={() => setIsStorySidebarOpen(!isStorySidebarOpen)}
              />
            </div>

            {/* Right Sidebar: Cinematic Documentary Story */}
            {isStorySidebarOpen && (
              <div 
                data-testid="chronicle-sidebar"
                className="absolute sm:relative right-0 top-0 bottom-0 w-full sm:w-96 lg:w-[440px] h-full shrink-0 z-30 animate-in slide-in-from-right duration-300"
              >
                <MissionStory
                  onJumpToSite={handleJumpToSite}
                  onOpenLastSignal={() => setIsLastSignalOpen(true)}
                  onClose={() => setIsStorySidebarOpen(false)}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Status Bar */}
      <footer 
        data-testid="app-footer"
        className="h-8 px-6 bg-space-void border-t border-space-border/80 flex items-center justify-between text-[11px] font-mono text-zinc-400 select-none z-40 shrink-0"
      >
        <div className="flex items-center gap-4">
          <span className="text-zinc-500">CURRENT TARGET:</span>
          <span className="text-amber-400 font-bold uppercase">
            {currentView === 'overview' ? 'Mars Overview (2D Globe)' : 'Opportunity (MER-B) Traverse'}
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
        rover={PLANETARY_ROVERS[0]}
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
