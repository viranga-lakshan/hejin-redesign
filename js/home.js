/* Home page: copy (EN/AR), section builders, pinned story, angle scrub, personaliser, hover preview. */
(function () {
  const A = window.APP; const C = A.C; const gsap = window.gsap; const ST = window.ScrollTrigger;
  const isAr = A.lang === 'ar';

  /* ---------- copy ---------- */
  Object.assign(A.extra.en, {
    h_eye: 'Riyadh · Handcrafted since 2022', h_h1a: 'Desert heritage,', h_h1b: 'hand-stitched.',
    h_lede: 'Camel-leather bags, wallets and accessories, made in small batches in our Riyadh workshop.',
    h_cta1: 'Shop the collection', h_cta2: 'See how it is made',
    h_anat: 'Anatomy of a HEJIN wallet', h_h2: 'Seven parts. One wallet. Every layer by hand.', h_p2: 'Cut, stitched, riveted and stamped one at a time. Scroll to take it apart and put it back together.',
    h_last: 'Made to last', h_h3: 'A three-year warranty, and a patina that only gets better.', h_meter: 'Assembled', h_scroll: 'Scroll',
    L1: 'Camel emblem', L1s: 'The HEJIN signature', L2: 'Saddle stitching', L2s: 'Thread, stitch by stitch', L3: 'Brass rivets', L3s: 'Strength where it counts',
    L4: 'Front pocket', L4s: 'Camel leather, cut by hand', L5: 'Your cards', L5s: 'Slide in, slide out', L6: 'Layered pocket', L6s: 'Everything within reach', L7: 'Back shell', L7s: 'The foundation panel',
    c_eye: 'The collection', c_h: 'Four ways to carry heritage.', c_all: 'Shop all pieces',
    tg_handbags: 'Totes, satchels, crossbody', tg_wallets: 'Cards, coins, passports', tg_accessories: 'Trays, keychains, desk pieces', tg_backpacks: 'Built for daily carry',
    sg_view: 'View this piece',
    s_eye: 'Look closer', s_h: 'Every angle. No filters.', s_p: 'Scroll to turn the Waqar tote through all five views of its product photography: front, back, base, side and top.', s_cta: 'View Waqar',
    a1: 'Front', a2: 'Back', a3: 'Base', a4: 'Three-quarter', a5: 'Top',
    k_eye: 'The craft', k_h: 'From the hide to your hands.',
    k1h: 'Stitched, not stuck.', k1p: 'Every HEJIN piece is cut and stitched with its own material and finishing in mind. We work primarily to order and in small batches, which leaves time for the details that make a design work.',
    k2h: 'The mark of the camel.', k2p: 'A galloping camel, our emblem, marks the pieces. Camel leather carries a character you can see and feel, and it keeps a connection to the region in everyday objects.',
    k3h: 'Checked one by one.', k3p: 'Every finished piece is individually checked before it reaches its owner. Hardware and materials are chosen with lasting use in mind.',
    y_eye: 'Made personal', y_h: 'Your name, in camel leather.', y_p: 'Selected HEJIN pieces can be personalised with a name, initials or a company logo. For yourself, an occasion or corporate gifts: try it here, then tell us the details.',
    y_leather: 'Leather', y_text: 'Name or initials', y_foil: 'Finish', y_gold: 'Gold foil', y_blind: 'Blind deboss', y_cta: 'Request on WhatsApp', y_cap: 'Preview only. The real finish may vary.',
    lc_tan: 'Saddle tan', lc_choc: 'Chocolate', lc_black: 'Black', lc_green: 'Forest', lc_burg: 'Burgundy',
    n_eye: 'Named for the Kingdom', n_h: 'Every piece carries a name from home.',
    r_eye: 'Browse the pieces', r_h: 'Made for everyday, meant for keeps.', r_all: 'View all pieces',
    v_eye: 'Care beyond the purchase', v_h: 'We stay with you after the sale.',
    v1h: 'Three-year warranty', v1p: 'HEJIN products carry a three-year warranty. Damage caused by customer misuse is excluded. Contact us with your purchase details and clear photographs.',
    v2h: 'After-sales care', v2p: 'Leather-care guidance, maintenance advice and repair assessment. Any service cost and timing is discussed before work starts.',
    v3h: 'Leather workshops', v3p: 'Skills for the next generation: we share the art of leatherwork with the community in Saudi Arabia.',
    f_eye: 'HEJIN · هجين', f_h: 'Carry a piece of the desert.', f_wa: 'Chat on WhatsApp',
  });
  Object.assign(A.extra.ar, {
    h_eye: 'الرياض · صناعة يدوية منذ ٢٠٢٢', h_h1a: 'تراث الصحراء،', h_h1b: 'بخياطة اليد.',
    h_lede: 'حقائب ومحافظ وإكسسوارات من جلد الجمل، تُصنع بدفعات صغيرة في ورشتنا بالرياض.',
    h_cta1: 'تسوّق المجموعة', h_cta2: 'شاهد كيف تُصنع',
    h_anat: 'تشريح محفظة هجين', h_h2: 'سبع قطع. محفظة واحدة. كل طبقة بيد الحِرفي.', h_p2: 'تُقصّ وتُخاط وتُبرشم وتُختم قطعةً قطعة. مرّر للأسفل لتفكيكها ثم إعادة تركيبها.',
    h_last: 'صُنعت لتدوم', h_h3: 'ضمان ثلاث سنوات، وباتينا تزداد جمالاً مع الوقت.', h_meter: 'التركيب', h_scroll: 'مرّر',
    L1: 'شعار الجمل', L1s: 'توقيع هجين', L2: 'خياطة السرج', L2s: 'غرزة بعد غرزة', L3: 'برشام نحاسي', L3s: 'قوة حيث تلزم',
    L4: 'الجيب الأمامي', L4s: 'جلد الجمل مقصوص يدوياً', L5: 'بطاقاتك', L5s: 'تدخل وتخرج بسلاسة', L6: 'جيب الطبقة الثانية', L6s: 'كل شيء في متناول يدك', L7: 'الغلاف الخلفي', L7s: 'اللوح الأساسي',
    c_eye: 'المجموعة', c_h: 'أربع طرق لحمل التراث.', c_all: 'تسوّق جميع القطع',
    tg_handbags: 'حقائب كتف وسرج وكروس', tg_wallets: 'بطاقات وعملات وجوازات', tg_accessories: 'صواني وميداليات وقطع مكتبية', tg_backpacks: 'مصنوعة للاستخدام اليومي',
    sg_view: 'اعرض القطعة',
    s_eye: 'تمعّن أكثر', s_h: 'كل زاوية. بلا فلاتر.', s_p: 'مرّر لتدوير حقيبة وقار عبر جميع صورها الخمس: أمامي وخلفي والقاعدة والجانب والعلوي.', s_cta: 'اعرض وقار',
    a1: 'أمامي', a2: 'خلفي', a3: 'القاعدة', a4: 'ثلاثة أرباع', a5: 'علوي',
    k_eye: 'الحِرفة', k_h: 'من الجلد الخام إلى يدك.',
    k1h: 'مخيطة، لا ملصقة.', k1p: 'تُقصّ كل قطعة من هجين وتُخاط مع مراعاة خامتها وتشطيبها. نعمل غالباً بحسب الطلب وبدفعات صغيرة، ما يمنحنا وقتاً للتفاصيل التي تصنع الفرق.',
    k2h: 'ختم الجمل.', k2p: 'جمل يعدو، هو شعارنا، يميّز القطع. لجلد الجمل طابع تراه وتلمسه، ويُبقي صلة بالمنطقة في أغراضك اليومية.',
    k3h: 'تُفحص قطعةً قطعة.', k3p: 'تُفحص كل قطعة منتهية على حدة قبل أن تصل إلى صاحبها. نختار الخامات والإكسسوارات المعدنية للاستخدام الطويل.',
    y_eye: 'بلمستك', y_h: 'اسمك، على جلد الجمل.', y_p: 'يمكن تخصيص قطع مختارة من هجين بالاسم أو الأحرف الأولى أو شعار الشركة. لنفسك أو لمناسبة أو لهدايا الشركات: جرّبها هنا ثم أخبرنا بالتفاصيل.',
    y_leather: 'الجلد', y_text: 'الاسم أو الأحرف', y_foil: 'التشطيب', y_gold: 'رقائق ذهبية', y_blind: 'حفر غائر', y_cta: 'اطلب عبر واتساب', y_cap: 'معاينة فقط، وقد يختلف التشطيب الفعلي.',
    lc_tan: 'عسلي', lc_choc: 'شوكولاتة', lc_black: 'أسود', lc_green: 'أخضر غابة', lc_burg: 'عنابي',
    n_eye: 'سُمّيت على المملكة', n_h: 'لكل قطعة اسم من الوطن.',
    r_eye: 'تصفّح القطع', r_h: 'للاستخدام اليومي، وللاقتناء طويل الأمد.', r_all: 'عرض جميع القطع',
    v_eye: 'عناية ما بعد الشراء', v_h: 'نبقى معك بعد البيع.',
    v1h: 'ضمان ثلاث سنوات', v1p: 'تأتي منتجات هجين بضمان ثلاث سنوات، ويُستثنى التلف الناتج عن سوء الاستخدام. تواصل معنا بتفاصيل الشراء وصور واضحة.',
    v2h: 'خدمة ما بعد البيع', v2p: 'إرشادات للعناية بالجلد ونصائح للصيانة وتقييم للإصلاح. تُناقش تكلفة الخدمة ومدتها قبل بدء العمل.',
    v3h: 'ورش الجلد', v3p: 'مهارات للجيل القادم: نشارك فن الحِرفة الجلدية مع المجتمع في المملكة.',
    f_eye: 'هجين · HEJIN', f_h: 'احمل قطعة من الصحراء.', f_wa: 'تحدث عبر واتساب',
  });
  A.applyLang();
  const t = A.t; const $ = (s, r = document) => r.querySelector(s); const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const wide = () => window.innerWidth >= 900;
  const NF = (n) => n; // digits stay Latin throughout

  /* ---------- marquee ---------- */
  const words = isAr ? ['جلد الجمل', 'صناعة يدوية في الرياض', 'منذ ٢٠٢٢', 'ضمان ثلاث سنوات', 'تخصيص عند الطلب'] : ['Camel leather', 'Handcrafted in Riyadh', 'Since 2022', 'Three-year warranty', 'Personalised on request'];
  const bandHtml = words.map((w) => `<span>${w}</span><i class="camelmini"></i>`).join('');
  $('#bandTrack').innerHTML = (bandHtml).repeat(4);

  /* ---------- collections ---------- */
  const rep = { handbags: 'Diwan', wallets: 'Thumairi', accessories: null, backpacks: 'RAAD' };
  const colTiles = ['handbags', 'wallets', 'accessories', 'backpacks'].map((k) => {
    const n = C.filter((p) => p.c === k).length;
    const p = rep[k] ? A.byName(rep[k]) : null;
    const im = p ? `<img src="${A.img(p, 0, 'l')}" alt="" loading="lazy" width="1100" height="1100" decoding="async">${p.ni > 1 ? `<img class="alt" src="${A.img(p, 1, 'l')}" alt="" loading="lazy" width="1100" height="1100" decoding="async">` : ''}` : `<img src="img/l/accessories.webp" alt="" loading="lazy" width="1100" height="1100" decoding="async">`;
    return `<a class="tile t-${k} rv" href="shop.html?c=${k}"><div class="tile-img">${im}</div><div class="tile-t"><span class="n">${String(n).padStart(2, '0')}</span><h3>${t(k)}</h3><p>${t('tg_' + k)}</p><span class="arr">→</span></div></a>`;
  });
  $('#colGrid').innerHTML = colTiles.join('');

  /* ---------- signature story ---------- */
  const STORY = [
    { n: 'Waha Woven', bg: [190, 200, 168], k: { en: 'Woven', ar: 'مجدولة' }, tag: { en: 'Deep-green weave, made to travel.', ar: 'نسيج أخضر عميق، صُنع للسفر.' } },
    { n: 'Diwan', bg: [228, 190, 134], k: { en: 'Satchel', ar: 'ساتشل' }, tag: { en: 'A saddle satchel with an old-world buckle.', ar: 'حقيبة سرج بإبزيم عتيق الطابع.' } },
    { n: 'RAAD', bg: [216, 164, 138], k: { en: 'Backpack', ar: 'حقيبة ظهر' }, tag: { en: 'The everyday backpack, in rich rust.', ar: 'حقيبة الظهر اليومية بلون صدئ غني.' } },
    { n: 'Waqar', bg: [206, 190, 166], k: { en: 'Tote', ar: 'توت' }, tag: { en: 'Structure with presence: winged sides, a turn lock.', ar: 'هيكل بحضور: جوانب مجنّحة وقفل دوّار.' } },
  ].map((s) => ({ ...s, p: A.byName(s.n) }));
  const L = isAr ? 'ar' : 'en';
  const stage = $('#sigStage'), copies = $('#sigCopies'), ghost = $('[data-sig-ghost]');
  stage.innerHTML = STORY.map((s, i) => `<figure class="sig-img" data-i="${i}"><img src="${A.img(s.p, 0, 'l')}" alt="${A.esc(s.p.n)}" width="1100" height="1100" loading="${i ? 'lazy' : 'eager'}" decoding="async"></figure>`).join('');
  copies.innerHTML = STORY.map((s, i) => `<div class="sig-copy" data-i="${i}">
      <img class="m-img" src="${A.img(s.p, 0, 'l')}" alt="" width="1100" height="1100" loading="lazy" decoding="async">
      <span class="k">${s.k[L]}</span><h3>${A.esc(A.name(s.p))}</h3><span class="sub" lang="${isAr ? 'en' : 'ar'}">${A.esc(A.name2(s.p))}</span>
      <p>${s.tag[L]}</p><div class="meta"><span>${A.money(s.p.p)}</span><span>${A.cat(s.p)}</span></div>
      <a class="btn dark" href="product.html?h=${encodeURIComponent(s.p.h)}"><span>${t('sg_view')}</span> <span class="arr">→</span></a></div>`).join('');
  ghost.innerHTML = STORY.map((s, i) => `<span data-i="${i}" lang="ar">${A.esc(s.p.a)}</span>`).join('');

  /* ---------- angle scrub ---------- */
  const spinP = A.byName('Waqar');
  const spinStage = $('#spinStage');
  spinStage.innerHTML = Array.from({ length: spinP.ni }, (_, i) => `<img data-f="${i}" src="${A.img(spinP, i, 'l')}" alt="" width="1100" height="1100" ${i ? 'loading="lazy"' : ''} decoding="async">`).join('');
  $('#angles').innerHTML = Array.from({ length: spinP.ni }, (_, i) => `<li data-f="${i}"><b>${String(i + 1).padStart(2, '0')}</b><span>${t('a' + (i + 1))}</span></li>`).join('');
  $('#spinLink').href = 'product.html?h=' + encodeURIComponent(spinP.h);

  /* ---------- personaliser ---------- */
  const LEATHER = [['tan', 'lc_tan', '#B5692F', '#8f4c1c'], ['choc', 'lc_choc', '#4E2C1A', '#341c10'], ['black', 'lc_black', '#211c19', '#0f0c0b'], ['green', 'lc_green', '#2A4A38', '#17291f'], ['burg', 'lc_burg', '#62242B', '#3b1318']];
  let yc = 0, foil = 'gold';
  const sw = $('#swatch'), mono = $('#yMono'), chips = $('#yChips'), yText = $('#yText'), yCta = $('#yCta');
  chips.innerHTML = LEATHER.map((l, i) => `<button role="radio" aria-checked="${i === 0}" class="${i === 0 ? 'on' : ''}" data-i="${i}" style="--c:${l[2]}"><i></i><span>${t(l[1])}</span></button>`).join('');
  const yUpdate = () => {
    const l = LEATHER[yc]; sw.style.setProperty('--lc', l[2]); sw.style.setProperty('--ld', l[3]); sw.dataset.foil = foil;
    const v = (yText.value || '').trim() || 'HJ'; mono.textContent = v;
    mono.style.fontSize = v.length > 8 ? 'clamp(26px,4.4vw,52px)' : v.length > 4 ? 'clamp(36px,6vw,74px)' : '';
    const msg = `${t('waPersonal')}\n${t('y_leather')}: ${t(l[1])}\n${t('y_text')}: ${v}\n${t('y_foil')}: ${t(foil === 'gold' ? 'y_gold' : 'y_blind')}`;
    yCta.href = A.waLink(msg);
  };
  chips.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; yc = +b.dataset.i; $$('button', chips).forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b); }); yUpdate(); });
  yText.addEventListener('input', yUpdate);
  $('#ySeg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; foil = b.dataset.foil; $$('#ySeg button').forEach((x) => x.classList.toggle('on', x === b)); yUpdate(); });
  if (isAr) yText.value = 'هـ ج';
  yUpdate();
  const wrap = $('.swatch-wrap');
  if (!A.reduce && matchMedia('(hover:hover)').matches) {
    wrap.addEventListener('pointermove', (e) => { const r = wrap.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; sw.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 14}deg)`; sw.style.setProperty('--gx', (x + 0.5) * 100 + '%'); sw.style.setProperty('--gy', (y + 0.5) * 100 + '%'); });
    wrap.addEventListener('pointerleave', () => { sw.style.transform = ''; });
  }

  /* ---------- names list with hover preview ---------- */
  const PLACES = ['Riyadh', 'Makkah', 'Abha', 'ALAULA', 'Hail', 'Tabuk', 'Dammam', 'TUWAIQ', 'Aga', 'Waha'];
  const placeProducts = PLACES.map((n) => A.byName(n)).filter(Boolean);
  $('#nameList').innerHTML = placeProducts.map((p, i) => `<li class="rv" style="--d:${i * 40}ms"><a href="product.html?h=${encodeURIComponent(p.h)}" data-img="${A.img(p, 0, 's')}">
      <span class="no">${String(i + 1).padStart(2, '0')}</span><span class="big" lang="ar">${A.esc(p.a)}</span><span class="en">${A.esc(p.n)}</span><span class="ty">${A.esc(A.cat(p))}</span><span class="pr">${A.money(p.p)}</span><img class="thumb" src="${A.img(p, 0, 's')}" alt="" loading="lazy" width="560" height="560" decoding="async"></a></li>`).join('');
  const peek = $('#namePeek'), peekImg = $('img', peek);
  if (matchMedia('(hover:hover)').matches && gsap) {
    const xTo = gsap.quickTo(peek, 'x', { duration: 0.5, ease: 'power3' }), yTo = gsap.quickTo(peek, 'y', { duration: 0.5, ease: 'power3' });
    const list = $('#nameList');
    list.addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); });
    list.addEventListener('pointerover', (e) => { const a = e.target.closest('a[data-img]'); if (!a) return; if (peekImg.getAttribute('src') !== a.dataset.img) peekImg.src = a.dataset.img; peek.classList.add('on'); });
    list.addEventListener('pointerleave', () => peek.classList.remove('on'));
  }

  /* ---------- rail ---------- */
  const tabs = [['all', 'all'], ['handbags', 'handbags'], ['wallets', 'wallets'], ['accessories', 'accessories']];
  const railTabs = $('#railTabs'), railTrack = $('#railTrack');
  railTabs.innerHTML = tabs.map(([k, l], i) => `<button role="tab" class="${i ? '' : 'on'}" data-k="${k}">${t(l)}</button>`).join('');
  const drawRail = (k) => {
    const list = (k === 'all' ? C.slice().sort((a, b) => b.p - a.p).filter((_, i) => i % 3 === 0) : C.filter((p) => p.c === k)).slice(0, 12);
    railTrack.innerHTML = list.map((p) => A.card(p)).join(''); railTrack.scrollLeft = 0;
  };
  railTabs.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; $$('button', railTabs).forEach((x) => x.classList.toggle('on', x === b)); drawRail(b.dataset.k); });
  drawRail('all');

  /* ---------- finale + links ---------- */
  $('#finWa').href = A.waLink(t('waAsk') + ' HEJIN');
  A.reveals();

  /* ---------- scroll choreography ---------- */
  if (!gsap || !ST || A.reduce) return;
  gsap.registerPlugin(ST);
  const hdr = $('#hdr');
  ST.create({ trigger: '#make', start: 'top top', end: 'bottom top', onToggle: (self) => { hdr.dataset.over = self.isActive ? '1' : ''; hdr.classList.toggle('solid', !self.isActive && window.scrollY > 40); } });

  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    /* pinned signature story: colours shift between pieces */
    const n = STORY.length, imgs = $$('.sig-img'), cps = $$('.sig-copy'), gh = $$('span', ghost), pin = $('[data-sig-pin]');
    const bar = $('[data-sig-bar]'), num = $('[data-sig-n]');
    const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
    const apply = (p) => {
      const f = p * (n - 1); const i0 = Math.min(n - 2, Math.floor(f)); const k = f - i0;
      const c = mix(STORY[i0].bg, STORY[i0 + 1].bg, k * k * (3 - 2 * k));
      pin.style.background = `rgb(${c})`;
      const dark = (c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11) < 120; pin.classList.toggle('inv', dark);
      for (let i = 0; i < n; i++) {
        const d = f - i, w = Math.max(0, 1 - Math.abs(d) * 1.35), ease = w * w * (3 - 2 * w);
        imgs[i].style.opacity = ease; imgs[i].style.transform = `translate3d(${d * -9}vw,0,0) scale(${0.9 + 0.1 * ease}) rotate(${d * 5}deg)`;
        cps[i].style.opacity = ease; cps[i].style.transform = `translate3d(0,${d * 36}px,0)`; cps[i].style.pointerEvents = ease > 0.6 ? 'auto' : 'none';
        gh[i].style.opacity = ease * 0.5; gh[i].style.transform = `translate3d(${d * -16}vw,0,0)`;
      }
      bar.style.transform = `scaleX(${p})`; num.textContent = String(Math.round(f) + 1).padStart(2, '0');
    };
    apply(0);
    ST.create({ trigger: '#sig', start: 'top top', end: () => '+=' + window.innerHeight * 3.4, pin: pin, scrub: 0.4, onUpdate: (s) => apply(s.progress) });

    /* frame scrub: five angles of the Waqar tote */
    const fr = $$('#spinStage img'), lis = $$('#angles li'), N = fr.length, st = $('#spinStage');
    const spinApply = (p) => {
      const f = p * (N - 1);
      fr.forEach((im, i) => { const d = f - i; const w = Math.max(0, 1 - Math.abs(d)); im.style.opacity = w * w * (3 - 2 * w); im.style.transform = `perspective(1100px) rotateY(${d * -16}deg) scale(${1 + (1 - w) * 0.04})`; });
      lis.forEach((li, i) => li.classList.toggle('on', Math.round(f) === i));
      st.style.transform = `rotate(${Math.sin(p * Math.PI * 2) * 1.5}deg)`;
    };
    spinApply(0);
    const spinST = ST.create({ trigger: '#spin', start: 'top top', end: () => '+=' + window.innerHeight * 2.6, pin: '[data-spin-pin]', scrub: 0.5, onUpdate: (s) => spinApply(s.progress) });
    lis.forEach((li, i) => li.addEventListener('click', () => { const y = spinST.start + (spinST.end - spinST.start) * (i / (N - 1)); window.APP.lenis ? window.APP.lenis.scrollTo(y) : window.scrollTo({ top: y, behavior: 'smooth' }); }));
    return () => { pin.style.background = ''; };
  });
  mm.add('(max-width: 899px)', () => {
    /* phones: no pins. The angle viewer auto-cycles while visible */
    const fr = $$('#spinStage img'), lis = $$('#angles li'); let i = 0, timer = null;
    const show = (k) => { fr.forEach((im, j) => { im.style.opacity = j === k ? 1 : 0; im.style.transform = ''; }); lis.forEach((li, j) => li.classList.toggle('on', j === k)); };
    show(0);
    new IntersectionObserver(([en]) => { clearInterval(timer); if (en.isIntersecting) timer = setInterval(() => { i = (i + 1) % fr.length; show(i); }, 1500); }, { threshold: 0.35 }).observe($('#spinStage'));
    lis.forEach((li, k) => li.addEventListener('click', () => { i = k; show(k); }));
  });

  /* craft: slow parallax on the macro photos */
  $$('.clip img').forEach((im) => { gsap.fromTo(im, { yPercent: -7, scale: 1.14 }, { yPercent: 7, scale: 1.14, ease: 'none', scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }); });
  gsap.to('.fin-camel', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '#fin', start: 'top bottom', end: 'bottom top', scrub: true } });
  ST.refresh();
})();
