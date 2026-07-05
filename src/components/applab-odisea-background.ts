import * as THREE from "three";

/**
 * Morphing particle world for the Logiciel AppLab Odisea landing page.
 * Ported from the Claude Design "Logiciel AppLab Odisea.dc.html" artifact.
 *
 * A single additive point cloud morphs between six chapter shapes as the
 * visitor scrolls: nebula, animated wave grid, torus knot, DNA helix,
 * constellation clusters and an "LA" text mask. On top of the WebGL scene
 * the controller drives — inside the same RAF — the scroll-progress bar,
 * the chapter HUD (rail links, chip and counter), the cursor glow and the
 * manifesto word-by-word reveal.
 *
 * Returns a controller with `dispose` (tears down listeners, geometry and
 * the renderer).
 */

export interface OdiseaController {
  dispose: () => void;
}

export interface OdiseaOptions {
  /** Top scroll-progress bar; scaled on X from 0..1. */
  prog?: HTMLElement | null;
  /** Cursor glow element; translated to follow the pointer. */
  cursor?: HTMLElement | null;
  /** Chapter chip; receives "Cap. 01 — Inicio" text. */
  chapter?: HTMLElement | null;
  /** Chapter counter; receives "01 / 06" text. */
  count?: HTMLElement | null;
}

const CHAPTER_NAMES = ["Inicio", "Manifiesto", "Servicios", "Stack", "Portfolio", "Contacto"];
const CHAPTER_COLORS = [0xc16bff, 0x9e7bff, 0xd98cff, 0xb06dff, 0xe7a6ff, 0xc16bff];
const CAMERA_Z = [8, 8.8, 8.3, 8.6, 8.2, 7.3];
const BG = 0x07030f;

/** next/font registers Space Grotesk under a hashed family name; read it from the CSS var. */
function spaceGroteskFamily(): string {
  const fam = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-space-grotesk")
    .trim();
  return fam ? `${fam}, sans-serif` : '"Space Grotesk", sans-serif';
}

/** Sample "LA" glyph pixels into particle positions. */
function makeText(n: number): Float32Array {
  const arr = new Float32Array(n * 3);
  const cv = document.createElement("canvas");
  cv.width = 340;
  cv.height = 170;
  const c = cv.getContext("2d");
  const pts: [number, number][] = [];
  if (c) {
    c.fillStyle = "#fff";
    c.font = `700 128px ${spaceGroteskFamily()}`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("LA", 170, 92);
    const data = c.getImageData(0, 0, 340, 170).data;
    for (let y = 0; y < 170; y += 2) {
      for (let x = 0; x < 340; x += 2) {
        if (data[(y * 340 + x) * 4 + 3] > 120) pts.push([x, y]);
      }
    }
  }
  const rnd = (a: number) => (Math.random() * 2 - 1) * a;
  for (let i = 0; i < n; i++) {
    const p = pts.length ? pts[i % pts.length] : [170, 85];
    arr[i * 3] = ((p[0] - 170) / 170) * 4.4 + rnd(0.05);
    arr[i * 3 + 1] = (-(p[1] - 85) / 85) * 2.2 + rnd(0.05);
    arr[i * 3 + 2] = rnd(0.5);
  }
  return arr;
}

interface ShapeSet {
  shapes: Float32Array[];
  /** Flattened (x, z) pairs used to re-animate the wave grid every frame. */
  gridXZ: Float32Array;
}

function makeShapes(n: number): ShapeSet {
  const mk = () => new Float32Array(n * 3);
  const rnd = (a: number) => (Math.random() * 2 - 1) * a;

  // 0 — nebula
  const neb = mk();
  for (let i = 0; i < n; i++) {
    const r = 2.8 * Math.cbrt(Math.random());
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    neb[i * 3] = r * Math.sin(ph) * Math.cos(th) * 1.3;
    neb[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.85;
    neb[i * 3 + 2] = r * Math.cos(ph) * 0.75;
  }

  // 1 — wave grid (base pose; animated per-frame from gridXZ)
  const wav = mk();
  const gridXZ = new Float32Array(n * 2);
  const side = Math.ceil(Math.sqrt(n));
  for (let i = 0; i < n; i++) {
    const gx = i % side;
    const gz = Math.floor(i / side);
    const x = (gx / (side - 1) - 0.5) * 10;
    const z = (gz / (side - 1) - 0.5) * 6;
    gridXZ[i * 2] = x;
    gridXZ[i * 2 + 1] = z;
    wav[i * 3] = x;
    wav[i * 3 + 1] = Math.sin(x * 1.15) * 0.55 + Math.cos(z * 1.6) * 0.45 - 0.4;
    wav[i * 3 + 2] = z * 0.92;
  }

  // 2 — torus knot (2,3)
  const knot = mk();
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = Math.cos(3 * t) + 2;
    knot[i * 3] = r * Math.cos(2 * t) * 0.86 + rnd(0.2);
    knot[i * 3 + 1] = r * Math.sin(2 * t) * 0.62 + rnd(0.2);
    knot[i * 3 + 2] = -Math.sin(3 * t) * 0.95 + rnd(0.2);
  }

  // 3 — DNA helix
  const hel = mk();
  for (let i = 0; i < n; i++) {
    const s = i / n;
    const t = s * Math.PI * 7;
    const y = (s - 0.5) * 6.6;
    const r = 1.5;
    if (i % 9 === 0) {
      const rt = Math.random() * 2 - 1;
      hel[i * 3] = Math.cos(t) * r * rt;
      hel[i * 3 + 1] = y;
      hel[i * 3 + 2] = Math.sin(t) * r * rt;
    } else {
      const strand = i % 2 ? 1 : -1;
      hel[i * 3] = Math.cos(t) * r * strand + rnd(0.07);
      hel[i * 3 + 1] = y + rnd(0.07);
      hel[i * 3 + 2] = Math.sin(t) * r * strand + rnd(0.07);
    }
  }

  // 4 — constellation clusters
  const con = mk();
  const CL = 13;
  const centers: [number, number, number][] = [];
  for (let c = 0; c < CL; c++) centers.push([rnd(3.8), rnd(2.2), rnd(1.7)]);
  for (let i = 0; i < n; i++) {
    const c = centers[i % CL];
    con[i * 3] = c[0] + rnd(0.55);
    con[i * 3 + 1] = c[1] + rnd(0.5);
    con[i * 3 + 2] = c[2] + rnd(0.5);
  }

  // 5 — "LA" text mask
  const txt = makeText(n);

  return { shapes: [neb, wav, knot, hel, con, txt], gridXZ };
}

export function createOdiseaBackground(
  canvas: HTMLCanvasElement,
  root: HTMLElement,
  opts: OdiseaOptions = {},
): OdiseaController {
  const { prog = null, cursor = null, chapter = null, count = null } = opts;

  const reducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const energy = reducedMotion ? 0.12 : 1;

  const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-chapter]"));
  const rail = Array.from(root.querySelectorAll<HTMLElement>("[data-rail]"));
  const words = Array.from(root.querySelectorAll<HTMLElement>("[data-w]"));
  const mani = sections[1] ?? null;
  const wordOn = words.map(() => false);

  let mx = 0;
  let my = 0;
  let cx = 0;
  let cy = 0;
  let idx = -1;
  let raf = 0;
  let disposed = false;

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
  scene.fog = new THREE.FogExp2(BG, 0.05);

  const camera = new THREE.PerspectiveCamera(58, w / h, 0.1, 100);
  camera.position.set(0, 0, 8);

  const N = 6200;
  const { shapes, gridXZ } = makeShapes(N);
  // Re-sample the "LA" mask once webfonts are ready (canvas may have used a fallback).
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      if (!disposed) shapes[5] = makeText(N);
    });
  }
  const scratch = new Float32Array(N * 3);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(shapes[0]), 3));
  const material = new THREE.PointsMaterial({
    color: CHAPTER_COLORS[0],
    size: 0.045,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // far stars
  const SN = 700;
  const starPos = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) {
    const r = 16 + Math.random() * 28;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    starPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    starPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    starPos[i * 3 + 2] = r * Math.cos(ph);
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const starMaterial = new THREE.PointsMaterial({
    color: 0x9e06e4,
    size: 0.07,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
    depthWrite: false,
  });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // soft halo sprite behind the cloud
  const haloCanvas = document.createElement("canvas");
  haloCanvas.width = haloCanvas.height = 256;
  const hctx = haloCanvas.getContext("2d");
  if (hctx) {
    const grad = hctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(255,255,255,.9)");
    grad.addColorStop(0.22, "rgba(255,255,255,.3)");
    grad.addColorStop(0.55, "rgba(255,255,255,.08)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    hctx.fillStyle = grad;
    hctx.fillRect(0, 0, 256, 256);
  }
  const haloTexture = new THREE.CanvasTexture(haloCanvas);
  const haloMaterial = new THREE.SpriteMaterial({
    map: haloTexture,
    color: 0x9e06e4,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const halo = new THREE.Sprite(haloMaterial);
  halo.scale.set(9, 9, 1);
  halo.position.set(0, 0, -2.4);
  scene.add(halo);

  const color = new THREE.Color(CHAPTER_COLORS[0]);
  const tmpColor = new THREE.Color();
  const clock = new THREE.Clock();

  const onChapter = (i: number) => {
    idx = i;
    if (chapter) chapter.textContent = `Cap. 0${i + 1} — ${CHAPTER_NAMES[i]}`;
    if (count) count.textContent = `0${i + 1} / 06`;
    rail.forEach((el, j) => {
      el.style.color = j === i ? "var(--accent)" : "rgba(255,255,255,.32)";
      el.style.textShadow = j === i ? "0 0 12px var(--glow)" : "none";
    });
  };

  const onMove = (e: MouseEvent) => {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = (e.clientY / window.innerHeight) * 2 - 1;
    if (cursor) cursor.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
  };

  const onResize = () => {
    const iw = window.innerWidth;
    const ih = window.innerHeight;
    camera.aspect = iw / ih;
    camera.updateProjectionMatrix();
    renderer.setSize(iw, ih, false);
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("resize", onResize);

  const animate = () => {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const k = energy;
    const vh = window.innerHeight || 800;

    // chapter detection
    let next = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top < vh * 0.5) next = i;
    }
    if (next !== idx) onChapter(next);

    // scroll progress
    const doc = document.documentElement;
    const max = doc.scrollHeight - vh || 1;
    const sc = window.scrollY || doc.scrollTop || 0;
    if (prog) prog.style.transform = `scaleX(${Math.min(1, Math.max(0, sc / max))})`;

    cx += (mx - cx) * 0.05;
    cy += (my - cy) * 0.05;

    // morph toward the current chapter shape
    const attr = geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    let src = shapes[next];
    if (next === 1 && !reducedMotion) {
      for (let i = 0; i < N; i++) {
        const x = gridXZ[i * 2];
        const z = gridXZ[i * 2 + 1];
        scratch[i * 3] = x;
        scratch[i * 3 + 1] =
          Math.sin(x * 1.15 + t * 1.5 * k) * 0.55 + Math.cos(z * 1.6 + t * 1.1 * k) * 0.45 - 0.4;
        scratch[i * 3 + 2] = z * 0.92;
      }
      src = scratch;
    }
    const lerp = reducedMotion ? 0.12 : 0.05;
    for (let i = 0; i < arr.length; i++) arr[i] += (src[i] - arr[i]) * lerp;
    attr.needsUpdate = true;

    // group motion
    const spin = next === 1 ? 0 : t * 0.06 * k;
    points.rotation.y += (spin + cx * 0.38 - points.rotation.y) * 0.05;
    const tiltX = (next === 1 ? -0.42 : next === 3 ? 0.14 : 0) + cy * 0.22;
    points.rotation.x += (tiltX - points.rotation.x) * 0.05;
    const ty = next === 1 ? -0.5 : 0;
    points.position.y += (ty - points.position.y) * 0.04;
    const bs = 1 + Math.sin(t * 0.9) * 0.02 * k;
    points.scale.set(bs, bs, bs);

    // color per chapter
    tmpColor.setHex(CHAPTER_COLORS[next]);
    color.lerp(tmpColor, 0.04);
    material.color.copy(color);
    haloMaterial.color.copy(color);

    // camera
    const tz = CAMERA_Z[next] ?? 8;
    camera.position.z += (tz - camera.position.z) * 0.04;
    camera.position.x = cx * 0.7;
    camera.position.y = -cy * 0.5;
    camera.lookAt(0, 0, 0);

    stars.rotation.y = t * 0.015 * k;
    const hs = 9 + Math.sin(t * 1.1) * 0.4 * k;
    halo.scale.set(hs, hs, 1);

    // manifesto word reveal
    if (mani && words.length) {
      const r = mani.getBoundingClientRect();
      const pm = Math.min(1, Math.max(0, (vh * 0.72 - r.top) / (r.height * 0.62)));
      const visible = Math.floor(pm * words.length * 1.12);
      for (let i = 0; i < words.length; i++) {
        const on = i < visible;
        if (wordOn[i] !== on) {
          wordOn[i] = on;
          const el = words[i];
          el.style.opacity = on ? "1" : ".13";
          el.style.transform = on ? "none" : "translateY(14px)";
          el.style.filter = on ? "none" : "blur(6px)";
        }
      }
    }

    renderer.render(scene, camera);
  };

  onChapter(0);
  animate();

  return {
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      haloTexture.dispose();
      haloMaterial.dispose();
      renderer.dispose();
    },
  };
}
