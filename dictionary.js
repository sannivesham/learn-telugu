// dictionary.js — powers the searchable word bank.
// Flattened from every lesson's vocabulary so far. As new lessons get built,
// just append their vocab arrays here with the matching lessonTag.

const wordBank = [
  // Lesson 1: Vowels
  { te: 'అ', translit: 'a', en: "a (as in 'about')", lesson: 'Vowels' },
  { te: 'ఆ', translit: 'aa', en: "aa (as in 'father')", lesson: 'Vowels' },
  { te: 'ఇ', translit: 'i', en: "i (as in 'bit')", lesson: 'Vowels' },
  { te: 'ఈ', translit: 'ii', en: "ee (as in 'feet')", lesson: 'Vowels' },
  { te: 'ఉ', translit: 'u', en: "u (as in 'put')", lesson: 'Vowels' },
  { te: 'ఊ', translit: 'uu', en: "oo (as in 'boot')", lesson: 'Vowels' },
  { te: 'ఋ', translit: 'ru', en: "ri (rare in modern use)", lesson: 'Vowels' },
  { te: 'ఎ', translit: 'e', en: "e (as in 'bet')", lesson: 'Vowels' },
  { te: 'ఏ', translit: 'ee', en: "ay (as in 'may')", lesson: 'Vowels' },
  { te: 'ఐ', translit: 'ai', en: "ai (as in 'aisle')", lesson: 'Vowels' },
  { te: 'ఒ', translit: 'o', en: "o (as in 'pot')", lesson: 'Vowels' },
  { te: 'ఓ', translit: 'oo', en: "o (as in 'go')", lesson: 'Vowels' },
  { te: 'ఔ', translit: 'au', en: "ow (as in 'cow')", lesson: 'Vowels' },
  { te: 'అం', translit: 'am', en: "am (nasal, anusvara)", lesson: 'Vowels' },
  { te: 'అః', translit: 'aha', en: "aha (aspirated, visarga)", lesson: 'Vowels' }
];

document.addEventListener('DOMContentLoaded', () => {
  renderResults(wordBank);
  buildLessonFilters();

  const searchInput = document.getElementById('dictSearch');
  searchInput.addEventListener('input', applyFilters);

  document.getElementById('dictFilters').addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('filter-chip--active'));
    chip.classList.add('filter-chip--active');
    applyFilters();
  });
});

function buildLessonFilters() {
  const lessons = ['All', ...new Set(wordBank.map(w => w.lesson))];
  const wrap = document.getElementById('dictFilters');
  wrap.innerHTML = lessons.map((l, i) =>
    `<button type="button" class="filter-chip${i === 0 ? ' filter-chip--active' : ''}" data-lesson="${l}">${l}</button>`
  ).join('');
}

function applyFilters() {
  const query = document.getElementById('dictSearch').value.trim().toLowerCase();
  const activeChip = document.querySelector('.filter-chip--active');
  const lessonFilter = activeChip ? activeChip.dataset.lesson : 'All';

  const filtered = wordBank.filter(w => {
    const matchesLesson = lessonFilter === 'All' || w.lesson === lessonFilter;
    const matchesQuery = !query ||
      w.te.includes(query) ||
      w.translit.toLowerCase().includes(query) ||
      w.en.toLowerCase().includes(query);
    return matchesLesson && matchesQuery;
  });

  renderResults(filtered);
}

function renderResults(list) {
  const grid = document.getElementById('dictGrid');
  const emptyState = document.getElementById('dictEmpty');
  const countEl = document.getElementById('dictCount');

  countEl.textContent = `${list.length} word${list.length === 1 ? '' : 's'}`;

  if (list.length === 0) {
    grid.innerHTML = '';
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  grid.innerHTML = list.map(w => `
    <button type="button" class="dict-card" data-te="${w.te}" aria-label="Play pronunciation of ${w.te}">
      <span class="dict-lesson-tag">${w.lesson}</span>
      <span class="dict-play">🔊</span>
      <span class="dict-te">${w.te}</span>
      <span class="mono-tag">${w.translit}</span>
      <span class="dict-en">${w.en}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.dict-card').forEach(card => {
    card.addEventListener('click', () => speakTelugu(card.dataset.te, card));
  });
}

function speakTelugu(text, cardEl) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'te-IN';
  utter.rate = 0.85;
  if (cardEl) cardEl.classList.add('dict-playing');
  utter.onend = () => { if (cardEl) cardEl.classList.remove('dict-playing'); };
  utter.onerror = () => { if (cardEl) cardEl.classList.remove('dict-playing'); };
  window.speechSynthesis.speak(utter);
}
