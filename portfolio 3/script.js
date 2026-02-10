gsap.registerPlugin(ScrollTrigger);


// 3. KINETIC TYPOGRAPHY (Responsive Kerning & Weight)
const kineticHeaders = document.querySelectorAll('.kinetic-header');

kineticHeaders.forEach(header => {
    // Split text into spans without a plugin
    const text = header.innerText;
    header.innerHTML = text.split('').map(char =>
        `<span style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');

    const chars = header.querySelectorAll('span');

    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

        chars.forEach(char => {
            const charRect = char.getBoundingClientRect();
            const charCenter = charRect.left + charRect.width / 2 - rect.left;
            const dist = Math.abs(mouseX - charCenter);

            // Subtle weight variation (800-600) and letter-spacing
            const weight = 800 - Math.min(dist * 0.4, 200); // Range: 800 to 600
            const spacing = Math.max(0, dist * 0.01); // Subtle spacing expansion

            gsap.to(char, {
                fontVariationSettings: `"wght" ${weight}`,
                letterSpacing: `${spacing}px`,
                x: (mouseX - charCenter) * 0.05,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    header.addEventListener('mouseleave', () => {
        gsap.to(chars, {
            fontVariationSettings: `"wght" 700`,
            letterSpacing: '0px',
            x: 0,
            duration: 0.5
        });
    });
});

// 4. DEPTH LIGHTING (Removed)

// Magnetic effect for interactive elements
// Magnetic effect for interactive elements - DISABLED
/*
const magneticElements = document.querySelectorAll('[data-magnetic]');

magneticElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
    });

    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
    });

    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});
*/

// 5. PROOF OF CRAFT (Debug Toggle Removed - Grid now permanent)

// 6. DEPLOYMENT TIMESTAMP
const deployTime = new Date();
const deployTimeEl = document.getElementById('deploy-time');
if (deployTimeEl) {
    deployTimeEl.innerText = deployTime.toISOString().split('T')[0];
}

// 7. SCROLL ANIMATIONS
// Fade in sections
gsap.utils.toArray('section').forEach(section => {
    const elements = section.querySelectorAll('.reveal-text, .skill-item, .project-card, .principle-card');

    if (elements.length > 0) {
        gsap.from(elements, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });
    }
});


// Bento Grid Animation
gsap.from('.bento-card', {
    scrollTrigger: {
        trigger: '#bento-grid',
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out"
});

// Floating Elements Parallax
// Floating Elements Parallax - DISABLED
/*
gsap.to('.shape-circle', {
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
    },
    y: 300,
    rotate: 90,
    ease: "none"
});

gsap.to('.shape-cross', {
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2
    },
    y: -150,
    rotate: -45,
    ease: "none"
});

gsap.to('.shape-number', {
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 3
    },
    y: 200,
    ease: "none"
});
*/

// Parallax effect on hero image
// Parallax effect on hero image - DISABLED
/*
gsap.to('.hero-image', {
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 200,
    scale: 1.2,
    ease: 'none'
});
*/

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-fill');
if (skillBars.length > 0) {
    ScrollTrigger.create({
        trigger: '#skills',
        start: 'top 70%',
        onEnter: () => {
            skillBars.forEach((bar, i) => {
                const width = bar.getAttribute('style').match(/width:\s*(\d+)%/)[1] + '%';
                bar.style.width = '0%';

                gsap.to(bar, {
                    width: width,
                    duration: 1.5,
                    ease: 'elastic.out(1, 0.5)',
                    delay: i * 0.1
                });

                // Add scale animation to parent skill-item
                const skillItem = bar.closest('.skill-item');
                if (skillItem) {
                    gsap.from(skillItem, {
                        scale: 0.95,
                        opacity: 0,
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: 'power2.out'
                    });
                }
            });
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hide scroll indicator on scroll
let hasScrolled = false;
let lastScrollY = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Scroll Indicator Logic
    if (!hasScrolled && currentScrollY > 100) {
        hasScrolled = true;
        gsap.to('.scroll-indicator', {
            opacity: 0,
            y: 20,
            duration: 0.5
        });
    }

    // Smart Sticky Nav Logic
    if (currentScrollY > 50) {
        if (currentScrollY > lastScrollY) {
            // Scrolling down -> hide nav
            nav.classList.add('nav-hidden');
        } else {
            // Scrolling up -> show nav
            nav.classList.remove('nav-hidden');
        }
    } else {
        // At top -> show nav
        nav.classList.remove('nav-hidden');
    }
    lastScrollY = currentScrollY;
});

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileLinks = document.querySelectorAll('.mobile-link');
const overlay = document.querySelector('.mobile-menu-overlay');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');

        if (document.body.classList.contains('menu-open')) {
            // Animate links in
            gsap.fromTo(mobileLinks,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: "power3.out" }
            );
        }
    });
}

// Close menu when link clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.remove('loading');

    // Animate hero content
    gsap.from('.hero-label', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.hero-name', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.hero-tagline', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });

    gsap.from('.hero-metrics', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
});

// Project card hover effects
// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    const overlay = card.querySelector('.card-overlay');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Update overlay gradient position
        if (overlay) {
            overlay.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(235, 59, 59, 0.2), transparent 50%)`;
        }

        // 3D Tilt Effect - DISABLED
        /*
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rotateX = ((mouseY - centerY) / centerY) * -10; // Max 10deg
        const rotateY = ((mouseX - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        */
    });

    card.addEventListener('mouseleave', () => {
        // card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Console easter egg
console.log('%c🔥 Built by Om Bharati', 'font-size: 20px; font-weight: bold; color: #eb3b3b;');
console.log('%cInterested in the tech stack? Check out the source!', 'font-size: 14px; color: #666;');
console.log('%cReact • Next.js • GSAP • Three.js', 'font-size: 12px; color: #888;');

// 8. VIDEO AUTOPLAY FALLBACK & LOOP ENFORCEMENT
const videos = document.querySelectorAll('video');
videos.forEach(video => {
    video.muted = true;

    const playVideo = () => {
        video.play().catch(error => {
            console.warn("Autoplay was prevented:", error);
            // Don't add failure class immediately, let user interaction handle it if needed
            // document.body.classList.add('video-failed'); 
        });
    };

    playVideo();

    // Enforce loop manually
    video.addEventListener('ended', () => {
        video.currentTime = 0;
        playVideo();
    });

    // Prevent random pausing
    video.addEventListener('pause', () => {
        if (!video.seeking && document.visibilityState === 'visible') {
            playVideo();
        }
    });
});

// 9. CUSTOM CURSOR REMOVED

// 10. SCROLL PROGRESS
const progressBar = document.querySelector('.scroll-progress-bar');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
}