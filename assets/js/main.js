/**
 * MSPVL Polytechnic College
 * Master Interaction Engine v8.1
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ── REVEAL OBSERVER — DIVERSE TRIGGER ── */
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    // Target ALL animation classes
    document.querySelectorAll('.reveal, .reveal-slide, .reveal-zoom').forEach(el => {
        revealObserver.observe(el);
    });

    /* ── MODAL SYSTEM ── */
    const modalOverlay = document.getElementById('applyModalOverlay');
    const closeBtn = document.getElementById('closeApplyModalBtn');
    const openBtns = document.querySelectorAll('.js-open-admission, .btn-cta-yellow');

    const toggleModal = (show) => {
        if (!modalOverlay) return;
        if (show) {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        } else {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; 
        }
    };

    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(true);
    }));

    if (closeBtn) closeBtn.addEventListener('click', () => toggleModal(false));
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) toggleModal(false);
        });
    }

    /* ── SMOOTH SCROLL ── */
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

    /* ── HEADER SHRINK ── */
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.style.padding = '5px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '10px 0';
            header.style.backgroundColor = '#ffffff';
        }
    }, { passive: true });

});
