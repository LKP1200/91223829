(function () {
    const modal = document.getElementById('requirementsModal');
    const cancelButton = document.getElementById('cancelPurchase');
    const purchaseTriggers = document.querySelectorAll('[data-purchase-trigger]');
    const moreButton = modal?.querySelector('[data-license-more]');
    const summary = modal?.querySelector('[data-license-summary]');
    const details = modal?.querySelector('[data-license-details]');
    let previouslyFocused = null;

    if (!modal || !cancelButton || !purchaseTriggers.length) return;

    function openPurchaseModal(event) {
        event.preventDefault();
        event.stopPropagation();
        previouslyFocused = document.activeElement;
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        cancelButton.focus();
    }

    function closePurchaseModal() {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
    }

    purchaseTriggers.forEach(trigger => trigger.addEventListener('click', openPurchaseModal));
    cancelButton.addEventListener('click', closePurchaseModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) closePurchaseModal();
    });

    if (moreButton && summary && details) {
        moreButton.addEventListener('click', () => {
            summary.hidden = true;
            details.hidden = false;
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal.classList.contains('show')) closePurchaseModal();
    });
})();
