(function () {
    const stage = document.getElementById('suiteMediaStage');
    const thumbs = Array.from(document.querySelectorAll('.suite-thumb'));
    const menuButton = document.querySelector('.suite-menu');
    const nav = document.getElementById('suiteNav');

    function setActiveMedia(button) {
        if (!stage || button.classList.contains('is-active')) return;

        const kind = button.dataset.kind;
        const source = button.dataset.src;
        const description = button.dataset.alt || 'Demostración de LuckySuite';
        const previousVideo = stage.querySelector('video');
        if (previousVideo) previousVideo.pause();

        stage.replaceChildren();
        if (kind === 'video') {
            stage.classList.add('is-video');
            const video = document.createElement('video');
            video.src = source;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.controls = true;
            video.playsInline = true;
            video.setAttribute('aria-label', description);
            stage.appendChild(video);
            video.addEventListener('loadedmetadata', function () {
                const ratio = video.videoWidth && video.videoHeight ? video.videoWidth / video.videoHeight : 4 / 3;
                const fittedRatio = ratio >= 1 ? Math.min(2.1, Math.max(1.2, ratio)) : 4 / 3;
                stage.style.setProperty('--media-ratio', String(fittedRatio));
                stage.style.aspectRatio = String(fittedRatio);
            }, { once: true });
            video.play().catch(function () {});
        } else {
            stage.classList.remove('is-video');
            stage.style.removeProperty('--media-ratio');
            stage.style.aspectRatio = '4 / 3';
            const image = document.createElement('img');
            image.src = source;
            image.alt = description;
            stage.appendChild(image);
        }

        thumbs.forEach(function (thumb) {
            const selected = thumb === button;
            thumb.classList.toggle('is-active', selected);
            thumb.setAttribute('aria-pressed', String(selected));
        });
    }

    thumbs.forEach(function (button) {
        button.addEventListener('click', function () { setActiveMedia(button); });
    });

    if (menuButton && nav) {
        menuButton.addEventListener('click', function () {
            const open = nav.classList.toggle('is-open');
            menuButton.setAttribute('aria-expanded', String(open));
            menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        });
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('is-open');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }
})();
