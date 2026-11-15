import React, { useEffect, useRef, useState } from 'react';
import { OPPORTUNITY_MISSION } from '../../data/opportunityData';
import { Compass, Radio, ExternalLink, RotateCcw, AlertCircle } from 'lucide-react';

interface MarsGlobe3DProps {
  onOpen2DMap: (coords?: [number, number], zoom?: number) => void;
  onOpenLastSignal: () => void;
  onFallbackTo2DMap: () => void;
}

export const MarsGlobe3D: React.FC<MarsGlobe3DProps> = ({
  onOpen2DMap,
  onOpenLastSignal,
  onFallbackTo2DMap
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);
  const [isTextureLoaded, setIsTextureLoaded] = useState<boolean>(false);
  const [markerScreenPos, setMarkerScreenPos] = useState<{ x: number; y: number; visible: boolean } | null>(null);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [showMarkerActions, setShowMarkerActions] = useState<boolean>(true);

  // Rotation angles
  const rotationRef = useRef<{ pitch: number; yaw: number; autoRotate: boolean }>({
    pitch: 0.1,
    yaw: -0.3,
    autoRotate: true
  });
  const dragRef = useRef<{ isDown: boolean; startX: number; startY: number; startPitch: number; startYaw: number }>({
    isDown: false,
    startX: 0,
    startY: 0,
    startPitch: 0,
    startYaw: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Initialize WebGL Context
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext('webgl', { antialias: true, alpha: true }) ||
            canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }

    if (!gl) {
      setWebGlSupported(false);
      onFallbackTo2DMap();
      return;
    }

    // 2. Vertex Shader (Perspective projection + Lambertian diffuse + atmospheric rim)
    const vsSource = `
      attribute vec3 a_position;
      attribute vec3 a_normal;
      attribute vec2 a_texCoord;

      uniform mat4 u_mvpMatrix;
      uniform mat4 u_modelViewMatrix;
      uniform mat3 u_normalMatrix;

      varying vec2 v_texCoord;
      varying vec3 v_normal;
      varying vec3 v_eyeVec;

      void main() {
        v_texCoord = a_texCoord;
        v_normal = normalize(u_normalMatrix * a_normal);
        vec4 eyePos = u_modelViewMatrix * vec4(a_position, 1.0);
        v_eyeVec = -eyePos.xyz;
        gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
      }
    `;

    // 3. Fragment Shader (NASA MOLA texture sample + Day/Night lighting + Limb scatter glow)
    const fsSource = `
      precision mediump float;

      varying vec2 v_texCoord;
      varying vec3 v_normal;
      varying vec3 v_eyeVec;

      uniform sampler2D u_texture;
      uniform vec3 u_lightDirection;

      void main() {
        vec3 normal = normalize(v_normal);
        vec3 lightDir = normalize(u_lightDirection);
        vec3 eyeDir = normalize(v_eyeVec);

        // Diffuse Lambertian component
        float diff = max(dot(normal, lightDir), 0.0);

        // Atmospheric Limb Scatter Rim
        float rim = 1.0 - max(dot(normal, eyeDir), 0.0);
        rim = pow(rim, 3.2) * 0.75;
        vec3 atmosphereGlow = vec3(0.95, 0.45, 0.15) * rim;

        // Texture color
        vec4 texColor = texture2D(u_texture, v_texCoord);

        // Combined lighting (ambient 0.28 + diffuse 0.72)
        float lighting = 0.28 + 0.72 * diff;
        vec3 finalColor = texColor.rgb * lighting + atmosphereGlow * (0.3 + 0.7 * diff);

        gl_FragColor = vec4(finalColor, texColor.a);
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) {
      onFallbackTo2DMap();
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      onFallbackTo2DMap();
      return;
    }

    gl.useProgram(program);

    // 4. Generate 3D Sphere Geometry (lat/lon tessellation)
    const latBands = 50;
    const lonBands = 50;
    const radius = 1.0;

    const positions: number[] = [];
    const normals: number[] = [];
    const texCoords: number[] = [];
    const indices: number[] = [];

    for (let lat = 0; lat <= latBands; lat++) {
      const theta = (lat * Math.PI) / latBands;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let lon = 0; lon <= lonBands; lon++) {
        const phi = (lon * 2 * Math.PI) / lonBands;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        const x = cosPhi * sinTheta;
        const y = cosTheta;
        const z = sinPhi * sinTheta;

        // Texture coordinates (u from 0 to 1, v from 0 to 1)
        const u = 1.0 - (lon / lonBands);
        const v = lat / latBands;

        positions.push(radius * x, radius * y, radius * z);
        normals.push(x, y, z);
        texCoords.push(u, v);
      }
    }

    for (let lat = 0; lat < latBands; lat++) {
      for (let lon = 0; lon < lonBands; lon++) {
        const first = lat * (lonBands + 1) + lon;
        const second = first + lonBands + 1;

        indices.push(first, second, first + 1);
        indices.push(second, second + 1, first + 1);
      }
    }

    // Upload geometry buffers
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const normBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Attribute locations
    const aPosLoc = gl.getAttribLocation(program, 'a_position');
    const aNormLoc = gl.getAttribLocation(program, 'a_normal');
    const aTexLoc = gl.getAttribLocation(program, 'a_texCoord');

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.vertexAttribPointer(aPosLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosLoc);

    gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
    gl.vertexAttribPointer(aNormLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aNormLoc);

    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.vertexAttribPointer(aTexLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aTexLoc);

    // Uniform locations
    const uMvpLoc = gl.getUniformLocation(program, 'u_mvpMatrix');
    const uMvLoc = gl.getUniformLocation(program, 'u_modelViewMatrix');
    const uNormLoc = gl.getUniformLocation(program, 'u_normalMatrix');
    const uLightDirLoc = gl.getUniformLocation(program, 'u_lightDirection');

    // Sun light direction (shining from upper-left)
    gl.uniform3f(uLightDirLoc, 0.7, 0.5, 0.6);

    // 5. Load NASA MOLA Tile 0/0/0 as Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Temporary 1x1 placeholder pixel while NASA tile loads
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([180, 80, 40, 255])
    );

    const molaImage = new Image();
    molaImage.crossOrigin = 'anonymous';
    // Verified Level-0 NASA MOLA Color Shaded Relief global equirectangular tile
    molaImage.src = 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/0/0/0.jpg';

    molaImage.onload = () => {
      if (!gl) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, molaImage);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      setIsTextureLoaded(true);
    };

    molaImage.onerror = () => {
      // If external tile network fails, generate high-res procedural Martian surface
      const procCanvas = document.createElement('canvas');
      procCanvas.width = 512;
      procCanvas.height = 256;
      const pCtx = procCanvas.getContext('2d');
      if (pCtx && gl) {
        const grad = pCtx.createLinearGradient(0, 0, 0, 256);
        grad.addColorStop(0, '#f8fafc');
        grad.addColorStop(0.12, '#a7431e');
        grad.addColorStop(0.5, '#7c2d12');
        grad.addColorStop(0.88, '#9a3412');
        grad.addColorStop(1, '#f8fafc');
        pCtx.fillStyle = grad;
        pCtx.fillRect(0, 0, 512, 256);

        pCtx.fillStyle = '#451a03';
        pCtx.fillRect(180, 110, 140, 40);
        pCtx.fillRect(80, 90, 80, 50);

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, procCanvas);
        gl.generateMipmap(gl.TEXTURE_2D);
        setIsTextureLoaded(true);
      }
    };

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    // Matrix Mathematics Helpers
    function multiplyMatrices(a: number[], b: number[]): number[] {
      const out = new Array(16).fill(0);
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          out[r * 4 + c] =
            a[r * 4 + 0] * b[0 * 4 + c] +
            a[r * 4 + 1] * b[1 * 4 + c] +
            a[r * 4 + 2] * b[2 * 4 + c] +
            a[r * 4 + 3] * b[3 * 4 + c];
        }
      }
      return out;
    }

    function createPerspective(fovyRad: number, aspect: number, near: number, far: number): number[] {
      const f = 1.0 / Math.tan(fovyRad / 2);
      const nf = 1 / (near - far);
      return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, (2 * far * near) * nf, 0
      ];
    }

    // Matrix Normal 3x3 extraction
    function extractNormalMatrix(m: number[]): number[] {
      return [
        m[0], m[1], m[2],
        m[4], m[5], m[6],
        m[8], m[9], m[10]
      ];
    }

    // Opportunity's Last Known Coordinates (Perseverance Valley)
    // Latitude: -2.24° (South), Longitude: 354.78° (East)
    const oppyLatRad = (-2.24 * Math.PI) / 180;
    const oppyLonRad = (354.78 * Math.PI) / 180;

    // Unit sphere coordinates (in standard equirectangular alignment)
    const oppyUnitX = Math.cos(oppyLatRad) * Math.sin(oppyLonRad);
    const oppyUnitY = Math.sin(oppyLatRad);
    const oppyUnitZ = Math.cos(oppyLatRad) * Math.cos(oppyLonRad);

    let animationFrameId: number;
    let lastTime = performance.now();

    // 6. Animation and Render Loop
    const render = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Handle gentle auto-rotation when user is not dragging
      if (rotationRef.current.autoRotate) {
        rotationRef.current.yaw += dt * 0.15;
      }

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth * dpr;
      const displayHeight = canvas.clientHeight * dpr;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl!.viewport(0, 0, displayWidth, displayHeight);
      }

      gl!.clearColor(0.0, 0.0, 0.0, 0.0);
      gl!.clear(gl!.COLOR_BUFFER_BIT | gl!.DEPTH_BUFFER_BIT);

      const aspect = canvas.width / canvas.height;
      const projMatrix = createPerspective((35 * Math.PI) / 180, aspect, 0.1, 10.0);

      // Model-View Matrix with camera at z = 3.6
      const pitch = rotationRef.current.pitch;
      const yaw = rotationRef.current.yaw;

      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);

      // Rotation matrix = Pitch (around X) * Yaw (around Y)
      const rotMatrix = [
        cosY, sinP * sinY, -cosP * sinY, 0,
        0, cosP, sinP, 0,
        sinY, -sinP * cosY, cosP * cosY, 0,
        0, 0, -3.6, 1
      ];

      const mvpMatrix = multiplyMatrices(projMatrix, rotMatrix);
      const normalMatrix = extractNormalMatrix(rotMatrix);

      gl!.uniformMatrix4fv(uMvpLoc, false, new Float32Array(mvpMatrix));
      gl!.uniformMatrix4fv(uMvLoc, false, new Float32Array(rotMatrix));
      gl!.uniformMatrix3fv(uNormLoc, false, new Float32Array(normalMatrix));

      gl!.bindBuffer(gl!.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl!.drawElements(gl!.TRIANGLES, indices.length, gl!.UNSIGNED_SHORT, 0);

      // 7. Project Opportunity's 3D Marker to Screen Space
      // Transform local vertex (oppyUnitX, oppyUnitY, oppyUnitZ) by rotMatrix
      const tx = rotMatrix[0] * oppyUnitX + rotMatrix[4] * oppyUnitY + rotMatrix[8] * oppyUnitZ + rotMatrix[12];
      const ty = rotMatrix[1] * oppyUnitX + rotMatrix[5] * oppyUnitY + rotMatrix[9] * oppyUnitZ + rotMatrix[13];
      const tz = rotMatrix[2] * oppyUnitX + rotMatrix[6] * oppyUnitY + rotMatrix[10] * oppyUnitZ + rotMatrix[14];
      const tw = rotMatrix[3] * oppyUnitX + rotMatrix[7] * oppyUnitY + rotMatrix[11] * oppyUnitZ + rotMatrix[15];

      // Point must be in front of planet center (z > -3.6 + radius)
      // and facing the camera
      const isFacingCamera = tz > -3.55;

      if (isFacingCamera) {
        // Project to clip coordinates
        const clipX = (projMatrix[0] * tx) / -tz;
        const clipY = (projMatrix[5] * ty) / -tz;

        // Convert to client CSS pixels
        const screenPxX = ((clipX * 0.5) + 0.5) * canvas.clientWidth;
        const screenPxY = ((-clipY * 0.5) + 0.5) * canvas.clientHeight;

        setMarkerScreenPos({
          x: screenPxX,
          y: screenPxY,
          visible: true
        });
      } else {
        setMarkerScreenPos({ x: 0, y: 0, visible: false });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Mouse & Touch Drag Interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = {
      isDown: true,
      startX: e.clientX,
      startY: e.clientY,
      startPitch: rotationRef.current.pitch,
      startYaw: rotationRef.current.yaw
    };
    rotationRef.current.autoRotate = false;
    setIsInteracting(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.isDown) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    const sensitivity = 0.005;
    let newPitch = dragRef.current.startPitch + dy * sensitivity;
    newPitch = Math.max(-1.2, Math.min(1.2, newPitch)); // Clamp pitch

    const newYaw = dragRef.current.startYaw + dx * sensitivity;

    rotationRef.current.pitch = newPitch;
    rotationRef.current.yaw = newYaw;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    dragRef.current.isDown = false;
    setIsInteracting(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore pointer capture release
    }
  };

  const handleResetOrientation = () => {
    rotationRef.current.pitch = 0.1;
    rotationRef.current.yaw = -0.3;
    rotationRef.current.autoRotate = true;
  };

  if (!webGlSupported) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-zinc-300">
        <AlertCircle className="w-10 h-10 text-amber-400 mb-3" />
        <h3 className="text-base font-bold font-mono text-white mb-2">WebGL Unavailable</h3>
        <p className="text-xs text-zinc-400 max-w-sm mb-4">
          Hardware WebGL acceleration is not accessible in this environment. Falling back to the 2D surface map.
        </p>
        <button
          onClick={onFallbackTo2DMap}
          className="px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold"
        >
          Open 2D Surface Map
        </button>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-[#050608] flex items-center justify-center overflow-hidden select-none"
    >
      {/* Background Starfield */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-[#07080b] to-[#030406] pointer-events-none" />

      {/* Top Controls Overlay */}
      <div className="absolute top-4 left-4 z-30 flex flex-wrap items-center gap-2">
        <div className="px-3 py-1.5 rounded-xl bg-space-card/90 backdrop-blur-md border border-space-border text-xs font-mono text-zinc-300 shadow-xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-white font-bold">NASA MOLA 3D GLOBE</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">Tile: Level 0 (463m/px)</span>
        </div>

        <button
          onClick={handleResetOrientation}
          className="px-2.5 py-1.5 rounded-xl bg-space-card/80 hover:bg-zinc-800 border border-space-border text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber-400"
          title="Reset globe rotation and resume gentle auto-orbit"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Auto-Orbit</span>
        </button>
      </div>

      {/* WebGL Canvas Stage */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none z-10"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />

      {/* 3D Rover Location Marker Overlay */}
      {markerScreenPos && markerScreenPos.visible && (
        <div
          style={{
            left: `${markerScreenPos.x}px`,
            top: `${markerScreenPos.y}px`
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
        >
          {/* Pulsing Beacon Ring */}
          <div className="relative group cursor-pointer" onClick={() => setShowMarkerActions(!showMarkerActions)}>
            <div className="absolute -inset-3 rounded-full bg-rose-500 animate-ping opacity-60 pointer-events-none" />
            <div className="relative w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-[0_0_15px_rgba(244,63,94,0.9)] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            {/* Marker Label Badge */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/85 backdrop-blur-md border border-rose-500/50 rounded-lg px-2.5 py-1 text-xs font-mono shadow-2xl">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span className="text-white font-bold">Opportunity</span>
                <span className="text-rose-400 text-[10px]">(approximate)</span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                Perseverance Valley // Sol 5111
              </div>
            </div>
          </div>

          {/* Marker Quick Actions Popup */}
          {showMarkerActions && (
            <div className="absolute top-8 -left-20 w-64 bg-space-surface/95 backdrop-blur-xl border border-rose-500/40 rounded-xl p-3 shadow-2xl space-y-2 text-xs font-mono animate-in fade-in duration-200">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pb-1 border-b border-space-border flex items-center justify-between">
                <span>FINAL RESTING LOCATION</span>
                <span className="text-rose-400">2.24°S, 354.78°E</span>
              </div>

              <p className="text-[11px] text-zinc-300 font-sans leading-snug">
                Opportunity's reconstructed endpoint on the western rim of Endeavour Crater.
              </p>

              <div className="pt-1 flex flex-col gap-1.5">
                <button
                  onClick={() => onOpen2DMap([-5.22, -2.24], 13.5)}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Open 2D Surface Map</span>
                </button>

                <button
                  onClick={onOpenLastSignal}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-200 font-bold transition-colors focus-visible:ring-2 focus-visible:ring-rose-400"
                >
                  <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  <span>Launch "The Last Signal"</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Drag Instruction Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center gap-2 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Click & drag to rotate Mars globe • Marker opens 2D surface map or The Last Signal</span>
        </div>
      </div>
    </div>
  );
};

export default MarsGlobe3D;
