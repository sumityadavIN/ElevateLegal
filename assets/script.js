/* =========================================
   REGISTER PLUGINS
========================================= */
gsap.registerPlugin(ScrollTrigger);

/* =========================================
   LENIS SMOOTH SCROLL
========================================= */
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    direction: 'vertical',
    gestureDirection: 'vertical',
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ===============================
// SERVICES HERO SCROLL FRICTION
// ===============================
const servicesHero = document.querySelector('.services-hero');

if (servicesHero && lenis) {
    ScrollTrigger.create({
        trigger: servicesHero,
        start: 'top bottom',
        end: 'bottom top',

        onEnter: () => {
            // Slightly heavier scroll
            lenis.options.duration = 1.6;
        },

        onLeave: () => {
            // Reset to normal
            lenis.options.duration = 1.2;
        },

        onEnterBack: () => {
            lenis.options.duration = 1.6;
        },

        onLeaveBack: () => {
            lenis.options.duration = 1.2;
        }
    });

    // Extra polish: Slow image parallax
    gsap.to('.services-hero-bg', {
        y: 120,
        ease: 'none',
        scrollTrigger: {
            trigger: servicesHero,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

/* =========================================
   NAVBAR ENTRY ANIMATION
========================================= */
gsap.fromTo(
    '.navbar .logo, .nav-links li, .menu-btn',
    { y: 20, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all'
    }
);

/* =========================================
   HERO LOAD ANIMATION
========================================= */
window.addEventListener('load', () => {
    document.querySelector('.hero h1')?.classList.add('animate');
    document.querySelector('.hero-section-line')?.classList.add('animate');
    document.querySelector('.hero-label-row')?.classList.add('animate');
});

/* =========================================
   🔥 HERO FRACTURE (SIGNATURE MOMENT)
========================================= */
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');
const heroLeft = document.querySelector('.hero-left');
const heroRight = document.querySelector('.hero-right');
const heroSpine = document.querySelector('.hero-spine');

if (hero && heroBg) {
    gsap.timeline({
        scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '45% top',
            scrub: true
        }
    })
        .to(heroBg, {
            scale: 1.28,
            y: 220,
            ease: 'none'
        }, 0)
        .to(heroLeft, {
            y: -180,
            opacity: 0,
            ease: 'none'
        }, 0)
        .to(heroRight, {
            y: 120,
            opacity: 0,
            ease: 'none'
        }, 0)
        .to(heroSpine, {
            scaleY: 0.15,
            ease: 'none'
        }, 0);
}

/* =========================================
   NAVBAR SCROLL BEHAVIOR
========================================= */
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
const scrollThreshold = 6;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Calculate threshold based on hero height
    const heroSection = document.querySelector('.hero') || document.querySelector('.services-hero');
    const threshold = heroSection ? heroSection.offsetHeight - 80 : 50; // Switch just before hero ends

    navbar?.classList.toggle('scrolled', scrollTop > threshold);

    if (Math.abs(lastScrollTop - scrollTop) > scrollThreshold) {
        if (scrollTop > lastScrollTop && scrollTop > threshold) { // Only hide if past hero
            navbar?.classList.add('navbar-hidden');
        } else {
            navbar?.classList.remove('navbar-hidden');
        }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

/* =========================================
   SECTION HEADER REVEALS
========================================= */
document.querySelectorAll('.section-header-new').forEach(header => {
    const line = header.querySelector('.section-header-line');
    const label = header.querySelector('.section-label-row');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                line?.classList.add('animate');
                label?.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(header);
});

/* =========================================
   SERVICES INTRO ANIMATION
========================================= */
const servicesSection = document.getElementById('services');
if (servicesSection) {
    const line = servicesSection.querySelector('.services-line');
    const label = servicesSection.querySelector('.services-label-row');
    const headline = servicesSection.querySelector('.services-headline');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                line?.classList.add('animate');
                label?.classList.add('animate');
                headline?.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(servicesSection);
}

/* =========================================
   SERVICES DETAIL SECTIONS
========================================= */
document.querySelectorAll('.service-category-header, .service-line-separator')
    .forEach(el => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(el);
    });

/* =========================================
   GENERIC REVEALS
========================================= */
gsap.utils.toArray(
    '.reveal, .service-title-new, .service-detail-title, .service-detail-content > p'
).forEach(el => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 85%'
        }
    });
});

/* =========================================
   STAGGERED SERVICE LIST - REMOVED TO PREVENT CONFLICT WITH ACT II
========================================= */
// The Act II timeline now handles the entrance of these items.

/* =========================================
   COUNTER ANIMATION
========================================= */
function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const increment = target / 80;

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target === 100 ? '100%' : `${target}+`;
            clearInterval(interval);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

document.querySelectorAll('[data-count]').forEach(el => {
    ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => animateCounter(el)
    });
});

/* =========================================
   MOBILE MENU
========================================= */
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const navOverlay = document.getElementById('navOverlay');

menuBtn?.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    mobileNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

navOverlay?.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    mobileNav.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

/* =========================================
   SMOOTH ANCHOR SCROLL
========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
    });
});


// ========== SCROLL INDICATOR ==========
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        lenis.scrollTo('#services', { duration: 2.0 });
    });
}

// ========== CUSTOM SELECT DROPDOWN ==========
const practiceSelect = document.getElementById('practiceSelect');
if (practiceSelect) {
    const wrapper = practiceSelect.closest('.form-group');
    wrapper.classList.add('custom-select-container');

    // Create custom UI elements
    const trigger = document.createElement('div');
    trigger.className = 'custom-select-trigger';

    // Add arrow icon to trigger
    const arrow = document.createElement('div'); // This is handled by CSS ::after but strictly purely CSS might be better. 
    // Wait, my CSS uses ::after on trigger. So I just need the trigger div.

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'custom-options';

    // Populate options
    Array.from(practiceSelect.options).forEach(option => {
        if (option.disabled) return; // Skip placeholder

        const optionDiv = document.createElement('div');
        optionDiv.className = 'custom-option';
        optionDiv.textContent = option.text;
        optionDiv.dataset.value = option.value;

        optionDiv.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling to wrapper click
            practiceSelect.value = option.value;
            trigger.textContent = option.text;
            wrapper.classList.add('has-value');
            wrapper.classList.remove('open');

            // Update selected visual
            optionsContainer.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
            optionDiv.classList.add('selected');
        });

        optionsContainer.appendChild(optionDiv);
    });

    wrapper.appendChild(trigger);
    wrapper.appendChild(optionsContainer);

    // Toggle open/close
    wrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close other open dropdowns if any (optional but good practice)
        document.querySelectorAll('.custom-select-container.open').forEach(el => {
            if (el !== wrapper) el.classList.remove('open');
        });
        wrapper.classList.toggle('open');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });

    // Handle styling if default value exists (unlikely given disabled selected op)
    if (practiceSelect.value) {
        wrapper.classList.add('has-value');
        const selectedOption = practiceSelect.options[practiceSelect.selectedIndex];
        if (selectedOption) trigger.textContent = selectedOption.text;
    }
}

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const msg = document.getElementById('formMsg');
        const formData = new FormData(this);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const phone = formData.get('phone').trim();

        // Validation
        if (!name || !email || !phone) {
            msg.className = 'form-msg show error';
            msg.textContent = 'Please fill in all required fields.';
            setTimeout(() => msg.classList.remove('show'), 5000);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            msg.className = 'form-msg show error';
            msg.textContent = 'Please enter a valid email address.';
            setTimeout(() => msg.classList.remove('show'), 5000);
            return;
        }

        // Success
        msg.className = 'form-msg show success';
        msg.textContent = 'Thank you! We will contact you within 24 hours.';
        this.reset();

        // Reset select label
        // Reset select label and custom UI
        if (practiceSelect) {
            practiceSelect.classList.remove('has-value');
            const wrapper = practiceSelect.closest('.custom-select-container');
            if (wrapper) {
                wrapper.classList.remove('has-value', 'open');
                const trigger = wrapper.querySelector('.custom-select-trigger');
                if (trigger) trigger.textContent = '';
                wrapper.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
            }
        }

        setTimeout(() => msg.classList.remove('show'), 5000);
    });
}

/* =========================================
   ACT II — SERVICES TAKEOVER
========================================= */

const services = document.querySelector('.services-takeover');

if (services) {
    gsap.timeline({
        scrollTrigger: {
            trigger: services,
            start: 'top top',
            end: '+=120%',
            scrub: true,
            pin: true
        }
    })
        .fromTo(services, {
            backgroundColor: '#ffffff',
            color: '#000000'
        }, {
            backgroundColor: '#0a0a0a',
            color: '#ffffff',
            ease: 'none'
        }, 0)
        .from('.services-headline', {
            y: 80,
            opacity: 0,
            ease: 'none'
        }, 0.1)
        .from('.services-category .service-item-new', {
            y: 50,
            opacity: 0,
            stagger: 0.05, // Faster stagger for individual items
            ease: 'none'
        }, 0.2);
}