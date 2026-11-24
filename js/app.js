/* Shared shell: language, header, mega menu, bag, search, product cards, reveals, smooth scroll. */
(function () {
  const C = window.CATALOG || [];
  const WA = '966541564339';
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };

  /* ---------- i18n ---------- */
  const D = {
    en: {
      tick1: 'Handcrafted in Riyadh', tick2: 'Camel leather, made in small batches', tick3: 'Three-year warranty', tick4: 'Personalised with a name, initials or logo', tick5: 'All prices include VAT',
      shop: 'Shop', handbags: 'Handbags', wallets: 'Wallets', accessories: 'Accessories', backpacks: 'Backpacks', craft: 'Our craft', services: 'Services', contact: 'Contact', all: 'All pieces',
      byCat: 'Shop by category', byCol: 'Shop by colour', menu: 'Menu', close: 'Close', search: 'Search', bag: 'Bag',
      tan: 'Tan', brown: 'Brown', red: 'Rust & red', black: 'Black', green: 'Green', yellow: 'Yellow',
      addBag: 'Add to bag', added: 'Added to your bag', view: 'View bag', pieces: 'pieces',
      yourBag: 'Your bag', subtotal: 'Subtotal (VAT included)', order: 'Order on WhatsApp', bagNote: 'In the live build this goes to secure checkout. In this concept, your bag opens as a WhatsApp message to the workshop.',
      emptyT: 'Your bag is empty', emptyP: 'Find a piece made to last.', startShop: 'Start shopping',
      searchPh: 'Search bags, wallets, trays, keychains…', searchHint: 'Try “Riyadh”, “passport”, “green” or “backpack”.', noRes: 'No pieces match that search.',
      concept: 'Design concept · Axiom Global', sar: 'SAR',
      fNews: 'Letters from the workshop', fNewsP: 'New pieces, care tips and the stories behind the names. Rarely, and only the good bits.', fEmail: 'Email address', fJoin: 'Subscribe',
      fShop: 'Shop', fCare: 'Care & services', fWarranty: 'Three-year warranty', fAfter: 'After-sales care', fPersonal: 'Personalisation', fWork: 'Leather workshops',
      fContact: 'Contact', fCity: 'Riyadh, Saudi Arabia', fRights: 'All rights reserved', wa: 'Chat with the workshop on WhatsApp',
      waHello: 'Hello HEJIN, I would like to order:', waAsk: 'Hello HEJIN, I have a question about', waTotal: 'Total',
      waPersonal: 'Hello HEJIN, I would like a personalised piece.',
    },
    ar: {
      tick1: 'صناعة يدوية في الرياض', tick2: 'جلد الجمل، بدفعات صغيرة', tick3: 'ضمان ثلاث سنوات', tick4: 'تخصيص بالاسم أو الأحرف الأولى أو الشعار', tick5: 'جميع الأسعار شاملة ضريبة القيمة المضافة',
      shop: 'تسوّق', handbags: 'حقائب اليد', wallets: 'المحافظ', accessories: 'الإكسسوارات', backpacks: 'حقائب الظهر', craft: 'حرفتنا', services: 'الخدمات', contact: 'تواصل معنا', all: 'جميع القطع',
      byCat: 'تسوّق حسب الفئة', byCol: 'تسوّق حسب اللون', menu: 'القائمة', close: 'إغلاق', search: 'بحث', bag: 'الحقيبة',
      tan: 'عسلي', brown: 'بني', red: 'محمّر وأحمر', black: 'أسود', green: 'أخضر', yellow: 'أصفر',
      addBag: 'أضف إلى الحقيبة', added: 'أُضيفت إلى حقيبتك', view: 'عرض الحقيبة', pieces: 'قطعة',
      yourBag: 'حقيبتك', subtotal: 'المجموع (شامل الضريبة)', order: 'اطلب عبر واتساب', bagNote: 'في الموقع الفعلي تنتقل إلى الدفع الآمن. في هذه النسخة التجريبية تُفتح حقيبتك كرسالة واتساب إلى الورشة.',
      emptyT: 'حقيبتك فارغة', emptyP: 'اختر قطعة صُنعت لتدوم.', startShop: 'ابدأ التسوق',
      searchPh: 'ابحث عن حقيبة أو محفظة أو صينية أو ميدالية…', searchHint: 'جرّب «الرياض» أو «جواز» أو «أخضر» أو «حقيبة ظهر».', noRes: 'لا توجد قطع مطابقة لبحثك.',
      concept: 'تصميم مقترح · Axiom Global', sar: 'ر.س',
      fNews: 'رسائل من الورشة', fNewsP: 'قطع جديدة ونصائح عناية وحكايات الأسماء. نادراً، وبأجمل ما لدينا فقط.', fEmail: 'البريد الإلكتروني', fJoin: 'اشترك',
      fShop: 'تسوّق', fCare: 'العناية والخدمات', fWarranty: 'ضمان ثلاث سنوات', fAfter: 'خدمة ما بعد البيع', fPersonal: 'التخصيص', fWork: 'ورش الجلد',
      fContact: 'تواصل معنا', fCity: 'الرياض، المملكة العربية السعودية', fRights: 'جميع الحقوق محفوظة', wa: 'تحدث مع الورشة عبر واتساب',
      waHello: 'مرحباً هجين، أرغب بطلب:', waAsk: 'مرحباً هجين، لدي استفسار عن', waTotal: 'المجموع',
      waPersonal: 'مرحباً هجين، أرغب بقطعة مخصصة.',
    },
  };
  let lang = store.get('hj-lang', 'en');
  if (!D[lang]) lang = 'en';
  const extra = { en: {}, ar: {} };
  const t = (k) => (extra[lang][k] ?? D[lang][k] ?? extra.en[k] ?? D.en[k] ?? k);
  const applyLang = () => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  };

  /* ---------- helpers ---------- */
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const money = (n) => (lang === 'ar' ? `${n.toLocaleString('en-US')} ${t('sar')}` : `${t('sar')} ${n.toLocaleString('en-US')}`);
  const name = (p) => (lang === 'ar' && p.a ? p.a : p.n);
  const name2 = (p) => (lang === 'ar' ? p.n : p.a); // the other script, as a quiet subtitle
  const img = (p, i = 0, sz = 's') => `img/p/${p.id}-${Math.min(i, p.ni - 1)}-${sz}.webp`;
  const byH = (h) => C.find((p) => p.h === h);
  const byName = (n) => C.find((p) => p.n.toLowerCase() === n.toLowerCase()) || C.find((p) => p.n.toLowerCase().startsWith(n.toLowerCase()));
  const catKey = { handbags: 'handbags', wallets: 'wallets', accessories: 'accessories', backpacks: 'backpacks' };
  const cat = (p) => t(catKey[p.c]);
  const card = (p, eager) => `
    <article class="card" data-col="${p.col}">
      <div class="media">
        <a class="ph" href="product.html?h=${encodeURIComponent(p.h)}" aria-label="${esc(name(p))}">
          <img class="main" src="${img(p)}" alt="${esc(p.n)}" width="560" height="560" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
          ${p.ni > 1 ? `<img class="alt" src="${img(p, 1)}" alt="" width="560" height="560" loading="lazy" decoding="async">` : ''}
        </a>
        <button class="add" data-add="${p.id}">${t('addBag')}</button>
      </div>
      <div class="info"><span class="cat">${esc(cat(p))}<i class="dot ${p.col}"></i></span><a class="name" href="product.html?h=${encodeURIComponent(p.h)}">${esc(name(p))}</a><span class="price">${money(p.p)}</span></div>
    </article>`;

  /* ---------- icons ---------- */
  const I = {
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
    bag: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6.5a3 3 0 016 0V8"/></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M4 8h16M4 16h16"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    wa: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3a.5.5 0 000-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.4.8 3.2.6a2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.6-.3z"/></svg>',
  };

  /* ---------- shell ---------- */
  const page = document.body.dataset.page;
  const dark = document.body.classList.contains('page-home');
  const counts = C.reduce((o, p) => { o[p.c] = (o[p.c] || 0) + 1; return o; }, {});
  const colList = ['tan', 'brown', 'red', 'black', 'green', 'yellow'];
  const brandMark = `<span class="mark" aria-hidden="true"></span><span class="word">HEJIN</span><span class="ar" lang="ar">هجين</span>`;
  const shell = () => {
    const tick = ['tick1', 'tick2', 'tick3', 'tick4', 'tick5'];
    const tickHtml = tick.concat(tick).map((k) => `<span data-i18n="${k}"></span>`).join('');
    document.body.insertAdjacentHTML('afterbegin', `
      <a class="skip" href="#main">Skip to content</a>
      <header class="hdr${dark ? '' : ' light solid'}" id="hdr">
        <div class="ticker" aria-hidden="true"><div class="ticker-track">${tickHtml}${tickHtml}</div></div>
        <div class="wrap hdr-in">
          <nav class="nav" aria-label="Main">
            <button data-mega aria-expanded="false" data-i18n="shop"></button>
            <a href="shop.html?c=handbags" data-i18n="handbags"></a>
            <a href="shop.html?c=wallets" data-i18n="wallets"></a>
            <a href="shop.html?c=accessories" data-i18n="accessories"></a>
            <a href="index.html#craft" data-i18n="craft"></a>
          </nav>
          <button class="tool menu-btn" data-open-menu data-i18n-aria="menu">${I.menu}</button>
          <a class="logo" href="index.html" aria-label="HEJIN">${brandMark}</a>
          <div class="tools">
            <button class="lang" data-lang>${lang === 'ar' ? 'EN' : '<span lang="ar">العربية</span>'}</button>
            <button class="tool" data-open-search data-i18n-aria="search">${I.search}</button>
            <button class="tool" data-open-bag data-i18n-aria="bag">${I.bag}<span class="count" data-count>0</span></button>
          </div>
        </div>
        <div class="mega" id="mega">
          <div class="mega-in">
            <div><h4 data-i18n="byCat"></h4><ul>
              <li><a href="shop.html?c=handbags"><span data-i18n="handbags"></span><em>${counts.handbags || 0}</em></a></li>
              <li><a href="shop.html?c=wallets"><span data-i18n="wallets"></span><em>${counts.wallets || 0}</em></a></li>
              <li><a href="shop.html?c=accessories"><span data-i18n="accessories"></span><em>${counts.accessories || 0}</em></a></li>
              <li><a href="shop.html?c=backpacks"><span data-i18n="backpacks"></span><em>${counts.backpacks || 0}</em></a></li>
              <li><a href="shop.html"><span data-i18n="all"></span><em>${C.length}</em></a></li></ul></div>
            <div><h4 data-i18n="byCol"></h4><ul class="sw">${colList.map((c) => `<li><a href="shop.html?col=${c}"><i class="dot ${c}"></i><span data-i18n="${c}"></span></a></li>`).join('')}</ul></div>
            <a class="mega-feat" href="shop.html?c=accessories"><img src="img/l/accessories.webp" alt="" loading="lazy" width="440" height="440"><span data-i18n="accessories"></span></a>
          </div>
        </div>
      </header>
      <nav class="mnav" id="mnav" aria-label="Mobile">
        <button class="tool close" data-close-menu data-i18n-aria="close">${I.close}</button>
        <a href="shop.html?c=handbags" data-i18n="handbags"></a><a href="shop.html?c=wallets" data-i18n="wallets"></a><a href="shop.html?c=accessories" data-i18n="accessories"></a><a href="shop.html?c=backpacks" data-i18n="backpacks"></a><a href="shop.html" data-i18n="all"></a><a href="index.html#craft" data-i18n="craft"></a>
      </nav>`);
    document.body.insertAdjacentHTML('beforeend', `
      <footer class="foot" id="contact">
        <div class="wrap">
          <div class="foot-grid">
            <div><a class="logo" href="index.html">${brandMark}</a>
              <h4 data-i18n="fNews"></h4><p style="margin:0" data-i18n="fNewsP"></p>
              <form class="news" onsubmit="event.preventDefault();this.querySelector('input').value='';"><input type="email" required data-i18n-ph="fEmail" aria-label="Email"><button data-i18n="fJoin"></button></form></div>
            <div><h4 data-i18n="fShop"></h4><ul><li><a href="shop.html?c=handbags" data-i18n="handbags"></a></li><li><a href="shop.html?c=wallets" data-i18n="wallets"></a></li><li><a href="shop.html?c=accessories" data-i18n="accessories"></a></li><li><a href="shop.html?c=backpacks" data-i18n="backpacks"></a></li></ul></div>
            <div><h4 data-i18n="fCare"></h4><ul><li><a href="index.html#care" data-i18n="fWarranty"></a></li><li><a href="index.html#care" data-i18n="fAfter"></a></li><li><a href="index.html#yours" data-i18n="fPersonal"></a></li><li><a href="index.html#care" data-i18n="fWork"></a></li></ul></div>
            <div><h4 data-i18n="fContact"></h4><ul><li data-i18n="fCity"></li><li><a href="https://wa.me/${WA}" target="_blank" rel="noopener" dir="ltr">+966 54 156 4339</a></li><li><a href="mailto:hello@hejinfashion.com">hello@hejinfashion.com</a></li></ul></div>
          </div>
          <div class="giant" aria-hidden="true"><span>${lang === 'ar' ? 'هجين' : 'HEJIN'}</span></div>
          <div class="legal"><span>© 2026 HEJIN · <span data-i18n="fRights"></span></span><span data-i18n="concept"></span></div>
        </div>
      </footer>
      <div class="scrim" id="scrim"></div>
      <aside class="drawer" id="drawer" aria-label="Bag" aria-hidden="true">
        <header><b data-i18n="yourBag"></b><button class="tool" data-close data-i18n-aria="close">${I.close}</button></header>
        <div class="items" id="items"></div>
        <footer id="bagfoot"></footer>
      </aside>
      <div class="search" id="search" role="dialog" aria-label="Search" aria-hidden="true">
        <div class="bar">${I.search.replace('<svg', '<svg width="26" height="26" style="stroke:currentColor;fill:none;stroke-width:1.3"')}<input id="q" type="search" data-i18n-ph="searchPh" autocomplete="off"><button class="tool" data-close data-i18n-aria="close">${I.close}</button></div>
        <div class="sres" id="sres"></div>
      </div>
      <div class="toast" id="toast" role="status" aria-live="polite"></div>
      <a class="wa" href="https://wa.me/${WA}" target="_blank" rel="noopener" data-i18n-aria="wa">${I.wa}</a>`);
  };

  /* ---------- bag ---------- */
  let bag = store.get('hj-bag', []);
  const saveBag = () => { store.set('hj-bag', bag); renderBag(); };
  const addToBag = (id) => {
    const p = C.find((x) => x.id === +id); if (!p) return;
    const it = bag.find((x) => x.id === p.id);
    if (it) it.q++; else bag.push({ id: p.id, q: 1 });
    saveBag();
    toast(`<img src="${img(p)}" alt=""><span>${t('added')}</span><button data-open-bag>${t('view')}</button>`);
  };
  const waLink = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
  const orderLink = () => {
    const rows = bag.map((x) => ({ ...x, p: C.find((p) => p.id === x.id) })).filter((x) => x.p);
    const sum = rows.reduce((s, { p, q }) => s + p.p * q, 0);
    return waLink(`${t('waHello')}\n` + rows.map(({ p, q }) => `• ${p.n} × ${q} — ${money(p.p * q)}`).join('\n') + `\n${t('waTotal')}: ${money(sum)}`);
  };
  const renderBag = () => {
    const n = bag.reduce((s, x) => s + x.q, 0);
    document.querySelectorAll('[data-count]').forEach((el) => { el.textContent = n; el.classList.toggle('on', n > 0); });
    const items = document.getElementById('items'); const foot = document.getElementById('bagfoot');
    if (!items) return;
    const rows = bag.map((x) => ({ ...x, p: C.find((p) => p.id === x.id) })).filter((x) => x.p);
    if (!rows.length) {
      items.innerHTML = `<div class="empty"><b>${t('emptyT')}</b><p>${t('emptyP')}</p><a class="btn dark" href="shop.html" style="margin-top:20px">${t('startShop')}</a></div>`;
      foot.innerHTML = ''; return;
    }
    items.innerHTML = rows.map(({ p, q }) => `<div class="ditem"><div class="im"><img src="${img(p)}" alt=""></div>
      <div><small>${esc(cat(p))}</small><b>${esc(name(p))}</b><div class="qty"><button data-dec="${p.id}" aria-label="−">−</button><span>${q}</span><button data-inc="${p.id}" aria-label="+">+</button></div></div>
      <div style="text-align:end;font-size:14px">${money(p.p * q)}</div></div>`).join('');
    const sum = rows.reduce((s, { p, q }) => s + p.p * q, 0);
    foot.innerHTML = `<div class="sum"><span>${t('subtotal')}</span><b>${money(sum)}</b></div><p class="note">${t('bagNote')}</p><a class="btn block" href="${orderLink()}" target="_blank" rel="noopener">${I.wa.replace('<svg', '<svg class="ic"')} ${t('order')}</a>`;
  };
  let toastT;
  const toast = (html) => {
    const el = document.getElementById('toast'); el.innerHTML = html; el.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), 3600);
  };
  const open = (id) => {
    document.getElementById(id).classList.add('on'); document.getElementById(id).setAttribute('aria-hidden', 'false');
    document.getElementById('scrim').classList.add('on'); window.APP.lenis?.stop();
    if (id === 'search') setTimeout(() => document.getElementById('q').focus(), 350);
  };
  const closeAll = () => {
    ['drawer', 'search'].forEach((id) => { const el = document.getElementById(id); el.classList.remove('on'); el.setAttribute('aria-hidden', 'true'); });
    document.getElementById('scrim').classList.remove('on'); document.getElementById('mnav').classList.remove('open'); window.APP.lenis?.start();
  };

  /* ---------- search ---------- */
  const norm = (s) => (s || '').toLowerCase().normalize('NFKD').replace(/[ً-ْ]/g, '');
  const runSearch = (q) => {
    const out = document.getElementById('sres');
    q = norm(q.trim());
    if (q.length < 2) { out.innerHTML = `<p class="hint">${t('searchHint')}</p>`; return; }
    const words = q.split(/\s+/);
    const res = C.filter((p) => { const h = norm([p.n, p.a, p.c, p.col, p.x['Product type'], p.d].join(' ')); return words.every((w) => h.includes(w)); }).slice(0, 8);
    out.innerHTML = res.length ? res.map((p) => card(p)).join('') : `<p class="hint">${t('noRes')}</p>`;
  };

  /* ---------- reveals ---------- */
  const reveals = () => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rv:not(.in)').forEach((el) => io.observe(el));
  };

  /* ---------- header behaviour ---------- */
  const header = () => {
    const h = document.getElementById('hdr');
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (dark) h.classList.toggle('solid', y > 40 && !h.dataset.over);
      h.classList.toggle('hide', y > 500 && y > last && !document.getElementById('mega').classList.contains('open'));
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const mb = h.querySelector('[data-mega]'); const mega = document.getElementById('mega');
    let mt;
    const show = (on) => { clearTimeout(mt); mega.classList.toggle('open', on); mb.setAttribute('aria-expanded', on); if (dark && window.scrollY < 40) h.classList.toggle('solid', on); };
    mb.addEventListener('mouseenter', () => show(true));
    mb.addEventListener('click', () => show(!mega.classList.contains('open')));
    mega.addEventListener('mouseenter', () => clearTimeout(mt));
    [mb, mega].forEach((el) => el.addEventListener('mouseleave', () => { mt = setTimeout(() => show(false), 180); }));
  };

  /* ---------- events ---------- */
  const events = () => {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('[data-add]'); if (a) { e.preventDefault(); addToBag(a.dataset.add); return; }
      if (e.target.closest('[data-open-bag]')) { document.getElementById('toast').classList.remove('on'); closeAll(); open('drawer'); return; }
      if (e.target.closest('[data-open-search]')) { open('search'); runSearch(document.getElementById('q').value); return; }
      if (e.target.closest('[data-open-menu]')) { document.getElementById('mnav').classList.add('open'); return; }
      if (e.target.closest('[data-close-menu]')) { document.getElementById('mnav').classList.remove('open'); return; }
      if (e.target.closest('[data-close]') || e.target.id === 'scrim') { closeAll(); return; }
      const inc = e.target.closest('[data-inc]'); if (inc) { bag.find((x) => x.id === +inc.dataset.inc).q++; saveBag(); return; }
      const dec = e.target.closest('[data-dec]'); if (dec) { const it = bag.find((x) => x.id === +dec.dataset.dec); it.q--; if (it.q < 1) bag = bag.filter((x) => x !== it); saveBag(); return; }
      if (e.target.closest('[data-lang]')) { store.set('hj-lang', lang === 'en' ? 'ar' : 'en'); location.reload(); }
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
    document.getElementById('q').addEventListener('input', (e) => runSearch(e.target.value));
  };

  /* ---------- smooth scroll ---------- */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smooth = () => {
    if (reduce || !window.Lenis) return null;
    const lenis = new window.Lenis({ lerp: 0.11, smoothWheel: true });
    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add((tm) => lenis.raf(tm * 1000));
      window.gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (tm) => { lenis.raf(tm); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
    }
    return lenis;
  };

  window.APP = { C, WA, t, lang, extra, esc, money, name, name2, cat, img, card, byH, byName, addToBag, reveals, applyLang, reduce, store, I, waLink, colList };
  document.documentElement.classList.add('js');
  shell();
  applyLang();
  header();
  events();
  renderBag();
  window.APP.lenis = smooth();
  window.addEventListener('DOMContentLoaded', reveals);
})();
