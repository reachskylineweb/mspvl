/**
 * MSPVL Polytechnic College — Master Interaction Engine v5
 * Modular, Stable, Performance-Oriented.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. GLOBAL SCROLL OBSERVER (REVEALS) ── */
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Performance: stop observing once revealed
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    // Target ALL diverse animation classes from v8
    const animateElements = document.querySelectorAll('.reveal, .reveal-slide, .reveal-zoom');
    animateElements.forEach(el => revealObserver.observe(el));


    /* ── 2. MODAL SYSTEM (REFINED) ── */
    const modalOverlay = document.getElementById('applyModalOverlay');
    const closeBtn = document.getElementById('closeApplyModalBtn');
    const openBtns = document.querySelectorAll('.js-open-admission, #openApplyModalBtn');

    const toggleModal = (show) => {
        if (!modalOverlay) return;
        if (show) {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Fixed Scroll Lock
        } else {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Release Lock
        }
    };

    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(true);
    }));

    if (closeBtn) closeBtn.addEventListener('click', () => toggleModal(false));

    // Close on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) toggleModal(false);
        });
    }

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            toggleModal(false);
        }
    });


    /* ── 3. SMOOTH ANCHORS ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            e.preventDefault();
            const target = document.querySelector(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    /* ── 4. RESPONSIVE HEADER SHRINK ── */
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '5px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '10px 0';
            header.style.backgroundColor = '#ffffff';
        }
    }, { passive: true });


    /* ── 5. FORM SUCCESS MOCKUP ── */
    const forms = document.querySelectorAll('.js-success-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Submitting...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Successfully Submitted!';
                btn.style.backgroundColor = '#2ecc71';
                setTimeout(() => {
                    toggleModal(false);
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                    form.reset();
                }, 2000);
            }, 1500);
        });
    });

});
