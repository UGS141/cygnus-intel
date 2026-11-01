/* Cygnus landing — vanilla JS */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Landing: mobile menu ─────────────────────────────── */
  var burger = document.querySelector('.burger');
  var overlay = document.querySelector('.menu-overlay');
  var menu = document.getElementById('mobileMenu');

  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    overlay.hidden = !open;
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }
  if (burger) {
    burger.addEventListener('click', function () {
      setMenu(menu.hidden);
    });
    overlay.addEventListener('click', function () { setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) setMenu(false);
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 720 && !menu.hidden) setMenu(false);
    });
  }

  /* ── Landing: stats count-up ──────────────────────────── */
  var easeOutCubic = function (t) { return 1 - Math.pow(1 - t, 3); };

  function runCount(el, i) {
    var target = parseFloat(el.dataset.target);
    var decimals = parseInt(el.dataset.decimals, 10);
    var suffix = el.dataset.suffix || '';
    if (reduced) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }
    var duration = 1500 + i * 80;
    var startDelay = 480 + i * 90;
    setTimeout(function () {
      var t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / duration, 1);
        el.textContent = (target * easeOutCubic(p)).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, startDelay);
  }

  var statValues = Array.prototype.slice.call(document.querySelectorAll('.stat-value'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          statValues.forEach(runCount);
          io.disconnect();
        }
      });
    }, { threshold: 0.25 });
    var statsEl = document.querySelector('.stats');
    if (statsEl) io.observe(statsEl);
  } else {
    statValues.forEach(runCount);
  }

  /* ── Footer: video + entrance ─────────────────────────── */
  var vxVideo = document.querySelector('.vx-video');
  if (vxVideo) {
    if (reduced) {
      vxVideo.removeAttribute('autoplay');
      vxVideo.pause();
    } else {
      vxVideo.addEventListener('loadeddata', function () {
        vxVideo.classList.add('ready');
        vxVideo.play().catch(function () {});
      });
      vxVideo.play().catch(function () {});
    }
  }

  var vxFooter = document.querySelector('.vx-footer');
  if (vxFooter && 'IntersectionObserver' in window) {
    var fio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          vxFooter.classList.add('in');
          fio.disconnect();
        }
      });
    }, { threshold: 0.15 });
    fio.observe(vxFooter);
  } else if (vxFooter) {
    vxFooter.classList.add('in');
  }

  /* ── Dashboard ────────────────────────────────────────── */
  var dash = document.querySelector('.dash');
  if (!dash) return;

  // Entrance timeline (skipped entirely for reduced motion)
  if (!reduced && Element.prototype.animate) {
    var rise = function (el, delay, dy) {
      el.animate(
        [{ opacity: 0, transform: 'translateY(' + (dy || 14) + 'px)' }, { opacity: 1, transform: 'none' }],
        { duration: 520, delay: delay, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'backwards' }
      );
    };
    dash.querySelectorAll('.dash-rail .tile').forEach(function (el, i) { rise(el, i * 45); });
    dash.querySelectorAll('.dash-topbar > *, .dash-subbar > *').forEach(function (el, i) { rise(el, 120 + i * 45); });
    var orb = dash.querySelector('.orb-wrap');
    if (orb) {
      orb.animate(
        [
          { clipPath: 'circle(0% at 50% 50%)', transform: 'scale(0.92)' },
          { clipPath: 'circle(75% at 50% 50%)', transform: 'scale(1)' }
        ],
        { duration: 800, delay: 320, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'backwards' }
      );
    }
    rise(dash.querySelector('.dash-greeting'), 520);
    dash.querySelectorAll('.dash-headline .wm > span').forEach(function (el, i) {
      el.animate(
        [{ transform: 'translateY(110%)' }, { transform: 'none' }],
        { duration: 560, delay: 600 + i * 70, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'backwards' }
      );
    });
    rise(dash.querySelector('.dash-subline'), 860);
    rise(dash.querySelector('.composer'), 940);
    dash.querySelectorAll('.dash-cards .card').forEach(function (el, i) { rise(el, 1020 + i * 70); });
    rise(dash.querySelector('.dash-history'), 1220, 10);
  }

  // Segmented toggle: Chat Mode / Overview
  var segButtons = dash.querySelectorAll('.seg button');
  segButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      segButtons.forEach(function (b) {
        b.classList.toggle('on', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      dash.dataset.mode = btn.dataset.mode;
    });
  });

  // Composer: submit adds the question to Recent Conversations
  var composer = dash.querySelector('.composer');
  var input = dash.querySelector('[data-testid="dash-input"]');
  var histList = dash.querySelector('.hist-list');
  composer.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    var item = document.createElement('div');
    item.className = 'hist-item';
    var q = document.createElement('span');
    q.textContent = text;
    var t = document.createElement('span');
    t.className = 'hist-time';
    t.textContent = 'now';
    item.appendChild(q);
    item.appendChild(t);
    histList.insertBefore(item, histList.firstChild);
    input.value = '';
    input.focus();
  });

  // Quick-action cards prefill the composer
  dash.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', function () {
      input.value = card.dataset.prompt || '';
      input.focus();
    });
  });

  // Search filters recent conversations
  var search = dash.querySelector('[data-testid="dash-search"]');
  search.addEventListener('input', function () {
    var q = search.value.trim().toLowerCase();
    histList.querySelectorAll('.hist-item').forEach(function (item) {
      var match = item.textContent.toLowerCase().indexOf(q) !== -1;
      item.style.display = match ? '' : 'none';
    });
  });

  // Chip dropdowns
  dash.querySelectorAll('.chip-wrap').forEach(function (wrap) {
    var btn = wrap.querySelector('.chip');
    var menuEl = wrap.querySelector('.chip-menu');
    btn.addEventListener('click', function () {
      var open = menuEl.hidden;
      dash.querySelectorAll('.chip-menu').forEach(function (m) { m.hidden = true; });
      menuEl.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    });
    menuEl.querySelectorAll('button').forEach(function (opt) {
      opt.addEventListener('click', function () {
        btn.childNodes[0].textContent = opt.dataset.value + ' ';
        menuEl.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.chip-wrap')) {
      dash.querySelectorAll('.chip-menu').forEach(function (m) { m.hidden = true; });
    }
  });

  // Voice: real speech recognition where supported, otherwise disabled
  var voice = dash.querySelector('[data-testid="dash-voice"]');
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    var rec = new SR();
    rec.lang = 'en-US';
    rec.addEventListener('result', function (e) {
      input.value = e.results[0][0].transcript;
      voice.classList.remove('listening');
    });
    rec.addEventListener('end', function () { voice.classList.remove('listening'); });
    voice.addEventListener('click', function () {
      voice.classList.add('listening');
      try { rec.start(); } catch (err) { rec.stop(); }
    });
  } else {
    voice.disabled = true;
    voice.title = 'Voice input is not supported in this browser';
    voice.style.opacity = '0.5';
  }

  // See More / Show Less
  var seeMore = dash.querySelector('[data-testid="dash-seemore"]');
  seeMore.addEventListener('click', function () {
    var extras = dash.querySelectorAll('.hist-item.extra');
    var showing = seeMore.dataset.open === '1';
    extras.forEach(function (el) { el.hidden = showing; });
    seeMore.dataset.open = showing ? '' : '1';
    seeMore.textContent = showing ? 'See More →' : 'Show Less ↑';
  });

  // Back / forward tiles
  dash.querySelector('[data-testid="dash-back"]').addEventListener('click', function () { history.back(); });
  dash.querySelector('.fwd').addEventListener('click', function () { history.forward(); });

  // Bell + avatar popovers
  var bell = dash.querySelector('[data-testid="dash-bell"]');
  var bellMenu = dash.querySelector('.bell-menu');
  var avatar = dash.querySelector('.avatar');
  var avatarMenu = dash.querySelector('.avatar-menu');
  bell.addEventListener('click', function () {
    var open = bellMenu.hidden;
    bellMenu.hidden = !open; avatarMenu.hidden = true;
    bell.setAttribute('aria-expanded', String(open));
    var dot = bell.querySelector('.bell-dot');
    if (dot) dot.style.display = 'none';
  });
  avatar.addEventListener('click', function () {
    var open = avatarMenu.hidden;
    avatarMenu.hidden = !open; bellMenu.hidden = true;
    avatar.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.bell') && !e.target.closest('.bell-menu')) bellMenu.hidden = true;
    if (!e.target.closest('.avatar') && !e.target.closest('.avatar-menu')) avatarMenu.hidden = true;
  });
})();

/* ═══ Cygnus orbital field + content sections ═══ */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var BLUE = [2, 135, 223], TEAL = [1, 164, 152], GOLD = [250, 151, 32];
  var ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  if (fine) {
    window.addEventListener('mousemove', function (e) {
      ptr.tx = e.clientX;
      ptr.ty = e.clientY;
    }, { passive: true });
  }

  function Field(canvas) {
    var ctx = canvas.getContext('2d');
    var w = 0, h = 0, raf = 0, visible = true;
    var points = [], arcs = [];

    function pick() { var r = Math.random(); return r < 0.1 ? GOLD : r < 0.32 ? TEAL : BLUE; }

    function seed() {
      var count = Math.min(110, Math.max(40, Math.floor((w * h) / 16000)));
      points = []; arcs = [];
      for (var i = 0; i < count; i++) {
        points.push({
          cx: Math.random() * w, cy: Math.random() * h,
          r: 18 + Math.random() * 150,
          a: Math.random() * Math.PI * 2,
          speed: (0.02 + Math.random() * 0.055) * (Math.random() < 0.5 ? 1 : -1),
          size: 0.6 + Math.random() * 1.2,
          alpha: 0.13 + Math.random() * 0.2,
          color: pick()
        });
      }
      for (var j = 0; j < 6; j++) {
        arcs.push({
          cx: w * (0.25 + Math.random() * 0.5), cy: h * (0.2 + Math.random() * 0.6),
          rx: w * (0.28 + Math.random() * 0.5), ry: h * (0.16 + Math.random() * 0.35),
          rot: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.0005,
          alpha: 0.035 + Math.random() * 0.03
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var j = 0; j < arcs.length; j++) {
        var arc = arcs[j];
        arc.rot += arc.spin;
        ctx.save();
        ctx.translate(arc.cx, arc.cy);
        ctx.rotate(arc.rot);
        ctx.strokeStyle = 'rgba(2,135,223,' + arc.alpha + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, arc.rx, arc.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      ptr.x += (ptr.tx - ptr.x) * 0.08;
      ptr.y += (ptr.ty - ptr.y) * 0.08;
      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        p.a += p.speed / 60;
        var x = p.cx + Math.cos(p.a) * p.r;
        var y = p.cy + Math.sin(p.a) * p.r * 0.62;
        var alpha = p.alpha;
        if (fine && ptr.x > -999) {
          var dx = ptr.x - x, dy = ptr.y - y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180 && d > 0.001) {
            var pull = 1 - d / 180;
            x += dx * pull * 0.1;
            y += dy * pull * 0.1;
            alpha = Math.min(0.55, alpha + pull * 0.3);
          }
        }
        var c = p.color;
        ctx.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (alpha * 0.35) + ')';
        ctx.lineWidth = Math.max(0.5, p.size * 0.7);
        ctx.beginPath();
        ctx.ellipse(p.cx, p.cy, p.r, p.r * 0.62, 0, p.a - 0.4, p.a);
        ctx.stroke();
        ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha + ')';
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw();
    }

    function loop() {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', resize);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }, { threshold: 0 }).observe(canvas);
    }
    if (!reduced) raf = requestAnimationFrame(loop);
  }

  var heroCanvas = document.querySelector('.fx-hero');
  if (heroCanvas) Field(heroCanvas);
  var bgCanvas = document.querySelector('.fx-bg');
  if (bgCanvas) Field(bgCanvas);

  /* Section reveals */
  var rvEls = document.querySelectorAll('.rv');
  if (reduced || !('IntersectionObserver' in window)) {
    rvEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          rio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    rvEls.forEach(function (el) { rio.observe(el); });
  }

  /* Capability + project accordions */
  document.querySelectorAll('.cap-row').forEach(function (row) {
    row.addEventListener('click', function () {
      row.setAttribute('aria-expanded', row.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
  });
  document.querySelectorAll('.proj-row').forEach(function (row) {
    row.addEventListener('click', function () {
      var open = row.getAttribute('aria-expanded') === 'true';
      row.setAttribute('aria-expanded', String(!open));
      var detail = row.parentElement.querySelector('.proj-detail');
      if (detail) detail.hidden = open;
    });
  });
})();

/* ═══ Return-to-top floating control ═══ */
(function () {
  'use strict';
  var rt = document.getElementById('returnTop');
  if (!rt) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var main = document.getElementById('rtMain');
  var social = document.getElementById('rtSocial');
  var socialBtn = document.getElementById('rtSocialBtn');
  var optionals = rt.querySelectorAll('.rt-btn, .rt-soc');

  function syncTab(open) {
    optionals.forEach(function (el) { el.tabIndex = open ? 0 : -1; });
  }
  function setOpen(open) {
    rt.classList.toggle('open', open);
    main.setAttribute('aria-expanded', String(open));
    if (!open) {
      social.classList.remove('open');
      socialBtn.setAttribute('aria-expanded', 'false');
    }
    syncTab(open);
  }
  function toTop() {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }

  syncTab(false);

  main.addEventListener('click', function () {
    if (fine) {
      toTop();
      return;
    }
    if (!rt.classList.contains('open')) setOpen(true);
    else {
      toTop();
      setOpen(false);
    }
  });

  if (fine) {
    rt.addEventListener('mouseenter', function () { setOpen(true); });
    rt.addEventListener('mouseleave', function () { setOpen(false); });
    rt.addEventListener('focusin', function () { setOpen(true); });
    rt.addEventListener('focusout', function (e) {
      if (!rt.contains(e.relatedTarget)) setOpen(false);
    });
  }

  socialBtn.addEventListener('click', function () {
    var open = !social.classList.contains('open');
    social.classList.toggle('open', open);
    socialBtn.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('pointerdown', function (e) {
    if (!rt.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  rt.querySelectorAll('.is-ph').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); });
  });
})();

