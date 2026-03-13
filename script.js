/* ─────────────────────────────────────────────
   TypeForge — script.js
   Full typing speed test logic
   ───────────────────────────────────────────── */

'use strict';

// ─── Word bank ────────────────────────────────
const WORD_BANK = [
  'the','be','to','of','and','a','in','that','have','it','for','not','on',
  'with','as','you','do','at','this','but','his','by','from','they','we',
  'say','her','she','or','an','will','my','one','all','would','there','their',
  'what','so','up','out','if','about','who','get','which','go','me','when',
  'make','can','like','time','no','just','him','know','take','people','into',
  'year','your','good','some','could','them','see','other','than','then','now',
  'look','only','come','over','think','also','back','after','use','two','how',
  'our','work','first','well','way','even','new','want','because','any','these',
  'give','day','most','great','between','need','large','often','hand','high',
  'place','hold','turn','much','before','move','right','old','same','tell',
  'does','set','three','air','play','small','end','put','home','read','must',
  'big','such','follow','act','why','ask','men','change','light','kind','off',
  'house','try','again','point','world','near','build','earth','head','stand',
  'own','found','answer','school','grow','study','still','learn','plant','cover',
  'food','sun','four','state','keep','eye','never','last','let','thought','city',
  'tree','hard','start','might','story','far','sea','draw','left','late','run',
  'while','close','night','real','life','few','open','seem','together','next',
  'white','children','begin','walk','paper','always','music','those','both',
  'mark','book','letter','until','mile','river','car','feet','care','second',
  'enough','young','ready','above','ever','red','list','though','feel','talk',
  'bird','soon','body','dog','family','door','short','pass','since','top',
  'whole','space','heard','best','hour','better','true','during','hundred',
  'five','remember','early','ground','interest','reach','fast','sing','table',
  'travel','less','morning','simple','several','toward','war','lay','slow',
  'love','person','money','serve','appear','road','map','rain','rule','pull',
  'cold','voice','power','town','fine','drive','plan','possible','page','still',
  'star','box','noun','field','rest','able','pound','done','beauty','drive',
  'stood','contain','front','teach','week','final','gave','green','oh','quick',
  'develop','ocean','warm','free','minute','strong','special','behind','clear',
  'tail','produce','fact','street','inch','multiply','nothing','course','stay',
  'wheel','full','force','blue','object','decide','surface','deep','moon','island',
  'foot','system','busy','test','record','boat','common','gold','possible','plane',
  'age','dry','wonder','laugh','thousand','ran','check','game','shape','equate',
  'miss','brought','heat','snow','tire','bring','yes','distant','fill','east',
  'paint','language','among','grand','ball','yet','wave','drop','heart','am',
  'present','heavy','dance','engine','position','arm','wide','sail','material',
  'size','vary','settle','speak','weight','general','ice','matter','circle',
  'pair','include','divide','syllable','felt','perhaps','pick','sudden','count',
  'square','reason','length','represent','art','subject','region','energy','hunt',
  'probable','bed','brother','egg','ride','cell','believe','fraction','forest',
  'sit','race','window','store','summer','train','sleep','prove','lone','leg',
  'exercise','wall','catch','mount','wish','sky','board','joy','winter','sat',
  'written','wild','instrument','kept','glass','grass','cow','job','edge',
  'sign','visit','past','soft','fun','bright','gas','weather','month','million',
  'bear','finish','happy','hope','flower','clothe','strange','gone','jump','baby',
  'eight','village','meet','root','buy','raise','solve','metal','whether','push',
  'seven','paragraph','third','held','hair','describe','cook','floor','either',
  'result','burn','hill','safe','cat','century','consider','type','law','bit',
  'coast','copy','phrase','silent','tall','sand','soil','roll','temperature',
  'finger','industry','value','fight','lie','beat','excite','natural','view',
  'plain','oh','quickly','became','grow','skin','valley','cents','key','iron'
];

const QUOTES = [
  "The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks and then starting on the first one.",
  "You miss one hundred percent of the shots you never take. So take the shot even when you are not ready and learn from the experience.",
  "Hard work beats talent when talent fails to work hard. The most important thing is to try and inspire people so that they can be great in whatever they want to do.",
  "Success is not final and failure is not fatal. It is the courage to continue that truly counts in the end.",
  "The only way to do great work is to love what you do. If you have not found it yet keep looking and do not settle.",
  "In the middle of every difficulty lies opportunity. The measure of intelligence is the ability to change and adapt quickly.",
  "It is not the strongest of the species that survive nor the most intelligent but the ones most responsive to change.",
  "Two roads diverged in a wood and I took the one less traveled by and that has made all the difference in my life.",
  "Programming is not about typing it is about thinking. The best code is the code you never have to write again.",
  "Practice makes progress. Keep typing to improve your speed and accuracy every single day. Small improvements add up over time.",
  "Web development combines creativity with logic. Build small projects every day and your skills will compound rapidly over months.",
  "Typing fast is great but typing accurately will get you further in the long run. Accuracy and speed must grow together.",
  "The beautiful thing about learning is that no one can take it away from you. Knowledge compounds just like interest.",
  "Do not watch the clock. Do what it does. Keep going no matter what obstacles stand in your way today.",
  "Believe you can and you are halfway there. The rest is just showing up and putting in the consistent daily work."
];

// ─── DOM refs ────────────────────────────────
const wordsEl      = document.getElementById('words');
const wordsOuter   = document.getElementById('wordsOuter');
const caretEl      = document.getElementById('caret');
const typingInput  = document.getElementById('typingInput');
const typingHint   = document.getElementById('typingHint');
const typingSection= document.getElementById('typingSection');
const progressFill = document.getElementById('progressFill');

const statWpm    = document.getElementById('statWpm');
const statTime   = document.getElementById('statTime');
const statAcc    = document.getElementById('statAcc');
const statErrors = document.getElementById('statErrors');

const resultsEl    = document.getElementById('results');
const resultWpm    = document.getElementById('resultWpm');
const resultAcc    = document.getElementById('resultAcc');
const resultCpm    = document.getElementById('resultCpm');
const resultErrors = document.getElementById('resultErrors');
const resultBest   = document.getElementById('resultBest');
const tryAgainBtn  = document.getElementById('tryAgainBtn');
const newTestBtn   = document.getElementById('newTestBtn');
const wpmChartEl   = document.getElementById('wpmChart');

// ─── State ───────────────────────────────────
let words         = [];       // array of word strings to type
let wordElements  = [];       // DOM span elements for each word
let charElements  = [];       // 2D array: charElements[wordIdx][charIdx]

let currentWordIdx = 0;
let currentCharIdx = 0;
let currentInput   = '';      // what user has typed for current word

let started  = false;
let finished = false;
let timer    = null;
let duration = 60;
let elapsed  = 0;            // seconds elapsed
let tickMs   = 100;

let correctWords = 0;
let totalTypedChars = 0;
let correctChars    = 0;
let errorCount      = 0;
let wpmHistory      = [];    // {t, wpm} samples for chart
let mode            = 'words';

// ─── Init ────────────────────────────────────
function init() {
  generateTest();
  renderWords();
  resetState();
  updateStats();
  updateCaret();
  typingHint.classList.remove('faded');
  resultsEl.classList.add('hidden');
}

function generateTest() {
  if (mode === 'quotes') {
    const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    words = quote.split(' ').filter(w => w.length > 0);
  } else {
    // shuffle + pick ~100 words (re-sample if we run out)
    const pool = [...WORD_BANK].sort(() => Math.random() - .5);
    words = [];
    while (words.length < 80) {
      words.push(...pool.slice(0, 80 - words.length));
    }
    words = words.slice(0, 80);
  }
}

function renderWords() {
  wordsEl.innerHTML = '';
  wordElements = [];
  charElements = [];

  words.forEach((word, wi) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    wordSpan.dataset.index = wi;

    const charSpans = [];
    for (const ch of word) {
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch;
      wordSpan.appendChild(s);
      charSpans.push(s);
    }

    wordsEl.appendChild(wordSpan);
    wordElements.push(wordSpan);
    charElements.push(charSpans);
  });

  // Mark first word active
  if (wordElements[0]) wordElements[0].classList.add('active');
}

function resetState() {
  currentWordIdx = 0;
  currentCharIdx = 0;
  currentInput   = '';
  started   = false;
  finished  = false;
  elapsed   = 0;
  correctWords     = 0;
  totalTypedChars  = 0;
  correctChars     = 0;
  errorCount       = 0;
  wpmHistory       = [];

  clearInterval(timer);
  timer = null;

  progressFill.style.width = '0%';
  wordsEl.style.transform = 'translateY(0)';

  // reset stat colors
  statTime.classList.add('accent-text');
  statTime.classList.remove('danger-text');
}

// ─── Start / End ─────────────────────────────
function startTest() {
  if (started || finished) return;
  started = true;
  typingHint.classList.add('faded');

  const startMs = Date.now();

  timer = setInterval(() => {
    elapsed = (Date.now() - startMs) / 1000;
    const remaining = Math.max(0, duration - elapsed);

    // Progress bar
    progressFill.style.width = ((elapsed / duration) * 100).toFixed(1) + '%';

    // Color time red when low
    if (remaining <= 10) {
      statTime.classList.remove('accent-text');
      statTime.classList.add('danger-text');
    }

    // Update time display
    statTime.textContent = Math.ceil(remaining);

    // Snapshot WPM every second
    if (wpmHistory.length < Math.floor(elapsed)) {
      const liveWPM = calcWPM();
      wpmHistory.push({ t: Math.floor(elapsed), wpm: liveWPM });
    }

    updateStats();

    if (remaining <= 0) endTest();
  }, tickMs);
}

function endTest() {
  clearInterval(timer);
  timer = null;
  finished = true;
  started  = false;

  typingInput.blur();

  const finalWPM    = calcWPM();
  const finalAcc    = calcAccuracy();
  const finalCPM    = calcCPM();
  const finalErrors = errorCount;

  // Personal best (localStorage)
  const key   = `tf_best_${duration}_${mode}`;
  let best = parseInt(localStorage.getItem(key) || '0', 10);
  if (finalWPM > best) {
    best = finalWPM;
    localStorage.setItem(key, best);
  }

  // Populate results
  resultWpm.textContent    = finalWPM;
  resultAcc.textContent    = finalAcc + '%';
  resultCpm.textContent    = finalCPM;
  resultErrors.textContent = finalErrors;
  resultBest.textContent   = best;

  // Draw chart
  requestAnimationFrame(() => drawChart());

  resultsEl.classList.remove('hidden');
  progressFill.style.width = '100%';
}

// ─── Calculations ─────────────────────────────
function calcWPM() {
  const mins = Math.max(elapsed, 1) / 60;
  return Math.round(correctChars / 5 / mins) || 0;
}

function calcCPM() {
  const mins = Math.max(elapsed, 1) / 60;
  return Math.round(correctChars / mins) || 0;
}

function calcAccuracy() {
  if (totalTypedChars === 0) return 100;
  return Math.round((correctChars / totalTypedChars) * 100);
}

// ─── Input handling ───────────────────────────
typingSection.addEventListener('click', () => {
  if (!finished) typingInput.focus();
});

typingInput.addEventListener('focus', () => typingSection.classList.add('active'));
typingInput.addEventListener('blur',  () => typingSection.classList.remove('active'));

typingInput.addEventListener('input', (e) => {
  if (finished) return;
  if (!started) startTest();

  const val = typingInput.value;

  // Space pressed → submit current word
  if (val.endsWith(' ')) {
    submitWord();
    return;
  }

  currentInput = val;
  currentCharIdx = val.length;

  renderCurrentWord(val);
  updateStats();
  updateCaret();
  scrollToCurrentLine();

  // Blink behavior
  caretEl.classList.add('typing');
  clearTimeout(caretEl._blinkTimer);
  caretEl._blinkTimer = setTimeout(() => caretEl.classList.remove('typing'), 800);
});

typingInput.addEventListener('keydown', (e) => {
  if (finished) return;

  // Backspace at start of word → go back to previous word
  if (e.key === 'Backspace' && typingInput.value === '' && currentWordIdx > 0) {
    e.preventDefault();
    goBackWord();
  }
});

function renderCurrentWord(typed) {
  const wordEl = wordElements[currentWordIdx];
  const chars  = charElements[currentWordIdx];
  if (!wordEl || !chars) return;

  let localCorrect = 0;
  let localErrors  = 0;

  chars.forEach((sp, i) => {
    sp.classList.remove('correct', 'incorrect');
    if (i < typed.length) {
      if (typed[i] === sp.textContent) {
        sp.classList.add('correct');
        localCorrect++;
      } else {
        sp.classList.add('incorrect');
        localErrors++;
      }
    }
  });

  // Extra chars beyond word length
  // Remove old extra spans
  const oldExtras = wordEl.querySelectorAll('.extra');
  oldExtras.forEach(sp => sp.remove());

  if (typed.length > chars.length) {
    const extras = typed.slice(chars.length);
    extras.split('').forEach(ch => {
      const s = document.createElement('span');
      s.className = 'char extra';
      s.textContent = ch;
      wordEl.appendChild(s);
    });
    localErrors += extras.length;
  }
}

function submitWord() {
  const typed   = typingInput.value.trim();
  const target  = words[currentWordIdx] || '';
  const wordEl  = wordElements[currentWordIdx];

  // Count correct chars in this word (re-evaluate)
  let wCorrect = 0;
  const chars  = charElements[currentWordIdx] || [];
  chars.forEach((sp, i) => {
    totalTypedChars++;
    if (typed[i] === sp.textContent) {
      wCorrect++;
      correctChars++;
    }
  });

  // Extra typed chars count as errors
  if (typed.length > target.length) {
    const extra = typed.length - target.length;
    errorCount     += extra;
    totalTypedChars+= extra;
  }

  // Mark word correct/incorrect
  if (wordEl) {
    const isExact = typed === target;
    if (isExact) {
      correctWords++;
    } else {
      wordEl.classList.add('incorrect-word');
      // count mismatches as errors
      for (let i = 0; i < target.length; i++) {
        if ((typed[i] || '') !== target[i]) errorCount++;
      }
    }
    wordEl.classList.remove('active');
  }

  // Advance to next word
  currentWordIdx++;
  currentInput   = '';
  currentCharIdx = 0;
  typingInput.value = '';

  if (currentWordIdx >= words.length) {
    // Ran out of words — add more (words mode) or end
    if (mode === 'words') {
      appendMoreWords();
    } else {
      endTest();
      return;
    }
  }

  // Activate next word
  if (wordElements[currentWordIdx]) {
    wordElements[currentWordIdx].classList.add('active');
  }

  updateStats();
  updateCaret();
  scrollToCurrentLine();
}

function goBackWord() {
  // Remove extra spans from current word before going back
  const curWordEl = wordElements[currentWordIdx];
  if (curWordEl) {
    curWordEl.querySelectorAll('.extra').forEach(s => s.remove());
    charElements[currentWordIdx].forEach(s => s.classList.remove('correct','incorrect'));
    curWordEl.classList.remove('active');
  }

  currentWordIdx--;
  const prevWord  = words[currentWordIdx];
  const prevWordEl = wordElements[currentWordIdx];

  if (prevWordEl) {
    // Restore previous word state to all-not-typed
    prevWordEl.classList.remove('incorrect-word', 'active');
    prevWordEl.classList.add('active');
    // Clear mark
    charElements[currentWordIdx].forEach(s => s.classList.remove('correct','incorrect'));
  }

  currentInput   = prevWord; // reload the word text so user re-types it
  typingInput.value = prevWord;
  currentCharIdx = prevWord.length;

  // Redo rendering so chars show as typed
  renderCurrentWord(prevWord);
  updateCaret();
}

// Append more words when running out (words mode)
function appendMoreWords() {
  const extra = [...WORD_BANK].sort(() => Math.random() - .5).slice(0, 40);
  extra.forEach((word, i) => {
    const wi = words.length;
    words.push(word);

    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    wordSpan.dataset.index = wi;

    const charSpans = [];
    for (const ch of word) {
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch;
      wordSpan.appendChild(s);
      charSpans.push(s);
    }

    wordsEl.appendChild(wordSpan);
    wordElements.push(wordSpan);
    charElements.push(charSpans);
  });
}

// ─── Caret positioning ────────────────────────
function updateCaret() {
  const wordEl = wordElements[currentWordIdx];
  if (!wordEl) return;

  // Get all char spans including extra
  const allSpans = Array.from(wordEl.querySelectorAll('.char'));
  let targetEl;

  if (currentCharIdx < allSpans.length) {
    targetEl = allSpans[currentCharIdx];
  } else if (allSpans.length > 0) {
    targetEl = allSpans[allSpans.length - 1];
  } else {
    targetEl = wordEl;
  }

  const outerRect = wordsOuter.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();

  // Scroll offset compensation
  const scrollTop = wordsOuter._scrollOffset || 0;

  const left = targetRect.left - outerRect.left;
  const top  = targetRect.top  - outerRect.top + scrollTop;

  caretEl.style.left   = (currentCharIdx >= allSpans.length && allSpans.length > 0
    ? left + targetRect.width
    : left) + 'px';
  caretEl.style.top    = top + 'px';
  caretEl.style.height = (targetRect.height || 28) + 'px';
}

// ─── Smooth line scrolling ────────────────────
function scrollToCurrentLine() {
  const wordEl = wordElements[currentWordIdx];
  if (!wordEl) return;

  const wordsRect = wordsEl.getBoundingClientRect();
  const wordRect  = wordEl.getBoundingClientRect();
  const lineH     = parseFloat(getComputedStyle(wordsEl).lineHeight) || 42;

  // How far is the current word from the top of the words block?
  const wordOffsetTop = wordRect.top - wordsRect.top;

  // We want to show from one line above (so current line is in the middle)
  const visibleH    = wordsOuter.clientHeight;
  const targetShift = Math.max(0, wordOffsetTop - lineH);

  // Animate via transform
  wordsEl.style.transform = `translateY(-${targetShift}px)`;

  // Store scroll offset for caret correction
  wordsOuter._scrollOffset = targetShift;
}

// ─── Stats display ────────────────────────────
function updateStats() {
  const wpm = calcWPM();
  const acc = calcAccuracy();

  statWpm.textContent    = wpm;
  statAcc.textContent    = started ? acc + '%' : '—';
  statErrors.textContent = errorCount;

  if (!started && !finished) {
    statTime.textContent = duration;
  }
}

// ─── WPM chart ───────────────────────────────
function drawChart() {
  const canvas = wpmChartEl;
  const ctx    = canvas.getContext('2d');
  const dpr    = window.devicePixelRatio || 1;
  const W      = canvas.offsetWidth;
  const H      = canvas.offsetHeight;

  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  ctx.scale(dpr, dpr);

  if (wpmHistory.length < 2) return;

  const maxWPM = Math.max(...wpmHistory.map(d => d.wpm), 1);
  const pts    = wpmHistory.map((d, i) => ({
    x: (i / (wpmHistory.length - 1)) * W,
    y: H - (d.wpm / maxWPM) * H * .9 - H * .05
  }));

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, 'rgba(201,162,39,.35)');
  grad.addColorStop(1, 'rgba(201,162,39,.02)');

  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cx, pts[i-1].y, cx, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cx, pts[i-1].y, cx, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.strokeStyle = '#c9a227';
  ctx.lineWidth   = 2;
  ctx.stroke();

  // Dots at each sample
  pts.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#c9a227';
    ctx.fill();
  });
}

// ─── Controls ────────────────────────────────
// Mode tabs
document.querySelectorAll('.pill[data-mode]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pill[data-mode]').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    mode = btn.dataset.mode;
    restart();
  });
});

// Duration buttons
document.querySelectorAll('.pill[data-dur]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pill[data-dur]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    duration = parseInt(btn.dataset.dur, 10);
    statTime.textContent = duration;
    restart();
  });
});

// Restart / Try again
tryAgainBtn.addEventListener('click', () => restart(true));
newTestBtn.addEventListener('click',  () => { generateTest(); restart(false); });

function restart(sameTest = false) {
  clearInterval(timer);
  if (!sameTest) generateTest();
  renderWords();
  resetState();
  updateStats();

  // Reset caret and scroll
  wordsEl.style.transform  = 'translateY(0)';
  wordsOuter._scrollOffset = 0;

  resultsEl.classList.add('hidden');
  typingInput.value = '';
  typingHint.classList.remove('faded');

  // Re-focus
  setTimeout(() => {
    typingInput.focus();
    updateCaret();
  }, 50);
}

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    e.preventDefault();
    restart(true);
  }
  if (e.key === 'Escape') {
    restart(false);
  }
});

// ─── Window resize: re-calc caret ────────────
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    updateCaret();
    drawChart();
  }, 100);
});

// ─── Boot ────────────────────────────────────
init();

// Auto-focus after a short delay so fonts load
setTimeout(() => {
  typingInput.focus();
  updateCaret();
}, 150);