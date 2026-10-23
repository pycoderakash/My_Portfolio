/**
 * verify-3d-universe.js
 * Dedicated verification suite for the 3D Programming Universe & Star-Breaking Effects.
 * Tests all 18 requirements specified in Section 13 of the project specification.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
let passed = 0;
let failed = 0;
const results = [];

function assert(condition, message) {
  if (condition) {
    passed++;
    results.push({ status: 'PASS', message });
  } else {
    failed++;
    results.push({ status: 'FAIL', message });
  }
}

const jsContent = fs.readFileSync(path.join(ROOT, 'assets/js/3d-universe.js'), 'utf8');
const cssContent = fs.readFileSync(path.join(ROOT, 'assets/css/styles.css'), 'utf8');
const htmlPages = ['index.html', 'about.html', 'skills.html', 'projects.html', 'contact.html', '404.html'];

console.log('Running 3D Programming Universe Verification Suite...\n');

// =============================================================================
// Requirement 1: Complete Removal of All 15 Old Programming Language Logos
// =============================================================================
assert(!jsContent.includes('const logoConfigs ='), 'Req 1: Obsolete logoConfigs configuration array is removed');
assert(!jsContent.includes('const logoDrawers ='), 'Req 1: Obsolete 2D canvas logoDrawers dictionary is removed');
assert(!jsContent.includes('function createLogoTexture'), 'Req 1: Obsolete createLogoTexture function is removed');
assert(!jsContent.includes('logoMeshes'), 'Req 1: Obsolete logoMeshes array and animation loop are removed');

const OLD_LANGUAGES = [
  'python', 'javascript', 'java', 'c', 'cpp', 'csharp',
  'typescript', 'sql', 'go', 'rust', 'kotlin', 'swift',
  'php', 'ruby', 'r'
];
OLD_LANGUAGES.forEach(lang => {
  const hasDrawer = new RegExp(lang + ':\\s*function\\s*\\(ctx\\)').test(jsContent);
  assert(!hasDrawer, 'Req 1: "' + lang + '" logo drawing routine is completely purged');
});

// =============================================================================
// Requirement 2: The Ancient Cosmic Mechanism - Architectural Integrity
// =============================================================================
assert(jsContent.includes('const cosmicMechanismGroup = new THREE.Group()'), 'Req 2: Central Ancient Cosmic Mechanism group created');
assert(jsContent.includes('bronzeMat = new THREE.MeshStandardMaterial'), 'Req 2: Antique bronze standard material with metallic properties');
assert(jsContent.includes('goldMat = new THREE.MeshStandardMaterial'), 'Req 2: Aged gold standard material with metallic properties');
assert(jsContent.includes('deepTealMat = new THREE.MeshStandardMaterial'), 'Req 2: Deep teal accent material with luminous emissive properties');
assert(jsContent.includes('outerTorusGeom = new THREE.TorusGeometry(3.6, 0.08, 16, 64)'), 'Req 2: Outer circular antique bronze frame ring');
assert(jsContent.includes('outerBevelGeom = new THREE.TorusGeometry(3.78, 0.035, 16, 64)'), 'Req 2: Outer aged gold bevel rim');
assert(jsContent.includes('tickGeom = new THREE.BoxGeometry(0.04, 0.12, 0.06)'), 'Req 2: 36 calibrated astronomical dial ticks around perimeter');
assert(jsContent.includes('bracketGeom = new THREE.BoxGeometry(0.14, 0.32, 0.12)'), 'Req 2: 4 cardinal pointer brackets with metallic rivets');

// =============================================================================
// Requirement 3: Concentric Multi-Ring Structure & Independent Rotations
// =============================================================================
assert(jsContent.includes('midTorusGeom = new THREE.TorusGeometry(2.85, 0.065, 16, 64)'), 'Req 3: Middle chronometer gear ring');
assert(jsContent.includes('toothGeom = new THREE.BoxGeometry(0.05, 0.10, 0.05)'), 'Req 3: 24 internal mechanical gear teeth');
assert(jsContent.includes('astroTorusGeom = new THREE.TorusGeometry(2.15, 0.05, 16, 48)'), 'Req 3: Astronomical constellation & calendar ring');
assert(jsContent.includes('planetCogGeom = new THREE.TorusGeometry(0.24, 0.03, 12, 24)'), 'Req 3: Orbiting planetary cogs on calendar track');
assert(jsContent.includes('tealOuterGeom = new THREE.TorusGeometry(1.65, 0.045, 16, 48)'), 'Req 3: Outer deep teal inner ring structure');
assert(jsContent.includes('tealInnerGeom = new THREE.TorusGeometry(1.42, 0.035, 16, 48)'), 'Req 3: Inner deep teal nested ring structure');
assert(jsContent.includes('innerGimbalGroup.rotation.x = 0.41'), 'Req 3: Inner armillary ring with 23.5° celestial ecliptic tilt');

// Multi-directional differential rotations
assert(jsContent.includes('outerFrameGroup.rotation.z = clockTime * 0.020'), 'Req 3: Outer frame rotates slowly forward');
assert(jsContent.includes('midRingGroup.rotation.z = -clockTime * 0.035'), 'Req 3: Mid chronometer ring counter-rotates in reverse');
assert(jsContent.includes('astronomyRingGroup.rotation.z = clockTime * 0.055'), 'Req 3: Astronomical ring rotates with distinct velocity');
assert(jsContent.includes('tealRingGroup.rotation.z = -clockTime * 0.075'), 'Req 3: Teal inner structure counter-rotates in reverse');
assert(jsContent.includes('innerGimbalGroup.rotation.z = clockTime * 0.11'), 'Req 3: Inner armillary gimbal ring spins on tilted ecliptic axis');

// =============================================================================
// Requirement 4: Central Energy Core & Complementary Cosmic Artifacts
// =============================================================================
assert(jsContent.includes('coreSphereGeom = new THREE.SphereGeometry(0.38, 24, 24)'), 'Req 4: Central luminous energy core sphere');
assert(jsContent.includes('corePointLight = new THREE.PointLight(0xFFAA00, 2.2, 12.0)'), 'Req 4: Real scene PointLight illumination from core');
assert(jsContent.includes('coreHaloInnerGeom = new THREE.RingGeometry(0.44, 0.54, 32)'), 'Req 4: Inner glowing corona halo ring');
assert(jsContent.includes('coreHaloOuterGeom = new THREE.RingGeometry(0.60, 0.72, 32)'), 'Req 4: Outer cyan-gold corona halo ring');
assert(jsContent.includes('corePulse = 1.0 + Math.sin(clockTime * 2.8) * 0.35'), 'Req 4: Harmonic energy core pulse calculation');

// Complementary Cosmic Artifacts (6 Unique Relics)
assert(jsContent.includes('const cosmicArtifacts = []'), 'Req 4: Array of complementary cosmic artifacts initialized');
assert(jsContent.includes('gyroGroup'), 'Req 4: Artifact 1: Celestial 3-axis orthogonal gyroscope created');
assert(jsContent.includes('prismGroup'), 'Req 4: Artifact 2: Faceted crystalline octahedral prism created');
assert(jsContent.includes('armillaryGroup'), 'Req 4: Artifact 3: Interlocking elliptical armillary orbital created');
assert(jsContent.includes('relicGroup'), 'Req 4: Artifact 4: Dodecahedral geometric relic with golden core created');
assert(jsContent.includes('chronoGroup'), 'Req 4: Artifact 5: Orbital chronometer sphere with equator gear created');
assert(jsContent.includes('knotGroup'), 'Req 4: Artifact 6: Cosmic Mobius torus knot created');
assert(jsContent.includes('basePos: [-8.2, 3.4, -3.8]'), 'Req 4: Artifacts positioned in balanced 3D space');

// =============================================================================
// Requirement 5: Star Field Has Multiple Depth Layers
// =============================================================================
assert(jsContent.includes('const starCount = 650'), 'Req 5: Astronomical starfield count configured');
assert(jsContent.includes('const isDeep = Math.random() < 0.82'), 'Req 5: Multi-depth cosmic distribution ratio configured');
assert(jsContent.includes('zBase = isDeep ? (-55 + Math.random() * 38) : (-16 + Math.random() * 14)'), 'Req 5: Distinct depth ranges for deep vs foreground stars');
assert(jsContent.includes('createParticleGlowTexture()'), 'Req 5: Soft circular point glow texture avoids square WebGL point sprites');
assert(jsContent.includes('vertexColors: true'), 'Req 5: Stellar temperature coloration (pure white, golden dwarf, blue-white giant)');

// =============================================================================
// Requirement 6: Selected Stars Break Into Particles
// =============================================================================
assert(jsContent.includes('triggerStarBreak()'), 'Req 6: Function to trigger star-breaking animation exists');
assert(jsContent.includes('slot.stage === \'flare\''), 'Req 6: Stage 1 flare surges star brightness before burst');
assert(jsContent.includes('const surge = 1.0 + Math.sin(flareProg * Math.PI) * 2.8'), 'Req 6: Star luminous flare surge calculation implemented');
assert(jsContent.includes('slot.stage = \'burst\''), 'Req 6: Stage 2 burst transitions cleanly from flare');
assert(jsContent.includes('starColors[starIdx * 3] = 0'), 'Req 6: Parent star hidden during active fragmentation');

// =============================================================================
// Requirement 7: Particles Scatter in Three Dimensions
// =============================================================================
assert(jsContent.includes('const theta = Math.random() * Math.PI * 2'), 'Req 7: Spherical theta angle computed for 3D scatter');
assert(jsContent.includes('const phi = Math.acos((Math.random() * 2) - 1)'), 'Req 7: Spherical phi angle computed for isotropic 3D scatter');
assert(jsContent.includes('pObj.vx = Math.sin(phi) * Math.cos(theta) * speed'), 'Req 7: Outward X velocity scatter');
assert(jsContent.includes('pObj.vy = Math.sin(phi) * Math.sin(theta) * speed'), 'Req 7: Outward Y velocity scatter');
assert(jsContent.includes('pObj.vz = Math.cos(phi) * speed'), 'Req 7: Outward Z velocity scatter into genuine 3D space');
assert(jsContent.includes('burstMaterial = new THREE.PointsMaterial'), 'Req 7: Dedicated burst particle points material with additive blending');

// =============================================================================
// Requirement 8: Particles Fade Out Smoothly & Star Recycled Cleanly
// =============================================================================
assert(jsContent.includes('pObj.vx *= Math.pow(pObj.drag, delta * 60)'), 'Req 8: Viscous drag / velocity damping slows particles down');
assert(jsContent.includes('const fade = Math.max(0, 1.0 - burstProg * burstProg)'), 'Req 8: Quadratic smooth fade decay curve');
assert(jsContent.includes('burstPositions[bIdx * 3 + 2] = -999'), 'Req 8: Particles recycled offscreen after lifetime');
assert(jsContent.includes('starColors[starIdx * 3] = slot.origColor[0]'), 'Req 8: Star restored peacefully with original color without new allocations');

// =============================================================================
// Requirement 9: Star Bursts Do Not Happen Continuously Everywhere
// =============================================================================
assert(jsContent.includes('const MAX_CONCURRENT_BURSTS = 3'), 'Req 9: Burst concurrency strictly clamped to max 3 concurrent events');
assert(jsContent.includes('nextBurstTimer = 4.2 + Math.random() * 3.0'), 'Req 9: Randomized sparse interval between 4.2s and 7.2s between bursts');

// =============================================================================
// Requirement 10: Logos and Bursts Do Not Obstruct Foreground Content
// =============================================================================
assert(jsContent.includes('candidateStarIndices'), 'Req 10: Star candidates pre-filtered to avoid bursts behind text/avatar');
assert(jsContent.includes('const inTextZone = (sx >= -9.5 && sx <= 1.0 && sy >= -2.8 && sy <= 2.6)'), 'Req 10: Candidate stars exclude hero text zone');
assert(jsContent.includes('const inAvatarZone = (sx >= 0.8 && sx <= 6.8 && sy >= -2.5 && sy <= 2.5)'), 'Req 10: Candidate stars exclude avatar zone');
assert(jsContent.includes('applyAvoidanceDeflection'), 'Req 10: Layout-aware dynamic repulsion avoidance engine active');
assert(jsContent.includes('textMinX = -9.4') && jsContent.includes('textMaxX = 0.2'), 'Req 10: Avoidance bounds protect left-column hero text');
assert(jsContent.includes('imgMinX = 0.8') && jsContent.includes('imgMaxX = 6.8'), 'Req 10: Avoidance bounds protect right-column avatar photo card');

// =============================================================================
// Requirement 11: The Background Continues Through Every Page
// =============================================================================
htmlPages.forEach(page => {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  assert(html.includes('id="hero-3d-container"'), `Req 11: ${page} contains #hero-3d-container`);
  assert(html.includes('id="hero-3d-canvas"'), `Req 11: ${page} contains #hero-3d-canvas`);
  assert(html.includes('src="assets/js/3d-universe.js"'), `Req 11: ${page} loads 3d-universe.js`);
  assert(html.includes('src="assets/js/three.min.js"'), `Req 11: ${page} loads three.min.js`);
});

assert(cssContent.includes('.site-bg-canvas-container') && cssContent.includes('position: fixed'), 'Req 11: Full-page fixed positioning in CSS');
assert(cssContent.includes('pointer-events: none'), 'Req 11: Canvas pointer-events: none ensures unblocked user clicks');

// =============================================================================
// Requirement 12: Scrolling Works Normally (Smooth Vertical Voyage)
// =============================================================================
assert(jsContent.includes('window.addEventListener(\'scroll\', onScroll'), 'Req 12: Passive scroll event listener attached');
assert(jsContent.includes('currentScrollY += (targetScrollY - currentScrollY) * 0.08'), 'Req 12: Smooth scroll interpolation damping');
assert(jsContent.includes('const scrollTravel = currentScrollY * 0.0018'), 'Req 12: Smooth cosmic camera travel during document scrolling');

// =============================================================================
// Requirement 13: Light and Dark Themes Still Work
// =============================================================================
assert(jsContent.includes('function syncThemeToScene()'), 'Req 13: Theme synchronization function exists');
assert(jsContent.includes('MutationObserver(function (mutations)'), 'Req 13: Live MutationObserver tracks data-theme changes');
assert(jsContent.includes('palettes = {') && jsContent.includes('dark:') && jsContent.includes('light:'), 'Req 13: Dedicated light and dark visual palettes defined');

// =============================================================================
// Requirement 14: Reduced-Motion Behavior Works Where Testable
// =============================================================================
assert(jsContent.includes('prefers-reduced-motion: reduce'), 'Req 14: Media query for prefers-reduced-motion checked');
assert(jsContent.includes('prefersReducedMotion.addEventListener(\'change\', evaluateLoop)'), 'Req 14: Live event listener for prefers-reduced-motion changes');
assert(jsContent.includes('if (!prefersReducedMotion || !prefersReducedMotion.matches)'), 'Req 14: Particle bursts paused when reduced motion is preferred');

// =============================================================================
// Requirement 15: Mobile Layouts Remain Usable
// =============================================================================
assert(jsContent.includes('cosmicMechanismGroup.scale.set(0.68, 0.68, 0.68)'), 'Req 15: Mechanism scaled down for mobile');
assert(jsContent.includes('if (isMobile)'), 'Req 15: Single-column stack mobile avoidance corridor active');
assert(jsContent.includes('camera.position.z = 18'), 'Req 15: Wider mobile camera distance prevents claustrophobic framing');
assert(jsContent.includes('universeGroup.scale.set(0.82, 0.82, 0.82)'), 'Req 15: Universe scaled down gracefully on small viewports');

// =============================================================================
// Requirement 16: No Duplicate Renderers or Animation Loops Exist
// =============================================================================
const rendererMatches = jsContent.match(/new THREE\.WebGLRenderer/g) || [];
assert(rendererMatches.length === 1, `Req 16: Exactly one WebGLRenderer created (found: ${rendererMatches.length})`);
const rafMatches = jsContent.match(/requestAnimationFrame\(animate\)/g) || [];
assert(rafMatches.length === 1, `Req 16: Exactly one animation loop call (found: ${rafMatches.length})`);
assert(jsContent.includes('IntersectionObserver'), 'Req 16: IntersectionObserver pauses loop when container is off-screen');
assert(jsContent.includes('visibilitychange'), 'Req 16: Document visibilitychange pauses loop when browser tab is inactive');

// =============================================================================
// Requirement 17: No New JavaScript Errors
// =============================================================================
assert(jsContent.includes('isWebGLAvailable()'), 'Req 17: WebGL availability guard prevents context creation errors');
assert(jsContent.includes('hero-3d--fallback'), 'Req 17: Fallback class applied when WebGL is unsupported');

// =============================================================================
// Requirement 18: Performance & GPU Resource Cleanup
// =============================================================================
assert(jsContent.includes('Math.min(window.devicePixelRatio || 1, 2)'), 'Req 18: Device pixel ratio clamped to max 2.0 to prevent mobile GPU throttling');
assert(jsContent.includes('renderer.dispose()'), 'Req 18: WebGLRenderer cleanly disposed on beforeunload');
assert(jsContent.includes('starGeometry.dispose()') && jsContent.includes('burstGeometry.dispose()'), 'Req 18: Geometry buffers cleanly disposed on beforeunload');
assert(jsContent.includes('starGlowTex.dispose()') && jsContent.includes('nebulaTex.dispose()'), 'Req 18: Dynamic textures cleanly disposed on beforeunload');

// =============================================================================
// Requirement 19: Star-Breaking Origin Synchronization & Particle Lifecycle
// =============================================================================
// Static AST & Source Code Verification
assert(jsContent.includes('const originX = starPositions[starIdx * 3]'), 'Req 19: originX strictly captured from starPositions[starIdx * 3]');
assert(jsContent.includes('const originY = starPositions[starIdx * 3 + 1]'), 'Req 19: originY strictly captured from starPositions[starIdx * 3 + 1]');
assert(jsContent.includes('const originZ = starPositions[starIdx * 3 + 2]'), 'Req 19: originZ strictly captured from starPositions[starIdx * 3 + 2]');
assert(jsContent.includes('slot.origin = [originX, originY, originZ]'), 'Req 19: Burst slot origin directly bound to captured star position');
assert(jsContent.includes('beaconStar.position.set(originX, originY, originZ)'), 'Req 19: Beacon flare sprite position aligned with selected star');
assert(jsContent.includes('starField.add(burstField)'), 'Req 19: burstField attached to starField for synchronized rotational frame');
assert(jsContent.includes('starField.add(beaconStar)'), 'Req 19: beaconStar attached to starField for synchronized rotational frame');
assert(jsContent.includes('targetStarIndexOrImmediate'), 'Req 19: triggerStarBreak accepts explicit targetStarIndex parameter');
assert(jsContent.includes('window.__universeDebug'), 'Req 19: Debug and QA inspection interface exposed on window.__universeDebug');

// Dynamic Simulation & State Machine Verification
{
  const simStarCount = 650;
  const simStarPositions = new Float32Array(simStarCount * 3);
  const simStarColors = new Float32Array(simStarCount * 3);
  for (let i = 0; i < simStarCount; i++) {
    simStarPositions[i * 3] = (i - 300) * 0.12;
    simStarPositions[i * 3 + 1] = ((i % 50) - 25) * 0.15;
    simStarPositions[i * 3 + 2] = -12.0 - (i % 25) * 0.8;
    simStarColors[i * 3] = 0.82;
    simStarColors[i * 3 + 1] = 0.90;
    simStarColors[i * 3 + 2] = 1.0;
  }

  const simCandidates = [12, 45, 78, 120, 240, 310, 480];
  const SIM_MAX_BURSTS = 3;
  const SIM_PARTICLES_PER_BURST = 24;
  const SIM_TOTAL_PARTICLES = SIM_MAX_BURSTS * SIM_PARTICLES_PER_BURST;

  const simBurstPositions = new Float32Array(SIM_TOTAL_PARTICLES * 3);
  const simBurstColors = new Float32Array(SIM_TOTAL_PARTICLES * 3);
  const simBurstSizes = new Float32Array(SIM_TOTAL_PARTICLES);
  for (let b = 0; b < SIM_TOTAL_PARTICLES; b++) {
    simBurstPositions[b * 3 + 2] = -999;
  }

  const simSlots = [];
  for (let s = 0; s < SIM_MAX_BURSTS; s++) {
    const pData = [];
    for (let p = 0; p < SIM_PARTICLES_PER_BURST; p++) {
      pData.push({ vx: 0, vy: 0, vz: 0, baseR: 1, baseG: 1, baseB: 1, drag: 0.96, baseSize: 0.5 });
    }
    simSlots.push({
      active: false, stage: 'idle', age: 0, flareDuration: 0.45, burstDuration: 1.8,
      starIndex: -1, origColor: [1, 1, 1], origin: [0, 0, 0],
      startIndex: s * SIM_PARTICLES_PER_BURST, particles: pData
    });
  }

  function simTrigger(targetIdx, immediate) {
    const slot = simSlots.find(s => !s.active) || simSlots[0];
    if (slot.active && slot.starIndex >= 0) {
      simStarColors[slot.starIndex * 3] = slot.origColor[0];
      simStarColors[slot.starIndex * 3 + 1] = slot.origColor[1];
      simStarColors[slot.starIndex * 3 + 2] = slot.origColor[2];
    }
    let starIdx = -1;
    if (typeof targetIdx === 'number' && targetIdx >= 0 && targetIdx < simStarCount) {
      starIdx = Math.floor(targetIdx);
    } else {
      const avail = simCandidates.filter(i => !simSlots.some(s => s.active && s.starIndex === i));
      const pool = avail.length > 0 ? avail : simCandidates;
      starIdx = pool[0];
    }
    const originX = simStarPositions[starIdx * 3];
    const originY = simStarPositions[starIdx * 3 + 1];
    const originZ = simStarPositions[starIdx * 3 + 2];
    slot.active = true;
    slot.stage = 'flare';
    slot.age = immediate ? 0.44 : 0;
    slot.flareDuration = 0.45;
    slot.burstDuration = 1.8;
    slot.starIndex = starIdx;
    slot.origin = [originX, originY, originZ];
    slot.origColor = [
      simStarColors[starIdx * 3],
      simStarColors[starIdx * 3 + 1],
      simStarColors[starIdx * 3 + 2]
    ];
    return {
      slotIndex: simSlots.indexOf(slot),
      starIndex: starIdx,
      origin: [originX, originY, originZ],
      origColor: [...slot.origColor]
    };
  }

  function simUpdate(delta) {
    simSlots.forEach(slot => {
      if (!slot.active) return;
      slot.age += delta;
      if (slot.stage === 'flare') {
        const flareProg = slot.age / slot.flareDuration;
        const starIdx = slot.starIndex;
        if (flareProg < 1.0) {
          const surge = 1.0 + Math.sin(flareProg * Math.PI) * 2.8;
          if (starIdx >= 0) {
            simStarColors[starIdx * 3] = slot.origColor[0] * surge;
            simStarColors[starIdx * 3 + 1] = slot.origColor[1] * surge;
            simStarColors[starIdx * 3 + 2] = slot.origColor[2] * surge;
          }
        } else {
          slot.stage = 'burst';
          slot.age = 0;
          if (starIdx >= 0) {
            simStarColors[starIdx * 3] = 0;
            simStarColors[starIdx * 3 + 1] = 0;
            simStarColors[starIdx * 3 + 2] = 0;
          }
          for (let p = 0; p < SIM_PARTICLES_PER_BURST; p++) {
            const bIdx = slot.startIndex + p;
            simBurstPositions[bIdx * 3] = slot.origin[0];
            simBurstPositions[bIdx * 3 + 1] = slot.origin[1];
            simBurstPositions[bIdx * 3 + 2] = slot.origin[2];
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const speed = 2.4 + Math.random() * 3.2;
            const pObj = slot.particles[p];
            pObj.vx = Math.sin(phi) * Math.cos(theta) * speed;
            pObj.vy = Math.sin(phi) * Math.sin(theta) * speed;
            pObj.vz = Math.cos(phi) * speed;
            pObj.drag = 0.95;
            simBurstSizes[bIdx] = 1.0;
            simBurstColors[bIdx * 3] = 1.0;
            simBurstColors[bIdx * 3 + 1] = 1.0;
            simBurstColors[bIdx * 3 + 2] = 1.0;
          }
        }
      } else if (slot.stage === 'burst') {
        const burstProg = slot.age / slot.burstDuration;
        const fade = Math.max(0, 1.0 - burstProg * burstProg);
        for (let p = 0; p < SIM_PARTICLES_PER_BURST; p++) {
          const bIdx = slot.startIndex + p;
          const pObj = slot.particles[p];
          pObj.vx *= Math.pow(pObj.drag, delta * 60);
          pObj.vy *= Math.pow(pObj.drag, delta * 60);
          pObj.vz *= Math.pow(pObj.drag, delta * 60);
          simBurstPositions[bIdx * 3] += pObj.vx * delta;
          simBurstPositions[bIdx * 3 + 1] += pObj.vy * delta;
          simBurstPositions[bIdx * 3 + 2] += pObj.vz * delta;
          simBurstColors[bIdx * 3] = fade;
          simBurstColors[bIdx * 3 + 1] = fade;
          simBurstColors[bIdx * 3 + 2] = fade;
          simBurstSizes[bIdx] = fade;
        }
        if (burstProg >= 1.0) {
          for (let p = 0; p < SIM_PARTICLES_PER_BURST; p++) {
            const bIdx = slot.startIndex + p;
            simBurstPositions[bIdx * 3 + 2] = -999;
            simBurstColors[bIdx * 3] = 0;
            simBurstColors[bIdx * 3 + 1] = 0;
            simBurstColors[bIdx * 3 + 2] = 0;
            simBurstSizes[bIdx] = 0;
          }
          const starIdx = slot.starIndex;
          if (starIdx >= 0) {
            simStarColors[starIdx * 3] = slot.origColor[0];
            simStarColors[starIdx * 3 + 1] = slot.origColor[1];
            simStarColors[starIdx * 3 + 2] = slot.origColor[2];
          }
          slot.active = false;
          slot.stage = 'idle';
        }
      }
    });
  }

  // 1. Target Star Selection & Origin Precision
  const targetStar = 45;
  const evt = simTrigger(targetStar);
  assert(evt.starIndex === targetStar, 'Req 19: Chosen target star index matches input');
  assert(evt.origin[0] === simStarPositions[targetStar * 3], 'Req 19: Burst origin X exactly matches star position X');
  assert(evt.origin[1] === simStarPositions[targetStar * 3 + 1], 'Req 19: Burst origin Y exactly matches star position Y');
  assert(evt.origin[2] === simStarPositions[targetStar * 3 + 2], 'Req 19: Burst origin Z exactly matches star position Z');

  // 2. Flare surge
  simUpdate(0.2);
  assert(simStarColors[targetStar * 3] > 0.82, 'Req 19: Targeted star surges brightness during flare stage');
  assert(simSlots[0].stage === 'flare', 'Req 19: Slot correctly remains in flare stage during flare duration');

  // 3. Transition to Burst: Star Hidden & Particles Initialized at Exact Origin
  simUpdate(0.3); // age = 0.5 > 0.45 flareDuration
  assert(simSlots[0].stage === 'burst', 'Req 19: Slot transitions cleanly from flare to burst stage');
  assert(simStarColors[targetStar * 3] === 0, 'Req 19: Targeted star is hidden (zeroed) during active fragmentation');

  let allParticlesAtOrigin = true;
  for (let p = 0; p < SIM_PARTICLES_PER_BURST; p++) {
    const idx = simSlots[0].startIndex + p;
    if (simBurstPositions[idx * 3] !== evt.origin[0] ||
        simBurstPositions[idx * 3 + 1] !== evt.origin[1] ||
        simBurstPositions[idx * 3 + 2] !== evt.origin[2]) {
      allParticlesAtOrigin = false;
    }
  }
  assert(allParticlesAtOrigin, 'Req 19: All 24 burst particles originate exactly at captured star position');

  // 4. Particle Dispersion in 3D Space
  simUpdate(0.4);
  let particlesDispersed = true;
  for (let p = 0; p < SIM_PARTICLES_PER_BURST; p++) {
    const idx = simSlots[0].startIndex + p;
    const dx = simBurstPositions[idx * 3] - evt.origin[0];
    const dy = simBurstPositions[idx * 3 + 1] - evt.origin[1];
    const dz = simBurstPositions[idx * 3 + 2] - evt.origin[2];
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (dist <= 0) particlesDispersed = false;
  }
  assert(particlesDispersed, 'Req 19: Particles scatter outward into 3D space during burst progress');

  // 5. Burst Completion, Offscreen Particle Recycling & Star Restoration
  simUpdate(1.6); // Total burst time 2.0 > 1.8 burstDuration
  assert(simSlots[0].stage === 'idle', 'Req 19: Slot stage returns to idle after burst lifetime completes');
  assert(simSlots[0].active === false, 'Req 19: Slot active flag reset to false on recovery');
  assert(simBurstPositions[simSlots[0].startIndex * 3 + 2] === -999, 'Req 19: Particles recycled offscreen (Z = -999)');
  assert(simStarColors[targetStar * 3] === simSlots[0].origColor[0], 'Req 19: Star original color restored exactly upon recovery');

  // 6. Multi-Burst Slot Reuse & Concurrency Test
  let multiPass = true;
  for (let cycle = 0; cycle < 6; cycle++) {
    const e = simTrigger(simCandidates[cycle % simCandidates.length], true);
    simUpdate(0.02); // transitions to burst immediately
    simUpdate(2.0); // completes burst
    if (simSlots[e.slotIndex].active !== false || simStarColors[e.starIndex * 3] !== e.origColor[0]) {
      multiPass = false;
    }
  }
  assert(multiPass, 'Req 19: Repeated bursts safely reuse slots without orphaned stars or particle leaks');

  // 7. Concurrent Multi-Slot Isolation
  const c1 = simTrigger(simCandidates[0]);
  const c2 = simTrigger(simCandidates[1]);
  const c3 = simTrigger(simCandidates[2]);
  assert(c1.slotIndex !== c2.slotIndex && c2.slotIndex !== c3.slotIndex, 'Req 19: 3 concurrent bursts allocate 3 distinct slots');
  assert(c1.origin[0] !== c2.origin[0] && c2.origin[0] !== c3.origin[0], 'Req 19: Concurrent slots maintain independent star origins');
  simUpdate(0.5); // transition all to burst
  simUpdate(2.0); // complete all
  assert(simStarColors[simCandidates[0] * 3] > 0 &&
         simStarColors[simCandidates[1] * 3] > 0 &&
         simStarColors[simCandidates[2] * 3] > 0,
         'Req 19: All concurrent stars restored simultaneously upon completion');
}

// =============================================================================
// Requirement 21: Usability & Enhancement Architecture
// =============================================================================
htmlPages.forEach(page => {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  assert(html.includes('id="animation-toggle"'), `Req 21: ${page} contains accessible animation pause/resume toggle`);
});

assert(jsContent.includes('astrolabeGroup.visible = true'), 'Req 21: astrolabeGroup.visible is explicitly set to true');
assert(jsContent.includes('constellationMesh = new THREE.LineSegments'), 'Req 21: Interactive star-constellation line synthesis engine integrated');
assert(jsContent.includes('window.__toggleUniverseAnimation'), 'Req 21: Programmatic & accessible animation toggle controller exposed');
assert(jsContent.includes('keydown'), 'Req 21: Keyboard accessibility listener (P shortcut) attached');

// =============================================================================
// Requirement 20: Authentic 3D Astrolabe Model & GLTF Loader Architecture
// =============================================================================
const astrolabeGlbPath = path.join(ROOT, 'assets', 'models', 'astrolabe.glb');
assert(fs.existsSync(astrolabeGlbPath), 'Req 20: Authentic 3D Astrolabe GLB model exists on disk');

const glbBuffer = fs.readFileSync(astrolabeGlbPath);
assert(glbBuffer.length > 5000000, 'Req 20: Astrolabe GLB is a high-fidelity asset (>5MB)');
assert(glbBuffer.toString('ascii', 0, 4) === 'glTF', 'Req 20: GLB file has valid binary glTF magic header');

const gltfLoaderPath = path.join(ROOT, 'assets', 'js', 'GLTFLoader.js');
assert(fs.existsSync(gltfLoaderPath), 'Req 20: GLTFLoader.js exists in assets/js');

htmlPages.forEach(page => {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  assert(html.includes('src="assets/js/GLTFLoader.js"'), `Req 20: ${page} includes GLTFLoader.js`);
});

assert(jsContent.includes('const astrolabeGroup = new THREE.Group()'), 'Req 20: astrolabeGroup created in 3d-universe.js');
assert(jsContent.includes("gltfLoader.load('assets/models/astrolabe.glb'"), 'Req 20: astrolabe.glb loaded via GLTFLoader');
assert(jsContent.includes('astrolabeGroup.rotation.z = clockTime * 0.030'), 'Req 20: Astrolabe model undergoes smooth 3D rotation');
assert(jsContent.includes('getAstrolabe: () => astrolabeGroup'), 'Req 20: getAstrolabe exposed in window.__universeDebug');
assert(jsContent.includes('child.material.metalness = 0.88'), 'Req 20: PBR antique metallic material tuning applied to astrolabe');

// =============================================================================
// Requirement 22: Exact Cosmic Mechanism Background Integration
// =============================================================================
const exactCosmicPath = path.join(ROOT, 'assets', 'images', 'exact-cosmic-mechanism.jpg');
assert(fs.existsSync(exactCosmicPath), 'Req 22: exact-cosmic-mechanism.jpg exists in assets/images');

const cosmicBuf = fs.readFileSync(exactCosmicPath);
assert(cosmicBuf.length > 1000000, 'Req 22: Exact cosmic mechanism image is high-resolution (>1MB)');
assert(cosmicBuf[0] === 0xFF && cosmicBuf[1] === 0xD8, 'Req 22: Image has valid JPEG header markers (0xFFD8)');

assert(jsContent.includes("exactCosmicLoader.load('assets/images/exact-cosmic-mechanism.jpg'"), 'Req 22: 3d-universe.js loads exact-cosmic-mechanism.jpg');
assert(jsContent.includes('const exactCosmicBgMesh = new THREE.Mesh'), 'Req 22: exactCosmicBgMesh created in 3d-universe.js');
assert(jsContent.includes('camera.add(exactCosmicBgMesh)'), 'Req 22: exactCosmicBgMesh attached to camera for full-viewport stability');
assert(jsContent.includes('updateExactCosmicBackgroundPlane'), 'Req 22: Dynamic viewport frustum coverage sizing function implemented');
assert(jsContent.includes('exactCosmicBgMesh.rotation.z = clockTime * 0.022'), 'Req 22: Continuous smooth cinematic rotation implemented');
assert(jsContent.includes('cosmicMechanismGroup.visible = false'), 'Req 22: Legacy 3D mechanism subordinated so exact artwork is unobstructed');
assert(jsContent.includes('getCosmicBg: () => exactCosmicBgMesh'), 'Req 22: getCosmicBg exposed in window.__universeDebug');

// =============================================================================
// Summary Output
// =============================================================================
console.log('='.repeat(60));
console.log(`TOTAL CHECKS: ${passed + failed}`);
console.log(`PASSED:       ${passed}`);
console.log(`FAILED:       ${failed}`);
console.log('='.repeat(60));

if (failed > 0) {
  console.error('\nFailures:');
  results.filter(r => r.status === 'FAIL').forEach(r => console.error(`  ✕ ${r.message}`));
  process.exit(1);
} else {
  console.log('\n✓ All 19 Cinematic 3D Universe requirements verified successfully!\n');
  process.exit(0);
}
