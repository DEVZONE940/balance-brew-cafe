/* The Balance Brew Cafe — interactions (progressive enhancement) */
(function () {
  'use strict';

  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    };

    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setOpen(false);
        burger.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 720 && nav.classList.contains('open')) setOpen(false);
    });
  }

  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () { header.classList.toggle('stuck', window.scrollY > 10); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var reveals = document.querySelectorAll('.reveal');
  var showAll = function () {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('in'); });
  };

  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showAll();
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var siblings = el.parentElement ? Array.prototype.slice.call(el.parentElement.children) : [];
      var idx = Math.max(0, siblings.indexOf(el));
      el.style.transitionDelay = Math.min(idx * 80, 320) + 'ms';
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });

  Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
})();
