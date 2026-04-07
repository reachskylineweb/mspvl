document.addEventListener('DOMContentLoaded', () => {
    // Inject Header and Footer
    const headerElement = document.getElementById('mainHeader');
    const footerElement = document.getElementById('mainFooter');

    const loadLayout = (url, container) => {
        if (!container) return;
        fetch(url)
            .then(response => response.text())
            .then(data => {
                container.innerHTML = data;
                if (url.includes('header')) {
                    initMobileMenu();
                }
                if (url.includes('footer')) {
                    initApplyModal();
                }
            })
            .catch(error => console.error('Error loading layout:', error));
    };

    if (headerElement) loadLayout('layout/header.html', headerElement);
    if (footerElement) loadLayout('layout/footer.html', footerElement);

    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 600);
});

function initApplyModal() {
    const modalBtns = document.querySelectorAll('#openApplyModalBtn, #headerOpenApplyModalBtn');
    const modal = document.getElementById('applyModalOverlay');
    const closeBtn = document.getElementById('closeApplyModalBtn');
    
    if (modal && closeBtn) {
        document.body.addEventListener('click', (e) => {
            const targetBtn = e.target.closest('#openApplyModalBtn, #headerOpenApplyModalBtn');
            if (targetBtn) {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            }
        });
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        const form = document.getElementById('popupAdmissionForm');
        if(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Reservation Request Submitted successfully!');
                modal.classList.remove('active');
                document.body.style.overflow = '';
                form.reset();
            });
        }
    }
}

// Mobile menu init (called after header is loaded)
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-active');
            mobileToggle.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('mobile-active') ? 'hidden' : '';
        });
    }

    // Dropdown toggle logic for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dd => {
        const trigger = dd.querySelector('.nav-link');
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth < 769) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dd) other.classList.remove('active');
                    });
                    
                    dd.classList.toggle('active');
                }
            });
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mainNav && mainNav.classList.contains('mobile-active') && !mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
            mainNav.classList.remove('mobile-active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
