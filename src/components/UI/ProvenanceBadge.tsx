import React from 'react';
import { ProvenanceType } from '../../types/mission';
import { CheckCircle2, AlertTriangle, Radio, Camera, Cpu, Layers } from 'lucide-react';

interface ProvenanceBadgeProps {
  type: ProvenanceType;
  className?: string;
  showIcon?: boolean;
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({ 
  type, 
  className = '',
  showIcon = true 
}) => {
  switch (type) {
    case 'AUTHENTIC_PHOTOGRAPH_PDS_EDR':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono tracking-wider bg-emerald-950/70 text-emerald-400 border border-emerald-500/30 ${className}`}>
          {showIcon && <Camera className="w-3 h-3" />}
          <span>AUTHENTIC PHOTO // PDS EDR</span>
        </span>
      );
    case 'AUTHENTIC_TELEMETRY_JPL_RMC':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono tracking-wider bg-sky-950/70 text-sky-400 border border-sky-500/30 ${className}`}>
          {showIcon && <Cpu className="w-3 h-3" />}
          <span>VERIFIED TELEMETRY // JPL RMC</span>
        </span>
      );
    case 'NASA_PHOTOJOURNAL_PIA':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono tracking-wider bg-cyan-950/70 text-cyan-400 border border-cyan-500/30 ${className}`}>
          {showIcon && <CheckCircle2 className="w-3 h-3" />}
          <span>NASA PHOTOJOURNAL ARCHIVE</span>
        </span>
      );
    case 'SONIFIED_SENSOR_DATA':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono tracking-wider bg-amber-950/70 text-amber-400 border border-amber-500/30 ${className}`}>
          {showIcon && <Radio className="w-3 h-3" />}
          <span>SONIFIED SENSOR DATA // PROCESSED</span>
        </span>
      );
    case 'UNVERIFIED_ENGINEERING_ESTIMATE':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono tracking-wider bg-amber-950/90 text-amber-300 border border-amber-500/50 ${className}`}>
          {showIcon && <AlertTriangle className="w-3 h-3" />}
          <span>UNVERIFIED ENGINEERING ESTIMATE</span>
        </span>
      );
    case 'HISTORICAL_RECONSTRUCTION':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono tracking-wider bg-purple-950/70 text-purple-400 border border-purple-500/30 ${className}`}>
          {showIcon && <Layers className="w-3 h-3" />}
          <span>HISTORICAL RECONSTRUCTION</span>
        </span>
      );
    default:
      return null;
  }
};
