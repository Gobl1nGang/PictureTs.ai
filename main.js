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

// --- Cinematic AI Carousel ---
const cinematicSlides = document.querySelectorAll('.slide');
const navDots = document.querySelectorAll('.nav-dot');
const carouselWrapper = document.querySelector('.carousel-wrapper');

let activeSlideIndex = 0;
let isTransitioning = false;

// Update active states
function updateActiveStates() {
    cinematicSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === activeSlideIndex);
    });
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeSlideIndex);
    });
}

// Navigate to slide with animation
function navigateToSlide(index) {
    if (isTransitioning || index === activeSlideIndex) return;
    
    isTransitioning = true;
    activeSlideIndex = index;
    updateActiveStates();
    
    // Animate slide content entrance
    anime({
        targets: `.slide[data-slide="${index}"] .slide-title`,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutCubic',
        delay: 300
    });
    
    anime({
        targets: `.slide[data-slide="${index}"] .slide-desc`,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutCubic',
        delay: 500
    });
    
    anime({
        targets: `.slide[data-slide="${index}"] .tech-icon`,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutBack',
        delay: 200
    });
    
    setTimeout(() => {
        isTransitioning = false;
    }, 800);
}

// Navigation dot clicks
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        navigateToSlide(index);
    });
});

// Touch/swipe handling
let touchStartX = 0;
let touchStartY = 0;
let touchCurrentX = 0;
let touchCurrentY = 0;
let isSwiping = false;
let swipeStartTime = 0;

function handleSwipeStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    swipeStartTime = Date.now();
    isSwiping = true;
}

function handleSwipeMove(e) {
    if (!isSwiping) return;
    
    touchCurrentX = e.touches[0].clientX;
    touchCurrentY = e.touches[0].clientY;
    
    const deltaX = Math.abs(touchStartX - touchCurrentX);
    const deltaY = Math.abs(touchStartY - touchCurrentY);
    
    // Prevent vertical scroll if horizontal swipe detected
    if (deltaX > deltaY && deltaX > 15) {
        e.preventDefault();
    }
}

function handleSwipeEnd() {
    if (!isSwiping) return;
    
    const deltaX = touchStartX - touchCurrentX;
    const deltaY = Math.abs(touchStartY - touchCurrentY);
    const swipeTime = Date.now() - swipeStartTime;
    const swipeVelocity = Math.abs(deltaX) / swipeTime;
    
    // Only process horizontal swipes
    if (Math.abs(deltaX) > deltaY) {
        const threshold = swipeVelocity > 0.5 ? 40 : 100;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                const nextIndex = activeSlideIndex === cinematicSlides.length - 1 ? 0 : activeSlideIndex + 1;
                navigateToSlide(nextIndex);
            } else {
                const prevIndex = activeSlideIndex === 0 ? cinematicSlides.length - 1 : activeSlideIndex - 1;
                navigateToSlide(prevIndex);
            }
        }
    }
    
    isSwiping = false;
}

// Touch events
if (carouselWrapper) {
    carouselWrapper.addEventListener('touchstart', handleSwipeStart, { passive: true });
    carouselWrapper.addEventListener('touchmove', handleSwipeMove, { passive: false });
    carouselWrapper.addEventListener('touchend', handleSwipeEnd, { passive: true });

    // Mouse drag support
    let mouseStartX = 0;
    let mouseCurrentX = 0;
    let isDragging = false;
    let dragStartTime = 0;

    carouselWrapper.addEventListener('mousedown', (e) => {
        mouseStartX = e.clientX;
        dragStartTime = Date.now();
        isDragging = true;
    });

    carouselWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        mouseCurrentX = e.clientX;
    });

    carouselWrapper.addEventListener('mouseup', () => {
        if (!isDragging) return;
        
        const deltaX = mouseStartX - mouseCurrentX;
        const dragTime = Date.now() - dragStartTime;
        const dragVelocity = Math.abs(deltaX) / dragTime;
        const threshold = dragVelocity > 0.3 ? 50 : 120;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                const nextIndex = activeSlideIndex === cinematicSlides.length - 1 ? 0 : activeSlideIndex + 1;
                navigateToSlide(nextIndex);
            } else {
                const prevIndex = activeSlideIndex === 0 ? cinematicSlides.length - 1 : activeSlideIndex - 1;
                navigateToSlide(prevIndex);
            }
        }
        
        isDragging = false;
    });

    // Trackpad wheel support
    let wheelCooldown = false;

    carouselWrapper.addEventListener('wheel', (e) => {
        const deltaX = e.deltaX;
        const deltaY = e.deltaY;
        
        // Only handle clear horizontal scrolling
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 20) {
            e.preventDefault();
            
            if (wheelCooldown) return;
            
            wheelCooldown = true;
            
            if (deltaX > 0) {
                const nextIndex = activeSlideIndex === cinematicSlides.length - 1 ? 0 : activeSlideIndex + 1;
                navigateToSlide(nextIndex);
            } else {
                const prevIndex = activeSlideIndex === 0 ? cinematicSlides.length - 1 : activeSlideIndex - 1;
                navigateToSlide(prevIndex);
            }
            
            setTimeout(() => {
                wheelCooldown = false;
            }, 600);
        }
    }, { passive: false });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const prevIndex = activeSlideIndex === 0 ? cinematicSlides.length - 1 : activeSlideIndex - 1;
        navigateToSlide(prevIndex);
    } else if (e.key === 'ArrowRight') {
        const nextIndex = activeSlideIndex === cinematicSlides.length - 1 ? 0 : activeSlideIndex + 1;
        navigateToSlide(nextIndex);
    }
});

// Initialize first slide
if (cinematicSlides.length > 0) {
    navigateToSlide(0);
}

// Main pre-register button functionality
const mainPreRegisterBtn = document.getElementById('main-pre-register-btn');
if (mainPreRegisterBtn && preRegisterBtn) {
    mainPreRegisterBtn.addEventListener('click', () => {
        preRegisterBtn.click();
    });
}