import React, { useRef, useEffect, useState } from 'react';
import { PlanetaryExplorerRover } from '../../types/mission';

interface PlanetSphereCanvasProps {
  rovers: PlanetaryExplorerRover[];
  selectedRover: PlanetaryExplorerRover;
  onSelectRover: (rover: PlanetaryExplorerRover) => void;
  onOpenStory: () => void;
}

export const PlanetSphereCanvas: React.FC<PlanetSphereCanvasProps> = ({
  rovers,
  selectedRover,
  onSelectRover,
  onOpenStory
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotationLon, setRotationLon] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; rot: number }>({ x: 0, rot: 0 });
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const rotationLonRef = useRef<number>(0);
  const hoveredRoverRef = useRef<PlanetaryExplorerRover | null>(null);

  // Sync ref with state
  rotationLonRef.current = rotationLon;

  // Set initial rotation centering on Opportunity
  useEffect(() => {
    if (selectedRover) {
      rotationLonRef.current = selectedRover.coordinates.lon;
      setRotationLon(selectedRover.coordinates.lon);
    }
  }, [selectedRover?.id]);

  // Handle Dragging to Rotate Planet
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, rot: rotationLonRef.current };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging) {
      const deltaX = e.clientX - dragStartRef.current.x;
      const degPerPx = 0.45;
      const newLon = (dragStartRef.current.rot - deltaX * degPerPx) % 360;
      rotationLonRef.current = newLon;
      setRotationLon(newLon);
    } else {
      // Hit test rover pins
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const size = Math.min(rect.width, rect.height);
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const radius = size * 0.40;

      let found: PlanetaryExplorerRover | null = null;
      for (const rover of rovers) {
        const radLat = (rover.coordinates.lat * Math.PI) / 180;
        const diffLon = ((rover.coordinates.lon - rotationLonRef.current + 540) % 360) - 180;
        const radLon = (diffLon * Math.PI) / 180;

        const cosLat = Math.cos(radLat);
        const z = cosLat * Math.cos(radLon);

        if (z > 0.05) {
          const px = cx + radius * (cosLat * Math.sin(radLon));
          const py = cy - radius * Math.sin(radLat);
          const dist = Math.hypot(clickX - px, clickY - py);
          if (dist <= 22) {
            found = rover;
            break;
          }
        }
      }
      hoveredRoverRef.current = found;
      canvas.style.cursor = found ? 'pointer' : isDragging ? 'grabbing' : 'grab';
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore pointer release errors
      }
    }
  };

  const handleClick = () => {
    if (hoveredRoverRef.current) {
      onSelectRover(hoveredRoverRef.current);
    }
  };

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = (time: number) => {
      if (!isRunning) return;

      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // Gentle auto-rotation when not dragging
      if (!isDragging) {
        rotationLonRef.current = (rotationLonRef.current + dt * 3.5) % 360;
      }

      // Handle retina resolution
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.40;
      const rot = rotationLonRef.current;

      // 1. Draw Outer Atmospheric Glow
      drawAtmosphereGlow(ctx, cx, cy, radius);

      // 2. Draw Planetary Base Sphere & Surface Texture
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      drawPlanetSurface(ctx, cx, cy, radius, rot);

      // 3. Draw Graticules (Latitude & Longitude coordinate grid)
      drawGraticules(ctx, cx, cy, radius, rot);

      // 4. Draw Day/Night Terminator Shading (Sun illumination from top-left)
      drawLightingAndShadow(ctx, cx, cy, radius);

      ctx.restore();

      // 5. Draw Planet Rim Highlight
      drawRimHighlight(ctx, cx, cy, radius);

      // 6. Draw Rover Markers and Beacons
      drawRoverMarkers(ctx, cx, cy, radius, rot, rovers, selectedRover, time);

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [rovers, selectedRover, isDragging]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        data-testid="planet-globe-canvas"
        className="w-full h-full max-w-[460px] max-h-[460px] touch-none cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
        aria-label="Interactive 2D globe of Mars. Drag horizontally to rotate."
      />
      {/* Illustrative rendering disclaimer chip */}
      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-space-border text-[10px] font-mono text-zinc-400 pointer-events-none">
        Illustrative rendering of Mars, not NASA imagery
      </div>
      {/* Interactive Drag Hint */}
      <div className="absolute bottom-2 inset-x-0 flex items-center justify-center pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-zinc-800 text-[10px] font-mono text-zinc-400">
          Drag horizontally to rotate globe • Click pin to view Opportunity
        </span>
      </div>
    </div>
  );
};

// 1. Atmosphere Halo
function drawAtmosphereGlow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number
) {
  const glowRadius = radius * 1.18;
  const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, glowRadius);
  glowGrad.addColorStop(0, 'rgba(234, 88, 12, 0.45)');
  glowGrad.addColorStop(0.5, 'rgba(194, 65, 12, 0.18)');
  glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
  ctx.fill();
}

// 2. Surface Rendering with Procedural Features
function drawPlanetSurface(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rot: number
) {
  // Base Terrain Gradient
  const baseGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
  baseGrad.addColorStop(0, '#9a3412');
  baseGrad.addColorStop(0.4, '#c2410c');
  baseGrad.addColorStop(0.7, '#7c2d12');
  baseGrad.addColorStop(1, '#431407');

  ctx.fillStyle = baseGrad;
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  // Surface Albedo Features
  drawMarsFeatures(ctx, cx, cy, radius, rot);
}

function drawMarsFeatures(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rot: number
) {
  const features = [
    { name: 'Syrtis Major', lat: 8.4, lon: 69.5, rx: 0.35, ry: 0.25, color: '#3f1a0d', angle: 0.2 },
    { name: 'Terra Sabaea', lat: -2.0, lon: 42.0, rx: 0.5, ry: 0.18, color: '#4a1d0f', angle: 0.05 },
    { name: 'Mare Tyrrhenum', lat: -24.0, lon: 105.0, rx: 0.45, ry: 0.22, color: '#38160c', angle: -0.1 },
    { name: 'Sinus Meridiani', lat: -2.0, lon: 355.0, rx: 0.3, ry: 0.15, color: '#33130a', angle: 0 },
    { name: 'Acidalia Planitia', lat: 46.7, lon: 338.0, rx: 0.5, ry: 0.3, color: '#3d170a', angle: 0.1 },
    { name: 'Valles Marineris', lat: -13.9, lon: 300.8, rx: 0.65, ry: 0.08, color: '#2b0f07', angle: 0.02 },
    { name: 'Hellas Basin', lat: -42.4, lon: 70.5, rx: 0.38, ry: 0.28, color: '#c46b38', angle: 0 },
    { name: 'Olympus Mons', lat: 18.6, lon: 226.2, rx: 0.16, ry: 0.16, color: '#572212', angle: 0 },
    { name: 'Elysium Planitia', lat: 25.0, lon: 147.0, rx: 0.35, ry: 0.25, color: '#522011', angle: -0.05 }
  ];

  for (const feat of features) {
    const radLat = (feat.lat * Math.PI) / 180;
    const diffLon = ((feat.lon - rot + 540) % 360) - 180;

    if (Math.abs(diffLon) < 90) {
      const radLon = (diffLon * Math.PI) / 180;
      const cosLat = Math.cos(radLat);
      const px = cx + radius * cosLat * Math.sin(radLon);
      const py = cy - radius * Math.sin(radLat);

      const z = cosLat * Math.cos(radLon);
      if (z > 0.05) {
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(feat.angle);
        ctx.scale(z, 1);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * feat.rx);
        grad.addColorStop(0, feat.color);
        grad.addColorStop(0.7, feat.color + 'aa');
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * feat.rx, radius * feat.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  // Mars Polar Ice Caps
  // North Polar Ice
  const northY = cy - radius * Math.sin((78 * Math.PI) / 180);
  const northR = radius * Math.cos((78 * Math.PI) / 180);
  const northGrad = ctx.createRadialGradient(cx, northY, 0, cx, northY, northR * 1.4);
  northGrad.addColorStop(0, 'rgba(255, 250, 245, 0.95)');
  northGrad.addColorStop(0.7, 'rgba(240, 230, 220, 0.7)');
  northGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = northGrad;
  ctx.beginPath();
  ctx.ellipse(cx, northY, northR * 1.4, northR * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();

  // South Polar Ice
  const southY = cy - radius * Math.sin((-82 * Math.PI) / 180);
  const southR = radius * Math.cos((-82 * Math.PI) / 180);
  const southGrad = ctx.createRadialGradient(cx, southY, 0, cx, southY, southR * 1.2);
  southGrad.addColorStop(0, 'rgba(255, 250, 245, 0.9)');
  southGrad.addColorStop(0.7, 'rgba(240, 230, 220, 0.6)');
  southGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = southGrad;
  ctx.beginPath();
  ctx.ellipse(cx, southY, southR * 1.2, southR * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
}

// 3. Graticules
function drawGraticules(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rot: number
) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 0.75;

  // Latitude circles
  for (let lat = -60; lat <= 60; lat += 30) {
    const radLat = (lat * Math.PI) / 180;
    const y = cy - radius * Math.sin(radLat);
    const rAtLat = radius * Math.cos(radLat);

    ctx.beginPath();
    ctx.ellipse(cx, y, rAtLat, rAtLat * 0.18, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Longitude meridians
  for (let lon = 0; lon < 360; lon += 45) {
    const diffLon = ((lon - rot + 540) % 360) - 180;
    if (Math.abs(diffLon) <= 90) {
      const radLon = (diffLon * Math.PI) / 180;
      const xOffset = radius * Math.sin(radLon);

      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.abs(xOffset), radius, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  ctx.restore();
}

// 4. Lighting & Shadow
function drawLightingAndShadow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number
) {
  const lightX = cx - radius * 0.45;
  const lightY = cy - radius * 0.45;

  const shadowGrad = ctx.createRadialGradient(lightX, lightY, radius * 0.4, cx, cy, radius * 1.05);
  shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  shadowGrad.addColorStop(0.55, 'rgba(0, 0, 0, 0.15)');
  shadowGrad.addColorStop(0.85, 'rgba(0, 0, 0, 0.65)');
  shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');

  ctx.fillStyle = shadowGrad;
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
}

// 5. Rim Highlight
function drawRimHighlight(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number
) {
  ctx.strokeStyle = 'rgba(251, 146, 60, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();
}

// 6. Rover Marker: Opportunity
function drawRoverMarkers(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rot: number,
  rovers: PlanetaryExplorerRover[],
  selectedRover: PlanetaryExplorerRover,
  time: number
) {
  ctx.save();

  for (const rover of rovers) {
    const isSelected = selectedRover.id === rover.id;
    const radLat = (rover.coordinates.lat * Math.PI) / 180;
    const diffLon = ((rover.coordinates.lon - rot + 540) % 360) - 180;
    const radLon = (diffLon * Math.PI) / 180;

    const cosLat = Math.cos(radLat);
    const z = cosLat * Math.cos(radLon);

    if (z > 0.02) {
      const px = cx + radius * cosLat * Math.sin(radLon);
      const py = cy - radius * Math.sin(radLat);
      const depthScale = Math.max(0.7, z);

      // Pulse ring
      const pulse = (Math.sin(time / 200) + 1) / 2;
      ctx.strokeStyle = `rgba(245, 158, 11, ${0.4 + pulse * 0.4})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(px, py, (12 + pulse * 8) * depthScale, 0, Math.PI * 2);
      ctx.stroke();

      // Outer glow
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.arc(px, py, 6 * depthScale, 0, Math.PI * 2);
      ctx.fill();

      // Inner Core
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(px, py, 2.5 * depthScale, 0, Math.PI * 2);
      ctx.fill();

      // Marker Floating Label
      if (z > 0.25) {
        ctx.font = 'bold 11px JetBrains Mono, monospace';

        const labelText = rover.name;
        const textWidth = ctx.measureText(labelText).width;

        const boxX = px + 10;
        const boxY = py - 10;

        ctx.fillStyle = 'rgba(20, 10, 4, 0.85)';
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.roundRect(boxX, boxY - 12, textWidth + 8, 16, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fde68a';
        ctx.fillText(labelText, boxX + 4, boxY);
      }
    }
  }

  ctx.restore();
}
