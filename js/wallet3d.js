/* HEJIN procedural 3D card wallet: camel-leather panels with a generated grain, saddle-stitched thread,
   brass rivets, cards and the camel emblem. Seven parts that assemble, then open into an exploded view. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
export const lerp = (a, b, t) => a + (b - a) * t;
const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

export function createWalletScene(renderer, { base = '', dust = 700, seed = 11, tone = 0x9C5527 } = {}) {
  const rand = rng(seed); const rnd = (a, b) => a + rand() * (b - a);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  scene.environmentIntensity = 0.75;
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 11);
  const key = new THREE.DirectionalLight(0xffd9a8, 2.6); key.position.set(3, 4, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0xff9d5a, 1.6); rim.position.set(-5, 1.5, -3); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xbcc8ff, 0.35); fill.position.set(-3, -2, 4); scene.add(fill);
  scene.add(new THREE.AmbientLight(0xffffff, 0.18));
  const rig = new THREE.Group(); scene.add(rig);
  const wallet = new THREE.Group(); rig.add(wallet);

  const manager = new THREE.LoadingManager();
  const ready = new Promise((res) => { manager.onLoad = res; });
  const loader = new THREE.TextureLoader(manager);
  const camelTex = loader.load(base + 'img/camel.png'); camelTex.colorSpace = THREE.SRGBColorSpace; camelTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

  /* ---------- procedural leather grain ---------- */
  const mk = (n) => { const c = document.createElement('canvas'); c.width = c.height = n; return c; };
  const grainCanvas = () => {
    const N = 512, c = mk(N), x = c.getContext('2d');
    x.fillStyle = '#7d7d7d'; x.fillRect(0, 0, N, N);
    for (let i = 0; i < 16000; i++) { const v = Math.floor(rnd(30, 215)); x.fillStyle = `rgba(${v},${v},${v},.3)`; x.beginPath(); x.arc(rnd(0, N), rnd(0, N), rnd(1.1, 3.4), 0, 6.283); x.fill(); }
    x.globalAlpha = 0.18; x.strokeStyle = '#222'; x.lineWidth = 1.2;
    for (let i = 0; i < 70; i++) { x.beginPath(); let px = rnd(0, N), py = rnd(0, N); x.moveTo(px, py); for (let k = 0; k < 5; k++) { px += rnd(-26, 26); py += rnd(-26, 26); x.lineTo(px, py); } x.stroke(); }
    return c;
  };
  const mottleCanvas = () => {
    const N = 256, c = mk(N), x = c.getContext('2d');
    x.fillStyle = '#fff'; x.fillRect(0, 0, N, N);
    for (let i = 0; i < 90; i++) {
      const r = rnd(18, 70), bx = rnd(0, N), by = rnd(0, N), a = rnd(0.04, 0.14);
      for (const ox of [-N, 0, N]) for (const oy of [-N, 0, N]) { // draw wrapped copies so the tile is seamless
        const px = bx + ox, py = by + oy, gr = x.createRadialGradient(px, py, 0, px, py, r);
        gr.addColorStop(0, `rgba(60,30,10,${a})`); gr.addColorStop(1, 'rgba(60,30,10,0)'); x.fillStyle = gr; x.fillRect(px - r, py - r, r * 2, r * 2);
      }
    }
    return c;
  };
  const bumpTex = new THREE.CanvasTexture(grainCanvas()); bumpTex.wrapS = bumpTex.wrapT = THREE.RepeatWrapping; bumpTex.repeat.set(1.4, 1.4); bumpTex.anisotropy = 8;
  const mapTex = new THREE.CanvasTexture(mottleCanvas()); mapTex.wrapS = mapTex.wrapT = THREE.RepeatWrapping; mapTex.colorSpace = THREE.SRGBColorSpace; mapTex.repeat.set(0.7, 0.7);
  const leather = (hex, rough = 0.56) => new THREE.MeshPhysicalMaterial({ color: hex, map: mapTex, bumpMap: bumpTex, bumpScale: 1.6, roughness: rough, metalness: 0, clearcoat: 0.22, clearcoatRoughness: 0.55, sheen: 0.7, sheenRoughness: 0.5, sheenColor: new THREE.Color(0xe0a070) });
  const brass = new THREE.MeshStandardMaterial({ color: 0xd2a24f, metalness: 1, roughness: 0.28 });
  const thread = new THREE.MeshStandardMaterial({ color: 0xeadfc6, roughness: 0.8 });

  /* ---------- shapes ---------- */
  const W = 2.3, H = 1.72, R = 0.13, BY = -H / 2;
  const rr = (w, h, r, x0 = -w / 2, y0 = -h / 2) => { const s = new THREE.Shape(); s.moveTo(x0 + r, y0); s.lineTo(x0 + w - r, y0); s.quadraticCurveTo(x0 + w, y0, x0 + w, y0 + r); s.lineTo(x0 + w, y0 + h - r); s.quadraticCurveTo(x0 + w, y0 + h, x0 + w - r, y0 + h); s.lineTo(x0 + r, y0 + h); s.quadraticCurveTo(x0, y0 + h, x0, y0 + h - r); s.lineTo(x0, y0 + r); s.quadraticCurveTo(x0, y0, x0 + r, y0); return s; };
  // pocket: bottom aligned to the wallet base, scooped top edge
  const pocket = (w, h, r, scoop, sw) => {
    const x0 = -w / 2, y0 = BY, s = new THREE.Shape(); const top = y0 + h;
    s.moveTo(x0 + r, y0); s.lineTo(x0 + w - r, y0); s.quadraticCurveTo(x0 + w, y0, x0 + w, y0 + r);
    s.lineTo(x0 + w, top - r); s.quadraticCurveTo(x0 + w, top, x0 + w - r, top);
    s.lineTo(sw, top); s.quadraticCurveTo(0.0, top - scoop * 2, -sw, top);
    s.lineTo(x0 + r, top); s.quadraticCurveTo(x0, top, x0, top - r); s.lineTo(x0, y0 + r); s.quadraticCurveTo(x0, y0, x0 + r, y0); return s;
  };
  const ext = (shape, depth, bevel = 0.018) => new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel * 0.9, bevelSegments: 3, curveSegments: 28 });

  const mats = { shell: leather(0x4e2c1a), mid: leather(0x7A4220), front: leather(tone) };
  const shell = new THREE.Mesh(ext(rr(W, H, R), 0.05), mats.shell);
  const middle = new THREE.Mesh(ext(pocket(W - 0.04, 1.24, R * 0.9, 0.14, 0.55), 0.03), mats.mid);
  const front = new THREE.Mesh(ext(pocket(W - 0.04, 0.96, R * 0.9, 0.16, 0.6), 0.034), mats.front);

  /* cards */
  const cardCanvas = (kind) => {
    const c = mk(512), x = c.getContext('2d'); c.height = 324; x.canvas.height = 324;
    const r = 28, w = 512, h = 324; x.beginPath(); x.moveTo(r, 0); x.arcTo(w, 0, w, h, r); x.arcTo(w, h, 0, h, r); x.arcTo(0, h, 0, 0, r); x.arcTo(0, 0, w, 0, r); x.closePath(); x.clip();
    if (kind === 0) { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#efe5d2'); g.addColorStop(1, '#d9c9aa'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = '#b08a4a'; x.fillRect(46, 96, 78, 58); x.fillStyle = 'rgba(60,40,20,.55)'; for (let i = 0; i < 4; i++) x.fillRect(46, 218 + i * 0, 220 - i * 0, 7); x.fillRect(46, 232, 150, 7); x.fillStyle = 'rgba(60,40,20,.25)'; x.fillRect(46, 250, 300, 6); }
    else { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#244636'); g.addColorStop(1, '#112219'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.strokeStyle = '#c9a35a'; x.lineWidth = 3; x.strokeRect(20, 20, w - 40, h - 40); x.fillStyle = '#c9a35a'; x.fillRect(46, 96, 78, 58); x.fillRect(46, 232, 130, 6); x.globalAlpha = 0.5; x.fillRect(46, 250, 210, 5); }
    return new THREE.CanvasTexture(c);
  };
  const cardGeo = new THREE.ExtrudeGeometry(rr(1.5, 0.95, 0.07), { depth: 0.012, bevelEnabled: false, curveSegments: 16 });
  const mkCard = (kind) => {
    const t = cardCanvas(kind); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.repeat.set(1 / 1.5, 1 / 0.95); t.offset.set(0.5, 0.5);
    const g = new THREE.Group();
    const body = new THREE.Mesh(cardGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, map: t, roughness: 0.42 }));
    g.add(body); return g;
  };
  const cards = new THREE.Group();
  const c0 = mkCard(0), c1 = mkCard(1);
  c0.position.set(-0.16, 0.18, 0); c0.rotation.z = 0.06; c1.position.set(0.14, 0.12, 0.02); c1.rotation.z = -0.045;
  cards.add(c0, c1);

  /* stitching: small thread dashes following the inset outline of the front pocket */
  const stitchPts = (() => {
    const s = pocket(W - 0.04 - 0.2, 0.96 - 0.2, R * 0.6, 0.15, 0.6); // inset outline
    s.autoClose = true; const pts = s.getSpacedPoints(420); const out = [];
    let acc = 0; const step = 0.1; let last = pts[0];
    for (let i = 1; i < pts.length; i++) { acc += pts[i].distanceTo(pts[i - 1]); if (acc >= step) { acc = 0; const a = pts[i - 1], b = pts[Math.min(i + 1, pts.length - 1)]; out.push({ x: pts[i].x, y: pts[i].y + 0.1 * 0 + 0.0, a: Math.atan2(b.y - a.y, b.x - a.x) }); } }
    return out;
  })();
  // the inset shape is centred with its own bottom at BY, re-seat it into the front pocket
  const dash = new THREE.CapsuleGeometry(0.0085, 0.052, 3, 8); dash.rotateZ(Math.PI / 2);
  const stitches = new THREE.InstancedMesh(dash, thread, stitchPts.length);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), ps = new THREE.Vector3();
  const setStitch = (draw) => {
    const n = stitchPts.length;
    stitchPts.forEach((s, i) => {
      const f = smooth(i / n * 0.7, i / n * 0.7 + 0.3, draw);
      q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), s.a); sc.set(Math.max(0.001, f), Math.max(0.001, f), Math.max(0.001, f));
      ps.set(s.x, s.y + 0.1, 0); m4.compose(ps, q, sc); stitches.setMatrixAt(i, m4);
    });
    stitches.instanceMatrix.needsUpdate = true;
  };
  setStitch(1);
  const stitchGroup = new THREE.Group(); stitchGroup.add(stitches);

  /* rivets */
  const rivets = new THREE.Group();
  [[-0.96, 0.03], [0.96, 0.03]].forEach(([x, y]) => {
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.07, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2), brass); head.rotation.x = Math.PI / 2; head.scale.z = 0.7; head.position.set(x, y, 0.02);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.012, 10, 32), brass); ring.position.set(x, y, 0.004);
    rivets.add(head, ring);
  });

  /* camel emblem */
  const SW = 0.78, SH = SW * (678 / 1109);
  const stampMat = new THREE.MeshStandardMaterial({ color: 0x2a150a, alphaMap: camelTex, transparent: true, opacity: 0.86, roughness: 0.7, emissive: new THREE.Color(0xff6a1a), emissiveIntensity: 0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
  const stamp = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), stampMat); stamp.position.set(0.55, -0.37, 0);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xff7a22, alphaMap: camelTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(SW * 1.06, SH * 1.06), glowMat); glow.position.set(0.55, -0.37, 0.004);
  const stampG = new THREE.Group(); stampG.add(stamp, glow);

  /* parts, back → front. z0: assembled, zE: exploded, ey: extra rise when exploded */
  const place = (o, z) => { o.position.z = z; return o; };
  const parts = [
    { o: stampG, z0: 0.174, zE: 1.95, ey: 0, label: 'L1', a: [0.55, -0.37] },
    { o: stitchGroup, z0: 0.168, zE: 1.55, ey: 0, label: 'L2', a: [-0.9, -0.74] },
    { o: rivets, z0: 0.15, zE: 1.2, ey: 0, label: 'L3', a: [0.96, 0.03] },
    { o: front, z0: 0.105, zE: 0.82, ey: 0, label: 'L4', a: [-0.4, -0.5] },
    { o: cards, z0: 0.05, zE: 0.42, ey: 0.8, label: 'L5', a: [0.14, 0.45] },
    { o: middle, z0: 0.055, zE: 0.02, ey: 0, label: 'L6', a: [0.5, -0.2] },
    { o: shell, z0: 0.0, zE: -0.75, ey: 0, label: 'L7', a: [-0.8, 0.7] },
  ];
  // shell sits furthest back; give cards a hair of clearance in the assembled state
  parts[4].z0 = 0.045; parts[5].z0 = 0.075; parts[3].z0 = 0.11; parts[6].z0 = -0.04;
  parts.forEach((p, i) => {
    wallet.add(p.o); p.o.renderOrder = i;
    p.scatter = new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-0.6, 1)).normalize().multiplyScalar(rnd(5, 8));
    p.spin = new THREE.Vector3(rnd(-1.4, 1.4), rnd(-1.4, 1.4), rnd(-2, 2));
  });
  // lift the stitch group so its dashes sit on the pocket face (they were generated in pocket coordinates)
  const dispose = [];

  /* warm dust */
  const pos = new Float32Array(dust * 3);
  for (let i = 0; i < dust; i++) { const r = rnd(2.2, 8), th = rnd(0, 6.283), ph = Math.acos(rnd(-1, 1)); pos[i * 3] = r * Math.sin(ph) * Math.cos(th); pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7; pos[i * 3 + 2] = r * Math.cos(ph) - 2; }
  const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dot = mk(64); const dc = dot.getContext('2d'); const gr = dc.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,225,185,1)'); gr.addColorStop(0.35, 'rgba(235,160,90,.45)'); gr.addColorStop(1, 'rgba(235,160,90,0)'); dc.fillStyle = gr; dc.fillRect(0, 0, 64, 64);
  const dustPts = new THREE.Points(dustGeo, new THREE.PointsMaterial({ size: 0.06, map: new THREE.CanvasTexture(dot), transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xffd6a0 }));
  rig.add(dustPts);

  /* pose: ex 0 assembled → 1 exploded; intro 1 scattered → 0 in place */
  let lastDraw = -1;
  const pose = ({ t = 0, ex = 0, intro = 0, p = 0, spinY = 0, mx = 0, my = 0, mirror = false, tiltY = 0.62, tiltX = 0.34 }) => {
    wallet.rotation.x = lerp(0.16, tiltX, ex) + my * 0.08 + Math.sin(t * 0.6) * 0.02 * (1 - ex);
    wallet.rotation.y = lerp(-0.3, mirror ? tiltY : -tiltY, ex) + mx * 0.16 + Math.sin(t * 0.4) * 0.07 * (1 - ex) + spinY;
    wallet.rotation.z = lerp(0.0, 0.05, ex) - intro * 0.4;
    parts.forEach((pt, i) => {
      const k = clamp(intro * 1.35 - i * 0.05), e = k * k;
      pt.o.position.set(pt.scatter.x * e, pt.scatter.y * e + pt.ey * ex, lerp(pt.z0, pt.zE, ex) + pt.scatter.z * e);
      pt.o.rotation.set(pt.spin.x * e, pt.spin.y * e, pt.spin.z * e);
    });
    // stitches draw along the pocket as the pieces arrive; fully drawn after
    const draw = clamp(1.25 - intro * 1.25);
    if (Math.abs(draw - lastDraw) > 0.002) { setStitch(draw); lastDraw = draw; }
    // the camel emblem is "branded" once the wallet has come together
    const heat = Math.max(0, 1 - Math.abs(t - 3.2) / 1.5) * (1 - ex);
    stampMat.emissiveIntensity = heat * 1.1; glowMat.opacity = heat * 0.22;
    dustPts.rotation.y = t * 0.02 + p * 1.2; dustPts.material.opacity = 0.4 + ex * 0.35;
    cards.children[0].rotation.z = 0.06 + ex * 0.1; cards.children[1].rotation.z = -0.045 - ex * 0.08;
  };
  const v = new THREE.Vector3();
  const project = (Wd, Hd) => {
    scene.updateMatrixWorld();
    parts.forEach((pt) => { v.set(pt.a[0], pt.a[1], 0).applyMatrix4(pt.o.matrixWorld).project(camera); pt.sx = (v.x * 0.5 + 0.5) * Wd; pt.sy = (-v.y * 0.5 + 0.5) * Hd; });
  };
  const viewSize = () => { const vh = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)); return { vh, vw: vh * camera.aspect }; };
  return { THREE, scene, camera, rig, wallet, parts, key, ready, pose, project, viewSize, size: { W, H } };
}
