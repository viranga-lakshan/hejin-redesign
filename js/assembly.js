/* 3D hero: the wallet (wallet3d.js) assembles on load; on scroll it opens into a labelled exploded view and closes again. */
import * as THREE from 'three';
import { createWalletScene, clamp, smooth } from './wallet3d.js';

const A = window.APP;
const gsap = window.gsap;
const ST = window.ScrollTrigger;
const root = document.documentElement;
const pinEl = document.querySelector('[data-make-pin]');
const canvas = document.querySelector('[data-make-canvas]');
const labelsEl = document.querySelector('[data-make-labels]');
const phases = [...document.querySelectorAll('[data-phase]')];
const meterEl = document.querySelector('[data-meter]');
const barEl = document.querySelector('[data-meter-bar]');
const meterBox = document.querySelector('.make-meter');
const ghostAr = document.querySelector('[data-ghost-ar]');
const ghostEn = document.querySelector('[data-ghost-en]');
const isAr = A.lang === 'ar';
const setPhase = (i) => phases.forEach((ph) => ph.classList.toggle('on', +ph.dataset.phase === i));
const fallback = () => root.classList.add('no-webgl');

function main() {
  if (A.reduce || !gsap || !ST) { fallback(); return; }
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); } catch (e) { fallback(); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  const W3 = createWalletScene(renderer, { dust: window.innerWidth < 700 ? 320 : 700 });
  const { scene, camera, rig, parts, key } = W3;
  W3.ready.then(() => root.classList.add('make-ready'));

  /* callout labels + leader lines */
  const SVGNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(SVGNS, 'svg'); svg.setAttribute('class', 'mk-lines'); labelsEl.append(svg);
  parts.forEach((p) => {
    p.el = document.createElement('div'); p.el.className = 'mk-label';
    p.el.innerHTML = `<span>${A.t(p.label)}<small>${A.t(p.label + 's')}</small></span>`;
    labelsEl.appendChild(p.el);
    p.line = document.createElementNS(SVGNS, 'polyline'); p.dot = document.createElementNS(SVGNS, 'circle');
    p.dot.setAttribute('r', 3.5); svg.append(p.line, p.dot);
  });

  /* layout */
  const st = { p: 0, intro: 1, mx: 0, my: 0, tmx: 0, tmy: 0 };
  let mobile = false, base = { x: 0, y: 0, s: 1, vw: 1 };
  const { W, H } = W3.size;
  const layout = () => {
    const w = pinEl.clientWidth, h = pinEl.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    const { vh, vw } = W3.viewSize();
    mobile = w < 860;
    if (mobile) base = { vw, x: 0, y: vh * 0.2, s: Math.min((vw * 0.8) / W, (vh * 0.3) / H) };
    else base = { vw, x: vw * (isAr ? -0.13 : 0.13), y: -vh * 0.02, s: Math.min((vh * 0.56) / H, (vw * 0.4) / W) };
    labelsEl.style.display = mobile ? 'none' : '';
  };
  layout();
  window.addEventListener('resize', layout);
  window.addEventListener('pointermove', (e) => { st.tmx = (e.clientX / window.innerWidth - 0.5) * 2; st.tmy = (e.clientY / window.innerHeight - 0.5) * 2; });

  /* intro: parts fly in and assemble */
  gsap.to(st, { intro: 0, duration: 3, ease: 'expo.out', delay: 0.25 });

  /* scroll: explode and re-assemble */
  ST.create({
    trigger: '.make', start: 'top top', end: () => '+=' + window.innerHeight * 3.2, pin: pinEl, scrub: true, refreshPriority: 1,
    onUpdate: (self) => { st.p = self.progress; },
  });
  ST.sort(); ST.refresh();

  let active = true;
  new IntersectionObserver(([en]) => { active = en.isIntersecting; }, { threshold: 0 }).observe(pinEl);
  let phase = 0;
  const clock = new THREE.Clock();
  const frame = () => {
    if (!active) return;
    const t = clock.getElapsedTime(), p = st.p;
    const ex = smooth(0.06, 0.4, p) * (1 - smooth(0.6, 0.86, p));
    const outro = smooth(0.84, 1, p);
    st.mx += (st.tmx - st.mx) * 0.05; st.my += (st.tmy - st.my) * 0.05;

    rig.position.set(base.x + (mobile ? 0 : (isAr ? -1 : 1) * base.vw * 0.03 * ex), base.y + (mobile ? 0.2 * ex : 0), 0);
    rig.scale.setScalar(base.s * (1 - (mobile ? 0.2 : 0.2) * ex));
    W3.pose({ t, ex, intro: st.intro, p, spinY: outro ? Math.sin(outro * Math.PI) * 0.3 : 0, mx: st.mx, my: st.my, mirror: isAr });
    key.position.set(3 + Math.sin(t * 0.3) * 2 - outro * 6, 4, 5);
    ghostAr.style.transform = `translate3d(${(isAr ? -1 : 1) * p * -6}vw,${p * 4}vh,0)`; ghostEn.style.transform = `translate3d(${(isAr ? 1 : -1) * p * -8}vw,0,0)`;

    if (!mobile) {
      const Wd = pinEl.clientWidth, Hd = pinEl.clientHeight;
      W3.project(Wd, Hd);
      const colX = isAr ? Wd * 0.2 : Wd * 0.8;
      const order = parts.slice().sort((a, b) => a.sy - b.sy);
      order.forEach((pt, k) => {
        const i = parts.indexOf(pt);
        const o = clamp((ex - 0.5 - i * 0.04) / 0.25);
        const ly = Hd * (0.18 + (0.62 * k) / (order.length - 1));
        const elbow = colX + (isAr ? 28 : -28), end = colX + (isAr ? 10 : -10);
        pt.line.setAttribute('points', `${pt.sx},${pt.sy} ${elbow},${ly} ${end},${ly}`);
        pt.line.style.opacity = o * 0.85; pt.dot.style.opacity = o;
        pt.line.style.strokeDasharray = '1000'; pt.line.style.strokeDashoffset = String(1000 * (1 - o));
        pt.dot.setAttribute('cx', pt.sx); pt.dot.setAttribute('cy', pt.sy);
        pt.el.style.opacity = o;
        const w = isAr ? (pt.w || (pt.w = pt.el.offsetWidth)) : 0;
        pt.el.style.transform = `translate(${colX - w + (1 - o) * (isAr ? -14 : 14)}px,${ly - 9}px)`;
      });
    }

    const ph = p < 0.1 ? 0 : p < 0.66 ? 1 : 2;
    if (ph !== phase) { phase = ph; setPhase(ph); }
    const assembled = Math.round((1 - ex) * 100);
    meterEl.textContent = assembled + '%';
    barEl.style.transform = `scaleX(${1 - ex})`;
    meterBox.style.opacity = p > 0.03 ? 1 : 0;
    renderer.render(scene, camera);
  };
  gsap.ticker.add(frame);
}

main();
