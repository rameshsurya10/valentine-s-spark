/* ============================================
   VALENTINE'S PROPOSAL - Interactive Magic
   ============================================ */

// ---- Configuration ----
const VALENTINE_DATE = new Date('2026-02-14T00:00:00');
const ANNIVERSARY_START = new Date('2019-01-01T00:00:00'); // Change this to your exact start date!

// SVG sticker IDs used for floating hearts
const SVG_STICKERS = ['sticker-heart', 'sticker-rose', 'sticker-heart', 'sticker-sparkle'];
const HEART_COLORS = ['#e8506a', '#f06292', '#f7a8b8', '#c0354d', '#d4a656'];
const CONFETTI_COLORS = ['#e8506a', '#f7a8b8', '#d4a656', '#f0d68a', '#ff6b8a', '#fce4ec', '#c0354d'];

// ---- DOM Elements ----
const entranceOverlay = document.getElementById('entrance-overlay');
const openBtn = document.getElementById('open-btn');
const mainContent = document.getElementById('main-content');
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
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

// ---- Entrance: Open the Envelope ----
openBtn.addEventListener('click', () => {
    entranceOverlay.classList.add('fade-out');
    mainContent.classList.remove('hidden');
    musicToggle.classList.add('visible');

    // Try to play music on user interaction
    tryPlayMusic();

    // Start floating elements
    setTimeout(() => {
        startFloatingHearts();
        startRosePetals();
        startSparkles();
    }, 500);

    // Remove overlay from DOM after fade
    setTimeout(() => {
        entranceOverlay.style.display = 'none';
    }, 1500);
});

// ---- Music Control ----
function tryPlayMusic() {
    if (bgMusic.src || bgMusic.querySelector('source')) {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.classList.add('playing');
        }).catch(() => {
            // Music file not found or blocked - that's okay
            console.log('Music file not loaded. Add your song to assets/music.mp3');
        });
    }
}

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.classList.remove('playing');
    } else {
        tryPlayMusic();
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

// ---- Sparkles ----
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.setProperty('--duration', (Math.random() * 2 + 2) + 's');

    document.getElementById('sparkles').appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 4000);
}

function startSparkles() {
    activeIntervals.push(setInterval(createSparkle, 800));
}

// Pause animations when tab is hidden (saves battery on mobile)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        activeIntervals.forEach(id => clearInterval(id));
        activeIntervals = [];
    } else {
        startFloatingHearts();
        startRosePetals();
        startSparkles();
    }
});

// ---- Countdown Timer ----
function updateCountdown() {
    const now = new Date();
    const diff = VALENTINE_DATE - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.querySelector('.countdown-subtitle').textContent = "It's Here!";
        document.querySelector('.countdown-message').textContent = "Happy Valentine's Day, my love! 💖";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

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
    "Just say Yes! 💖"
];

function moveNoButton() {
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
    const scale = 1 + (noClickCount * 0.05);
    btnYes.style.transform = `scale(${Math.min(scale, 1.4)})`;

    // Shrink No button
    const shrink = 1 - (noClickCount * 0.03);
    btnNo.style.fontSize = `${Math.max(shrink, 0.6)}rem`;
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

    // Launch confetti celebration!
    launchConfetti();

    // Extra hearts burst
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createFloatingHeart(), i * 100);
    }
});

// ---- Confetti Celebration ----
function launchConfetti() {
    const container = document.querySelector('.celebration-hearts');

    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';

            // Random shape: SVG heart or colored circle/square
            const type = Math.random();
            if (type < 0.3) {
                const svgNS = 'http://www.w3.org/2000/svg';
                const svg = document.createElementNS(svgNS, 'svg');
                const size = Math.random() * 25 + 15;
                svg.setAttribute('width', size);
                svg.setAttribute('height', size);
                const use = document.createElementNS(svgNS, 'use');
                use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#sticker-heart');
                svg.appendChild(use);
                confetti.appendChild(svg);
                confetti.style.background = 'none';
            } else {
                confetti.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
                confetti.style.borderRadius = type < 0.6 ? '50%' : '2px';
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = (Math.random() * 10 + 5) + 'px';
            }

            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');

            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }

    // Second wave
    setTimeout(() => {
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';

                const svgNS = 'http://www.w3.org/2000/svg';
                const svg = document.createElementNS(svgNS, 'svg');
                const size = Math.random() * 35 + 25;
                svg.setAttribute('width', size);
                svg.setAttribute('height', size);
                const use = document.createElementNS(svgNS, 'use');
                use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#sticker-heart');
                svg.appendChild(use);
                confetti.appendChild(svg);

                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.setProperty('--duration', (Math.random() * 3 + 3) + 's');

                container.appendChild(confetti);
                setTimeout(() => confetti.remove(), 6000);
            }, i * 50);
        }
    }, 2000);
}

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

// Observe letter paper
document.querySelectorAll('.letter-paper').forEach(el => observer.observe(el));

// Observe proposal elements
document.querySelectorAll('.proposal-title, .proposal-question, .proposal-buttons').forEach(el => {
    observer.observe(el);
});

// Observe resilience cards
document.querySelectorAll('.resilience-card').forEach(el => observer.observe(el));

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
