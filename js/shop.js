/* Shop: category / colour / price / sort / search, all kept in the URL. */
(function () {
  const A = window.APP, C = A.C, t = A.t;
  Object.assign(A.extra.en, { sh_price: 'Price', sh_any: 'Any price', sh_u200: 'Under SAR 200', sh_200: 'SAR 200 – 499', sh_500: 'SAR 500 – 999', sh_1000: 'SAR 1,000 and above',
    sh_feat: 'Featured', sh_pa: 'Price: low to high', sh_pd: 'Price: high to low', sh_name: 'Name A–Z', sh_count: 'pieces', sh_none: 'No pieces match these filters.', sh_clear: 'Clear filters', sh_sub: 'Handcrafted in Riyadh from camel leather. Every price includes VAT.' });
  Object.assign(A.extra.ar, { sh_price: 'السعر', sh_any: 'أي سعر', sh_u200: 'أقل من 200 ر.س', sh_200: '200 – 499 ر.س', sh_500: '500 – 999 ر.س', sh_1000: '1,000 ر.س فأكثر',
    sh_feat: 'المختارات', sh_pa: 'السعر: من الأقل', sh_pd: 'السعر: من الأعلى', sh_name: 'الاسم أ–ي', sh_count: 'قطعة', sh_none: 'لا توجد قطع مطابقة لهذه التصفية.', sh_clear: 'مسح التصفية', sh_sub: 'صناعة يدوية في الرياض من جلد الجمل. جميع الأسعار شاملة ضريبة القيمة المضافة.' });
  A.applyLang();
  const $ = (s) => document.querySelector(s);
  const q = new URLSearchParams(location.search);
  const S = { c: q.get('c') || '', col: q.get('col') || '', p: q.get('p') || '', s: q.get('s') || '', q: q.get('q') || '' };
  const cats = ['handbags', 'wallets', 'accessories', 'backpacks'];
  const bands = { '': 'sh_any', u200: 'sh_u200', '200': 'sh_200', '500': 'sh_500', '1000': 'sh_1000' };
  const inBand = (p, b) => (b === 'u200' ? p.p < 200 : b === '200' ? p.p >= 200 && p.p < 500 : b === '500' ? p.p >= 500 && p.p < 1000 : b === '1000' ? p.p >= 1000 : true);
  const norm = (s) => (s || '').toLowerCase().normalize('NFKD').replace(/[ً-ْ]/g, '');
  $('#fPrice').innerHTML = Object.entries(bands).map(([v, k]) => `<option value="${v}">${t(k)}</option>`).join('');
  $('#fSort').innerHTML = [['', 'sh_feat'], ['pa', 'sh_pa'], ['pd', 'sh_pd'], ['name', 'sh_name']].map(([v, k]) => `<option value="${v}">${t(k)}</option>`).join('');
  $('#fPrice').value = S.p; $('#fSort').value = S.s; $('#shopQ').value = S.q;
  const sync = () => { const u = new URLSearchParams(); Object.entries(S).forEach(([k, v]) => v && u.set(k, v)); history.replaceState(null, '', location.pathname + (u.toString() ? '?' + u : '')); };
  const render = () => {
    let list = C.filter((p) => (!S.c || p.c === S.c) && (!S.col || p.col === S.col) && inBand(p, S.p) && (!S.q || S.q.trim().split(/\s+/).every((w) => norm([p.n, p.a, p.c, p.col, p.x['Product type'], p.d].join(' ')).includes(norm(w)))));
    if (S.s === 'pa') list = list.slice().sort((a, b) => a.p - b.p); else if (S.s === 'pd') list = list.slice().sort((a, b) => b.p - a.p); else if (S.s === 'name') list = list.slice().sort((a, b) => a.n.localeCompare(b.n));
    $('#grid').innerHTML = list.length ? list.map((p, i) => A.card(p, i < 4)).join('') : `<div class="none">${t('sh_none')}<br><br><button class="btn dark" id="clr">${t('sh_clear')}</button></div>`;
    $('#cnt').textContent = `${list.length} ${t('sh_count')}`;
    $('#shopTitle').textContent = S.c ? t(S.c) : t('all');
    $('#shopSub').textContent = t('sh_sub');
    document.title = `${S.c ? t(S.c) : t('all')} · HEJIN هجين`;
    $('#fCats').innerHTML = `<button data-c="" class="${S.c ? '' : 'on'}"><span class="l">${t('all')}</span><em>${C.length}</em></button>` + cats.map((k) => `<button data-c="${k}" class="${S.c === k ? 'on' : ''}"><span class="l">${t(k)}</span><em>${C.filter((p) => p.c === k).length}</em></button>`).join('');
    $('#fCols').innerHTML = A.colList.map((k) => `<button data-col="${k}" class="${S.col === k ? 'on' : ''}"><span class="l"><i class="dot ${k}"></i>${t(k)}</span><em>${C.filter((p) => p.col === k).length}</em></button>`).join('');
    sync();
    const els = document.querySelectorAll('#grid .card'); if (window.gsap) window.gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.03, ease: 'power3.out', clearProps: 'transform' });
  };
  document.addEventListener('click', (e) => {
    const c = e.target.closest('#fCats button'); if (c) { S.c = c.dataset.c; render(); return; }
    const k = e.target.closest('#fCols button'); if (k) { S.col = S.col === k.dataset.col ? '' : k.dataset.col; render(); return; }
    if (e.target.id === 'clr') { Object.keys(S).forEach((x) => { S[x] = ''; }); $('#fPrice').value = ''; $('#fSort').value = ''; $('#shopQ').value = ''; render(); }
  });
  $('#fPrice').addEventListener('change', (e) => { S.p = e.target.value; render(); });
  $('#fSort').addEventListener('change', (e) => { S.s = e.target.value; render(); });
  let qt; $('#shopQ').addEventListener('input', (e) => { clearTimeout(qt); qt = setTimeout(() => { S.q = e.target.value; render(); }, 180); });
  render();
})();
