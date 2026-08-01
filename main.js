// Sannivesham Aksharam — main.js
// Runs on every page: mobile nav toggle + hero letter-cycle + Firebase Auth

import {
  auth,
  onAuthStateChanged
} from "./firebase.js";

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initLetterCycle();
  initAuth();
});

// ---------- MOBILE NAV (hamburger menu) ----------
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  const overlay = document.getElementById('navOverlay');
  if (!toggle || !nav || !overlay) return;

  const closeNav = () => {
    toggle.classList.remove('is-open');
    nav.classList.remove('is-open');
    overlay.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-locked');
  };

  const openNav = () => {
    toggle.classList.add('is-open');
    nav.classList.add('is-open');
    overlay.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-locked');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('is-open');
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  overlay.addEventListener('click', closeNav);

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) {
      closeNav();
    }
  });
}

// ---------- HERO LETTER CYCLE (index.html only) ----------
function initLetterCycle() {

  const letterEl = document.getElementById('cycleLetter');
  const translitEl = document.getElementById('cycleTranslit');

  if (!letterEl || !translitEl) return;

  const aksharamu = [
    { te: 'అ', en: 'a' },
    { te: 'ఆ', en: 'aa' },
    { te: 'ఇ', en: 'i' },
    { te: 'ఈ', en: 'ii' },
    { te: 'ఉ', en: 'u' },
    { te: 'ఊ', en: 'uu' },
    { te: 'ఋ', en: 'ru' },
    { te: 'ఎ', en: 'e' },
    { te: 'ఏ', en: 'ee' },
    { te: 'ఐ', en: 'ai' },
    { te: 'ఒ', en: 'o' },
    { te: 'ఓ', en: 'oo' },
    { te: 'ఔ', en: 'au' },
    { te: 'క', en: 'ka' },
    { te: 'ఖ', en: 'kha' },
    { te: 'గ', en: 'ga' },
    { te: 'ఘ', en: 'gha' },
    { te: 'చ', en: 'cha' },
    { te: 'జ', en: 'ja' },
    { te: 'ట', en: 'Ta' },
    { te: 'డ', en: 'Da' },
    { te: 'ణ', en: 'Na' },
    { te: 'త', en: 'ta' },
    { te: 'ద', en: 'da' },
    { te: 'న', en: 'na' },
    { te: 'ప', en: 'pa' },
    { te: 'బ', en: 'ba' },
    { te: 'మ', en: 'ma' },
    { te: 'య', en: 'ya' },
    { te: 'ర', en: 'ra' },
    { te: 'ల', en: 'la' },
    { te: 'వ', en: 'va' },
    { te: 'శ', en: 'sha' },
    { te: 'స', en: 'sa' },
    { te: 'హ', en: 'ha' },
    { te: 'ళ', en: 'La' },
    { te: 'ఱ', en: 'Ra' }
  ];

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const intervalMs = prefersReducedMotion ? 3200 : 1300;

  let i = 0;

  setInterval(() => {

    i = (i + 1) % aksharamu.length;

    letterEl.classList.add('letter-swap');
    translitEl.classList.add('letter-swap');

    setTimeout(() => {

      letterEl.textContent = aksharamu[i].te;
      translitEl.textContent = aksharamu[i].en;

      letterEl.classList.remove('letter-swap');
      translitEl.classList.remove('letter-swap');

    }, 350);

  }, intervalMs);

}

// ---------- FIREBASE AUTH ----------
function initAuth() {

  const authLink = document.getElementById("authLink");

  if (!authLink) return;

  onAuthStateChanged(auth, (user) => {

    if (user) {

      authLink.textContent = "Profile";
      authLink.href = "profile.html";

    } else {

      authLink.textContent = "Sign In";
      authLink.href = "signin.html";

    }

  });

}
