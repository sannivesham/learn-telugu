// lesson.js — powers a single lesson page.
// For now this is hardcoded to Lesson 1 (Vowels). Once Firebase is wired up,
// this data will come from Firestore instead, keyed by a ?lesson= URL param.

const lessonData = {
  id: 'l1-vowels',
  vocabulary: [
    { te: 'అ', translit: 'a',   en: "a (as in 'about')" },
    { te: 'ఆ', translit: 'aa',  en: "aa (as in 'father')" },
    { te: 'ఇ', translit: 'i',   en: "i (as in 'bit')" },
    { te: 'ఈ', translit: 'ii',  en: "ee (as in 'feet')" },
    { te: 'ఉ', translit: 'u',   en: "u (as in 'put')" },
    { te: 'ఊ', translit: 'uu',  en: "oo (as in 'boot')" },
    { te: 'ఋ', translit: 'ru',  en: "ri (rare in modern use)" },
    { te: 'ఎ', translit: 'e',   en: "e (as in 'bet')" },
    { te: 'ఏ', translit: 'ee',  en: "ay (as in 'may')" },
    { te: 'ఐ', translit: 'ai',  en: "ai (as in 'aisle')" },
    { te: 'ఒ', translit: 'o',   en: "o (as in 'pot')" },
    { te: 'ఓ', translit: 'oo',  en: "o (as in 'go')" },
    { te: 'ఔ', translit: 'au',  en: "ow (as in 'cow')" },
    { te: 'అం', translit: 'am', en: "am (nasal, anusvara)" },
    { te: 'అః', translit: 'aha',en: "aha (aspirated, visarga)" }
  ],
  quiz: [
    {
      question: "Which vowel makes the 'aa' sound, as in 'father'?",
      options: ['అ', 'ఆ', 'ఇ', 'ఈ'],
      answer: 'ఆ'
    },
    {
      question: "What does 'ఉ' sound like?",
      options: ['ee', 'u (as in put)', 'o', 'ai'],
      answer: 'u (as in put)'
    },
    {
      question: "Which one is the nasal sound 'am'?",
      options: ['అః', 'అం', 'ఔ', 'ఐ'],
      answer: 'అం'
    },
    {
      question: "Which vowel sounds like 'ow' in 'cow'?",
      options: ['ఓ', 'ఒ', 'ఔ', 'ఏ'],
      answer: 'ఔ'
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  renderVocabGrid();
  initQuiz();
});

// ---------- VOCAB GRID + PRONUNCIATION ----------
function renderVocabGrid() {
  const grid = document.getElementById('vocabGrid');
  if (!grid) return;

  lessonData.vocabulary.forEach((word) => {
    const card = document.createElement('button');
    card.className = 'vocab-card';
    card.type = 'button';
    card.setAttribute('aria-label', `Play pronunciation of ${word.te}`);
    card.innerHTML = `
      <span class="vocab-play">🔊</span>
      <span class="vocab-te">${word.te}</span>
      <span class="mono-tag">${word.translit}</span>
      <span class="vocab-en">${word.en}</span>
    `;
    card.addEventListener('click', () => speakTelugu(word.te, card));
    grid.appendChild(card);
  });
}

function speakTelugu(text, cardEl) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'te-IN';
  utter.rate = 0.85;

  if (cardEl) cardEl.classList.add('vocab-playing');
  utter.onend = () => { if (cardEl) cardEl.classList.remove('vocab-playing'); };
  utter.onerror = () => { if (cardEl) cardEl.classList.remove('vocab-playing'); };

  window.speechSynthesis.speak(utter);
}

// ---------- QUIZ ----------
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function initQuiz() {
  const dotsWrap = document.getElementById('quizDots');
  if (!dotsWrap) return;

  dotsWrap.innerHTML = lessonData.quiz.map((_, i) =>
    `<span class="quiz-dot" data-i="${i}"></span>`
  ).join('');

  document.getElementById('quizRetry').addEventListener('click', () => {
    quizIndex = 0;
    quizScore = 0;
    document.getElementById('quizResult').hidden = true;
    document.getElementById('quizCard').hidden = false;
    renderQuizStep();
  });

  renderQuizStep();
}

function renderQuizStep() {
  quizAnswered = false;
  const q = lessonData.quiz[quizIndex];
  document.getElementById('quizStepLabel').textContent = `Question ${quizIndex + 1} of ${lessonData.quiz.length}`;
  document.getElementById('quizQuestion').textContent = q.question;
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('quizFeedback').className = 'quiz-feedback';

  const optionsWrap = document.getElementById('quizOptions');
  optionsWrap.innerHTML = '';
  q.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(opt, btn));
    optionsWrap.appendChild(btn);
  });

  document.querySelectorAll('.quiz-dot').forEach((dot, i) => {
    dot.classList.toggle('quiz-dot--active', i === quizIndex);
    dot.classList.toggle('quiz-dot--done', i < quizIndex);
  });
}

function handleAnswer(selected, btnEl) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = lessonData.quiz[quizIndex];
  const correct = selected === q.answer;
  const feedback = document.getElementById('quizFeedback');

  document.querySelectorAll('.quiz-option').forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === q.answer) btn.classList.add('quiz-option--correct');
  });

  if (correct) {
    quizScore++;
    btnEl.classList.add('quiz-option--correct');
    feedback.textContent = 'Correct!';
    feedback.classList.add('quiz-feedback--good');
  } else {
    btnEl.classList.add('quiz-option--wrong');
    feedback.textContent = `Not quite — the answer is ${q.answer}.`;
    feedback.classList.add('quiz-feedback--bad');
  }

  setTimeout(() => {
    if (quizIndex < lessonData.quiz.length - 1) {
      quizIndex++;
      renderQuizStep();
    } else {
      showQuizResult();
    }
  }, 1100);
}

function showQuizResult() {
  document.getElementById('quizCard').hidden = true;
  const resultWrap = document.getElementById('quizResult');
  resultWrap.hidden = false;

  const total = lessonData.quiz.length;
  const passed = quizScore >= Math.ceil(total * 0.75);

  document.getElementById('quizResultTitle').textContent =
    passed ? `Nice work — ${quizScore}/${total}` : `You got ${quizScore}/${total}`;
  document.getElementById('quizResultBody').textContent = passed
    ? 'You know your vowels. Ready for consonants next.'
    : 'Give it another go — the vowels will stick with a bit more practice.';

  const nextBtn = document.getElementById('nextLessonBtn');
  if (passed) {
    nextBtn.classList.remove('btn-disabled');
  }
}
