// ============================================
// MOBILE BOTTOM BAR NAVIGATION
// Mobile Bottom Bar event listeners (footer nav)

function setActiveMobileMenu(id) {
  document.querySelectorAll('.mobile-bottom-bar .menu-item').forEach(item => {
    item.classList.remove('active');
  });
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

document.getElementById('mobileMenuHome').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setActiveMobileMenu('mobileMenuHome');
  // Kapatılabilir modalları kapat
  document.getElementById('wordListMenu').style.display = 'none';
  document.getElementById('analysisScreen').classList.remove('active');
  document.getElementById('mobileSettingsModal').style.display = 'none';
});

document.getElementById('mobileWordList').addEventListener('click', () => {
  updateWordListMenu();
  setActiveMobileMenu('mobileWordList');
});
document.getElementById('mobileAnalysis').addEventListener('click', () => {
  showAnalysis();
  setActiveMobileMenu('mobileAnalysis');
});
document.getElementById('mobileSettings').addEventListener('click', () => {
  // Mobilde ayarlar modalını aç
  const modal = document.getElementById('mobileSettingsModal');
  const autoNextModal = document.getElementById('autoNextModal');
  autoNextModal.checked = autoNext.checked;
  console.log(modal.style.display);
  modal.style.display = 'flex';
  console.log(modal.style.display);
  setActiveMobileMenu('mobileSettings');
  // Modal içindeki checkbox değişince ana ayarı da güncelle
  console.log(modal.style.display);
  autoNextModal.onchange = function() {
    autoNext.checked = autoNextModal.checked;
    saveAutoNextSetting();
    updateControlsState();
    console.log(modal.style.display);
  };
  console.log(modal.style.display);
});
// SES EFEKTLERİ
// ============================================

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration, volume = 0.3) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

function playCorrectSound() {
  playSound(523, 0.1); // C5
  setTimeout(() => playSound(659, 0.1), 100); // E5
  setTimeout(() => playSound(784, 0.2), 200); // G5
}

function playWrongSound() {
  playSound(196, 0.15, 0.4); // G3
  setTimeout(() => playSound(165, 0.3, 0.4), 100); // E3
}

function playSuccessSound() {
  playSound(523, 0.1);
  setTimeout(() => playSound(659, 0.1), 50);
  setTimeout(() => playSound(784, 0.1), 100);
}

// ============================================
// KELIME LİSTESİ
// ============================================

const WORDS = {
  Acne: ['sivilce', 'akne'],
  appliance: ['Uygulama', 'cihaz', 'ev aleti', 'alet'],
  'apply ointment': ['merhem sürmek', 'krem sürmek', 'merhem uygulamak'],
  arrive: ['varmak', 'ulaşmak', 'gelmek'],
  attempt: ['Girişim', 'denemek', 'teşebbüs etmek'],
  attend: ['katılmak', 'devam etmek'],
  bullying: ['zorbalık'],
  buy: ['satın almak', 'almak'],
  challenges: ['zorluklar', 'meydan okumalar', 'zorluk'],
  chemistry: ['kimya'],
  childhood: ['çocukluk'],
  'come across': ['rastlamak', 'karşılaşmak'],
  common: ['yaygın', 'ortak'],
  cummunication: ['iletişim', 'haberleşme'],
  courage: ['cesaret'],
  crowded: ['kalabalık'],
  crucial: ['çok önemli', 'hayati', 'kritik'],
  curiosity: ['merak'],
  'cyber addiction': ['siber bağımlılık'],
  'daily chares': ['günlük işler', 'günlük ev işleri', 'günlük görevler'],
  'declare war': ['savaş ilan etmek'],
  determination: ['azim', 'kararlılık'],
  develop: ['geliştirmek', 'gelişmek'],
  die: ['ölmek'],
  disability: ['engellilik', 'engel'],
  discovery: ['keşif'],
  'drop out of': ['(okulu) bırakmak', 'bırakmak'],
  'eatina disorder': ['yeme bozukluğu', 'yeme bozukluğu (eating disorder)'],
  education: ['eğitim'],
  embassy: ['elçilik'],
  'equal rights': ['eşit haklar'],
  expose: ['açığa çıkarmak', 'maruz bırakmak'],
  fail: ['başarısız olmak', 'başarısızlık'],
  faint: ['bayılmak'],
  emborrassed: ['utanç duymak', 'utanmış', 'mahcup'],
  responsible: ['sorumlu'],
  forget: ['unutmak'],
  'get a prize': ['ödül almak'],
  'get rid of': ['kurtulmak', 'başından atmak', 'elden çıkarmak'],
  graduate: ['mezun olmak'],
  'hard conditions': ['Zor şartlar', 'zor koşullar'],
  hear: ['duymak'],
  'herbal medicine': ['bitkisel ilaç', 'bitkisel tıp', 'bitkisel tedavi'],
  higtorical_events: ['tarihi olaylar', 'tarihî olaylar'],
  'industrial revolution': ['sanayi devrimi'],
  illiteracy: ['okuryazarlık eksikliği', 'okuryazarlık olmama'],
  illiterate: ['okur yazar olmayan', 'okuryazar olmayan'],
  imagination: ['hayal gücü'],
  inspire: ['İlham vermek'],
  introvert: ['içe dönük', 'içe dönük kişi', 'çekingen'],
  invent: ['icat etmek'],
  'make money': ['para kazanmak'],
  mistake: ['hata'],
  poverty: ['yoksulluk'],
  prescribe: ['reçete yazmak', 'reçetelemek'],
  'pursue your dreams': ['Hayallerinin peşinden git', 'Hayallerini takip et', 'Hayallerini sürdür'],
  racism: ['ırkçılık'],
  receive: ['almak', 'teslim almak'],
  recover: ['iyileşmek', 'toparlanmak'],
  reduce: ['azaltmak'],
  shout: ['bağırmak'],
  'sibling rivalry': ['kardeş rekabeti', 'kardeşler arası rekabet', 'kardeş kıskançlığı']
};

// ============================================
// YARDIMCI FONKSİYONLAR
// ============================================

function normalize(s) {
  if (!s) return '';

  s = s.toLowerCase().trim();

  const map = {
    ç: 'c',
    ğ: 'g',
    ı: 'i',
    ö: 'o',
    ş: 's',
    ü: 'u',
    â: 'a',
    á: 'a',
    é: 'e',
    î: 'i'
  };

  s = s.replace(/[çğıöşüâáéî]/g, (c) => map[c] || c);
  s = s.replace(/[.,!?:;"'\-()\/\\\[\]]+/g, '');
  s = s.replace(/\s+/g, ' ').trim();

  return s;
}

function levenshtein(a, b) {
  a = a || '';
  b = b || '';

  const an = a.length,
    bn = b.length;

  if (an === 0) return bn;
  if (bn === 0) return an;

  const v0 = new Array(bn + 1),
    v1 = new Array(bn + 1);

  for (let i = 0; i <= bn; i++) v0[i] = i;

  for (let i = 0; i < an; i++) {
    v1[0] = i + 1;

    for (let j = 0; j < bn; j++) {
      const cost = a[i] === b[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }

    for (let k = 0; k <= bn; k++) v0[k] = v1[k];
  }

  return v1[bn];
}

function similarity(a, b) {
  a = normalize(a);
  b = normalize(b);

  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length) || 1;

  return 1 - dist / maxLen;
}

// ============================================
// OYUN DEĞİŞKENLERİ
// ============================================

const keys = Object.keys(WORDS).sort(() => Math.random() - 0.5);

let index = 0;
let score = 0;
let correctCount = 0;
let totalAsked = 0;
let gameHistory = {}; // kelime -> cevap kaydı
let autoNextTimer = null;
let feedbackShown = false;

// ============================================
// DOM ÖĞELERI
// ============================================

const englishEl = document.getElementById('english');
const answerEl = document.getElementById('answer');
const feedbackEl = document.getElementById('feedback');
const hintbox = document.getElementById('hintbox');
const autoNext = document.getElementById('autoNext');
const checkBtn = document.getElementById('check');
const skipBtn = document.getElementById('skip');
const hintBtn = document.getElementById('hint');
const nextBtn = document.getElementById('nextBtn');

// ============================================
// İSTATİSTİK FONKSİYONLARI
// ============================================


function updateControlsState() {
  const isFeedbackShown = feedbackEl.style.display !== 'none';

  if (isFeedbackShown) {
    checkBtn.disabled = true;
    skipBtn.disabled = true;
    hintBtn.disabled = true;
    nextBtn.style.display = 'block';
    nextBtn.disabled = false;
    feedbackShown = true;
  } else {
    checkBtn.disabled = false;
    skipBtn.disabled = false;
    hintBtn.disabled = false;
    nextBtn.style.display = 'none';
    feedbackShown = false;
  }
}

// ============================================
// OYUN LOJİĞİ
// ============================================

function pickWord() {
  if (index >= keys.length) {
    showGameOverState();
    showWordListAsModal();
    return null;
  }

  const w = keys[index];
  englishEl.textContent = w;
  hintbox.innerHTML = "<i class='fa-regular fa-lightbulb'></i> İpucu: Kelime gösterilmeden önce ipucu gelmez.";
  answerEl.value = '';
  answerEl.focus();
  feedbackEl.style.display = 'none';
    // (stats removed)
  updateControlsState();

  return w;
}

function checkAnswer() {
  const guess = answerEl.value.trim();
  if (!guess) return;

  const word = keys[index];
  const accepted = WORDS[word];

  let bestScore = 0;
  let bestMatch = null;

  for (const acc of accepted) {
    const sim = similarity(guess, acc);
    if (sim > bestScore) {
      bestScore = sim;
      bestMatch = acc;
    }
  }

  const rawGuess = normalize(guess);
  let ok = false;

  if (bestScore >= 0.7) ok = true;
  if (accepted.map((a) => normalize(a)).includes(normalize(guess))) ok = true;

  let waitTime = 0;

  if (ok) {
    score += Math.round(10 * bestScore) + 5;
    correctCount++;
    gameHistory[word] = { status: 'correct', answer: bestMatch };
    feedbackEl.className = 'result ok';
    feedbackEl.style.display = 'block';
    feedbackEl.innerHTML = `<i class="fas fa-check-circle"></i> Doğru! Kabul edilen: <strong>"${bestMatch}"</strong>`;
    playCorrectSound();
    waitTime = 2000;
  } else {
    score -= 2;
    gameHistory[word] = { status: 'wrong', answer: guess, correct: accepted[0] };
    feedbackEl.className = 'result bad';
    feedbackEl.style.display = 'block';
    feedbackEl.innerHTML = `<i class="fas fa-times-circle"></i> Yanlış. Doğru cevap: <strong>${accepted[0]}</strong>`;
    playWrongSound();
    waitTime = 5000;
  }

  totalAsked++;
    // (stats removed)
  updateControlsState();

  // Otomatik geçme
  if (autoNext.checked) {
    autoNextTimer = setTimeout(() => {
      goToNextWord();
      feedbackEl.style.display = 'none';
    }, waitTime);
  }
}

function showHint() {
  const word = keys[index];
    score -= 2; // Her ipucu puan azaltır
    // (stats removed)
    const opts = WORDS[word];
    // En kısa cevabı seçelim
    const answer = opts.reduce((a, b) => (a.length < b.length ? a : b));
    // Kaç harf açılacak?
    const revealCount = Math.ceil(answer.length / 3);
    // Daha önce açılan harfleri tut
    if (!window.hintReveals) window.hintReveals = {};
    if (!window.hintReveals[word]) window.hintReveals[word] = 0;
    window.hintReveals[word] += revealCount;
    if (window.hintReveals[word] > answer.length) window.hintReveals[word] = answer.length;
    // Harfleri göster
    let revealed = answer
      .split('')
      .map((c, i) => (i < window.hintReveals[word] ? c : '_'))
      .join('');
    hintbox.innerHTML = `<i class='fa-regular fa-lightbulb'></i> İpucu: ${revealed}`;
    const hintboxMobile = document.getElementById('hintboxMobile');
    if (hintboxMobile) {
      hintboxMobile.innerHTML = `<i class='fa-regular fa-lightbulb'></i> İpucu: ${revealed}`;
    }
}

function goToNextWord() {
  if (autoNextTimer) clearTimeout(autoNextTimer);

  index++;

  if (index >= keys.length) {
    showGameOverState();
    showWordListAsModal();
  } else {
    pickWord();
  }
}

function showGameOverState() {
  checkBtn.disabled = true;
  skipBtn.disabled = true;
  hintBtn.disabled = true;
  nextBtn.style.display = 'none';
  answerEl.disabled = true;
  // Oyun bitince analiz menüsünü aç
  setTimeout(() => {
    showAnalysis();
    setActiveMobileMenu('mobileAnalysis');
  }, 500);
}

// ============================================
// KELIME LİSTESİ UI
// ============================================

function updateWordListMenu() {
  const container = document.getElementById('wordListContainer');
  container.innerHTML = '';

  const sortedKeys = [...keys].sort();

  sortedKeys.forEach((word) => {
    const div = document.createElement('div');
    div.className = 'word-item';

    if (gameHistory[word]) {
      if (gameHistory[word].status === 'correct' || gameHistory[word].status === 'revealed') {
        div.classList.add('answered-correct');
        div.textContent = `✓ ${word}`;
      } else {
        div.classList.add('answered-wrong');
        div.textContent = `✗ ${word}`;
      }
    } else {
      div.textContent = `○ ${word}`;
    }

    container.appendChild(div);
  });
}

function showWordListAsModal() {
  const menu = document.getElementById('wordListMenu');
  menu.classList.add('modal-center');
  menu.style.display = 'flex';

  const container = document.getElementById('wordListContainer');
  container.innerHTML = '';

  const sortedKeys = [...keys].sort();

  sortedKeys.forEach((word) => {
    const div = document.createElement('div');
    div.className = 'word-item';
    const status = gameHistory[word]?.status || 'unanswered';

    let icon = '<i class="fa-regular fa-circle"></i>';
    let color = '#93c5fd';
    let className = '';
    if (status === 'correct' || status === 'revealed') {
      icon = '<i class="fa-solid fa-circle-check" style="color:#22c55e"></i>';
      color = '#22c55e';
      className = 'answered-correct';
    } else if (status === 'wrong') {
      icon = '<i class="fa-solid fa-circle-xmark" style="color:#ef4444"></i>';
      color = '#ef4444';
      className = 'answered-wrong';
    } else if (status === 'skipped') {
      icon = '<i class="fa-regular fa-circle" style="color:#94a3b8"></i>';
      color = '#94a3b8';
      className = 'answered-skipped';
    }
    div.classList.add(className);
    const correctAnswer = WORDS[word][0];
    div.innerHTML = `<div style="font-weight:600;color:${color}">${icon} ${word}</div><div style="font-size:11px;color:var(--muted);margin-top:4px">→ ${correctAnswer}</div>`;
    container.appendChild(div);
  });
}

// ============================================
// ANALİZ EKRANI
// ============================================

function showAnalysis() {
    // Save analysis to localStorage
    const analysisData = {
      score,
      correctCount,
      totalAsked,
      gameHistory,
      date: new Date().toISOString()
    };
    localStorage.setItem('analysis', JSON.stringify(analysisData));
  const correctWords = Object.entries(gameHistory)
    .filter(([_, data]) => data.status === 'correct' || data.status === 'revealed')
    .map(([word, _]) => word);

  const wrongWords = Object.entries(gameHistory)
    .filter(([_, data]) => data.status === 'wrong')
    .map(([word, data]) => ({ word, correct: data.correct }));

  const skippedWords = Object.entries(gameHistory)
    .filter(([_, data]) => data.status === 'skipped')
    .map(([word, data]) => ({ word, correct: data.answer }));

  const analysisContainer = document.getElementById('analysisContainer');
  analysisContainer.innerHTML = '';

  // Doğru bilinen kelimeler
  if (correctWords.length > 0) {
    correctWords.forEach((word) => {
      const card = document.createElement('div');
      card.className = 'word-card correct';
      card.innerHTML = `
        <div class="word-card-title"><i class="fas fa-check" style="color:var(--success)"></i> ${word}</div>
        <div class="word-card-answer">
          <div class="correct-answer">${WORDS[word][0]}</div>
        </div>
      `;
      analysisContainer.appendChild(card);
    });
  }

  // Yanlış bilinen kelimeler
  if (wrongWords.length > 0) {
    wrongWords.forEach(({ word, correct }) => {
      const card = document.createElement('div');
      card.className = 'word-card incorrect';
      const synonyms = WORDS[word].join(' | ');
      card.innerHTML = `
        <div class="word-card-title"><i class="fas fa-times" style="color:var(--danger)"></i> ${word}</div>
        <div class="word-card-answer">
          <div class="correct-answer">${correct}</div>
          <div class="synonyms"><strong>Diğer cevaplar:</strong><br>${synonyms}</div>
        </div>
      `;
      analysisContainer.appendChild(card);
    });
  }

  // Pas geçilen kelimeler
  if (skippedWords.length > 0) {
    skippedWords.forEach(({ word, correct }) => {
      const card = document.createElement('div');
      card.className = 'word-card skipped';
      const synonyms = WORDS[word].join(' | ');
      card.innerHTML = `
        <div class="word-card-title"><i class="fas fa-forward" style="color:var(--muted)"></i> ${word}</div>
        <div class="word-card-answer">
          <div class="correct-answer">${correct}</div>
          <div class="synonyms"><strong>Tüm cevaplar:</strong><br>${synonyms}</div>
        </div>
      `;
      analysisContainer.appendChild(card);
    });
  }

  document.getElementById('finalScore').textContent = score;
  document.getElementById('analysisCorrect').textContent = correctCount;
  document.getElementById('analysiswrong').textContent = totalAsked - correctCount - skippedWords.length;
  document.getElementById('analysisSkipped').textContent = skippedWords.length;
  document.getElementById('analysisScreen').classList.add('active');
  playSuccessSound();
}

// ============================================
// EVENT LİSTENERLARI
// ============================================

document.getElementById('check').addEventListener('click', () => {
  checkAnswer();
});

answerEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    // Eğer feedback gösteriliyorsa sonraki kelimeye geç
    if (feedbackShown) {
      goToNextWord();
      return;
    }

    const guess = answerEl.value.trim();

    if (guess) {
      checkAnswer();
    } else {
      // Cevap yazılmamışsa pas sayılsın
      const word = keys[index];
      gameHistory[word] = { status: 'skipped', answer: WORDS[word][0] };
      feedbackEl.className = 'result skipped';
      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = `<i class="fas fa-forward"></i> Pas geçildi. Doğru cevap: <strong>${WORDS[word][0]}</strong>`;
      totalAsked++;
        // (stats removed)
      updateControlsState();

      if (autoNext.checked) {
        autoNextTimer = setTimeout(() => {
          goToNextWord();
          feedbackEl.style.display = 'none';
        }, 2000);
      } else {
        nextBtn.style.display = 'block';
      }
    }
  }
});

document.getElementById('skip').addEventListener('click', () => {
  const word = keys[index];
  gameHistory[word] = { status: 'skipped', answer: WORDS[word][0] };
  feedbackEl.className = 'result skipped';
  feedbackEl.style.display = 'block';
  feedbackEl.innerHTML = `<i class="fas fa-forward"></i> Pas geçildi. Doğru cevap: <strong>${WORDS[word][0]}</strong>`;
  totalAsked++;
    // (stats removed)
  updateControlsState();

  if (autoNext.checked) {
    autoNextTimer = setTimeout(() => {
      goToNextWord();
      feedbackEl.style.display = 'none';
    }, 2000);
  } else {
    nextBtn.style.display = 'block';
  }
});

document.getElementById('hint').addEventListener('click', showHint);

document.getElementById('nextBtn').addEventListener('click', () => {
  goToNextWord();
});

document.getElementById('start').addEventListener('click', () => {
  index = 0;
  score = 0;
  gameHistory = {};
  keys.sort(() => Math.random() - 0.5);
  pickWord();
  feedbackEl.style.display = 'none';
  updateWordListMenu();
  answerEl.disabled = false;
});

document.getElementById('wordListBtn').addEventListener('click', () => {
  const menu = document.getElementById('wordListMenu');
  menu.classList.remove('modal-center');
  menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
  updateWordListMenu();
});

document.getElementById('closeWordList').addEventListener('click', () => {
  const menu = document.getElementById('wordListMenu');
  menu.classList.remove('modal-center');
  menu.style.display = 'none';
});

document.getElementById('mobileWordList').addEventListener('click', () => {
  const menu = document.getElementById('wordListMenu');
  menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
  updateWordListMenu();
});

document.getElementById('mobileAnalysis').addEventListener('click', () => {
  showAnalysis();
});

document.getElementById('closeAnalysis').addEventListener('click', () => {
  document.getElementById('analysisScreen').classList.remove('active');
});

document.getElementById('restartFromAnalysis').addEventListener('click', () => {
  document.getElementById('analysisScreen').classList.remove('active');
  index = 0;
  score = 0;
  correctCount = 0;
  totalAsked = 0;
  gameHistory = {};
  keys.sort(() => Math.random() - 0.5);
  pickWord();
  feedbackEl.style.display = 'none';
  updateWordListMenu();
  answerEl.disabled = false;
});

autoNext.addEventListener('change', updateControlsState);
// Otomatik Sonraki ayarını localStorage'da sakla ve yükle
function saveAutoNextSetting() {
  localStorage.setItem('autoNext', autoNext.checked ? '1' : '0');
}

function loadAutoNextSetting() {
  const val = localStorage.getItem('autoNext');
  if (val === '1') {
    autoNext.checked = true;
  } else if (val === '0') {
    autoNext.checked = false;
  }
  updateControlsState();
}

autoNext.addEventListener('change', () => {
  saveAutoNextSetting();
  updateControlsState();
});

// Sayfa yüklenince ayarı yükle
window.addEventListener('DOMContentLoaded', loadAutoNextSetting);

// ============================================
// BAŞLANGIÇ YÜKLEMESİ
// ============================================

// (stats removed)
pickWord();
updateWordListMenu();
