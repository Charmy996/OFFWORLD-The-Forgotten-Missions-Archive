import React, { useRef, useEffect, useState } from 'react';
import { CelestialBody, PlanetaryExplorerRover } from '../../types/mission';

interface PlanetSphereCanvasProps {
  body: CelestialBody;
  rovers: PlanetaryExplorerRover[];
  selectedRover: PlanetaryExplorerRover;
  onSelectRover: (rover: PlanetaryExplorerRover) => void;
  onOpenStory: () => void;
}

export const PlanetSphereCanvas: React.FC<PlanetSphereCanvasProps> = ({
  body,
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

  // Set initial rotation centering on the selected rover when body changes
  useEffect(() => {
    if (selectedRover && selectedRover.body === body) {
      rotationLonRef.current = selectedRover.coordinates.lon;
      setRotationLon(selectedRover.coordinates.lon);
    }
  }, [body]);

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
      const radius = size * 0.42;

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
          if (dist <= 18) {
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

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
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
      drawAtmosphereGlow(ctx, cx, cy, radius, body);

      // 2. Draw Planetary Base Sphere & Surface Texture
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      drawPlanetSurface(ctx, cx, cy, radius, rot, body);

      // 3. Draw Graticules (Latitude & Longitude coordinate grid)
      drawGraticules(ctx, cx, cy, radius, rot, body);

      // 4. Draw Day/Night Terminator Shading (Realistic Sun illumination from top-left)
      drawLightingAndShadow(ctx, cx, cy, radius, body);

      ctx.restore();

      // 5. Draw Planet Rim Highlight
      drawRimHighlight(ctx, cx, cy, radius, body);

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
  }, [body, rovers, selectedRover, isDragging]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[500px] max-h-[500px] touch-none cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
        aria-label={`Interactive 2D globe of ${body}. Drag to rotate.`}
      />
      {/* Interactive Drag Hint */}
      <div className="absolute bottom-2 inset-x-0 flex items-center justify-center pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-zinc-800 text-[10px] font-mono text-zinc-400">
          Drag horizontally to rotate globe • Click pins to view rover
        </span>
      </div>
    </div>
  );
};

// Atmospheric Glow Outer Ring
function drawAtmosphereGlow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  body: CelestialBody
) {
  let innerGlow = 'rgba(234, 88, 12, 0.4)';
  let outerGlow = 'rgba(234, 88, 12, 0)';

  if (body === 'Moon') {
    innerGlow = 'rgba(56, 189, 248, 0.25)';
    outerGlow = 'rgba(56, 189, 248, 0)';
  } else if (body === 'Venus') {
    innerGlow = 'rgba(245, 158, 11, 0.45)';
    outerGlow = 'rgba(245, 158, 11, 0)';
  } else if (body === 'Titan') {
    innerGlow = 'rgba(249, 115, 22, 0.5)';
    outerGlow = 'rgba(249, 115, 22, 0)';
  }

  const grad = ctx.createRadialGradient(cx, cy, radius * 0.96, cx, cy, radius * 1.18);
  grad.addColorStop(0, innerGlow);
  grad.addColorStop(1, outerGlow);

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.18, 0, Math.PI * 2);
  ctx.fill();
}

// Draw Authentic Planetary Surfaces
function drawPlanetSurface(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rot: number,
  body: CelestialBody
) {
  // Base Planetary Color Fill
  let baseGrad = ctx.createRadialGradient(cx - radius * 0.25, cy - radius * 0.25, radius * 0.1, cx, cy, radius);

  if (body === 'Mars') {
    baseGrad.addColorStop(0, '#c2532a');
    baseGrad.addColorStop(0.65, '#993816');
    baseGrad.addColorStop(1, '#3b1206');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Mars Topographical swaths & features
    drawMarsFeatures(ctx, cx, cy, radius, rot);
  } else if (body === 'Moon') {
    baseGrad.addColorStop(0, '#d1d5db');
    baseGrad.addColorStop(0.65, '#6b7280');
    baseGrad.addColorStop(1, '#181b22');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Lunar Maria & Crater Rays
    drawMoonFeatures(ctx, cx, cy, radius, rot);
  } else if (body === 'Venus') {
    baseGrad.addColorStop(0, '#fef08a');
    baseGrad.addColorStop(0.5, '#eab308');
    baseGrad.addColorStop(1, '#713f12');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Venusian dense sulfuric cloud belts & atmospheric waves
    drawVenusFeatures(ctx, cx, cy, radius, rot);
  } else if (body === 'Titan') {
    baseGrad.addColorStop(0, '#fed7aa');
    baseGrad.addColorStop(0.5, '#ea580c');
    baseGrad.addColorStop(1, '#431407');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Titan organic tholin haze bands and dark equatorial dunes
    drawTitanFeatures(ctx, cx, cy, radius, rot);
  }
}

// Mars: Syrtis Major, Valles Marineris, Hellas Basin, Polar Cap
function drawMarsFeatures(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rot: number
) {
  const features = [
    { name: 'Syrtis Major', lat: 10, lon: 290, rx: 0.22, ry: 0.16, color: '#38160c' },
    { name: 'Sinus Sabaeus', lat: -5, lon: 340, rx: 0.35, ry: 0.08, color: '#2d1109' },
    { name: 'Valles Marineris', lat: -14, lon: 70, rx: 0.42, ry: 0.06, color: '#280d06' },
    { name: 'Acidalia Planitia', lat: 45, lon: 330, rx: 0.30, ry: 0.18, color: '#44190e' },
    { name: 'Hellas Basin', lat: -42, lon: 290, rx: 0.28, ry: 0.16, color: '#a34825' },
    { name: 'Tharsis Volcanic Plateau', lat: 0, lon: 110, rx: 0.38, ry: 0.28, color: '#9e3b18' }
  ];

  ctx.save();
  for (const f of features) {
    const radLat = (f.lat * Math.PI) / 180;
    const diffLon = ((f.lon - rot + 540) % 360) - 180;
    const radLon = (diffLon * Math.PI) / 180;

    const z = Math.cos(radLat) * Math.cos(radLon);
    if (z > 0.05) {
      const px = cx + radius * Math.cos(radLat) * Math.sin(radLon);
      const py = cy - radius * Math.sin(radLat);

      const fRx = radius * f.rx * Math.sqrt(Math.max(0.1, z));
      const fRy = radius * f.ry;

      ctx.fillStyle = f.color;
      ctx.beginPath();
      ctx.ellipse(px, py, fRx, fRy, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // North Polar Ice Cap (Bright White Water Ice / CO2 Frost)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.beginPath();
  ctx.ellipse(cx, cy - radius * 0.92, radius * 0.35, radius * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// Moon: Oceanus Procellarum, Mare Imbrium, Mare Serenitatis, Tycho Crater
function drawMoonFeatures(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rot: number
) {
  const maria = [
    { name: 'Oceanus Procellarum', lat: 18, lon: -57, rx: 0.40, ry: 0.38, color: '#272b34' },
    { name: 'Mare Imbrium', lat: 33, lon: -16, rx: 0.28, ry: 0.22, color: '#22252c' },
    { name: 'Mare Serenitatis', lat: 28, lon: 17, rx: 0.22, ry: 0.18, color: '#242830' },
    { name: 'Mare Tranquillitatis', lat: 8, lon: 31, rx: 0.24, ry: 0.18, color: '#21242c' },
    { name: 'Mare Crisium', lat: 17, lon: 59, rx: 0.15, ry: 0.14, color: '#1f2229' },
    { name: 'Mare Nubium', lat: -21, lon: -17, rx: 0.20, ry: 0.16, color: '#272a32' }
  ];

  ctx.save();
  for (const m of maria) {
    const radLat = (m.lat * Math.PI) / 180;
    const diffLon = ((m.lon - rot + 540) % 360) - 180;
    const radLon = (diffLon * Math.PI) / 180;

    const z = Math.cos(radLat) * Math.cos(radLon);
    if (z > 0.05) {
      const px = cx + radius * Math.cos(radLat) * Math.sin(radLon);
      const py = cy - radius * Math.sin(radLat);

      ctx.fillStyle = m.color;
      ctx.beginPath();
      ctx.ellipse(px, py, radius * m.rx * Math.sqrt(z), radius * m.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Tycho Crater & Radiating Bright Ray System
  const tychoLat = -43;
  const tychoLon = -11;
  const radLat = (tychoLat * Math.PI) / 180;
  const diffLon = ((tychoLon - rot + 540) % 360) - 180;
  const radLon = (diffLon * Math.PI) / 180;
  const z = Math.cos(radLat) * Math.cos(radLon);

  if (z > 0.1) {
    const px = cx + radius * Math.cos(radLat) * Math.sin(radLon);
    const py = cy - radius * Math.sin(radLat);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1;
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + Math.cos(angle) * radius * 0.45 * z, py + Math.sin(angle) * radius * 0.45);
      ctx.stroke();
    }

    // Central peak bright dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// Venus: Sulfuric acid cloud belts and atmospheric convection curls
function drawVenusFeatures(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rot: number
) {
  ctx.save();
  ctx.strokeStyle = 'rgba(161, 98, 7, 0.25)';
  ctx.lineWidth = radius * 0.08;

  // Cloud bands at various latitudes with wave offsets
  for (let lat = -50; lat <= 50; lat += 25) {
    const y = cy - (lat / 90) * radius * 0.85;
    ctx.beginPath();
    ctx.ellipse(cx, y, radius * 0.95, radius * 0.12, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Large planetary chevron UV cloud marking
  const chevronLon = ((180 - rot + 540) % 360) - 180;
  if (Math.abs(chevronLon) < 80) {
    const z = Math.cos((chevronLon * Math.PI) / 180);
    const px = cx + radius * 0.5 * Math.sin((chevronLon * Math.PI) / 180);

    ctx.fillStyle = 'rgba(133, 77, 14, 0.18)';
    ctx.beginPath();
    ctx.moveTo(px - radius * 0.3 * z, cy - radius * 0.4);
    ctx.lineTo(px + radius * 0.1 * z, cy);
    ctx.lineTo(px - radius * 0.3 * z, cy + radius * 0.4);
    ctx.lineTo(px - radius * 0.4 * z, cy);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

// Titan: Dense orange organic haze and dark equatorial hydrocarbon dunes
function drawTitanFeatures(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rot: number
) {
  ctx.save();

  // Dark equatorial organic sand seas (Shangri-La, Belet, Fensal)
  const equatorialSeas = [
    { lon: 190, rx: 0.45, ry: 0.12 },
    { lon: 270, rx: 0.40, ry: 0.10 },
    { lon: 60, rx: 0.38, ry: 0.11 }
  ];

  for (const s of equatorialSeas) {
    const diffLon = ((s.lon - rot + 540) % 360) - 180;
    const radLon = (diffLon * Math.PI) / 180;
    const z = Math.cos(radLon);

    if (z > 0.05) {
      const px = cx + radius * Math.sin(radLon);
      ctx.fillStyle = 'rgba(40, 16, 8, 0.7)';
      ctx.beginPath();
      ctx.ellipse(px, cy + radius * 0.05, radius * s.rx * Math.sqrt(z), radius * s.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Northern Methane Lakes (Kraken Mare / Ligeia Mare dark patches)
  ctx.fillStyle = 'rgba(25, 12, 6, 0.8)';
  ctx.beginPath();
  ctx.ellipse(cx, cy - radius * 0.78, radius * 0.28, radius * 0.09, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// Graticules: Coordinate lines of latitude & longitude
function drawGraticules(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rot: number,
  body: CelestialBody
) {
  ctx.save();
  ctx.strokeStyle = body === 'Moon' 
    ? 'rgba(255, 255, 255, 0.07)' 
    : 'rgba(255, 255, 255, 0.08)';
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

// Lighting & Dark Hemisphere Terminator
function drawLightingAndShadow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  body: CelestialBody
) {
  // Sunlight originates from the upper-left
  const lightX = cx - radius * 0.45;
  const lightY = cy - radius * 0.45;

  // Shadow overlay across lower-right limb
  const shadowGrad = ctx.createRadialGradient(lightX, lightY, radius * 0.4, cx, cy, radius * 1.05);
  shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  shadowGrad.addColorStop(0.55, 'rgba(0, 0, 0, 0.15)');
  shadowGrad.addColorStop(0.85, 'rgba(0, 0, 0, 0.65)');
  shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');

  ctx.fillStyle = shadowGrad;
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
}

// Planet Rim Highlight Ring
function drawRimHighlight(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  body: CelestialBody
) {
  let strokeColor = 'rgba(251, 146, 60, 0.35)';
  if (body === 'Moon') strokeColor = 'rgba(56, 189, 248, 0.25)';
  if (body === 'Venus') strokeColor = 'rgba(250, 204, 21, 0.35)';
  if (body === 'Titan') strokeColor = 'rgba(249, 115, 22, 0.4)';

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();
}

// Rover Markers and Beacons on the Sphere
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
    const z = cosLat * Math.cos(radLon); // Positive when facing Earth/viewer

    if (z > 0.02) {
      const px = cx + radius * cosLat * Math.sin(radLon);
      const py = cy - radius * Math.sin(radLat);

      // Depth scaling: markers near limb slightly smaller
      const depthScale = Math.max(0.7, z);

      // Pulse ring for selected marker
      if (isSelected) {
        const pulse = (Math.sin(time / 200) + 1) / 2;
        ctx.strokeStyle = `rgba(245, 158, 11, ${0.4 + pulse * 0.4})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(px, py, (12 + pulse * 8) * depthScale, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Marker Outer Glow
      ctx.fillStyle = isSelected ? '#f59e0b' : '#38bdf8';
      ctx.shadowColor = isSelected ? '#f59e0b' : '#38bdf8';
      ctx.shadowBlur = isSelected ? 12 : 6;

      ctx.beginPath();
      ctx.arc(px, py, (isSelected ? 6 : 4.5) * depthScale, 0, Math.PI * 2);
      ctx.fill();

      // Marker Inner Core
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(px, py, (isSelected ? 2.5 : 1.8) * depthScale, 0, Math.PI * 2);
      ctx.fill();

      // Marker Floating Label (when facing forward)
      if (z > 0.25) {
        ctx.font = isSelected
          ? 'bold 11px JetBrains Mono, monospace'
          : '10px JetBrains Mono, monospace';

        const labelText = rover.name;
        const textWidth = ctx.measureText(labelText).width;

        const boxX = px + 10;
        const boxY = py - 10;

        ctx.fillStyle = isSelected ? 'rgba(20, 10, 4, 0.85)' : 'rgba(8, 10, 14, 0.75)';
        ctx.strokeStyle = isSelected ? 'rgba(245, 158, 11, 0.6)' : 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.roundRect(boxX, boxY - 12, textWidth + 8, 16, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isSelected ? '#fde68a' : '#e2e8f0';
        ctx.fillText(labelText, boxX + 4, boxY);
      }
    }
  }

  ctx.restore();
}
