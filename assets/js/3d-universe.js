/**
 * THE COSMIC UNIVERSE — 3D INTERACTIVE WEBGL ENVIRONMENT
 * Built with Three.js (r128)
 *
 * Implements:
 * 1. Multi-depth Cosmic Starfield & Ambient Dust with Particle Glow Textures
 * 2. Elaborate Ancient Cosmic Astronomical Mechanism:
 *    - Circular Antique Bronze & Aged Gold Outer Dial Frame with Calibrated Celestial Ticks
 *    - Counter-Rotating Mid Chronometer Gear Ring with Mechanical Cogs & Radial Spoke Arms
 *    - Astronomical Constellation Ring with 12 Celestial Nodes & Orbiting Planetary Cogs
 *    - Concentric Deep Teal / Luminous Cyan Inner Ring Structure with Cross-Struts
 *    - Inner Inclined Armillary Ecliptic Ring (23.5° celestial angle)
 *    - Radiant Golden Energy Core with Harmonic Pulsing, Corona Halos & Dedicated Point Light
 * 3. Six Complementary 3D Cosmic Artifacts Distributed in Space:
 *    - Celestial Orthogonal Gyroscope with 3 Concentric Gimbals
 *    - Faceted Crystalline Octahedral Prism with Refractive Cyan Glow
 *    - Interlocking Elliptical Armillary Orbitals with Traveling Brass Beads
 *    - Dodecahedral Geometric Relic with Suspended Golden Diamond Core
 *    - Segmented Orbital Chronometer Sphere with Rotating Equator Gear Band
 *    - Cosmic Mobius Torus Knot with Iridescent Bronze-Teal Metallic Sheen
 * 4. 3D Star-Breaking Fragmentation Particle Engine (Flare -> 3D Scatter -> Fade -> Clean Recycle)
 * 5. Pointer Parallax with Smooth Damping & Full-Page Scroll Voyage Dynamics
 * 6. Real-time Dynamic Theme Synchronization (Dark/Light)
 * 7. Performance & Accessibility Guards (IntersectionObserver, visibilitychange, DPR clamp, prefers-reduced-motion)
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. WebGL Feature Detection & Context Safety
  // ---------------------------------------------------------------------------
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }

  const container = document.getElementById('hero-3d-container');
  const canvas = document.getElementById('hero-3d-canvas');

  if (!container || !canvas) {
    return;
  }

  if (!isWebGLAvailable() || typeof THREE === 'undefined') {
    container.classList.add('hero-3d--fallback');
    return;
  }

  // ---------------------------------------------------------------------------
  // 2. Scene, Perspective Camera & Renderer Initialization
  // ---------------------------------------------------------------------------
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x060911, 0.008);

  const fov = 45;
  let aspect = container.clientWidth / (container.clientHeight || 1);
  const near = 0.1;
  const far = 200;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 15);
  scene.add(camera);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
  } catch (err) {
    container.classList.add('hero-3d--fallback');
    return;
  }

  // ---------------------------------------------------------------------------
  // 3. Theme Color Schemes & Dynamic Palettes
  // ---------------------------------------------------------------------------
  function isDarkMode() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  // ---------------------------------------------------------------------------
  // 3b. Exact Cosmic Mechanism Background (Full-Viewport Coverage & 3D Rotation)
  // ---------------------------------------------------------------------------
  // Sourced from exact user reference (assets/images/exact-cosmic-mechanism.jpg, 1344x768).
  // Sized dynamically relative to camera frustum diagonal to ensure 100% full-viewport
  // coverage at any 3D rotation angle with zero black borders, zero empty gaps,
  // and zero aspect-ratio distortion across desktop, tablet, and mobile viewports.
  const exactCosmicLoader = new THREE.TextureLoader();
  const exactCosmicTexture = exactCosmicLoader.load('assets/images/exact-cosmic-mechanism.jpg', function () {
    updateExactCosmicBackgroundPlane();
  });
  exactCosmicTexture.generateMipmaps = false;
  exactCosmicTexture.minFilter = THREE.LinearFilter;
  exactCosmicTexture.magFilter = THREE.LinearFilter;
  exactCosmicTexture.wrapS = THREE.ClampToEdgeWrapping;
  exactCosmicTexture.wrapT = THREE.ClampToEdgeWrapping;
  if (renderer && renderer.capabilities) {
    exactCosmicTexture.anisotropy = Math.min(16, renderer.capabilities.getMaxAnisotropy());
  }

  const exactCosmicPlaneGeom = new THREE.PlaneGeometry(1, 1);
  const exactCosmicPlaneMat = new THREE.MeshBasicMaterial({
    map: exactCosmicTexture,
    transparent: true,
    opacity: isDarkMode() ? 1.0 : 0.20,
    depthWrite: false,
    fog: false
  });
  const exactCosmicBgMesh = new THREE.Mesh(exactCosmicPlaneGeom, exactCosmicPlaneMat);
  exactCosmicBgMesh.position.set(0, 0, -25.0);
  camera.add(exactCosmicBgMesh);

  function updateExactCosmicBackgroundPlane() {
    if (!exactCosmicBgMesh || !camera) return;
    const dist = Math.abs(exactCosmicBgMesh.position.z);
    const fovRad = (camera.fov * Math.PI) / 180;
    const frustumH = 2 * dist * Math.tan(fovRad / 2);
    const frustumW = frustumH * camera.aspect;
    const diag = Math.sqrt(frustumW * frustumW + frustumH * frustumH);

    // Exact Image Aspect Ratio: 1344 / 768 = 1.75
    const imgAspect = 1344 / 768;
    // Tight circumcircle coverage: sized with minimal 0.2% margin to avoid unnecessary zoom/crop
    const planeH = diag * 1.002;
    const planeW = planeH * imgAspect;
    exactCosmicBgMesh.scale.set(planeW, planeH, 1);
  }
  updateExactCosmicBackgroundPlane();

  const palettes = {
    dark: {
      fog: 0x060911,
      stars: 0xe2e8f0,
      neuralLines: 0x0e7490,
      neuralNodes: 0x38bdf8,
      neuralCage: 0x4f46e5,
      asteroids: 0x1a2233,
      asteroidWire: 0x334155,
      dataStream: 0x0891b2,
      cyberShield: 0x4338ca,
      ambientLight: 0x0f172a,
      pointLight1: 0xdbeafe,
      pointLight2: 0x312e81
    },
    light: {
      fog: 0xf8fafc,
      stars: 0x64748b,
      neuralLines: 0x2563eb,
      neuralNodes: 0x0284c7,
      neuralCage: 0x6366f1,
      asteroids: 0x94a3b8,
      asteroidWire: 0x64748b,
      dataStream: 0x0284c7,
      cyberShield: 0x6366f1,
      ambientLight: 0xf1f5f9,
      pointLight1: 0x93c5fd,
      pointLight2: 0xc4b5fd
    }
  };

  function getPalette() {
    return isDarkMode() ? palettes.dark : palettes.light;
  }

  // ---------------------------------------------------------------------------
  // 4. Cinematic Lighting System (Key Stellar Light + Ambient Fill)
  // ---------------------------------------------------------------------------
  const ambientLight = new THREE.AmbientLight(getPalette().ambientLight, isDarkMode() ? 0.65 : 0.9);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(getPalette().pointLight1, isDarkMode() ? 1.2 : 0.8, 50);
  pointLight1.position.set(11, 9, 8);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(getPalette().pointLight2, isDarkMode() ? 0.6 : 0.5, 45);
  pointLight2.position.set(-10, -8, 6);
  scene.add(pointLight2);

  const universeGroup = new THREE.Group();
  scene.add(universeGroup);


  // ---------------------------------------------------------------------------
  // 6b. Soft Circular Stellar Glow Particle Texture (Anti-Square WebGL Point Sprite)
  // ---------------------------------------------------------------------------
  function createParticleGlowTexture() {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    pCtx.clearRect(0, 0, 64, 64);

    const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
    grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.32)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    pCtx.fillStyle = grad;
    pCtx.beginPath();
    pCtx.arc(32, 32, 30, 0, Math.PI * 2);
    pCtx.fill();

    const pTex = new THREE.CanvasTexture(pCanvas);
    pTex.minFilter = THREE.LinearFilter;
    return pTex;
  }

  const starGlowTex = createParticleGlowTexture();

  // ---------------------------------------------------------------------------
  // 7. Subsystem A: Multi-Depth Astronomical Starfield & Ambient Dust
  // ---------------------------------------------------------------------------
  const starCount = 650;
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);
  const starSizes = new Float32Array(starCount);

  for (let i = 0; i < starCount; i++) {
    const idx = i * 3;
    const isDeep = Math.random() < 0.82;
    const spreadX = isDeep ? 75 : 36;
    const spreadY = isDeep ? 52 : 26;
    const zBase = isDeep ? (-55 + Math.random() * 38) : (-16 + Math.random() * 14);

    starPositions[idx] = (Math.random() - 0.5) * spreadX;
    starPositions[idx + 1] = (Math.random() - 0.5) * spreadY;
    starPositions[idx + 2] = zBase;

    // Genuine astronomical stellar temperatures
    const rTemp = Math.random();
    let r = 0.96, g = 0.98, b = 1.0; // Crisp pure stellar white
    if (rTemp < 0.25) {
      // Warm amber / golden stellar dwarf
      r = 1.0; g = 0.92; b = 0.82;
    } else if (rTemp < 0.40) {
      // Cool blue-white giant
      r = 0.82; g = 0.90; b = 1.0;
    }

    // Controlled brightness variation
    const lum = 0.35 + Math.random() * 0.55;
    starColors[idx] = r * lum;
    starColors[idx + 1] = g * lum;
    starColors[idx + 2] = b * lum;

    starSizes[i] = isDeep ? (Math.random() * 0.06 + 0.035) : (Math.random() * 0.08 + 0.05);
  }

  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
  starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

  const starMaterial = new THREE.PointsMaterial({
    map: starGlowTex,
    vertexColors: true,
    size: 0.16,
    transparent: true,
    opacity: isDarkMode() ? 0.75 : 0.45,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  const starField = new THREE.Points(starGeometry, starMaterial);
  universeGroup.add(starField);

  // ---------------------------------------------------------------------------
  // 7b. Interactive Star-Constellation Synthesis Engine
  // ---------------------------------------------------------------------------
  const MAX_CONSTELLATION_LINES = 8;
  const constellationPositions = new Float32Array(MAX_CONSTELLATION_LINES * 2 * 3);
  const constellationGeometry = new THREE.BufferGeometry();
  constellationGeometry.setAttribute('position', new THREE.BufferAttribute(constellationPositions, 3));

  const constellationMaterial = new THREE.LineBasicMaterial({
    color: 0x4cc9f0,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const constellationMesh = new THREE.LineSegments(constellationGeometry, constellationMaterial);
  universeGroup.add(constellationMesh);

  let targetConstellationOpacity = 0;
  let currentConstellationOpacity = 0;

  // Ambient cosmic dust specks (Sparse, floating micro-particles)
  const dustCount = 75;
  const dustPositions = new Float32Array(dustCount * 3);
  for (let d = 0; d < dustCount; d++) {
    const dIdx = d * 3;
    dustPositions[dIdx] = (Math.random() - 0.5) * 32;
    dustPositions[dIdx + 1] = (Math.random() - 0.5) * 22;
    dustPositions[dIdx + 2] = -12 + Math.random() * 16;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dustMaterial = new THREE.PointsMaterial({
    map: starGlowTex,
    color: getPalette().stars,
    size: 0.08,
    transparent: true,
    opacity: isDarkMode() ? 0.32 : 0.18,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  const dustField = new THREE.Points(dustGeometry, dustMaterial);
  universeGroup.add(dustField);

  // ---------------------------------------------------------------------------
  // 7b. Subsystem A2: Photorealistic Astronomical Space Atmosphere & Textures
  // ---------------------------------------------------------------------------
  const nebulaTex = null;
  const nebulaPlanes = [];

  // Dedicated High-Resolution Stellar Beacon Sprite Texture with Cross Diffraction Spikes
  function createBeaconStarTexture() {
    const bCanvas = document.createElement('canvas');
    bCanvas.width = 128;
    bCanvas.height = 128;
    const bCtx = bCanvas.getContext('2d');
    bCtx.clearRect(0, 0, 128, 128);

    // 1. Soft expanding corona glow
    const grad = bCtx.createRadialGradient(64, 64, 0, 64, 64, 62);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.18, 'rgba(205, 238, 255, 0.95)');
    grad.addColorStop(0.42, 'rgba(100, 190, 255, 0.52)');
    grad.addColorStop(0.72, 'rgba(30, 100, 220, 0.16)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
    bCtx.fillStyle = grad;
    bCtx.beginPath();
    bCtx.arc(64, 64, 62, 0, Math.PI * 2);
    bCtx.fill();

    // 2. Crisp 4-point astronomical cross diffraction spikes
    bCtx.strokeStyle = 'rgba(255, 255, 255, 0.90)';
    bCtx.lineWidth = 1.8;
    bCtx.beginPath();
    bCtx.moveTo(64, 4); bCtx.lineTo(64, 124);
    bCtx.moveTo(4, 64); bCtx.lineTo(124, 64);
    bCtx.stroke();

    // Subtle diagonal secondary spikes
    bCtx.strokeStyle = 'rgba(175, 225, 255, 0.45)';
    bCtx.lineWidth = 1.0;
    bCtx.beginPath();
    bCtx.moveTo(24, 24); bCtx.lineTo(104, 104);
    bCtx.moveTo(24, 104); bCtx.lineTo(104, 24);
    bCtx.stroke();

    // 3. Brilliant central stellar core
    bCtx.fillStyle = '#FFFFFF';
    bCtx.beginPath();
    bCtx.arc(64, 64, 8, 0, Math.PI * 2);
    bCtx.fill();

    const bTex = new THREE.CanvasTexture(bCanvas);
    bTex.minFilter = THREE.LinearFilter;
    return bTex;
  }

  // Dedicated Fragment Particle Texture (Incandescent White/Cyan Embers)
  function createFragmentTexture() {
    const fCanvas = document.createElement('canvas');
    fCanvas.width = 64;
    fCanvas.height = 64;
    const fCtx = fCanvas.getContext('2d');
    fCtx.clearRect(0, 0, 64, 64);

    const grad = fCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.24, 'rgba(165, 235, 255, 0.92)');
    grad.addColorStop(0.58, 'rgba(45, 150, 255, 0.50)');
    grad.addColorStop(1.0, 'rgba(0, 15, 80, 0)');
    fCtx.fillStyle = grad;
    fCtx.beginPath();
    fCtx.arc(32, 32, 30, 0, Math.PI * 2);
    fCtx.fill();

    const fTex = new THREE.CanvasTexture(fCanvas);
    fTex.minFilter = THREE.LinearFilter;
    return fTex;
  }

  const beaconStarTex = createBeaconStarTexture();
  const fragmentTex = createFragmentTexture();

  // ---------------------------------------------------------------------------
  // 7c. Subsystem A3: Real 3D Star Fragmentation (Star-Breaking) Particle Engine
  // ---------------------------------------------------------------------------
  // Safe celestial waypoints for the visible Beacon Star (strictly outside hero text & avatar)
  const beaconWaypoints = [
    { x: 0.0, y: 3.8, z: -6.5 },   // Upper center celestial void (prominent, unobstructed)
    { x: -8.8, y: 1.5, z: -6.5 },  // Left celestial cosmic margin
    { x: 8.8, y: 1.2, z: -6.5 },   // Right celestial margin
    { x: -5.5, y: 4.2, z: -6.5 },  // High cosmic sky
    { x: 5.5, y: -4.2, z: -6.5 }   // Lower flank void
  ];
  let beaconWaypointIdx = 0;

  const beaconSpriteMat = new THREE.SpriteMaterial({
    map: beaconStarTex,
    color: 0xffffff,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const beaconStar = new THREE.Sprite(beaconSpriteMat);
  beaconStar.position.set(beaconWaypoints[0].x, beaconWaypoints[0].y, beaconWaypoints[0].z);
  beaconStar.scale.set(2.2, 2.2, 2.2);
  beaconStar.visible = false;
  starField.add(beaconStar);

  const MAX_CONCURRENT_BURSTS = 3;
  const PARTICLES_PER_BURST = 24;
  const TOTAL_BURST_PARTICLES = MAX_CONCURRENT_BURSTS * PARTICLES_PER_BURST;

  const burstPositions = new Float32Array(TOTAL_BURST_PARTICLES * 3);
  const burstColors = new Float32Array(TOTAL_BURST_PARTICLES * 3);
  const burstSizes = new Float32Array(TOTAL_BURST_PARTICLES);

  // Initialize off-screen
  for (let b = 0; b < TOTAL_BURST_PARTICLES; b++) {
    burstPositions[b * 3] = 0;
    burstPositions[b * 3 + 1] = 0;
    burstPositions[b * 3 + 2] = -999;
    burstColors[b * 3] = 0;
    burstColors[b * 3 + 1] = 0;
    burstColors[b * 3 + 2] = 0;
    burstSizes[b] = 0;
  }

  const burstGeometry = new THREE.BufferGeometry();
  burstGeometry.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3));
  burstGeometry.setAttribute('color', new THREE.BufferAttribute(burstColors, 3));
  burstGeometry.setAttribute('size', new THREE.BufferAttribute(burstSizes, 1));

  const burstMaterial = new THREE.PointsMaterial({
    map: fragmentTex,
    vertexColors: true,
    size: 1.8,
    transparent: true,
    opacity: 0.98,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  const burstField = new THREE.Points(burstGeometry, burstMaterial);
  starField.add(burstField);

  // Burst Slot Management
  const burstSlots = [];
  for (let s = 0; s < MAX_CONCURRENT_BURSTS; s++) {
    const pData = [];
    for (let p = 0; p < PARTICLES_PER_BURST; p++) {
      pData.push({
        vx: 0,
        vy: 0,
        vz: 0,
        baseR: 1,
        baseG: 1,
        baseB: 1,
        drag: 0.96,
        baseSize: 0.50
      });
    }
    burstSlots.push({
      active: false,
      stage: 'idle', // 'flare' -> 'burst' -> 'fade' -> 'idle'
      age: 0,
      flareDuration: 0.45,
      burstDuration: 1.8,
      starIndex: -1,
      origColor: [1, 1, 1],
      origin: [0, 0, 0],
      startIndex: s * PARTICLES_PER_BURST,
      particles: pData
    });
  }

  // Pre-filter candidate stars located in safe celestial margins (outside hero text & avatar)
  const candidateStarIndices = [];
  for (let i = 0; i < starCount; i++) {
    const sx = starPositions[i * 3];
    const sy = starPositions[i * 3 + 1];
    const sz = starPositions[i * 3 + 2];
    // Outside hero text zone [-9.5..1.0, -2.8..2.6] and avatar zone [0.8..6.8, -2.5..2.5]
    const inTextZone = (sx >= -9.5 && sx <= 1.0 && sy >= -2.8 && sy <= 2.6);
    const inAvatarZone = (sx >= 0.8 && sx <= 6.8 && sy >= -2.5 && sy <= 2.5);
    if (!inTextZone && !inAvatarZone && sz >= -32 && sz <= -6) {
      candidateStarIndices.push(i);
    }
  }

  let nextBurstTimer = 3.5;

  function triggerStarBreak(targetStarIndexOrImmediate, immediate) {
    let targetIdx = null;
    let isImmediate = false;

    if (typeof targetStarIndexOrImmediate === 'number') {
      targetIdx = targetStarIndexOrImmediate;
      isImmediate = Boolean(immediate);
    } else if (typeof targetStarIndexOrImmediate === 'boolean') {
      isImmediate = targetStarIndexOrImmediate;
    } else if (typeof immediate === 'boolean') {
      isImmediate = immediate;
    }

    const slot = burstSlots.find(s => !s.active) || burstSlots[0];
    if (!slot) return null;

    // If slot is being forcefully recycled while active, restore its previous star first
    if (slot.active && slot.starIndex >= 0) {
      starColors[slot.starIndex * 3] = slot.origColor[0];
      starColors[slot.starIndex * 3 + 1] = slot.origColor[1];
      starColors[slot.starIndex * 3 + 2] = slot.origColor[2];
      starGeometry.attributes.color.needsUpdate = true;
    }

    // 1. Select one specific background star
    let starIdx = -1;
    if (targetIdx !== null && targetIdx >= 0 && targetIdx < starCount) {
      starIdx = Math.floor(targetIdx);
    } else if (candidateStarIndices.length > 0) {
      // Pick background candidate star, avoiding stars currently undergoing active fragmentation
      const available = candidateStarIndices.filter(i => !burstSlots.some(s => s.active && s.starIndex === i));
      const pool = available.length > 0 ? available : candidateStarIndices;
      starIdx = pool[Math.floor(Math.random() * pool.length)];
    }

    if (starIdx < 0) return null;

    // 2. Capture its exact 3D position directly from starPositions
    const originX = starPositions[starIdx * 3];
    const originY = starPositions[starIdx * 3 + 1];
    const originZ = starPositions[starIdx * 3 + 2];

    slot.active = true;
    slot.stage = 'flare';
    slot.age = isImmediate ? 0.44 : 0;
    slot.flareDuration = 0.45;
    slot.burstDuration = 1.8;
    slot.starIndex = starIdx;
    slot.origin = [originX, originY, originZ];
    if (starIdx >= 0) {
      slot.origColor = [
        starColors[starIdx * 3],
        starColors[starIdx * 3 + 1],
        starColors[starIdx * 3 + 2]
      ];
    } else {
      slot.origColor = [1, 1, 1];
    }

    // 3. Align the beaconStar diffraction flare sprite exactly with the selected star
    beaconStar.position.set(originX, originY, originZ);
    beaconStar.scale.set(2.0, 2.0, 2.0);
    beaconSpriteMat.opacity = 0.95;
    beaconStar.visible = true;

    return {
      slotIndex: burstSlots.indexOf(slot),
      starIndex: starIdx,
      origin: [originX, originY, originZ],
      origColor: [...slot.origColor],
      stage: slot.stage
    };
  }

  // Expose triggerStarBreak to window for deterministic QA & interactive testing
  window.triggerStarBreak = triggerStarBreak;
  window.__universeDebug = {
    getBeacon: () => beaconStar,
    getSlots: () => burstSlots,
    getPositions: () => burstPositions,
    getColors: () => burstColors,
    getSizes: () => burstSizes,
    getField: () => burstField,
    getStarPositions: () => starPositions,
    getStarColors: () => starColors,
    getCandidates: () => candidateStarIndices,
    triggerStarBreak: triggerStarBreak,
    updateStarBreaking: updateStarBreaking,
    getMechanism: () => cosmicMechanismGroup,
    getAstrolabe: () => astrolabeGroup,
    getArtifacts: () => cosmicArtifacts,
    getCosmicBg: () => exactCosmicBgMesh
  };

  function updateStarBreaking(delta) {
    nextBurstTimer -= delta;
    if (nextBurstTimer <= 0) {
      triggerStarBreak();
      nextBurstTimer = 4.2 + Math.random() * 3.0; // Randomized sparse interval between 4.2s and 7.2s between bursts
    }

    let burstNeedsUpdate = false;
    let starColorsNeedUpdate = false;

    burstSlots.forEach(slot => {
      if (!slot.active) return;
      slot.age += delta;

      if (slot.stage === 'flare') {
        // Stage 1 & 2: Pre-burst flare - Star brightness and corona surge brilliantly
        const flareProg = slot.age / slot.flareDuration;
        const starIdx = slot.starIndex;

        if (flareProg < 1.0) {
          const surge = 1.0 + Math.sin(flareProg * Math.PI) * 2.8;
          // Scale up beacon star sprite prominently
          const currentScale = 2.0 * surge;
          beaconStar.scale.set(currentScale, currentScale, currentScale);
          beaconSpriteMat.opacity = Math.min(1.0, 0.95 + flareProg * 0.4);

          if (starIdx >= 0) {
            starColors[starIdx * 3] = slot.origColor[0] * surge;
            starColors[starIdx * 3 + 1] = slot.origColor[1] * surge;
            starColors[starIdx * 3 + 2] = slot.origColor[2] * surge;
            starColorsNeedUpdate = true;
          }
        } else {
          // Stage 3: Fragmentation — Star visibly shatters into 3D particles!
          slot.stage = 'burst';
          slot.age = 0;
          beaconStar.visible = false; // Star ruptures and disappears into fragments

          if (starIdx >= 0) {
            starColors[starIdx * 3] = 0;
            starColors[starIdx * 3 + 1] = 0;
            starColors[starIdx * 3 + 2] = 0;
            starColorsNeedUpdate = true;
          }

          // Stage 4: Initialize 3D scattering velocities for all fragments
          for (let p = 0; p < PARTICLES_PER_BURST; p++) {
            const bIdx = slot.startIndex + p;
            burstPositions[bIdx * 3] = slot.origin[0];
            burstPositions[bIdx * 3 + 1] = slot.origin[1];
            burstPositions[bIdx * 3 + 2] = slot.origin[2];

            // Spherical 3D scatter velocity in all three dimensions
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const speed = 2.4 + Math.random() * 3.2;

            const pObj = slot.particles[p];
            pObj.vx = Math.sin(phi) * Math.cos(theta) * speed;
            pObj.vy = Math.sin(phi) * Math.sin(theta) * speed;
            pObj.vz = Math.cos(phi) * speed;
            pObj.drag = 0.945 + Math.random() * 0.025; // Drag damping

            // Luminous particle colors: incandescent white, electric cyan, sky blue, stellar amber
            const colPick = Math.random();
            if (colPick < 0.40) {
              pObj.baseR = 1.0; pObj.baseG = 1.0; pObj.baseB = 1.0; // Incandescent white
            } else if (colPick < 0.70) {
              pObj.baseR = 0.45; pObj.baseG = 0.88; pObj.baseB = 1.0; // Electric cyan
            } else if (colPick < 0.88) {
              pObj.baseR = 0.65; pObj.baseG = 0.78; pObj.baseB = 1.0; // Sky blue
            } else {
              pObj.baseR = 1.0; pObj.baseG = 0.92; pObj.baseB = 0.75; // Stellar amber
            }

            pObj.baseSize = 0.85 + Math.random() * 0.60;
            burstSizes[bIdx] = pObj.baseSize;
            burstColors[bIdx * 3] = pObj.baseR;
            burstColors[bIdx * 3 + 1] = pObj.baseG;
            burstColors[bIdx * 3 + 2] = pObj.baseB;
          }
          burstNeedsUpdate = true;
        }
      } else if (slot.stage === 'burst') {
        // Stage 4 & 5: 3D particle scatter with damping and smooth quadratic fade-out
        const burstProg = slot.age / slot.burstDuration;
        const fade = Math.max(0, 1.0 - burstProg * burstProg);

        for (let p = 0; p < PARTICLES_PER_BURST; p++) {
          const bIdx = slot.startIndex + p;
          const pObj = slot.particles[p];

          pObj.vx *= Math.pow(pObj.drag, delta * 60);
          pObj.vy *= Math.pow(pObj.drag, delta * 60);
          pObj.vz *= Math.pow(pObj.drag, delta * 60);

          burstPositions[bIdx * 3] += pObj.vx * delta;
          burstPositions[bIdx * 3 + 1] += pObj.vy * delta;
          burstPositions[bIdx * 3 + 2] += pObj.vz * delta;

          burstColors[bIdx * 3] = pObj.baseR * fade;
          burstColors[bIdx * 3 + 1] = pObj.baseG * fade;
          burstColors[bIdx * 3 + 2] = pObj.baseB * fade;
          burstSizes[bIdx] = pObj.baseSize * fade;
        }
        burstNeedsUpdate = true;

        if (burstProg >= 1.0) {
          // Stage 6: Recovery — Recycle particles offscreen and respawn beacon star at next waypoint
          for (let p = 0; p < PARTICLES_PER_BURST; p++) {
            const bIdx = slot.startIndex + p;
            burstPositions[bIdx * 3 + 2] = -999;
            burstColors[bIdx * 3] = 0;
            burstColors[bIdx * 3 + 1] = 0;
            burstColors[bIdx * 3 + 2] = 0;
            burstSizes[bIdx] = 0;
          }
          burstNeedsUpdate = true;

          // Restore background candidate star
          const starIdx = slot.starIndex;
          if (starIdx >= 0) {
            starColors[starIdx * 3] = slot.origColor[0];
            starColors[starIdx * 3 + 1] = slot.origColor[1];
            starColors[starIdx * 3 + 2] = slot.origColor[2];
            starColorsNeedUpdate = true;
          }

          slot.active = false;
          slot.stage = 'idle';

          // Respawn Beacon Star at a new celestial waypoint
          beaconWaypointIdx = (beaconWaypointIdx + 1) % beaconWaypoints.length;
          const nextWp = beaconWaypoints[beaconWaypointIdx];
          beaconStar.position.set(nextWp.x, nextWp.y, nextWp.z);
          beaconStar.scale.set(2.0, 2.0, 2.0);
          beaconSpriteMat.opacity = 0; // Starts transparent and fades in
          beaconStar.visible = false;
        }
      }
    });

    // Gentle star twinkle & smooth fade-in during idle
    if (beaconStar.visible) {
      if (beaconSpriteMat.opacity < 0.95) {
        beaconSpriteMat.opacity = Math.min(0.95, beaconSpriteMat.opacity + delta * 1.5);
      }
      beaconStar.scale.setScalar(2.0 + Math.sin(clockTime * 3.5) * 0.15);
    }

    if (burstNeedsUpdate) {
      burstGeometry.attributes.position.needsUpdate = true;
      burstGeometry.attributes.color.needsUpdate = true;
      burstGeometry.attributes.size.needsUpdate = true;
    }
    if (starColorsNeedUpdate) {
      starGeometry.attributes.color.needsUpdate = true;
    }
  }

  // ---------------------------------------------------------------------------
  // 8. Subsystem B: The Ancient Cosmic Mechanism — Ancient Celestial Eye
  // ---------------------------------------------------------------------------
  // Authentic 3D Reconstruction of Ancient Celestial Eye (StockCake source):
  // - Thick primary copper/bronze armillary ring with intricate ancient filigree engravings
  // - Prominent intersecting oblique copper armillary ring looping across left hemisphere
  // - Concentric orbital filament tracks with golden stellar nodes
  // - Central glowing sapphire/cyan cosmic eye portal with swirling accretion disc
  // - Radiant singular stellar pupil with dedicated cyan-blue point illumination

  const celestialTexLoader = new THREE.TextureLoader();
  const copperRingTex = celestialTexLoader.load('assets/images/copper-engraved-texture.png');
  copperRingTex.wrapS = THREE.RepeatWrapping;
  copperRingTex.wrapT = THREE.RepeatWrapping;
  copperRingTex.repeat.set(4, 1);

  const celestialEyeTex = celestialTexLoader.load('assets/images/celestial-eye-feathered.png');

  const copperPBRMat = new THREE.MeshStandardMaterial({
    map: copperRingTex,
    color: 0xdf7234,
    metalness: 0.88,
    roughness: 0.28,
    emissive: 0x551d08,
    emissiveIntensity: 0.40,
    side: THREE.DoubleSide
  });
  // ---------------------------------------------------------------------------
  // Ornate Ancient Astronomical Astrolabe & Cosmic Chronometer:
  // - Outer circular antique-bronze & aged-gold frame with calibrated dial ticks & cardinal brackets
  // - Middle chronometer gear ring with rotating cog-teeth and radial structural arms
  // - Astronomical constellation ring with 12 celestial nodes and planetary orbital cogs
  // - Deep teal / luminous cyan inner ring structure with cross-struts
  // - Inner inclined armillary gimbal ring with celestial ecliptic angle (23.5°)
  // - Radiant golden energy core with harmonic pulsing, corona halo rings, and dedicated point light

  const bronzeMat = new THREE.MeshStandardMaterial({
    color: 0x8C6239,
    metalness: 0.85,
    roughness: 0.38,
    side: THREE.DoubleSide
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xD4AF37,
    metalness: 0.90,
    roughness: 0.28,
    side: THREE.DoubleSide
  });

  const deepTealMat = new THREE.MeshStandardMaterial({
    color: 0x004D5A,
    emissive: 0x00BCD4,
    emissiveIntensity: 0.40,
    metalness: 0.78,
    roughness: 0.30,
    side: THREE.DoubleSide
  });

  const darkPatinaMat = new THREE.MeshStandardMaterial({
    color: 0x22252A,
    metalness: 0.70,
    roughness: 0.55,
    side: THREE.DoubleSide
  });

  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xFFF5E0,
    emissive: 0xFFB300,
    emissiveIntensity: 1.6,
    roughness: 0.10,
    metalness: 0.20
  });

  const coreHaloMat = new THREE.MeshBasicMaterial({
    color: 0xFFAA00,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const coreTealHaloMat = new THREE.MeshBasicMaterial({
    color: 0x00E5FF,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const cosmicMechanismGroup = new THREE.Group();
  cosmicMechanismGroup.position.set(0.0, 0.2, -5.6);
  cosmicMechanismGroup.visible = false; // Replaced foreground objects with full-viewport exact cosmic mechanism image
  universeGroup.add(cosmicMechanismGroup);

  // 0. Authentic 3D Astrolabe Mechanism Model (Physical Ornate Astronomical Model)
  const astrolabeGroup = new THREE.Group();
  astrolabeGroup.visible = true;
  cosmicMechanismGroup.add(astrolabeGroup);

  let astrolabeModel = null;
  if (typeof THREE.GLTFLoader !== 'undefined') {
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('assets/models/astrolabe.glb', function (gltf) {
      astrolabeModel = gltf.scene;
      astrolabeModel.scale.set(1.85, 1.85, 1.85);
      astrolabeModel.position.set(0, 0, -0.22);
      astrolabeModel.traverse(function (child) {
        if (child.isMesh && child.material) {
          child.material.metalness = 0.88;
          child.material.roughness = 0.32;
          if (child.material.normalScale) {
            child.material.normalScale.set(1.4, 1.4);
          }
        }
      });
      astrolabeGroup.add(astrolabeModel);
      window.__ASTROLABE_MODEL__ = astrolabeModel;
    }, undefined, function (error) {
      console.warn('Ancient Cosmic Mechanism 3D model notice:', error);
    });
  }

  // 1. Outer Heavy Frame (Antique Bronze & Aged Gold Rim)
  const outerFrameGroup = new THREE.Group();
  cosmicMechanismGroup.add(outerFrameGroup);

  const outerTorusGeom = new THREE.TorusGeometry(3.6, 0.08, 16, 64);
  const outerTorusMesh = new THREE.Mesh(outerTorusGeom, bronzeMat);
  outerFrameGroup.add(outerTorusMesh);

  const outerBevelGeom = new THREE.TorusGeometry(3.78, 0.035, 16, 64);
  const outerBevelMesh = new THREE.Mesh(outerBevelGeom, goldMat);
  outerFrameGroup.add(outerBevelMesh);

  // Calibrated Astronomical Dial Ticks around outer perimeter (36 dial markings)
  const tickGeom = new THREE.BoxGeometry(0.04, 0.12, 0.06);
  for (let i = 0; i < 36; i++) {
    const angle = (i / 36) * Math.PI * 2;
    const tickMesh = new THREE.Mesh(tickGeom, (i % 3 === 0) ? goldMat : bronzeMat);
    tickMesh.position.set(Math.cos(angle) * 3.69, Math.sin(angle) * 3.69, 0);
    tickMesh.rotation.z = angle;
    outerFrameGroup.add(tickMesh);
  }

  // 4 Cardinal Pointer Brackets at 0, 90, 180, 270 deg
  const bracketGeom = new THREE.BoxGeometry(0.14, 0.32, 0.12);
  const rivetGeom = new THREE.SphereGeometry(0.06, 8, 8);
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const bMesh = new THREE.Mesh(bracketGeom, goldMat);
    bMesh.position.set(Math.cos(angle) * 3.82, Math.sin(angle) * 3.82, 0);
    bMesh.rotation.z = angle;
    outerFrameGroup.add(bMesh);

    const rMesh = new THREE.Mesh(rivetGeom, deepTealMat);
    rMesh.position.set(Math.cos(angle) * 3.82, Math.sin(angle) * 3.82, 0.08);
    outerFrameGroup.add(rMesh);
  }

  // 3D Thick Engraved Copper Ring (Ancient Celestial Eye primary armillary band)
  const mainCopperRingGeo = new THREE.TorusGeometry(3.1, 0.24, 24, 128);
  const mainCopperRingMesh = new THREE.Mesh(mainCopperRingGeo, copperPBRMat);
  outerFrameGroup.add(mainCopperRingMesh);

  // 16 Radiant Golden Stellar Nodes on the primary copper ring
  const stellarNodeGeo = new THREE.SphereGeometry(0.065, 16, 16);
  const stellarNodeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffb703,
    emissiveIntensity: 2.2,
    metalness: 0.5,
    roughness: 0.1
  });
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const sNode = new THREE.Mesh(stellarNodeGeo, stellarNodeMat);
    sNode.position.set(Math.cos(angle) * 3.24, Math.sin(angle) * 3.24, 0.16);
    outerFrameGroup.add(sNode);
  }

  // 2. Middle Chronometer Gear Ring (Counter-rotating)
  const midRingGroup = new THREE.Group();
  cosmicMechanismGroup.add(midRingGroup);

  const midTorusGeom = new THREE.TorusGeometry(2.85, 0.065, 16, 64);
  const midTorusMesh = new THREE.Mesh(midTorusGeom, goldMat);
  midRingGroup.add(midTorusMesh);

  // Inner gear teeth on the mid ring (24 teeth)
  const toothGeom = new THREE.BoxGeometry(0.05, 0.10, 0.05);
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const toothMesh = new THREE.Mesh(toothGeom, bronzeMat);
    toothMesh.position.set(Math.cos(angle) * 2.76, Math.sin(angle) * 2.76, 0);
    toothMesh.rotation.z = angle;
    midRingGroup.add(toothMesh);
  }

  // 4 Curved Structural Radial Arms connecting mid ring to inner hub
  const spokeGeom = new THREE.CylinderGeometry(0.028, 0.028, 1.15, 8);
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const spoke = new THREE.Mesh(spokeGeom, bronzeMat);
    spoke.position.set(Math.cos(angle) * 2.25, Math.sin(angle) * 2.25, 0);
    spoke.rotation.z = angle + Math.PI / 2;
    midRingGroup.add(spoke);
  }

  // 3. Astronomical Constellation & Calendar Ring (Forward rotating)
  const astronomyRingGroup = new THREE.Group();
  cosmicMechanismGroup.add(astronomyRingGroup);

  const astroTorusGeom = new THREE.TorusGeometry(2.15, 0.05, 16, 48);
  const astroTorusMesh = new THREE.Mesh(astroTorusGeom, bronzeMat);
  astronomyRingGroup.add(astroTorusMesh);

  // 12 Celestial Marker Nodes (golden spheres)
  const nodeGeom = new THREE.SphereGeometry(0.065, 12, 12);
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const node = new THREE.Mesh(nodeGeom, (i % 3 === 0) ? deepTealMat : goldMat);
    node.position.set(Math.cos(angle) * 2.15, Math.sin(angle) * 2.15, 0.03);
    astronomyRingGroup.add(node);
  }

  // 2 Planetary Orbital Cogs revolving along the track
  const planetCogGeom = new THREE.TorusGeometry(0.24, 0.03, 12, 24);
  const planet1 = new THREE.Mesh(planetCogGeom, goldMat);
  planet1.position.set(2.15, 0, 0);
  astronomyRingGroup.add(planet1);

  const planet2 = new THREE.Mesh(planetCogGeom, deepTealMat);
  planet2.position.set(-2.15, 0, 0);
  astronomyRingGroup.add(planet2);

  // 4. Deep Teal / Luminous Cyan Inner Ring Structure (Counter-rotating)
  const tealRingGroup = new THREE.Group();
  cosmicMechanismGroup.add(tealRingGroup);

  const tealOuterGeom = new THREE.TorusGeometry(1.65, 0.045, 16, 48);
  const tealOuterMesh = new THREE.Mesh(tealOuterGeom, deepTealMat);
  tealRingGroup.add(tealOuterMesh);

  const tealInnerGeom = new THREE.TorusGeometry(1.42, 0.035, 16, 48);
  const tealInnerMesh = new THREE.Mesh(tealInnerGeom, deepTealMat);
  tealRingGroup.add(tealInnerMesh);

  // 8 Diagonal Spoke Struts
  const tealSpokeGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.55, 8);
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const spoke = new THREE.Mesh(tealSpokeGeom, goldMat);
    spoke.position.set(Math.cos(angle) * 1.53, Math.sin(angle) * 1.53, 0);
    spoke.rotation.z = angle + Math.PI / 2;
    tealRingGroup.add(spoke);
  }

  // 5. Inner Inclined Armillary Ring (Angled at 23.5° celestial ecliptic tilt)
  const innerGimbalGroup = new THREE.Group();
  innerGimbalGroup.rotation.x = 0.41; // 23.5 degrees
  cosmicMechanismGroup.add(innerGimbalGroup);

  const gimbalTorusGeom = new THREE.TorusGeometry(0.98, 0.038, 16, 36);
  const gimbalTorusMesh = new THREE.Mesh(gimbalTorusGeom, goldMat);
  innerGimbalGroup.add(gimbalTorusMesh);

  const meridianArcGeom = new THREE.TorusGeometry(0.98, 0.025, 16, 36, Math.PI);
  const meridianArcMesh = new THREE.Mesh(meridianArcGeom, bronzeMat);
  meridianArcMesh.rotation.y = Math.PI / 2;
  innerGimbalGroup.add(meridianArcMesh);

  // 3D Intersecting Oblique Copper Armillary Ring (looping through left hemisphere)
  const obliqueCopperGeo = new THREE.TorusGeometry(1.95, 0.13, 20, 96);
  const obliqueCopperMesh = new THREE.Mesh(obliqueCopperGeo, copperPBRMat);
  obliqueCopperMesh.position.set(-1.75, 0.35, 0.4);
  obliqueCopperMesh.rotation.set(0.35, 1.28, -0.15);
  innerGimbalGroup.add(obliqueCopperMesh);

  // 6. Central Energy Core (Pulsing Golden Core with Corona Halos & Dedicated Point Light)
  const coreGroup = new THREE.Group();
  cosmicMechanismGroup.add(coreGroup);

  const coreSphereGeom = new THREE.SphereGeometry(0.38, 24, 24);
  const coreSphereMesh = new THREE.Mesh(coreSphereGeom, coreMat);
  coreGroup.add(coreSphereMesh);

  const coreHaloInnerGeom = new THREE.RingGeometry(0.44, 0.54, 32);
  const coreHaloInnerMesh = new THREE.Mesh(coreHaloInnerGeom, coreHaloMat);
  coreGroup.add(coreHaloInnerMesh);

  const coreHaloOuterGeom = new THREE.RingGeometry(0.60, 0.72, 32);
  const coreHaloOuterMesh = new THREE.Mesh(coreHaloOuterGeom, coreTealHaloMat);
  coreGroup.add(coreHaloOuterMesh);

  // Real scene lighting from the core
  const corePointLight = new THREE.PointLight(0xFFAA00, 2.2, 12.0);
  corePointLight.position.set(0, 0, 0);
  coreGroup.add(corePointLight);

  // Central Sapphire/Cyan Celestial Eye Cosmic Portal
  const eyePortalMat = new THREE.MeshBasicMaterial({
    map: celestialEyeTex,
    transparent: true,
    opacity: 0.98,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const eyeCircleGeo = new THREE.CircleGeometry(1.65, 64);
  const eyePortalMesh = new THREE.Mesh(eyeCircleGeo, eyePortalMat);
  eyePortalMesh.position.z = 0.02;
  coreGroup.add(eyePortalMesh);

  // Central Singular Stellar Pupil (Bright sapphire/cyan singularity)
  const pupilGeo = new THREE.SphereGeometry(0.12, 24, 24);
  const pupilMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x00E5FF,
    emissiveIntensity: 3.2,
    roughness: 0.1
  });
  const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
  pupilMesh.position.z = 0.05;
  coreGroup.add(pupilMesh);

  // Dedicated Cyan-Blue Eye Light illuminating inner copper bevels
  const eyeBlueLight = new THREE.PointLight(0x00B4D8, 3.2, 8.0);
  eyeBlueLight.position.set(0, 0, 0.3);
  coreGroup.add(eyeBlueLight);

  // Layout-Aware Dynamic Collision & Repulsion Avoidance Engine
  function applyAvoidanceDeflection(x, y, z, isMobile) {
    if (z <= -6.0) return { x: x, y: y };

    if (isMobile) {
      const minX = -3.2, maxX = 3.2;
      const minY = -6.5, maxY = 4.0;
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
        if (y >= 0) y = maxY + 0.4 + (y / maxY) * 0.6;
        else y = minY - 0.4 - (Math.abs(y) / Math.abs(minY)) * 0.6;
      }
      return { x: x, y: y };
    }

    const textMinX = -9.4, textMaxX = 0.2, textMinY = -2.8, textMaxY = 3.0;
    const imgMinX = 0.8, imgMaxX = 6.8, imgMinY = -2.5, imgMaxY = 2.5;
    const buffer = 0.45;

    if (x >= textMinX - buffer && x <= textMaxX + buffer && y >= textMinY - buffer && y <= textMaxY + buffer) {
      if (y > textMaxY - 0.2) y = textMaxY + buffer + 0.35;
      else x = textMinX - buffer - 0.45;
    }

    if (x >= imgMinX - buffer && x <= imgMaxX + buffer && y >= imgMinY - buffer && y <= imgMaxY + buffer) {
      if (y > imgMaxY - 0.2) y = imgMaxY + buffer + 0.35;
      else x = imgMaxX + buffer + 0.45;
    }

    return { x: x, y: y };
  }

  // ---------------------------------------------------------------------------
  // 9. Subsystem C: Complementary Cosmic Artifacts (6 Unique Relics)
  // ---------------------------------------------------------------------------
  const cosmicArtifacts = [];

  function addArtifact(group, config) {
    group.position.set(config.basePos[0], config.basePos[1], config.basePos[2]);
    group.visible = false; // Subordinated to allow exact cosmic mechanism background to shine
    group.userData = {
      basePos: [...config.basePos],
      rotSpeedX: config.rotSpeedX || 0,
      rotSpeedY: config.rotSpeedY || 0,
      rotSpeedZ: config.rotSpeedZ || 0,
      driftSpeed: config.driftSpeed || 0.12,
      driftAmp: config.driftAmp || 0.25,
      phase: Math.random() * Math.PI * 2,
      onUpdate: config.onUpdate || null
    };
    universeGroup.add(group);
    cosmicArtifacts.push(group);
  }

  // Artifact 1: Celestial Gyroscope (High left celestial flank)
  const gyroGroup = new THREE.Group();
  const gyroRing1Geom = new THREE.TorusGeometry(0.72, 0.035, 12, 32);
  const gyroRing1 = new THREE.Mesh(gyroRing1Geom, bronzeMat);
  gyroGroup.add(gyroRing1);

  const gyroRing2Geom = new THREE.TorusGeometry(0.54, 0.030, 12, 32);
  const gyroRing2 = new THREE.Mesh(gyroRing2Geom, goldMat);
  gyroGroup.add(gyroRing2);

  const gyroRing3Geom = new THREE.TorusGeometry(0.38, 0.025, 12, 32);
  const gyroRing3 = new THREE.Mesh(gyroRing3Geom, deepTealMat);
  gyroGroup.add(gyroRing3);

  const gyroSphereGeom = new THREE.SphereGeometry(0.14, 16, 16);
  const gyroSphere = new THREE.Mesh(gyroSphereGeom, coreMat);
  gyroGroup.add(gyroSphere);

  addArtifact(gyroGroup, {
    basePos: [-8.2, 3.4, -3.8],
    rotSpeedX: 0.20,
    rotSpeedY: 0.25,
    rotSpeedZ: 0.15,
    driftSpeed: 0.10,
    driftAmp: 0.22,
    onUpdate: (group, time) => {
      gyroRing1.rotation.x = time * 0.45;
      gyroRing2.rotation.y = time * 0.60;
      gyroRing3.rotation.z = time * 0.75;
    }
  });

  // Artifact 2: Faceted Crystalline Prism (Right celestial flank)
  const prismGroup = new THREE.Group();
  const prismGeom = new THREE.OctahedronGeometry(0.68, 0);
  const prismMat = new THREE.MeshStandardMaterial({
    color: 0x00E5FF,
    emissive: 0x00838F,
    emissiveIntensity: 0.35,
    roughness: 0.18,
    metalness: 0.82,
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide
  });
  const prismMesh = new THREE.Mesh(prismGeom, prismMat);
  prismGroup.add(prismMesh);

  const prismWireGeom = new THREE.WireframeGeometry(prismGeom);
  const prismWireMat = new THREE.LineBasicMaterial({
    color: 0xD4AF37,
    transparent: true,
    opacity: 0.65
  });
  const prismWireMesh = new THREE.LineSegments(prismWireGeom, prismWireMat);
  prismGroup.add(prismWireMesh);

  const prismCoreGeom = new THREE.SphereGeometry(0.18, 12, 12);
  const prismCoreMesh = new THREE.Mesh(prismCoreGeom, coreMat);
  prismGroup.add(prismCoreMesh);

  addArtifact(prismGroup, {
    basePos: [8.4, 2.8, -3.6],
    rotSpeedX: 0.22,
    rotSpeedY: 0.30,
    rotSpeedZ: 0.18,
    driftSpeed: 0.12,
    driftAmp: 0.24
  });

  // Artifact 3: Interlocking Armillary Orbital (Lower right flank)
  const armillaryGroup = new THREE.Group();
  const armRing1Geom = new THREE.TorusGeometry(0.75, 0.03, 12, 36);
  const armRing1 = new THREE.Mesh(armRing1Geom, goldMat);
  armRing1.rotation.x = 0.55;
  armillaryGroup.add(armRing1);

  const armRing2Geom = new THREE.TorusGeometry(0.75, 0.03, 12, 36);
  const armRing2 = new THREE.Mesh(armRing2Geom, bronzeMat);
  armRing2.rotation.y = 0.55;
  armillaryGroup.add(armRing2);

  const beadGeom = new THREE.SphereGeometry(0.08, 12, 12);
  const bead1 = new THREE.Mesh(beadGeom, deepTealMat);
  bead1.position.set(0.75, 0, 0);
  armRing1.add(bead1);

  const bead2 = new THREE.Mesh(beadGeom, goldMat);
  bead2.position.set(0, 0.75, 0);
  armRing2.add(bead2);

  addArtifact(armillaryGroup, {
    basePos: [8.2, -3.2, -4.2],
    rotSpeedX: 0.15,
    rotSpeedY: -0.22,
    rotSpeedZ: 0.10,
    driftSpeed: 0.09,
    driftAmp: 0.20,
    onUpdate: (group, time) => {
      armRing1.rotation.z = time * 0.40;
      armRing2.rotation.z = -time * 0.35;
    }
  });

  // Artifact 4: Dodecahedral Geometric Relic (Lower left flank)
  const relicGroup = new THREE.Group();
  const relicGeom = new THREE.DodecahedronGeometry(0.65, 0);
  const relicWireGeom = new THREE.WireframeGeometry(relicGeom);
  const relicWireMesh = new THREE.LineSegments(relicWireGeom, new THREE.LineBasicMaterial({
    color: 0x8C6239,
    transparent: true,
    opacity: 0.70
  }));
  relicGroup.add(relicWireMesh);

  const relicCoreGeom = new THREE.OctahedronGeometry(0.28, 0);
  const relicCoreMesh = new THREE.Mesh(relicCoreGeom, goldMat);
  relicGroup.add(relicCoreMesh);

  addArtifact(relicGroup, {
    basePos: [-8.6, -3.0, -4.0],
    rotSpeedX: 0.18,
    rotSpeedY: 0.22,
    rotSpeedZ: 0.14,
    driftSpeed: 0.11,
    driftAmp: 0.25,
    onUpdate: (group, time) => {
      relicCoreMesh.rotation.y = time * 0.65;
      relicCoreMesh.rotation.x = time * 0.45;
    }
  });

  // Artifact 5: Orbital Chronometer Sphere (Upper celestial zenith)
  const chronoGroup = new THREE.Group();
  const chronoSphereGeom = new THREE.SphereGeometry(0.48, 16, 12);
  const chronoSphere = new THREE.Mesh(chronoSphereGeom, bronzeMat);
  chronoGroup.add(chronoSphere);

  const chronoEquatorGeom = new THREE.TorusGeometry(0.55, 0.038, 12, 32);
  const chronoEquator = new THREE.Mesh(chronoEquatorGeom, goldMat);
  chronoGroup.add(chronoEquator);

  const chronoMeridianGeom = new THREE.TorusGeometry(0.55, 0.028, 12, 32);
  const chronoMeridian = new THREE.Mesh(chronoMeridianGeom, deepTealMat);
  chronoMeridian.rotation.y = Math.PI / 2;
  chronoGroup.add(chronoMeridian);

  addArtifact(chronoGroup, {
    basePos: [-3.6, 5.0, -5.2],
    rotSpeedX: 0.12,
    rotSpeedY: 0.18,
    rotSpeedZ: 0.08,
    driftSpeed: 0.08,
    driftAmp: 0.18,
    onUpdate: (group, time) => {
      chronoEquator.rotation.z = time * 0.55;
      chronoMeridian.rotation.x = Math.sin(time * 0.5) * 0.35;
    }
  });

  // Artifact 6: Cosmic Mobius Torus Knot (Far upper right celestial void)
  const knotGroup = new THREE.Group();
  const knotGeom = new THREE.TorusKnotGeometry(0.50, 0.11, 64, 12, 2, 3);
  const knotMat = new THREE.MeshStandardMaterial({
    color: 0x8C6239,
    emissive: 0x004D5A,
    emissiveIntensity: 0.30,
    metalness: 0.85,
    roughness: 0.32
  });
  const knotMesh = new THREE.Mesh(knotGeom, knotMat);
  knotGroup.add(knotMesh);

  addArtifact(knotGroup, {
    basePos: [4.2, 5.0, -5.5],
    rotSpeedX: 0.25,
    rotSpeedY: 0.32,
    rotSpeedZ: 0.15,
    driftSpeed: 0.10,
    driftAmp: 0.20
  });

  // ---------------------------------------------------------------------------
  // 9. Subsystem C: 3D Digital Asteroids (Irregular Tumbling Polyhedra)
  // ---------------------------------------------------------------------------
  const asteroidCount = 8;
  const asteroidMeshes = [];

  for (let i = 0; i < asteroidCount; i++) {
    const radius = 0.42 + (i % 3) * 0.12;
    const geom = new THREE.DodecahedronGeometry(radius, 0);

    // Apply deterministic vertex jitter for rocky silhouette
    const posAttr = geom.attributes.position;
    for (let j = 0; j < posAttr.count; j++) {
      const vx = posAttr.getX(j);
      const vy = posAttr.getY(j);
      const vz = posAttr.getZ(j);
      const factor = 0.82 + ((j * 19) % 36) / 100;
      posAttr.setXYZ(j, vx * factor, vy * factor, vz * factor);
    }
    geom.computeVertexNormals();

    const wireGeom = new THREE.WireframeGeometry(geom);
    const wireMat = new THREE.LineBasicMaterial({
      color: getPalette().asteroidWire,
      transparent: true,
      opacity: isDarkMode() ? 0.16 : 0.10
    });
    const wireMesh = new THREE.LineSegments(wireGeom, wireMat);

    const solidMat = new THREE.MeshStandardMaterial({
      color: getPalette().asteroids,
      roughness: 0.88,
      metalness: 0.15,
      transparent: true,
      opacity: isDarkMode() ? 0.38 : 0.22
    });
    const solidMesh = new THREE.Mesh(geom, solidMat);

    const asteroidGroup = new THREE.Group();
    asteroidGroup.add(solidMesh);
    asteroidGroup.add(wireMesh);

    // Disperse asteroids across margins and deep background (Z <= -8, dist >= 9.0)
    const angle = (i / asteroidCount) * Math.PI * 2;
    const dist = 9.0 + (i % 3) * 2.5;
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * (dist * 0.55);
    const z = -8 - (i % 3) * 3;

    asteroidGroup.position.set(x, y, z);
    asteroidGroup.userData = {
      baseX: x,
      baseY: y,
      baseZ: z,
      rotX: 0.003 + (i % 3) * 0.002,
      rotY: 0.004 + (i % 4) * 0.002,
      driftSpeed: 0.12 + (i % 3) * 0.08,
      driftOffset: i * 1.5
    };

    universeGroup.add(asteroidGroup);
    asteroidMeshes.push(asteroidGroup);
  }

  // ---------------------------------------------------------------------------
  // 10. Subsystem E: Faint Distant AI Neural Constellation Network (Ultra-Subtle Cosmic Anchor)
  // ---------------------------------------------------------------------------
  const neuralCoreGroup = new THREE.Group();
  neuralCoreGroup.position.set(-0.5, 0.2, -22.0); // Placed far in the deep cosmic background
  universeGroup.add(neuralCoreGroup);

  const neuralGeom = new THREE.IcosahedronGeometry(1.35, 1);
  const neuralWireGeom = new THREE.WireframeGeometry(neuralGeom);
  const neuralWireMat = new THREE.LineBasicMaterial({
    color: getPalette().neuralLines,
    transparent: true,
    opacity: isDarkMode() ? 0.04 : 0.02
  });
  const neuralWireMesh = new THREE.LineSegments(neuralWireGeom, neuralWireMat);
  neuralCoreGroup.add(neuralWireMesh);

  // Nodes (Subtle, pinpoint synaptic nodes)
  const neuralNodeMat = new THREE.PointsMaterial({
    color: getPalette().neuralNodes,
    size: 0.04,
    transparent: true,
    opacity: isDarkMode() ? 0.08 : 0.04
  });
  const neuralNodes = new THREE.Points(neuralGeom, neuralNodeMat);
  neuralCoreGroup.add(neuralNodes);

  // Outer Constellation Cage (Faint celestial geometry)
  const outerCageGeom = new THREE.DodecahedronGeometry(2.1, 0);
  const outerCageWire = new THREE.WireframeGeometry(outerCageGeom);
  const outerCageMat = new THREE.LineBasicMaterial({
    color: getPalette().neuralCage,
    transparent: true,
    opacity: isDarkMode() ? 0.02 : 0.01
  });
  const outerCageMesh = new THREE.LineSegments(outerCageWire, outerCageMat);
  neuralCoreGroup.add(outerCageMesh);

  // ---------------------------------------------------------------------------
  // 11. Subsystem F: Digital Data Streams (Subtle Micro-Dust)
  // ---------------------------------------------------------------------------
  const streamParticleCount = 45;
  const streamPositions = new Float32Array(streamParticleCount * 3);
  const streamProgress = new Float32Array(streamParticleCount);

  for (let i = 0; i < streamParticleCount; i++) {
    streamProgress[i] = Math.random();
  }

  const streamGeometry = new THREE.BufferGeometry();
  streamGeometry.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));

  const streamMaterial = new THREE.PointsMaterial({
    color: getPalette().dataStream,
    size: 0.035,
    transparent: true,
    opacity: isDarkMode() ? 0.08 : 0.04
  });
  const streamPoints = new THREE.Points(streamGeometry, streamMaterial);
  universeGroup.add(streamPoints);

  function updateDataStreams(time) {
    const positions = streamGeometry.attributes.position.array;
    for (let i = 0; i < streamParticleCount; i++) {
      streamProgress[i] = (streamProgress[i] + 0.0012) % 1;
      const t = streamProgress[i] * Math.PI * 2;
      const radius = 6.0 + Math.sin(t * 3 + i) * 1.5;

      const idx = i * 3;
      positions[idx] = -0.5 + Math.cos(t) * radius;
      positions[idx + 1] = 0.2 + Math.sin(t * 2) * (radius * 0.45);
      positions[idx + 2] = -5.0 + Math.sin(t) * 1.8;
    }
    streamGeometry.attributes.position.needsUpdate = true;
  }

  // ---------------------------------------------------------------------------
  // 12. Subsystem G: Minimalist Cybersecurity Wireframe Shield (Subdued)
  // ---------------------------------------------------------------------------
  const shieldShape = new THREE.Shape();
  shieldShape.moveTo(0, 1.0);
  shieldShape.lineTo(0.75, 0.65);
  shieldShape.lineTo(0.65, -0.35);
  shieldShape.quadraticCurveTo(0, -1.0, 0, -1.1);
  shieldShape.quadraticCurveTo(0, -1.0, -0.65, -0.35);
  shieldShape.lineTo(-0.75, 0.65);
  shieldShape.closePath();

  const shieldPointsGeom = new THREE.BufferGeometry().setFromPoints(shieldShape.getPoints(24));
  const shieldMat = new THREE.LineBasicMaterial({
    color: getPalette().cyberShield,
    transparent: true,
    opacity: 0,
    linewidth: 1
  });
  const shieldMesh = new THREE.Line(shieldPointsGeom, shieldMat);
  shieldMesh.visible = false; // Subdued: Removed intrusive foreground wireframe shield to maintain photorealistic deep space
  shieldMesh.position.set(-0.5, 0.2, -7.0);

  // ---------------------------------------------------------------------------
  // 13. Dynamic Theme Mutation Observer
  // ---------------------------------------------------------------------------
  function syncThemeToScene() {
    const pal = getPalette();
    const dark = isDarkMode();

    scene.fog.color.setHex(pal.fog);
    starMaterial.opacity = dark ? 0.70 : 0.40;
    dustMaterial.color.setHex(pal.stars);
    dustMaterial.opacity = dark ? 0.28 : 0.15;

    nebulaPlanes.forEach(plane => {
      plane.material.opacity = dark ? 0.35 : 0.12;
    });

    neuralWireMat.color.setHex(pal.neuralLines);
    neuralWireMat.opacity = dark ? 0.04 : 0.02;
    neuralNodeMat.color.setHex(pal.neuralNodes);
    neuralNodeMat.opacity = dark ? 0.08 : 0.04;
    outerCageMat.color.setHex(pal.neuralCage);
    outerCageMat.opacity = dark ? 0.02 : 0.01;

    streamMaterial.color.setHex(pal.dataStream);
    streamMaterial.opacity = dark ? 0.08 : 0.04;
    shieldMat.color.setHex(pal.cyberShield);
    shieldMat.opacity = 0;

    pointLight1.color.setHex(pal.pointLight1);
    pointLight2.color.setHex(pal.pointLight2);
    ambientLight.color.setHex(pal.ambientLight);

    corePointLight.intensity = dark ? 2.2 : 1.4;
    coreMat.emissiveIntensity = dark ? 1.6 : 1.1;
    deepTealMat.emissiveIntensity = dark ? 0.40 : 0.25;
    bronzeMat.roughness = dark ? 0.38 : 0.45;
    goldMat.roughness = dark ? 0.28 : 0.35;

    if (exactCosmicPlaneMat) {
      exactCosmicPlaneMat.opacity = dark ? 1.0 : 0.20;
    }
  }

  const themeObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.attributeName === 'data-theme') {
        syncThemeToScene();
      }
    });
  });
  themeObserver.observe(document.documentElement, { attributes: true });

  // ---------------------------------------------------------------------------
  // 14. Pointer Parallax with Smooth Damping
  // ---------------------------------------------------------------------------
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  function onPointerMove(e) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    targetMouseX = ((e.clientX / width) - 0.5) * 1.5;
    targetMouseY = ((e.clientY / height) - 0.5) * 1.5;
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  // ---------------------------------------------------------------------------
  // 14b. Smooth Document Scroll Voyage Dynamics
  // ---------------------------------------------------------------------------
  let targetScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
  let currentScrollY = targetScrollY;

  function onScroll() {
    targetScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------------------------------------------------------------------------
  // 15. Responsive Viewport Adaptation
  // ---------------------------------------------------------------------------
  function onResize() {
    if (!container) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;

    if (width < 768) {
      camera.position.z = 18;
      cosmicMechanismGroup.position.set(0, 0.5, -7.0);
      cosmicMechanismGroup.scale.set(0.68, 0.68, 0.68);
      neuralCoreGroup.position.set(0, 0.5, -8.0);
      neuralCoreGroup.scale.set(0.85, 0.85, 0.85);
      shieldMesh.position.set(0, 0.5, -8.5);
      shieldMesh.scale.set(0.85, 0.85, 0.85);
      universeGroup.scale.set(0.82, 0.82, 0.82);
    } else {
      camera.position.z = 15;
      cosmicMechanismGroup.position.set(0, 0.2, -5.6);
      cosmicMechanismGroup.scale.set(1, 1, 1);
      neuralCoreGroup.position.set(-0.5, 0.2, -6.5);
      neuralCoreGroup.scale.set(1, 1, 1);
      shieldMesh.position.set(-0.5, 0.2, -7.0);
      shieldMesh.scale.set(1, 1, 1);
      universeGroup.scale.set(1, 1, 1);
    }

    camera.updateProjectionMatrix();
    updateExactCosmicBackgroundPlane();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', onResize, { passive: true });
  onResize();

  // ---------------------------------------------------------------------------
  // 16. Lifecycle & Performance Management
  // ---------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

  let isRunning = false;
  let animationFrameId = null;
  let isIntersecting = true;
  let isTabVisible = !document.hidden;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      isIntersecting = entry.isIntersecting;
      evaluateLoop();
    });
  }, { threshold: 0.05 });
  observer.observe(container);

  document.addEventListener('visibilitychange', function () {
    isTabVisible = !document.hidden;
    evaluateLoop();
  });

  let isManuallyPaused = false;

  function updateAnimationToggleButton() {
    const btn = document.getElementById('animation-toggle');
    if (!btn) return;
    const isPaused = !isRunning || isManuallyPaused;
    btn.setAttribute('aria-pressed', isPaused ? 'true' : 'false');
    btn.setAttribute('aria-label', isPaused ? 'Resume 3D background animation' : 'Pause 3D background animation');
    btn.setAttribute('title', isPaused ? 'Resume 3D animation (Shortcut: P)' : 'Pause 3D animation (Shortcut: P)');
    const pauseIcon = btn.querySelector('.anim-icon--pause');
    const playIcon = btn.querySelector('.anim-icon--play');
    const textSpan = btn.querySelector('.anim-toggle__text');
    if (pauseIcon) pauseIcon.style.display = isPaused ? 'none' : 'inline-block';
    if (playIcon) playIcon.style.display = isPaused ? 'inline-block' : 'none';
    if (textSpan) textSpan.textContent = isPaused ? 'Play' : 'Pause';
  }

  function evaluateLoop() {
    let shouldRun = isIntersecting && isTabVisible && !isManuallyPaused;
    if (!prefersReducedMotion || !prefersReducedMotion.matches) {
      // Respect user motion preferences
    } else {
      shouldRun = false;
    }
    if (shouldRun && !isRunning) {
      isRunning = true;
      lastTime = performance.now();
      animate(lastTime);
    } else if (!shouldRun && isRunning) {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
    updateAnimationToggleButton();
  }

  window.__toggleUniverseAnimation = function (forceState) {
    if (typeof forceState === 'boolean') {
      isManuallyPaused = !forceState;
    } else {
      isManuallyPaused = !isManuallyPaused;
    }
    evaluateLoop();
    return !isManuallyPaused;
  };

  window.addEventListener('keydown', function (e) {
    if ((e.key === 'p' || e.key === 'P') && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const activeEl = document.activeElement;
      if (activeEl && ['input', 'textarea', 'select'].includes(activeEl.tagName.toLowerCase())) {
        return;
      }
      window.__toggleUniverseAnimation();
    }
  });

  // ---------------------------------------------------------------------------
  // 17. Master Animation & Render Loop
  // ---------------------------------------------------------------------------
  let lastTime = performance.now();
  let clockTime = 0;

  function renderFrame(delta) {
    clockTime += delta;

    // Smooth cursor parallax & scroll interpolation
    currentMouseX += (targetMouseX - currentMouseX) * 0.04;
    currentMouseY += (targetMouseY - currentMouseY) * 0.04;
    currentScrollY += (targetScrollY - currentScrollY) * 0.08;

    const isMobile = window.innerWidth < 768;
    const scrollTravel = currentScrollY * 0.0018;

    camera.position.x = currentMouseX * 1.5;
    camera.position.y = -currentMouseY * 1.5 + (isMobile ? 0.5 : 0) - scrollTravel;
    camera.lookAt(0, (isMobile ? 0.5 : 0) - scrollTravel, 0);

    // 0. Smooth Continuous 3D Rotation of the Exact Cosmic Mechanism Background
    if (exactCosmicBgMesh) {
      exactCosmicBgMesh.rotation.z = clockTime * 0.022;
      exactCosmicBgMesh.rotation.x = currentMouseY * 0.035;
      exactCosmicBgMesh.rotation.y = currentMouseX * 0.035;
    }

    // 1. Starfield slow rotation
    starField.rotation.y = clockTime * 0.015;

    // 2. Ancient Cosmic Mechanism Concentric Rings & Core Animation
    if (astrolabeGroup) {
      astrolabeGroup.rotation.z = clockTime * 0.030;
    }
    outerFrameGroup.rotation.z = clockTime * 0.020;
    midRingGroup.rotation.z = -clockTime * 0.035;
    astronomyRingGroup.rotation.z = clockTime * 0.055;
    tealRingGroup.rotation.z = -clockTime * 0.075;
    innerGimbalGroup.rotation.z = clockTime * 0.11;

    // Harmonic Core Energy Pulsing
    const corePulse = 1.0 + Math.sin(clockTime * 2.8) * 0.35;
    coreMat.emissiveIntensity = 1.3 + Math.sin(clockTime * 2.8) * 0.5;
    corePointLight.intensity = 1.8 + Math.sin(clockTime * 2.8) * 0.6;
    coreHaloInnerMesh.rotation.z = clockTime * 0.25;
    coreHaloInnerMesh.scale.set(corePulse, corePulse, 1);
    coreHaloOuterMesh.rotation.z = -clockTime * 0.18;
    coreHaloOuterMesh.scale.set(1.0 + Math.cos(clockTime * 2.4) * 0.15, 1.0 + Math.cos(clockTime * 2.4) * 0.15, 1);

    // Ancient Celestial Eye Portal Swirl & Pupil Radiance
    if (eyePortalMesh) {
      eyePortalMesh.rotation.z = clockTime * 0.040;
    }
    if (pupilMesh) {
      const pPulse = 1.0 + Math.sin(clockTime * 2.8) * 0.12;
      pupilMesh.scale.set(pPulse, pPulse, pPulse);
    }
    if (eyeBlueLight) {
      eyeBlueLight.intensity = 3.0 + Math.sin(clockTime * 2.8) * 0.8;
    }

    // Parallax Tilt for the Mechanism
    cosmicMechanismGroup.rotation.x = 0.65 + Math.sin(clockTime * 0.3) * 0.04 + currentMouseY * 0.18;
    cosmicMechanismGroup.rotation.y = -0.30 + Math.cos(clockTime * 0.25) * 0.05 + currentMouseX * 0.22;
    cosmicMechanismGroup.rotation.z = 0.22;

    // 3. Complementary Cosmic Artifacts Animation & Bounded Drift
    cosmicArtifacts.forEach(art => {
      const u = art.userData;
      art.rotation.x += u.rotSpeedX * delta;
      art.rotation.y += u.rotSpeedY * delta;
      art.rotation.z += u.rotSpeedZ * delta;

      const driftY = Math.sin(clockTime * u.driftSpeed + u.phase) * u.driftAmp;
      const driftX = Math.cos(clockTime * (u.driftSpeed * 0.8) + u.phase) * (u.driftAmp * 0.7);

      let targetX = u.basePos[0] + driftX;
      let targetY = u.basePos[1] + driftY;
      const targetZ = u.basePos[2];

      const deflected = applyAvoidanceDeflection(targetX, targetY, targetZ, isMobile);
      art.position.x = deflected.x;
      art.position.y = deflected.y;
      art.position.z = targetZ;

      if (u.onUpdate) {
        u.onUpdate(art, clockTime);
      }
    });

    // 3. Stately Astronomical Neural Core precession
    neuralWireMesh.rotation.x = clockTime * 0.035;
    neuralWireMesh.rotation.y = clockTime * 0.055;
    neuralNodes.rotation.x = neuralWireMesh.rotation.x;
    neuralNodes.rotation.y = neuralWireMesh.rotation.y;

    outerCageMesh.rotation.x = -clockTime * 0.022;
    outerCageMesh.rotation.y = clockTime * 0.030;

    // 3b. Interactive Subtle Constellation Synthesis
    if (constellationMesh && typeof starPositions !== 'undefined') {
      let mouseDistSq = currentMouseX * currentMouseX + currentMouseY * currentMouseY;
      if (mouseDistSq > 0.002) {
        targetConstellationOpacity = isDarkMode() ? 0.32 : 0.16;
        let lineIdx = 0;
        let foundStars = [];
        for (let i = 0; i < candidateStarIndices.length && foundStars.length < 4; i++) {
          let sIdx = candidateStarIndices[i];
          let sx = starPositions[sIdx * 3];
          let sy = starPositions[sIdx * 3 + 1];
          let sz = starPositions[sIdx * 3 + 2];
          let dx = sx - (currentMouseX * 12);
          let dy = sy - (-currentMouseY * 12);
          if (dx * dx + dy * dy < 64) {
            foundStars.push([sx, sy, sz]);
          }
        }
        for (let j = 0; j < foundStars.length - 1 && lineIdx < MAX_CONSTELLATION_LINES; j++) {
          constellationPositions[lineIdx * 6] = foundStars[j][0];
          constellationPositions[lineIdx * 6 + 1] = foundStars[j][1];
          constellationPositions[lineIdx * 6 + 2] = foundStars[j][2];
          constellationPositions[lineIdx * 6 + 3] = foundStars[j+1][0];
          constellationPositions[lineIdx * 6 + 4] = foundStars[j+1][1];
          constellationPositions[lineIdx * 6 + 5] = foundStars[j+1][2];
          lineIdx++;
        }
        for (let k = lineIdx; k < MAX_CONSTELLATION_LINES; k++) {
          constellationPositions[k * 6] = 0;
          constellationPositions[k * 6 + 1] = 0;
          constellationPositions[k * 6 + 2] = 0;
          constellationPositions[k * 6 + 3] = 0;
          constellationPositions[k * 6 + 4] = 0;
          constellationPositions[k * 6 + 5] = 0;
        }
        constellationGeometry.attributes.position.needsUpdate = true;
      } else {
        targetConstellationOpacity = 0;
      }
      currentConstellationOpacity += (targetConstellationOpacity - currentConstellationOpacity) * 0.05;
      constellationMaterial.opacity = currentConstellationOpacity;
    }

    // 4. Asteroids tumbling & trajectory drift
    asteroidMeshes.forEach(ast => {
      ast.rotation.x += ast.userData.rotX;
      ast.rotation.y += ast.userData.rotY;
      ast.position.y = ast.userData.baseY + Math.sin(clockTime * ast.userData.driftSpeed + ast.userData.driftOffset) * 0.35;
    });

    // 5. Digital Data Streams
    updateDataStreams(clockTime);

    // 6. Cybersecurity Shield gentle rotation
    shieldMesh.rotation.z = Math.sin(clockTime * 0.15) * 0.035;
    shieldMesh.rotation.y = Math.cos(clockTime * 0.12) * 0.06;

    // 7. Ambient Dust & Nebula slow cosmic drift
    dustField.rotation.y = clockTime * 0.006;
    nebulaPlanes.forEach((plane, pIdx) => {
      plane.rotation.z += 0.00012 * (pIdx % 2 === 0 ? 1 : -1) * delta;
    });

    // 8. 3D Star-Breaking Particle Engine
    if (!prefersReducedMotion || !prefersReducedMotion.matches) {
      updateStarBreaking(delta);
    }

    renderer.render(scene, camera);
  }

  function animate(now) {
    if (!isRunning) return;
    const delta = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    renderFrame(delta);
    animationFrameId = requestAnimationFrame(animate);
  }

  // Reduced motion handling
  if (prefersReducedMotion && prefersReducedMotion.matches) {
    renderFrame(0);
  } else {
    evaluateLoop();
  }

  if (prefersReducedMotion && prefersReducedMotion.addEventListener) {
    prefersReducedMotion.addEventListener('change', evaluateLoop);
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', function () {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    themeObserver.disconnect();
    observer.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    if (prefersReducedMotion && prefersReducedMotion.removeEventListener) {
      prefersReducedMotion.removeEventListener('change', evaluateLoop);
    }
    if (starGlowTex) starGlowTex.dispose();
    if (beaconStarTex) beaconStarTex.dispose();
    if (fragmentTex) fragmentTex.dispose();
    if (beaconSpriteMat) beaconSpriteMat.dispose();
    if (nebulaTex) nebulaTex.dispose();
    if (starGeometry) starGeometry.dispose();
    if (starMaterial) starMaterial.dispose();
    if (dustGeometry) dustGeometry.dispose();
    if (dustMaterial) dustMaterial.dispose();
    if (burstGeometry) burstGeometry.dispose();
    if (burstMaterial) burstMaterial.dispose();
    if (exactCosmicPlaneGeom) exactCosmicPlaneGeom.dispose();
    if (exactCosmicPlaneMat) exactCosmicPlaneMat.dispose();
    if (exactCosmicTexture) exactCosmicTexture.dispose();
    cosmicMechanismGroup.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    });
    cosmicArtifacts.forEach(art => {
      art.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
    });
    bronzeMat.dispose();
    goldMat.dispose();
    deepTealMat.dispose();
    darkPatinaMat.dispose();
    coreMat.dispose();
    coreHaloMat.dispose();
    coreTealHaloMat.dispose();
    if (prismMat) prismMat.dispose();
    if (knotMat) knotMat.dispose();
    asteroidMeshes.forEach(astGroup => {
      astGroup.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
    });
    if (neuralGeom) neuralGeom.dispose();
    if (neuralWireGeom) neuralWireGeom.dispose();
    if (neuralWireMat) neuralWireMat.dispose();
    if (neuralNodeMat) neuralNodeMat.dispose();
    if (outerCageGeom) outerCageGeom.dispose();
    if (outerCageWire) outerCageWire.dispose();
    if (outerCageMat) outerCageMat.dispose();
    if (streamGeometry) streamGeometry.dispose();
    if (streamMaterial) streamMaterial.dispose();
    if (shieldPointsGeom) shieldPointsGeom.dispose();
    if (shieldMat) shieldMat.dispose();
    renderer.dispose();
  });

})();
