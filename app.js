// ==========================================
// AUDIO SYSTEM (WEB AUDIO API SYNTHESIZER)
// ==========================================
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playClickSound() {
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  } catch (e) {}
}

function playScannerBeep() {
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (e) {}
}

function playEmergencyAlarm() {
  try {
    initAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(150, now);
    osc1.frequency.linearRampToValueAtTime(350, now + 0.4);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.linearRampToValueAtTime(0.01, now + 0.4);
    osc1.start();
    osc1.stop(now + 0.4);
  } catch (e) {}
}

function playTypeBeep() {
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {}
}

document.addEventListener('click', (e) => {
  if (e.target.closest('.sound-btn')) {
    playClickSound();
  }
});

// ==========================================
// FLOATING DECORATIONS ENGINE
// ==========================================
const ambientContainer = document.getElementById('ambient-decorations');
const floatEmojis = ['🎂', '🎈', '🎉', '🎁', '💖', '✨', '📸', '👑'];

function spawnDecoration(xOverride = null, isEmergency = false) {
  if (!ambientContainer) return;
  const dec = document.createElement('div');
  dec.className = isEmergency ? 'floating-heart emergency-fast' : 'floating-heart';
  
  const emojis = isEmergency ? ['🚨', '🔥', '😈', '👿', '😂', '💀', '😱'] : floatEmojis;
  dec.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  
  const size = Math.random() * 20 + (isEmergency ? 25 : 15);
  dec.style.fontSize = `${size}px`;
  dec.style.left = xOverride !== null ? `${xOverride}%` : `${Math.random() * 100}%`;
  
  const drift = (Math.random() * 100 - 50);
  dec.style.setProperty('--drift', `${drift}px`);
  
  const rot = Math.random() * 360 + 180;
  dec.style.setProperty('--rotation', `${rot}deg`);
  
  const duration = Math.random() * 4 + (isEmergency ? 1.5 : 4);
  dec.style.animationDuration = `${duration}s`;
  
  ambientContainer.appendChild(dec);
  
  setTimeout(() => {
    dec.remove();
  }, duration * 1000);
}

setInterval(() => {
  if (document.hidden) return;
  if (ambientContainer.childElementCount < 35) {
    spawnDecoration();
  }
}, 600);

// ==========================================
// 🎬 LOADING SCREEN
// ==========================================
const loadingMessages = [
  "Accessing friendship database...",
  "Scanning selfie archives...",
  "Measuring yapping frequency...",
  "Detecting chaos energy...",
  "Evaluating cuteness levels...",
  "Generating report..."
];

const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const loadingStatus = document.getElementById('loading-status');
const loadingPercent = document.getElementById('loading-percent');

let currentProgress = 0;
let messageIndex = 0;

function updateLoading() {
  if (currentProgress >= 100) {
    progressBar.style.width = '100%';
    loadingPercent.textContent = '100%';
    loadingStatus.textContent = 'Analysis Complete.';
    
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      startHeroTyping();
      setTimeout(() => loadingScreen.remove(), 800);
    }, 800);
    return;
  }
  
  currentProgress += Math.floor(Math.random() * 8) + 2;
  if (currentProgress > 100) currentProgress = 100;
  
  progressBar.style.width = `${currentProgress}%`;
  loadingPercent.textContent = `${currentProgress}%`;
  
  if (currentProgress % 20 === 0 || Math.random() > 0.8) {
    messageIndex = (messageIndex + 1) % loadingMessages.length;
    loadingStatus.textContent = loadingMessages[messageIndex];
  }
  
  setTimeout(updateLoading, Math.random() * 150 + 50);
}

window.addEventListener('load', () => {
  updateLoading();
});

// ==========================================
// 💌 HERO SECTION TYPING ANIMATION
// ==========================================
const typingStr = "Official Birthday Investigation Report generated after years of friendship.";
const typingEl = document.getElementById('hero-typing');
let typingIdx = 0;

function startHeroTyping() {
  if (!typingEl) return;
  function type() {
    if (typingIdx < typingStr.length) {
      typingEl.textContent += typingStr.charAt(typingIdx);
      typingIdx++;
      setTimeout(type, 50);
    }
  }
  setTimeout(type, 500);
}

// ==========================================
// 📸 LIGHTBOX GALLERY
// ==========================================
const lightbox = document.getElementById('gallery-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

const funnyCaptions = [
  "Evidence Exhibit A",
  "Rare footage of Ria behaving",
  "Main character detected",
  "Smile level critical",
  "Certified cutie",
  "Investigation compromised due to excessive cuteness"
];

window.openLightbox = function(item) {
  const imgSrc = item.getAttribute('data-src');
  lightboxImg.src = imgSrc;
  const randomCap = funnyCaptions[Math.floor(Math.random() * funnyCaptions.length)];
  lightboxCaption.textContent = randomCap;
  lightbox.classList.remove('hidden');
  lightbox.classList.add('visible');
}

window.closeLightbox = function() {
  lightbox.classList.add('hidden');
  lightbox.classList.remove('visible');
}

// ==========================================
// 🔬 RIA DETECTION SYSTEM
// ==========================================
const scanButton = document.getElementById('scan-button');
const scannerOutput = document.getElementById('scanner-output');
const laser = document.querySelector('.scanner-laser');

const scanSteps = [
  "Accessing friendship database...",
  "Scanning selfie archives...",
  "Measuring yapping frequency...",
  "Detecting chaos energy...",
  "Evaluating cuteness levels...",
  "Generating report..."
];

const scanResults = [
  { emoji: "💖", title: "Cute overload detected", desc: "Exceeds federal regulations by 400%." },
  { emoji: "📸", title: "Selfie addiction found", desc: "Front camera wear-and-tear is highly critical." },
  { emoji: "🍟", title: "Food thief probability: 99.9%", desc: "Hide your fries, hide your chips." },
  { emoji: "🎤", title: "Professional yapper identified", desc: "Capable of standard speech patterns up to 6 hours continuous." },
  { emoji: "😂", title: "Laughs before finishing jokes", desc: "Creates 50% audience confusion, 50% laughter." },
  { emoji: "😈", title: "Mischief levels critical", desc: "Often plans chaos behind a sweet smile." },
  { emoji: "✨", title: "Main character syndrome confirmed", desc: "No cure available. The world revolves around her." },
  { emoji: "❤️", title: "Best friend status verified", desc: "Top tier companion. Approved by the Ministry." }
];

let isScanning = false;

window.runScanner = function() {
  if (isScanning) return;
  isScanning = true;
  scanButton.disabled = true;
  scanButton.style.opacity = '0.5';
  laser.classList.add('scanning');
  scannerOutput.innerHTML = '';
  
  let stepIdx = 0;
  function runStep() {
    if (stepIdx < scanSteps.length) {
      playScannerBeep();
      const p = document.createElement('div');
      p.className = 'scan-log-item';
      p.textContent = `> ${scanSteps[stepIdx]}`;
      scannerOutput.appendChild(p);
      scannerOutput.scrollTop = scannerOutput.scrollHeight;
      stepIdx++;
      setTimeout(runStep, 800);
    } else {
      setTimeout(revealResult, 600);
    }
  }
  runStep();
}

function revealResult() {
  laser.classList.remove('scanning');
  isScanning = false;
  scanButton.disabled = false;
  scanButton.style.opacity = '1';
  const result = scanResults[Math.floor(Math.random() * scanResults.length)];
  scannerOutput.innerHTML = `
    <div class="scan-result-card">
      <div class="badge-icon">${result.emoji}</div>
      <h3>${result.title}</h3>
      <p>${result.desc}</p>
    </div>
  `;
}

// ==========================================
// 🎮 RIA OR AI QUIZ
// ==========================================
const answeredQuestions = { 1: false, 2: false, 3: false };

window.answerQuiz = function(questionNum, option) {
  if (answeredQuestions[questionNum]) return;
  answeredQuestions[questionNum] = true;
  
  const qItem = document.querySelector(`.quiz-item[data-q="${questionNum}"]`);
  const buttons = qItem.querySelectorAll('.btn-quiz');
  
  buttons.forEach(btn => {
    if (btn.textContent.includes('RIA') || (option === 'ria' && btn.textContent.includes('RIA'))) {
      btn.classList.add('correct');
    } else if (option === 'ai') {
      btn.classList.add('incorrect');
    }
  });
  
  if (Object.values(answeredQuestions).every(val => val === true)) {
    document.getElementById('quiz-result').classList.remove('hidden');
  }
}

// ==========================================
// 🚨 EMERGENCY BUTTON
// ==========================================
let isEmergencyOn = false;
const emergencyMessages = [
  "RIA HAS BEEN SUMMONED",
  "SELFIE MODE ACTIVATED",
  "YAPPING SPEED +500%",
  "CUTENESS OVERLOAD",
  "RUN FOR YOUR LIFE"
];

window.triggerEmergencyMode = function() {
  if (isEmergencyOn) return;
  isEmergencyOn = true;
  playEmergencyAlarm();
  
  document.body.classList.add('emergency-flash', 'screen-shake');
  const overlay = document.createElement('div');
  overlay.className = 'emergency-overlay';
  document.body.appendChild(overlay);
  
  const alarmInterval = setInterval(() => {
    if (!isEmergencyOn) {
      clearInterval(alarmInterval);
      return;
    }
    playEmergencyAlarm();
  }, 400);
  
  let count = 0;
  const popupInterval = setInterval(() => {
    if (count > 8) {
      clearInterval(popupInterval);
      setTimeout(() => {
        document.body.classList.remove('emergency-flash', 'screen-shake');
        overlay.remove();
        isEmergencyOn = false;
      }, 2000);
      return;
    }
    
    const popup = document.createElement('div');
    popup.className = 'emergency-message-popup';
    popup.textContent = `🚨 ${emergencyMessages[count % emergencyMessages.length]} 🚨`;
    const rot = Math.random() * 20 - 10;
    popup.style.setProperty('--popup-rotate', `${rot}deg`);
    document.body.appendChild(popup);
    
    for (let i = 0; i < 5; i++) spawnDecoration(Math.random() * 100, true);
    
    setTimeout(() => popup.remove(), 1500);
    count++;
  }, 400);
}

// ==========================================
// 🎟 EASTER EGG
// ==========================================
const easterEggModal = document.getElementById('easter-egg-modal');
window.openEasterEgg = function() { easterEggModal.classList.remove('hidden'); }
window.closeEasterEgg = function() { easterEggModal.classList.add('hidden'); }

// ==========================================
// 💌 FINAL LETTER TYPEWRITER
// ==========================================
const letterBody = `If our friendship had a playlist, it wouldn't be perfect.\n\nIt would be random.\n\nA little chaotic.\n\nSometimes emotional.\n\nSometimes ridiculous.\n\nBut it would always be worth listening to.\n\nHappy 19th Birthday, Ria.\n\nThank you for being one of the best chapters of my life. 🎂✨❤️`;

const letterContainer = document.getElementById('typewriter-letter');
let letterIdx = 0;
let typingStarted = false;

function typeLetter() {
  if (letterIdx < letterBody.length) {
    const char = letterBody.charAt(letterIdx);
    if (char === '\n') {
      letterContainer.appendChild(document.createElement('br'));
    } else {
      const node = document.createTextNode(char);
      letterContainer.appendChild(node);
    }
    
    if (Math.random() > 0.6) playTypeBeep();
    
    letterIdx++;
    setTimeout(typeLetter, 30);
  } else {
    // Show Final Verdict Screen
    setTimeout(() => {
      const finalVerdict = document.getElementById('final-verdict-screen');
      if(finalVerdict) finalVerdict.classList.add('visible');
    }, 1500);
  }
}

const letterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !typingStarted) {
      typingStarted = true;
      typeLetter();
    }
  });
}, { threshold: 0.2 });

if (letterContainer) {
  letterObserver.observe(document.getElementById('final-letter'));
}

// ==========================================
// 🎵 SOUNDTRACK AUDIO PLAYER
// ==========================================
let currentAudio = null;
let currentCard = null;

window.toggleAudio = function(card) {
  const src = card.getAttribute('data-src');
  const icon = card.querySelector('.song-icon');

  if (currentAudio && currentCard === card) {
    if (currentAudio.paused) {
      currentAudio.play();
      icon.textContent = '⏸️';
      card.classList.add('playing');
    } else {
      currentAudio.pause();
      icon.textContent = '▶️';
      card.classList.remove('playing');
    }
  } else {
    // Stop previous
    if (currentAudio) {
      currentAudio.pause();
      if (currentCard) {
        currentCard.querySelector('.song-icon').textContent = '▶️';
        currentCard.classList.remove('playing');
      }
    }
    // Start new
    currentAudio = new Audio(src);
    currentAudio.play();
    currentCard = card;
    icon.textContent = '⏸️';
    card.classList.add('playing');

    currentAudio.addEventListener('ended', () => {
      icon.textContent = '▶️';
      card.classList.remove('playing');
    });
  }
}
