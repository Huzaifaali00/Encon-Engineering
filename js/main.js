// --- FINAL PROFESSIONAL ANIMATION SCRIPT (No Custom Cursor) ---

document.addEventListener("DOMContentLoaded", function () {

    // --- 1. PRELOADER & NAVBAR/SCROLL LOGIC ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
            preloader.addEventListener('transitionend', () => preloader.remove());
        });
    }
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
    const scrollElements = document.querySelectorAll('section');
    if (scrollElements.length > 0) {
        const elementInView = (el) => el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) / 1.2;
        const handleScrollAnimation = () => scrollElements.forEach(el => {
            if (elementInView(el)) el.classList.add('scrolled');
        });
        window.addEventListener('scroll', handleScrollAnimation);
        handleScrollAnimation();
    }

    // --- 2. HERO SECTION LOGIC ---
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        setTimeout(() => heroSection.classList.add('active'), 250);
        const letters = document.querySelectorAll('.hero-heading .letter');
        letters.forEach(letter => {
            letter.addEventListener('mouseover', function () {
                this.classList.add('active');
                setTimeout(() => this.classList.remove('active'), 1000);
            });
        });
    }

    // --- 3. PARTICLE BACKGROUND ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d'); let particlesArray;
        const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles(); };
        class Particle { constructor(x, y, dX, dY, s, c) { this.x = x; this.y = y; this.directionX = dX; this.directionY = dY; this.size = s; this.color = c; } draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); } update() { if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX; if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY; this.x += this.directionX; this.y += this.directionY; this.draw(); } }
        function initParticles() { particlesArray = []; let num = (canvas.width * canvas.height) / 9000; for (let i = 0; i < num; i++) { let s = (Math.random() * 2) + 0.5; let x = Math.random() * (innerWidth - s * 2) + s * 2; let y = Math.random() * (innerHeight - s * 2) + s * 2; let dX = (Math.random() * 0.4) - 0.2; let dY = (Math.random() * 0.4) - 0.2; particlesArray.push(new Particle(x, y, dX, dY, s, 'rgba(12,250,65,0.5)')); } }
        function animateParticles() { requestAnimationFrame(animateParticles); ctx.clearRect(0, 0, innerWidth, innerHeight); for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); } }
        resizeCanvas(); animateParticles(); window.addEventListener('resize', resizeCanvas);
    }

    // --- 4. INTERACTIVE ANIMATIONS (Professional Suite) ---
    function applyProfessionalAnimations() {
        // A) Card 3D Tilt Effect
        const tiltCards = document.querySelectorAll('.services .card, .portfolio .card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const rotateY = (x / rect.width) * 20;
                const rotateX = -(y / rect.height) * 20;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });

        // B) Hero 3D Tilt
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const moveX = (x / rect.width - 0.5) * 2;
                const moveY = (y / rect.height - 0.5) * 2;
                const rotateY = moveX * 8;
                const rotateX = -moveY * 8;
                heroContent.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            heroSection.addEventListener('mouseleave', () => {
                heroContent.style.transform = 'rotateX(0) rotateY(0)';
            });
        }
    }

    // Run interactive animations only on devices with a fine pointer (non-touch)
    if (window.matchMedia('(pointer: fine)').matches) {
        applyProfessionalAnimations();
    }
});