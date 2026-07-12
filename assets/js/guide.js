(function () {
    'use strict';

    var hamburgerBtn = document.getElementById('hamburgerBtn');
    var mobileNavOverlay = document.getElementById('mobileNavOverlay');

    function openNav() {
        if (!mobileNavOverlay || !hamburgerBtn) return;
        mobileNavOverlay.style.display = 'flex';
        requestAnimationFrame(function () {
            hamburgerBtn.classList.add('active');
            mobileNavOverlay.classList.add('open');
            document.body.classList.add('nav-open');
        });
    }

    function closeNav() {
        if (!mobileNavOverlay || !hamburgerBtn) return;
        hamburgerBtn.classList.remove('active');
        mobileNavOverlay.classList.remove('open');
        document.body.classList.remove('nav-open');
        window.setTimeout(function () {
            if (!mobileNavOverlay.classList.contains('open')) mobileNavOverlay.style.display = 'none';
        }, 420);
    }

    if (hamburgerBtn && mobileNavOverlay) {
        hamburgerBtn.addEventListener('click', function () {
            mobileNavOverlay.classList.contains('open') ? closeNav() : openNav();
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeNav();
    });

    var labTabs = Array.prototype.slice.call(document.querySelectorAll('.lab-tab'));
    var labVisuals = Array.prototype.slice.call(document.querySelectorAll('.lab-visual'));
    var labTitle = document.getElementById('labTitle');
    var labSummary = document.getElementById('labSummary');
    var labJump = document.getElementById('labJump');
    var labToolbarTitle = document.getElementById('labToolbarTitle');

    function selectLabPanel(tab) {
        var panel = tab.getAttribute('data-panel');
        labTabs.forEach(function (candidate) {
            var active = candidate === tab;
            candidate.classList.toggle('active', active);
            candidate.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        labVisuals.forEach(function (visual) {
            visual.classList.toggle('active', visual.getAttribute('data-panel') === panel);
        });
        if (labTitle) labTitle.textContent = tab.getAttribute('data-title') || '';
        if (labToolbarTitle) labToolbarTitle.textContent = tab.getAttribute('data-title') || '';
        if (labSummary) labSummary.textContent = tab.getAttribute('data-summary') || '';
        if (labJump) labJump.setAttribute('href', '#' + panel);
    }

    labTabs.forEach(function (tab) {
        tab.addEventListener('click', function () { selectLabPanel(tab); });
    });

    var anchorPoints = Array.prototype.slice.call(document.querySelectorAll('.anchor-point'));
    anchorPoints.forEach(function (point) {
        point.addEventListener('click', function () {
            anchorPoints.forEach(function (candidate) { candidate.classList.remove('active'); });
            point.classList.add('active');
        });
    });

    var guideSearch = document.getElementById('guideSearch');
    var modules = Array.prototype.slice.call(document.querySelectorAll('.guide-module'));
    var emptyState = document.getElementById('guideEmpty');

    function normalize(value) {
        return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function filterGuide() {
        var query = normalize(guideSearch ? guideSearch.value.trim() : '');
        var visible = 0;
        modules.forEach(function (module) {
            var matches = !query || normalize(module.textContent).indexOf(query) !== -1;
            module.classList.toggle('search-hidden', !matches);
            if (matches) visible += 1;
        });
        if (emptyState) emptyState.classList.toggle('visible', visible === 0);
    }

    if (guideSearch) guideSearch.addEventListener('input', filterGuide);

    var expandAll = document.getElementById('expandAll');
    var collapseAll = document.getElementById('collapseAll');

    // The Guide is a manual first: keep its complete text visible by default.
    document.querySelectorAll('.guide-details').forEach(function (detail) {
        detail.open = true;
    });

    function setAllDetails(open) {
        document.querySelectorAll('.guide-details').forEach(function (detail) { detail.open = open; });
    }

    if (expandAll) expandAll.addEventListener('click', function () { setAllDetails(true); });
    if (collapseAll) collapseAll.addEventListener('click', function () { setAllDetails(false); });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            var target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (history.replaceState) history.replaceState(null, '', anchor.getAttribute('href'));
        });
    });

    var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.guide-toc a'));
    if ('IntersectionObserver' in window) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                tocLinks.forEach(function (link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
                });
            });
        }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });
        modules.forEach(function (module) { sectionObserver.observe(module); });
    }

    var progress = document.getElementById('guideProgress');
    function updateProgress() {
        if (!progress) return;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        progress.style.width = (ratio * 100) + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
})();
