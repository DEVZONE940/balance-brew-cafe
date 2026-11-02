/* The Balance Brew Cafe — motion, tabs and reservation handoff */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- intro ---------- */
  var intro = $('#intro');
  if (intro) {
    var dismiss = function () {
      intro.classList.add('done');
      setTimeout(function () { if (intro.parentNode) intro.parentNode.removeChild(intro); }, 800);
    };
    if (reduced) { if (intro.parentNode) intro.parentNode.removeChild(intro); }
    else { setTimeout(dismiss, 1250); }
  }

  /* ---------- split headline ---------- */
  $$('.split').forEach(function (el) {
    var text = el.textContent.trim();
    el.textContent = '';
    var i = 0;
    text.split(' ').forEach(function (word, wi, arr) {
      var w = document.createElement('span');
      w.className = 'word';
      w.style.display = 'inline-block';
      w.style.whiteSpace = 'nowrap';
      Array.prototype.forEach.call(word, function (ch) {
        var s = document.createElement('span');
        s.className = 'ch';
        s.textContent = ch;
        s.style.animationDelay = (reduced ? 0 : 0.55 + i * 0.028) + 's';
        w.appendChild(s);
        i++;
      });
      el.appendChild(w);
      if (wi < arr.length - 1) {
        el.appendChild(document.createTextNode(' '));
        i++;
      }
    });
    el.setAttribute('aria-label', text);
  });

  /* ---------- header ---------- */
  var header = $('#siteHeader');
  var progress = $('#progress span');
  var onScroll = function () {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('stuck', y > 40);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + '%';
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- nav ---------- */
  var burger = $('#burger'), nav = $('#nav');
  if (burger && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function () { setOpen(burger.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); burger.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 760 && nav.classList.contains('open')) setOpen(false); });
  }

  /* ---------- reveals ---------- */
  var revealables = $$('.reveal, .reveal-img');
  if (!('IntersectionObserver' in window) || reduced) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = el.parentElement ? Array.prototype.slice.call(el.parentElement.children) : [];
        var idx = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = Math.min(idx * 70, 280) + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- counters ---------- */
  var counters = $$('[data-count]');
  var runCounter = function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '';
    if (reduced) { el.textContent = prefix + target.toFixed(dec); return; }
    var start = null, dur = 1400;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = prefix + (dec ? val.toFixed(dec) : Math.round(val).toLocaleString('en-IN'));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    if (!('IntersectionObserver' in window)) counters.forEach(runCounter);
    else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ---------- parallax ---------- */
  var parallaxEls = $$('[data-parallax]');
  if (parallaxEls.length && !reduced) {
    var ticking = false;
    var applyParallax = function () {
      var y = window.scrollY || window.pageYOffset;
      parallaxEls.forEach(function (el) {
        var f = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
        el.style.transform = 'translate3d(0,' + (y * f).toFixed(2) + 'px,0)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(applyParallax); }
    }, { passive: true });
    applyParallax();
  }

  /* ---------- menu tabs ---------- */
  var tabs = $$('.tab');
  var panels = $$('.panel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var key = tab.getAttribute('data-tab');
      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      panels.forEach(function (p) {
        var active = p.getAttribute('data-panel') === key;
        p.classList.toggle('is-active', active);
        if (active) {
          $$('.dish', p).forEach(function (d) {
            d.style.animation = 'none';
            void d.offsetWidth;
            d.style.animation = '';
          });
        }
      });
    });
  });

  /* ---------- forms ---------- */
  var WA = '918446853942';

  var setMsg = function (el, text, ok) {
    if (!el) return;
    el.textContent = text;
    el.classList.toggle('ok', !!ok);
  };

  var digits = function (v) { return (v || '').replace(/\D/g, ''); };

  var mark = function (input, valid) {
    input.classList.toggle('invalid', !valid);
    return valid;
  };

  var openWa = function (text) {
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
  };

  var bookForm = $('#bookForm');
  if (bookForm) {
    var dateEl = $('#bk-date');
    if (dateEl) {
      var today = new Date();
      var iso = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
      dateEl.min = iso;
      dateEl.value = iso;
    }
    bookForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msgEl = $('#bookMsg');
      var name = $('#bk-name'), phone = $('#bk-phone'), date = $('#bk-date'), time = $('#bk-time');
      var guests = $('#bk-guests'), note = $('#bk-note');

      var okName = mark(name, name.value.trim().length > 1);
      var okPhone = mark(phone, digits(phone.value).length >= 10);
      var okDate = mark(date, !!date.value);
      var okTime = mark(time, !!time.value);

      if (!(okName && okPhone && okDate && okTime)) {
        setMsg(msgEl, 'Please add your name, a 10-digit phone number, the date and the time.', false);
        (!okName ? name : !okPhone ? phone : !okDate ? date : time).focus();
        return;
      }

      var when = '';
      try {
        when = new Date(date.value + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
      } catch (err) { when = date.value; }

      var lines = [
        'Table request — The Balance Brew Cafe',
        '',
        'Name: ' + name.value.trim(),
        'Phone: ' + phone.value.trim(),
        'Guests: ' + guests.value,
        'Date: ' + when,
        'Time: ' + time.value
      ];
      if (note.value.trim()) lines.push('Notes: ' + note.value.trim());

      openWa(lines.join('\n'));
      setMsg(msgEl, 'Opening WhatsApp with your table request — send it and the cafe will confirm.', true);
    });

    $$('input, select', bookForm).forEach(function (el) {
      el.addEventListener('input', function () { el.classList.remove('invalid'); });
    });
  }

  var memberForm = $('#memberForm');
  if (memberForm) {
    memberForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msgEl = $('#memberMsg');
      var name = $('#mb-name'), phone = $('#mb-phone');
      var okName = mark(name, name.value.trim().length > 1);
      var okPhone = mark(phone, digits(phone.value).length >= 10);

      if (!(okName && okPhone)) {
        setMsg(msgEl, 'Please add your name and a 10-digit phone number.', false);
        (!okName ? name : phone).focus();
        return;
      }

      openWa([
        'The Regulars — membership signup',
        '',
        'Name: ' + name.value.trim(),
        'Phone: ' + phone.value.trim()
      ].join('\n'));
      setMsg(msgEl, 'Opening WhatsApp to send your signup — the cafe will add you to the list.', true);
    });

    $$('input', memberForm).forEach(function (el) {
      el.addEventListener('input', function () { el.classList.remove('invalid'); });
    });
  }
})();
