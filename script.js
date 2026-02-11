/* ============================================
   VALENTINE'S PROPOSAL - Interactive Magic
   ============================================ */

// ---- Configuration ----
const VALENTINE_DATE = new Date('2026-02-14T00:00:00');
const ANNIVERSARY_START = new Date('2019-01-01T00:00:00'); // Change this to your exact start date!

// SVG sticker IDs used for floating hearts
const SVG_STICKERS = ['sticker-heart', 'sticker-rose', 'sticker-heart', 'sticker-sparkle'];
const HEART_COLORS = ['#e8506a', '#f06292', '#f7a8b8', '#c0354d', '#d4a656'];

// ---- DOM Elements ----
const entranceOverlay = document.getElementById('entrance-overlay');
const openBtn = document.getElementById('open-btn');
const mainContent = document.getElementById('main-content');
const musicToggle = document.getElementById('music-toggle');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const yesResponse = document.getElementById('yes-response');

let isMusicPlaying = false;
let noClickCount = 0;
let activeIntervals = [];

// ---- Entrance Particles ----
function createEntranceParticles() {
    const container = document.getElementById('entrance-particles');
    if (!container) return;

    const particleCount = 35;
    const colors = [
        'rgba(232,80,106,0.6)',
        'rgba(240,98,146,0.5)',
        'rgba(247,168,184,0.4)',
        'rgba(212,166,86,0.5)',
        'rgba(240,214,138,0.4)',
        'rgba(255,200,220,0.3)'
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'entrance-particle';

        const size = Math.random() * 6 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dur = Math.random() * 6 + 5;
        const delay = Math.random() * 5;
        const moveY = -(Math.random() * 120 + 40);
        const moveX = (Math.random() - 0.5) * 80;
        const maxOpacity = Math.random() * 0.4 + 0.2;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        particle.style.setProperty('--dur', dur + 's');
        particle.style.setProperty('--delay', delay + 's');
        particle.style.setProperty('--move-y', moveY + 'px');
        particle.style.setProperty('--move-x', moveX + 'px');
        particle.style.setProperty('--max-opacity', maxOpacity);

        container.appendChild(particle);
    }
}

createEntranceParticles();

// ---- Entrance: Open the Envelope → Show Countdown Gate ----
const countdownGate = document.getElementById('countdown-gate');

openBtn.addEventListener('click', () => {
    entranceOverlay.classList.add('fade-out');
    musicToggle.classList.add('visible');

    // Try to play music on user interaction
    tryPlayMusic();

    setTimeout(() => {
        entranceOverlay.style.display = 'none';
    }, 1500);

    // Check if Valentine's Day has arrived
    const now = new Date();
    if (now >= VALENTINE_DATE) {
        // It's Valentine's Day! Show the gate briefly then reveal page
        countdownGate.classList.remove('hidden');
        showGateRevealed();
    } else {
        // Not yet — show countdown gate
        countdownGate.classList.remove('hidden');
        startGateCountdown();
    }
});

// ---- Countdown Gate Logic ----
let gateIntervalId = null;

function startGateCountdown() {
    updateGateTimer();
    gateIntervalId = setInterval(updateGateTimer, 1000);
}

function updateGateTimer() {
    const now = new Date();
    const diff = VALENTINE_DATE - now;

    if (diff <= 0) {
        // Countdown just hit zero — stop interval and reveal!
        if (gateIntervalId) {
            clearInterval(gateIntervalId);
            gateIntervalId = null;
        }
        showGateRevealed();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('gate-days').textContent = String(days).padStart(2, '0');
    document.getElementById('gate-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('gate-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('gate-seconds').textContent = String(seconds).padStart(2, '0');
}

function showGateRevealed() {
    // Set all to 00
    document.getElementById('gate-days').textContent = '00';
    document.getElementById('gate-hours').textContent = '00';
    document.getElementById('gate-minutes').textContent = '00';
    document.getElementById('gate-seconds').textContent = '00';

    // Update text
    const gateTitle = document.querySelector('.gate-title');
    const gateTease = document.querySelector('.gate-tease');
    const gateSubtitle = document.querySelector('.gate-subtitle');
    gateTitle.textContent = "Happy Valentine's Day!";
    gateSubtitle.textContent = "The wait is over, my love...";
    gateTease.textContent = '';

    // Add reveal button
    const btn = document.createElement('button');
    btn.className = 'gate-reveal-btn';
    btn.textContent = 'Reveal Your Surprise 💝';
    document.querySelector('.gate-content').appendChild(btn);

    btn.addEventListener('click', () => {
        countdownGate.classList.add('fade-out');
        mainContent.classList.remove('hidden');
        switchToBgMusic();

        setTimeout(() => {
            countdownGate.style.display = 'none';
        }, 1500);
    });
}

// ---- Music Control (3 tracks) ----
const countdownMusic = document.getElementById('countdown-music');
const bgMusic = document.getElementById('bg-music');
const yesMusic = document.getElementById('yes-music');
let currentTrack = countdownMusic; // starts with countdown song

function playTrack(track) {
    track.currentTime = 0;
    var playPromise = track.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            isMusicPlaying = true;
            musicToggle.classList.add('playing');
        }).catch((err) => {
            console.warn('Music playback issue:', err.message);
            // Retry on next user interaction
            document.addEventListener('click', function retryPlay() {
                track.play().then(() => {
                    isMusicPlaying = true;
                    musicToggle.classList.add('playing');
                }).catch(() => {});
                document.removeEventListener('click', retryPlay);
            }, { once: true });
        });
    }
}

// Called when "Open Your Surprise" is clicked — plays countdown song
function tryPlayMusic() {
    currentTrack = countdownMusic;
    playTrack(countdownMusic);
}

// Called when gate reveals / main content shown — switch to bg song
function switchToBgMusic() {
    countdownMusic.pause();
    currentTrack = bgMusic;
    playTrack(bgMusic);
}

// Called when "Yes!" is clicked — switch to celebration song
function switchToCelebrationMusic() {
    countdownMusic.pause();
    bgMusic.pause();
    currentTrack = yesMusic;
    playTrack(yesMusic);
}

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        currentTrack.pause();
        isMusicPlaying = false;
        musicToggle.classList.remove('playing');
    } else {
        playTrack(currentTrack);
    }
});

// ---- Floating Hearts (SVG Stickers) ----
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';

    // Use inline SVG stickers
    const stickerId = SVG_STICKERS[Math.floor(Math.random() * SVG_STICKERS.length)];
    const size = Math.random() * 30 + 25;
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    const use = document.createElementNS(svgNS, 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + stickerId);
    svg.appendChild(use);
    heart.appendChild(svg);

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-20px';
    heart.style.setProperty('--duration', (Math.random() * 6 + 6) + 's');

    document.getElementById('floating-hearts').appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
}

function startFloatingHearts() {
    // Initial batch
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createFloatingHeart(), i * 400);
    }
    // Continuous
    activeIntervals.push(setInterval(createFloatingHeart, 2500));
}

// ---- Rose Petals ----
function createRosePetal() {
    const petal = document.createElement('div');
    petal.className = 'rose-petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = '-20px';
    petal.style.setProperty('--duration', (Math.random() * 6 + 8) + 's');
    petal.style.setProperty('--sway', (Math.random() * 100 - 50) + 'px');
    petal.style.width = (Math.random() * 10 + 8) + 'px';
    petal.style.height = (Math.random() * 10 + 8) + 'px';

    document.getElementById('rose-petals').appendChild(petal);

    setTimeout(() => petal.remove(), 14000);
}

function startRosePetals() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createRosePetal(), i * 600);
    }
    activeIntervals.push(setInterval(createRosePetal, 3000));
}

// ---- Floating Chocolates ----
const CHOCOLATE_EMOJIS = ['🍫', '🍬', '🍭', '🧁', '🎂', '🍰'];

function createFloatingChocolate() {
    const choco = document.createElement('div');
    choco.className = 'floating-emoji';
    choco.textContent = CHOCOLATE_EMOJIS[Math.floor(Math.random() * CHOCOLATE_EMOJIS.length)];
    choco.style.left = Math.random() * 100 + 'vw';
    choco.style.top = '-30px';
    choco.style.fontSize = (Math.random() * 14 + 16) + 'px';
    choco.style.setProperty('--duration', (Math.random() * 6 + 8) + 's');
    choco.style.setProperty('--sway', (Math.random() * 80 - 40) + 'px');

    document.getElementById('floating-chocolates').appendChild(choco);
    setTimeout(() => choco.remove(), 14000);
}

function startFloatingChocolates() {
    for (let i = 0; i < 2; i++) {
        setTimeout(() => createFloatingChocolate(), i * 800);
    }
    activeIntervals.push(setInterval(createFloatingChocolate, 4000));
}

// ---- Floating Stars ----
const STAR_EMOJIS = ['⭐', '✨', '🌟', '💫'];

function createFloatingStar() {
    const star = document.createElement('div');
    star.className = 'floating-emoji floating-star';
    star.textContent = STAR_EMOJIS[Math.floor(Math.random() * STAR_EMOJIS.length)];
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.fontSize = (Math.random() * 10 + 12) + 'px';
    star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');

    document.getElementById('floating-stars').appendChild(star);
    setTimeout(() => star.remove(), 5000);
}

function startFloatingStars() {
    activeIntervals.push(setInterval(createFloatingStar, 1200));
}

// ---- Floating Flowers ----
const FLOWER_EMOJIS = ['🌸', '🌺', '🌷', '💐', '🌻', '🌹', '🏵️', '💮'];

function createFloatingFlower() {
    const flower = document.createElement('div');
    flower.className = 'floating-emoji';
    flower.textContent = FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)];
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.top = '-30px';
    flower.style.fontSize = (Math.random() * 8 + 12) + 'px';
    flower.style.setProperty('--duration', (Math.random() * 5 + 6) + 's');
    flower.style.setProperty('--sway', (Math.random() * 80 - 40) + 'px');

    document.getElementById('floating-chocolates').appendChild(flower);
    setTimeout(() => flower.remove(), 12000);
}

// ---- Pop Burst Effect ----
const POP_EMOJIS = ['🎉', '🎊', '🥳', '🎈', '🎆', '🎇', '🪅', '✨'];

function createPopBurst(x, y) {
    for (let i = 0; i < 6; i++) {
        const pop = document.createElement('div');
        pop.className = 'pop-burst';
        pop.textContent = POP_EMOJIS[Math.floor(Math.random() * POP_EMOJIS.length)];
        pop.style.left = x + 'px';
        pop.style.top = y + 'px';
        pop.style.fontSize = (Math.random() * 10 + 10) + 'px';

        const angle = (Math.PI * 2 / 6) * i + (Math.random() * 0.5);
        const distance = Math.random() * 100 + 50;
        pop.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        pop.style.setProperty('--ty', Math.sin(angle) * distance + 'px');

        document.body.appendChild(pop);
        setTimeout(() => pop.remove(), 1500);
    }
}

function launchCelebrationPops() {
    // Burst pops from multiple points across the screen
    const positions = [
        { x: window.innerWidth * 0.25, y: window.innerHeight * 0.3 },
        { x: window.innerWidth * 0.75, y: window.innerHeight * 0.3 },
        { x: window.innerWidth * 0.5, y: window.innerHeight * 0.15 },
    ];
    positions.forEach((pos, i) => {
        setTimeout(() => createPopBurst(pos.x, pos.y), i * 400);
    });
    // Second round
    setTimeout(() => {
        positions.forEach((pos, i) => {
            setTimeout(() => createPopBurst(pos.x + (Math.random() * 60 - 30), pos.y + (Math.random() * 60 - 30)), i * 300);
        });
    }, 2500);
}

// (Countdown timer moved to gate logic above)

// ---- Anniversary Counter ----
function updateAnniversaryStats() {
    const now = new Date();
    const diff = now - ANNIVERSARY_START;

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diff / (1000 * 60));

    const daysEl = document.getElementById('total-days');
    const hoursEl = document.getElementById('total-hours');
    const minutesEl = document.getElementById('total-minutes');

    if (daysEl) {
        animateNumber(daysEl, 0, totalDays, 2000);
    }
    if (hoursEl) {
        animateNumber(hoursEl, 0, totalHours, 2500);
    }
    if (minutesEl) {
        animateNumber(minutesEl, 0, totalMinutes, 3000);
    }
}

function animateNumber(element, start, end, duration) {
    const startTime = Date.now();
    const range = end - start;

    function update() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuad = progress * (2 - progress);
        const current = Math.floor(start + (range * easeOutQuad));

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    update();
}

// Trigger anniversary stats when section is visible
const anniversaryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateAnniversaryStats();
            document.querySelectorAll('.stat-item').forEach(el => el.classList.add('visible'));
            anniversaryObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const anniversarySection = document.getElementById('anniversary');
if (anniversarySection) {
    anniversaryObserver.observe(anniversarySection);
}

// ---- Runaway "No" Button ----
const noMessages = [
    "No 😢",
    "Are you sure? 🥺",
    "Think again! 💔",
    "Please? 🥹",
    "Pretty please? 🙏",
    "I'll be sad... 😭",
    "Don't do this! 💕",
    "One more chance? 🌹",
    "My heart... 💝",
    "I'm literally crying 😭😭",
    "Whyyyyy?! 😩",
    "You're breaking me 💔💔",
    "I can't breathe 😢",
    "Okay I'm on my knees 🧎",
    "PLEASE I'M BEGGING 🙏😭",
    "I'll do anything! 🥺💕",
    "I'll cook every day 🍳❤️",
    "I'll give you my hoodies 🥹👕",
    "I'll watch your shows 📺💖",
    "No more snoring I promise 😴❌",
    "I'll let you pick food always 🍕🥺",
    "I'm literally shaking rn 😰",
    "My eyes are leaking 👀💧",
    "This is emotional damage 💀",
    "You really doing this to me? 🥲",
    "7 years... and you say no? 😭💔",
    "Our memories mean nothing?! 😢",
    "I'll write you 100 letters ✉️❤️",
    "I'll sing for you (badly) 🎤😭",
    "I'll dance in the rain 🌧️💃",
    "Roses are red, I'm turning blue 🥀😰",
    "Even my phone is crying 📱😭",
    "Google says you should say yes 🔍",
    "My heart has left the chat 💔🚪",
    "SOS SEND HELP 🚨😭",
    "I'm not okay I'm NOT OKAY 😩",
    "Last chance... say yes? 🥺🙏",
    "Fine I'll ask nicer... YES? 💝",
    "Pretty pretty pretty please 🌸🥹",
    "*gets down on both knees* 🧎🧎",
    "I'll never say no to you 🤞❤️",
    "You're my whole world 🌍💖",
    "Don't leave me hanging 😭🙏",
    "I promise forever & ever 💍✨",
    "My soul is departing 👻💔",
    "JUST SAY YES ALREADY 😭💖",
    "Okay this is my last cry... 😢",
    "Nope still crying 😭😭😭",
    "I'll never stop asking 💕🔁",
    "YESYESYES just click it 👆💝",
    "Say yes... for us 🥺❤️‍🔥",
    "Final answer? ...say YES 💖✨"
];

function moveNoButton() {
    // Switch to absolute so it can fly around freely
    btnNo.style.position = 'absolute';

    const section = document.getElementById('proposal');
    const sectionRect = section.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    const maxX = sectionRect.width - btnRect.width - 40;
    const maxY = sectionRect.height - btnRect.height - 40;

    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY / 2 - maxY / 4;

    btnNo.style.transform = `translate(${newX}px, ${newY}px)`;

    noClickCount++;

    // Change button text
    if (noClickCount < noMessages.length) {
        btnNo.textContent = noMessages[noClickCount];
    } else {
        btnNo.textContent = noMessages[noMessages.length - 1];
    }

    // Make Yes button grow slightly each time
    const scale = 1 + (noClickCount * 0.03);
    btnYes.style.transform = `scale(${Math.min(scale, 1.8)})`;

    // Shrink No button gradually
    const shrink = 1 - (noClickCount * 0.015);
    btnNo.style.fontSize = `${Math.max(shrink, 0.5)}rem`;
}

btnNo.addEventListener('mouseenter', moveNoButton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});
btnNo.addEventListener('click', moveNoButton);

// ---- Yes Button: Celebration! ----
btnYes.addEventListener('click', () => {
    // Hide buttons
    document.querySelector('.proposal-buttons').style.display = 'none';
    document.querySelector('.proposal-title').style.display = 'none';
    document.querySelector('.proposal-question').style.display = 'none';

    // Show response
    yesResponse.classList.remove('hidden');

    // Switch to celebration music
    switchToCelebrationMusic();

    // Celebration pop burst
    launchCelebrationPops();

    // Gentle initial burst of hearts & flowers
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createFloatingHeart(), i * 200);
    }
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createFloatingFlower(), i * 300);
    }

    // Reveal the love letters with fade-in
    const loveLetter = document.getElementById('love-letter');
    const futureLetter = document.getElementById('resilience');
    loveLetter.classList.remove('hidden');
    loveLetter.classList.add('letter-reveal');
    futureLetter.classList.remove('hidden');
    futureLetter.classList.add('letter-reveal');

    // Scroll to first letter after the response settles
    setTimeout(() => {
        loveLetter.scrollIntoView({ behavior: 'smooth' });
    }, 2500);

    // Start gentle ongoing hearts & flowers (romantic ambient)
    setTimeout(() => {
        startFloatingHearts();
        startRosePetals();
    }, 3000);
});


// ---- Scroll Animations (Intersection Observer) ----
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe section titles
document.querySelectorAll('.section-title').forEach(el => observer.observe(el));

// Observe timeline items
document.querySelectorAll('.timeline-item[data-animate]').forEach(el => observer.observe(el));

// Observe letter card
document.querySelectorAll('.letter-card').forEach(el => observer.observe(el));

// Observe proposal elements
document.querySelectorAll('.proposal-title, .proposal-question, .proposal-buttons').forEach(el => {
    observer.observe(el);
});

// ---- Smooth Scroll for Internal Links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ---- Parallax-like effect on Hero ----
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const hero = document.querySelector('.hero-content');
            if (hero && scrollY < window.innerHeight) {
                hero.style.transform = `translateY(${scrollY * 0.3}px)`;
                hero.style.opacity = 1 - (scrollY / window.innerHeight);
            }
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

// ---- Prevent right-click (keep it a surprise!) ----
document.addEventListener('contextmenu', (e) => e.preventDefault());

// ---- Console Easter Egg ----
console.log('%c💖 Made with love 💖', 'color: #e8506a; font-size: 20px; font-weight: bold;');
console.log('%cHappy Valentine\'s Day!', 'color: #d4a656; font-size: 16px;');
