import React from 'react';
import { PlanetaryExplorerRover } from '../../types/mission';
import { RoverStoryExperience, StoryTheme } from './RoverStoryExperience';

export interface RoverStoryModalProps {
  rover: PlanetaryExplorerRover | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenTraverseMap?: () => void;
  onOpenLastSignal?: () => void;
  initialTheme?: StoryTheme;
}

/**
 * RoverStoryModal - Cinematic Interactive Rover Story Experience
 * Powered by authentic NASA PDS chronicles, Web Speech narration,
 * interactive 3-act narrative, failure anatomy diagnostics, and themes.
 */
export const RoverStoryModal: React.FC<RoverStoryModalProps> = (props) => {
  return <RoverStoryExperience {...props} />;
};

export default RoverStoryModal;
