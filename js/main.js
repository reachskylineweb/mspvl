document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };
    window.addEventListener('scroll', reveal);
    reveal();

    // Generic Form Handling for Success Message
    document.querySelectorAll('.js-success-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const successMsg = document.createElement('div');
            successMsg.style.padding = '20px';
            successMsg.style.background = '#d4edda';
            successMsg.style.color = '#155724';
            successMsg.style.borderRadius = '8px';
            successMsg.style.marginTop = '20px';
            successMsg.innerText = 'Thank you! Your application has been submitted successfully. We will contact you soon.';
            form.parentElement.appendChild(successMsg);
            form.reset();
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle (Simplified)
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    const header = document.querySelector('.navbar');
    if (header && window.innerWidth < 769) {
        header.insertBefore(mobileMenuBtn, header.querySelector('.btn-apply'));
        
        mobileMenuBtn.addEventListener('click', () => {
            const nav = document.querySelector('nav');
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = '#fff';
            nav.style.padding = '20px';
            nav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    }
});
