import * as THREE from "three";

/**
 * Animated WebGL background for the Logiciel AppLab Immersive landing page.
 * Ported from the Claude Design "Logiciel AppLab Immersive.dc.html" artifact.
 *
 * Three switchable scenes drive a different hero object:
 *   0 — Núcleo (icosahedron core + orbiting shards)
 *   1 — Constelación (point cloud + proximity links)
 *   2 — Aurora (noise-displaced sphere)
 *
 * A cursor-reactive particle cloud and a dramatic scroll-driven camera dolly
 * sit on top of a slowly rotating starfield. The controller also drives the
 * top scroll-progress bar and reports a smoothed FPS reading to the HUD.
 *
 * Returns a controller with `setMode` (palette + visible group) and
 * `dispose` (tears down listeners and the renderer).
 */

export interface ImmersiveController {
  setMode: (mode: number) => void;
  dispose: () => void;
}

export interface ImmersiveOptions {
  /** Top scroll-progress bar; scaled on X from 0..1. */
  prog?: HTMLElement | null;
  /** HUD FPS readout; receives "<n> FPS" text. */
  fps?: HTMLElement | null;
  /** Cursor glow element; translated to follow the pointer. */
  cursor?: HTMLElement | null;
}

interface Palette {
  star: number;
  a: number;
  b: number;
  light: number;
  emissive: number;
}

const PALETTES: Palette[] = [
  { star: 0x49d4ff, a: 0x7fe9ff, b: 0x1fb6ff, light: 0x88ccff, emissive: 0x0a3a55 },
  { star: 0x6fb6ff, a: 0x66e8ff, b: 0x4f9bff, light: 0x8fb8ff, emissive: 0x12305a },
  { star: 0xbfe4ff, a: 0xeaf6ff, b: 0x9fe4ff, light: 0xdff0ff, emissive: 0x274055 },
];

export function createImmersiveBackground(
  canvas: HTMLCanvasElement,
  root: HTMLElement,
  opts: ImmersiveOptions = {},
): ImmersiveController {
  const { prog = null, fps = null, cursor = null } = opts;

  const reducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let mode = 0;
  let mx = 0;
  let my = 0;
  let cx = 0;
  let cy = 0;
  let tScroll = 0;
  let raf = 0;

  let frames = 0;
  let fpsT = 0;

  const w = window.innerWidth;
  const h = window.innerHeight;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setSize(w, h, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(58, w / h, 0.1, 100);
  camera.position.set(0, 0, 6.4);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const pl = new THREE.PointLight(0x88ccff, 2.4, 60);
  pl.position.set(5, 6, 6);
  scene.add(pl);
  const pl2 = new THREE.PointLight(0x3a66ff, 1.1, 60);
  pl2.position.set(-6, -4, 2);
  scene.add(pl2);

  // ---- starfield ----
  const N = 1400;
  const sp = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 14 + Math.random() * 30;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    sp[i * 3] = r * Math.sin(ph) * Math.cos(th);
    sp[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    sp[i * 3 + 2] = r * Math.cos(ph);
  }
  const sg = new THREE.BufferGeometry();
  sg.setAttribute("position", new THREE.BufferAttribute(sp, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0x49d4ff,
    size: 0.07,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    depthWrite: false,
  });
  const stars = new THREE.Points(sg, starMat);
  scene.add(stars);

  // ---- interactive cursor-reactive particle cloud ----
  const M = 460;
  const ip = new Float32Array(M * 3);
  const iBase = new Float32Array(M * 3);
  for (let i = 0; i < M; i++) {
    const x = (Math.random() * 2 - 1) * 7;
    const y = (Math.random() * 2 - 1) * 4.2;
    const z = (Math.random() * 2 - 1) * 2.4 + 0.6;
    ip[i * 3] = x;
    ip[i * 3 + 1] = y;
    ip[i * 3 + 2] = z;
    iBase[i * 3] = x;
    iBase[i * 3 + 1] = y;
    iBase[i * 3 + 2] = z;
  }
  const ig = new THREE.BufferGeometry();
  ig.setAttribute("position", new THREE.BufferAttribute(ip, 3));
  const iMat = new THREE.PointsMaterial({
    color: 0x7fe9ff,
    size: 0.055,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const iPts = new THREE.Points(ig, iMat);
  scene.add(iPts);

  // ---- CORE (mode 0) ----
  const coreGroup = new THREE.Group();
  coreGroup.position.x = 1.35;
  const ico = new THREE.IcosahedronGeometry(1.65, 1);
  const wireMat = new THREE.LineBasicMaterial({ color: 0x7fe9ff, transparent: true, opacity: 0.5 });
  coreGroup.add(new THREE.LineSegments(new THREE.WireframeGeometry(ico), wireMat));
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x1fb6ff,
    emissive: 0x1fb6ff,
    emissiveIntensity: 0.5,
    metalness: 0.7,
    roughness: 0.18,
    flatShading: true,
  });
  const innerMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.98, 0), innerMat);
  coreGroup.add(innerMesh);
  const shardMat = new THREE.MeshStandardMaterial({
    color: 0xbfeaff,
    emissive: 0x66ddff,
    emissiveIntensity: 0.5,
    metalness: 0.6,
    roughness: 0.3,
  });
  const shards: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.17, 0), shardMat);
    m.userData.a = i * ((Math.PI * 2) / 3);
    coreGroup.add(m);
    shards.push(m);
  }
  scene.add(coreGroup);

  // ---- CONSTELLATION (mode 1) ----
  const constGroup = new THREE.Group();
  constGroup.position.x = 1.3;
  constGroup.visible = false;
  const NN = 66;
  const np = new Float32Array(NN * 3);
  const pts: number[][] = [];
  for (let i = 0; i < NN; i++) {
    const r = Math.cbrt(Math.random()) * 2.5;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(ph) * Math.cos(th);
    const y = r * Math.sin(ph) * Math.sin(th);
    const z = r * Math.cos(ph);
    np[i * 3] = x;
    np[i * 3 + 1] = y;
    np[i * 3 + 2] = z;
    pts.push([x, y, z]);
  }
  const ng = new THREE.BufferGeometry();
  ng.setAttribute("position", new THREE.BufferAttribute(np, 3));
  const nodeMat = new THREE.PointsMaterial({
    color: 0x66e8ff,
    size: 0.15,
    transparent: true,
    opacity: 0.95,
    sizeAttenuation: true,
    depthWrite: false,
  });
  constGroup.add(new THREE.Points(ng, nodeMat));
  const segs: number[] = [];
  for (let i = 0; i < NN; i++) {
    for (let j = i + 1; j < NN; j++) {
      const a = pts[i];
      const b = pts[j];
      const dx = a[0] - b[0];
      const dy = a[1] - b[1];
      const dz = a[2] - b[2];
      if (dx * dx + dy * dy + dz * dz < 1.25) {
        segs.push(a[0], a[1], a[2], b[0], b[1], b[2]);
      }
    }
  }
  const lg = new THREE.BufferGeometry();
  lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(segs), 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0x8fb8ff, transparent: true, opacity: 0.26 });
  constGroup.add(new THREE.LineSegments(lg, lineMat));
  scene.add(constGroup);

  // ---- AURORA (mode 2) ----
  const ageo = new THREE.IcosahedronGeometry(1.85, 4);
  const auroraOrig = (ageo.attributes.position.array as Float32Array).slice(0);
  const auroraMat = new THREE.MeshStandardMaterial({
    color: 0xeaf6ff,
    emissive: 0x274055,
    emissiveIntensity: 0.28,
    metalness: 0.4,
    roughness: 0.22,
  });
  const auroraMesh = new THREE.Mesh(ageo, auroraMat);
  auroraMesh.position.x = 1.3;
  auroraMesh.visible = false;
  scene.add(auroraMesh);

  const clock = new THREE.Clock();

  function setMode(i: number) {
    mode = i;
    const p = PALETTES[i];
    coreGroup.visible = i === 0;
    constGroup.visible = i === 1;
    auroraMesh.visible = i === 2;
    nodeMat.color.setHex(p.a);
    lineMat.color.setHex(p.light);
    auroraMat.color.setHex(p.a);
    auroraMat.emissive.setHex(p.emissive);
    starMat.color.setHex(p.star);
    iMat.color.setHex(p.a);
    wireMat.color.setHex(p.a);
    innerMat.color.setHex(p.b);
    innerMat.emissive.setHex(p.b);
    shardMat.color.setHex(p.a);
    shardMat.emissive.setHex(p.light);
    pl.color.setHex(p.light);
    renderer.render(scene, camera);
  }

  function animate() {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const k = reducedMotion ? 0.25 : 1;

    // fps (smoothed every half second)
    frames++;
    if (t - fpsT > 0.5) {
      const value = Math.round(frames / (t - fpsT));
      frames = 0;
      fpsT = t;
      if (fps) fps.textContent = value + " FPS";
    }

    // scroll progress (eased)
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight || 1;
    const sc = window.scrollY || doc.scrollTop || 0;
    const p = Math.min(1, Math.max(0, sc / max));
    tScroll += (p - tScroll) * 0.06;
    const ps = tScroll;

    cx += (mx - cx) * 0.05;
    cy += (my - cy) * 0.05;

    camera.position.x = cx * 0.8 * k + Math.sin(ps * Math.PI) * 0.5;
    camera.position.y = -cy * 0.6 * k - ps * 1.7;
    camera.position.z = 6.4 + ps * 3.4;
    camera.lookAt(0, -ps * 1.2, 0);

    stars.rotation.y = t * 0.02 * k;

    // interactive particles (cursor repulsion + drift)
    {
      const arr = iPts.geometry.attributes.position.array as Float32Array;
      const cwx = cx * 4.4;
      const cwy = -cy * 2.7;
      for (let i = 0; i < arr.length; i += 3) {
        const bx = iBase[i];
        const by = iBase[i + 1];
        const bz = iBase[i + 2];
        const dx = bx - cwx;
        const dy = by - cwy;
        const d2 = dx * dx + dy * dy + 0.35;
        const f = Math.min(1.6, 2.4 / d2);
        const tx = bx + dx * f;
        const ty = by + dy * f;
        arr[i] += (tx - arr[i]) * 0.08;
        arr[i + 1] += (ty - arr[i + 1]) * 0.08;
        arr[i + 2] += (bz - arr[i + 2]) * 0.05;
      }
      iPts.geometry.attributes.position.needsUpdate = true;
      iPts.rotation.z = t * 0.015 * k;
    }

    if (mode === 0) {
      coreGroup.position.x = 1.35 + ps * 0.5;
      coreGroup.rotation.y = t * 0.3 * k + cx * 0.6;
      coreGroup.rotation.x = t * 0.14 * k + cy * 0.4;
      const s = 1 + Math.sin(t * 2) * 0.06;
      innerMesh.scale.setScalar(s);
      for (let i = 0; i < shards.length; i++) {
        const m = shards[i];
        const a = m.userData.a as number;
        m.position.set(
          Math.cos(t * 0.6 * k + a) * 2.15,
          Math.sin(t * 0.5 * k + a) * 0.7,
          Math.sin(t * 0.6 * k + a) * 2.15,
        );
        m.rotation.x += 0.02 * k;
        m.rotation.y += 0.015 * k;
      }
    }

    if (mode === 1) {
      constGroup.position.x = 1.3 + ps * 0.5;
      constGroup.rotation.y = t * 0.14 * k + cx * 0.5;
      constGroup.rotation.x = Math.sin(t * 0.2) * 0.15 * k + cy * 0.3;
      const s = 1 + Math.sin(t * 0.8) * 0.03;
      constGroup.scale.setScalar(s);
    }

    if (mode === 2) {
      auroraMesh.position.x = 1.3 + ps * 0.5;
      if (!reducedMotion) {
        const pos = auroraMesh.geometry.attributes.position.array as Float32Array;
        const o = auroraOrig;
        for (let i = 0; i < pos.length; i += 3) {
          const ox = o[i];
          const oy = o[i + 1];
          const oz = o[i + 2];
          const n =
            0.13 * Math.sin(ox * 2.4 + t * 1.1) +
            0.11 * Math.sin(oy * 2.7 - t * 0.9) +
            0.09 * Math.sin(oz * 2.1 + t * 1.3);
          const f = 1 + n / 1.75;
          pos[i] = ox * f;
          pos[i + 1] = oy * f;
          pos[i + 2] = oz * f;
        }
        auroraMesh.geometry.attributes.position.needsUpdate = true;
        auroraMesh.geometry.computeVertexNormals();
      }
      auroraMesh.rotation.y = t * 0.16 * k + cx * 0.4;
      auroraMesh.rotation.x = cy * 0.3;
    }

    if (prog) prog.style.transform = "scaleX(" + p + ")";

    renderer.render(scene, camera);
  }

  const onMove = (e: MouseEvent) => {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = (e.clientY / window.innerHeight) * 2 - 1;
    if (cursor) cursor.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
  };
  const onResize = () => {
    const nw = window.innerWidth;
    const nh = window.innerHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh, false);
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("resize", onResize);

  setMode(0);
  animate();

  return {
    setMode,
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      try {
        renderer.dispose();
      } catch {
        /* ignore */
      }
    },
  };
}
