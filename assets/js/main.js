/** 
 * MSPVL Polytechnic College 
 * Basic Classic Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ── SIMPLE MODAL ── */
    const modalOverlay = document.getElementById('applyModalOverlay');
    const closeBtn = document.getElementById('closeApplyModalBtn');
    const openBtns = document.querySelectorAll('.js-open-admission');

    const toggleModal = (show) => {
        if (!modalOverlay) return;
        if (show) {
            modalOverlay.style.display = 'flex';
        } else {
            modalOverlay.style.display = 'none';
        }
    };

    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(true);
    }));

    if (closeBtn) closeBtn.addEventListener('click', () => toggleModal(false));

});
