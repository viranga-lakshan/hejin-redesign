/* Product page: angle-scrub gallery, specs, WhatsApp enquiry, related pieces. */
(function () {
  const A = window.APP, C = A.C, t = A.t, esc = A.esc;
  Object.assign(A.extra.en, { pd_more: 'You may also like', pd_ask: 'Ask on WhatsApp', pd_vat: 'Price includes VAT', pd_feat: 'Features', pd_hint: 'Move across to turn · click to zoom', pd_hint_m: 'Swipe to turn',
    pd_type: 'Product type', pd_mat: 'Material', pd_dim: 'Dimensions (L × W × H)', pd_h: 'Height including handle', pd_a1: 'Three-year warranty', pd_a2: 'Personalised on request', pd_a3: 'Handcrafted in Riyadh', pd_pers: 'Add a name, initials or logo', pd_home: 'Home', pd_notfound: 'This piece could not be found.' });
  Object.assign(A.extra.ar, { pd_more: 'قد يعجبك أيضاً', pd_ask: 'اسأل عبر واتساب', pd_vat: 'السعر شامل ضريبة القيمة المضافة', pd_feat: 'المزايا', pd_hint: 'حرّك المؤشر للتدوير · انقر للتكبير', pd_hint_m: 'اسحب للتدوير',
    pd_type: 'النوع', pd_mat: 'الخامة', pd_dim: 'الأبعاد (الطول × العرض × الارتفاع)', pd_h: 'الارتفاع مع المقبض', pd_a1: 'ضمان ثلاث سنوات', pd_a2: 'تخصيص عند الطلب', pd_a3: 'صناعة يدوية في الرياض', pd_pers: 'أضف اسماً أو أحرفاً أو شعاراً', pd_home: 'الرئيسية', pd_notfound: 'تعذّر العثور على هذه القطعة.' });
  A.applyLang();
  const isAr = A.lang === 'ar';
  const h = new URLSearchParams(location.search).get('h');
  const p = A.byH(h) || C[0];
  const pd = document.getElementById('pd');
  if (!p) { pd.innerHTML = `<p>${t('pd_notfound')}</p>`; return; }
  document.title = `${A.name(p)} · HEJIN هجين`;
  const specKeys = [['Product type', 'pd_type'], ['Material', 'pd_mat'], ['Dimensions (L × W × H)', 'pd_dim'], ['Height including handle', 'pd_h']];
  const matAr = { 'Camel leather': 'جلد الجمل' };
  const specs = specKeys.filter(([k]) => p.x[k]).map(([k, lk]) => `<div><dt>${t(lk)}</dt><dd ${isAr ? 'dir="ltr"' : ''}>${esc(isAr && matAr[p.x[k]] ? matAr[p.x[k]] : p.x[k])}</dd></div>`).join('');
  const frames = Array.from({ length: p.ni }, (_, i) => i);
  const wa = A.waLink(`${t('waAsk')} ${p.n} (${A.money(p.p)}) — ${location.href}`);
  pd.innerHTML = `
    <div class="gal">
      <div class="gal-main" id="galMain">
        ${frames.map((i) => `<img class="${i ? '' : 'on'}" data-f="${i}" src="${A.img(p, i, 'l')}" alt="${esc(p.n)} ${i + 1}/${p.ni}" width="1100" height="1100" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">`).join('')}
        ${p.ni > 1 ? `<span class="gal-hint">${t(matchMedia('(hover:hover)').matches ? 'pd_hint' : 'pd_hint_m')}</span>` : ''}
        <div class="gal-bar"><u id="galBar"></u></div>
      </div>
      ${p.ni > 1 ? `<div class="thumbs" id="thumbs">${frames.map((i) => `<button class="${i ? '' : 'on'}" data-f="${i}" aria-label="${i + 1}"><img src="${A.img(p, i, 's')}" alt="" width="84" height="84" loading="lazy"></button>`).join('')}</div>` : ''}
    </div>
    <div class="pi">
      <p class="crumbs"><a href="index.html">${t('pd_home')}</a> / <a href="shop.html?c=${p.c}">${t(p.c)}</a></p>
      <h1>${esc(A.name(p))}</h1>
      <span class="ar" lang="${isAr ? 'en' : 'ar'}" ${isAr ? 'style="font-family:var(--display);font-weight:300"' : ''}>${esc(A.name2(p))}</span>
      <div class="pr">${A.money(p.p)}</div><div class="vat">${t('pd_vat')}</div>
      <p class="desc" lang="en" dir="ltr" style="text-align:start">${esc(p.d)}</p>
      <div class="pbtns">
        <button class="btn block" data-add="${p.id}">${t('addBag')}</button>
        <a class="btn ghost block" style="color:var(--ink)" href="${wa}" target="_blank" rel="noopener">${A.I.wa.replace('<svg', '<svg class="ic"')} ${t('pd_ask')}</a>
      </div>
      ${p.f.length ? `<h4 style="font:600 12px var(--body);letter-spacing:.18em;text-transform:uppercase;color:var(--saddle);margin:30px 0 14px">${t('pd_feat')}</h4><ul class="feat" lang="en" dir="ltr">${p.f.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
      <dl class="specs">${specs}</dl>
      <div class="assure"><div><b>3</b>${t('pd_a1')}</div><div><b>✦</b><a href="index.html#yours">${t('pd_a2')}</a></div><div><b>◈</b>${t('pd_a3')}</div></div>
    </div>`;

  /* gallery: pointer scrub across angles, click to zoom, swipe on touch */
  const main = document.getElementById('galMain'); const imgs = [...main.querySelectorAll('img')]; const bar = document.getElementById('galBar'); const thumbs = document.getElementById('thumbs');
  let cur = 0, zoomed = false;
  const show = (i) => { i = Math.max(0, Math.min(imgs.length - 1, i)); if (i === cur) return; cur = i; imgs.forEach((im, k) => im.classList.toggle('on', k === i)); if (thumbs) [...thumbs.children].forEach((b, k) => b.classList.toggle('on', k === i)); bar.style.transform = `scaleX(${imgs.length > 1 ? i / (imgs.length - 1) : 0})`; };
  if (imgs.length > 1) {
    const hover = matchMedia('(hover:hover)').matches;
    main.addEventListener('pointermove', (e) => {
      const r = main.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      if (zoomed) { main.style.setProperty('--zx', x * 100 + '%'); main.style.setProperty('--zy', y * 100 + '%'); return; }
      if (hover && e.pointerType === 'mouse') show(Math.min(imgs.length - 1, Math.floor(x * imgs.length)));
    });
    let sx = null;
    main.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') sx = e.clientX; });
    main.addEventListener('pointerup', (e) => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 30) show(cur + (dx < 0 ? 1 : -1)); });
    if (thumbs) thumbs.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) show(+b.dataset.f); });
  }
  main.addEventListener('click', (e) => { if (e.pointerType && e.pointerType !== 'mouse') return; zoomed = !zoomed; main.classList.toggle('zoom', zoomed); main.style.cursor = zoomed ? 'zoom-out' : ''; });

  /* related */
  const rel = C.filter((x) => x.id !== p.id && x.c === p.c).sort((a, b) => (b.col === p.col) - (a.col === p.col) || Math.abs(a.p - p.p) - Math.abs(b.p - p.p)).slice(0, 4);
  const fill = rel.length < 4 ? rel.concat(C.filter((x) => x.id !== p.id && !rel.includes(x)).slice(0, 4 - rel.length)) : rel;
  document.getElementById('related').innerHTML = fill.map((x) => A.card(x)).join('');
})();
