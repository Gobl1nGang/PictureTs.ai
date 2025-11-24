import './style.css'
import anime from 'animejs/lib/anime.es.js';

// --- Particle Network Background ---
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, index) => {
        p.update();
        p.draw();

        // Draw connections
        for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(34, 197, 94, ${0.1 - distance / 1500})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    resize();
    initParticles();
});

resize();
initParticles();
animateParticles();

// --- Entrance Animations ---

// Navbar
anime({
    targets: '.navbar',
    translateY: [-100, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1000,
    delay: 200
});

// Hero Content
const heroTimeline = anime.timeline({
    easing: 'easeOutExpo',
    duration: 1000
});

heroTimeline
    .add({
        targets: '.badge',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 800,
        delay: 500
    })
    .add({
        targets: '.hero-title .line',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        duration: 1200
    }, '-=600')
    .add({
        targets: '.hero-subtitle',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800
    }, '-=1000')
    .add({
        targets: '.hero-cta button',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800
    }, '-=800');

// Hero Visual Stats
anime({
    targets: '.stat-card',
    translateY: [50, 0],
    opacity: [0, 1],
    delay: anime.stagger(200, { start: 1000 }),
    duration: 1000,
    easing: 'easeOutExpo'
});

// Floating Animation for Stats
anime({
    targets: '.card-1',
    translateY: [-10, 10],
    duration: 3000,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
});

anime({
    targets: '.card-2',
    translateY: [10, -10],
    duration: 4000,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
});

anime({
    targets: '.card-3',
    translateY: [-5, 5],
    duration: 3500,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
});

// --- Scroll Animations ---

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('section-header')) {
                anime({
                    targets: entry.target.children,
                    translateY: [30, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(100),
                    duration: 800,
                    easing: 'easeOutCubic'
                });
            } else if (entry.target.classList.contains('grid-item')) {
                // Grid items are handled by the parent container observer usually, 
                // but here we observe individual items for simplicity or group them.
                // Let's animate them as they appear.
                anime({
                    targets: entry.target,
                    scale: [0.9, 1],
                    opacity: [0, 1],
                    duration: 600,
                    easing: 'easeOutCubic'
                });
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-header').forEach(el => {
    // Set initial state
    Array.from(el.children).forEach(child => {
        child.style.opacity = '0';
    });
    observer.observe(el);
});

document.querySelectorAll('.grid-item').forEach((el, i) => {
    el.style.opacity = '0';
    // Add a slight delay based on index for a staggered effect if they are in view together
    setTimeout(() => observer.observe(el), i * 100);
});

// --- Interactive Elements ---

// Mouse move parallax for hero visual
const heroVisual = document.querySelector('.hero-visual');
heroVisual.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    anime({
        targets: '.card-1',
        translateX: x,
        translateY: y,
        duration: 100,
        easing: 'linear'
    });
    anime({
        targets: '.card-2',
        translateX: -x,
        translateY: -y,
        duration: 100,
        easing: 'linear'
    });
    anime({
        targets: '.card-3',
        translateX: x * 0.5,
        translateY: y * 0.5,
        duration: 100,
        easing: 'linear'
    });
});

// --- Modal Logic ---
const modalOverlay = document.getElementById('modal-overlay');
const preRegisterBtn = document.getElementById('pre-register-btn');
const modalCloseBtn = document.getElementById('modal-close');
const registerForm = document.getElementById('register-form');

if (preRegisterBtn) {
  preRegisterBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
    anime({
      targets: '.modal-content',
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 400,
      easing: 'easeOutCubic'
    });
  });
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });
}

// Close on outside click
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
}

// Form Submission
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = registerForm.querySelector('input').value;
    
    // Mock submission
    const btn = registerForm.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Joined!';
    btn.style.background = '#22c55e';
    
    setTimeout(() => {
      modalOverlay.classList.remove('active');
      btn.innerText = originalText;
      registerForm.reset();
      alert(`Thanks for joining! We'll notify ${email} when we launch.`);
    }, 1000);
  });
}
