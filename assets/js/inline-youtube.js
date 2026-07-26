(function () {
    'use strict';

    function playerUrl(videoId) {
        const params = new URLSearchParams({
            autoplay: '1',
            controls: '1',
            playsinline: '1',
            rel: '0'
        });

        if (location.protocol === 'http:' || location.protocol === 'https:') {
            params.set('origin', location.origin);
            params.set('widget_referrer', location.href);
        }

        return 'https://www.youtube.com/embed/' + encodeURIComponent(videoId) + '?' + params.toString();
    }

    function showLocalPreviewNote(player) {
        let note = player.querySelector('.inline-youtube-local-note');
        if (note) return;

        note = document.createElement('div');
        note.className = 'inline-youtube-local-note';
        note.innerHTML = '<strong>YouTube needs an http:// page for embedded playback.</strong> Open “Start LuckyTools Preview.cmd” and press Play again.';
        player.appendChild(note);
    }

    function play(player) {
        if (!player || player.classList.contains('is-playing')) return;

        if (location.protocol === 'file:') {
            showLocalPreviewNote(player);
            return;
        }

        const videoId = player.dataset.youtubeId;
        if (!videoId) return;

        document.querySelectorAll('.inline-youtube-player.is-playing').forEach(function (other) {
            if (other !== player) stop(other);
        });

        const iframe = document.createElement('iframe');
        iframe.src = playerUrl(videoId);
        iframe.title = player.dataset.youtubeTitle || 'YouTube video';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.allowFullscreen = true;

        player.dataset.posterMarkup = player.innerHTML;
        player.classList.add('is-playing');
        player.removeAttribute('role');
        player.removeAttribute('tabindex');
        player.replaceChildren(iframe);
    }

    function stop(player) {
        if (!player || !player.classList.contains('is-playing')) return;
        player.classList.remove('is-playing');
        player.setAttribute('role', 'button');
        player.setAttribute('tabindex', '0');
        player.innerHTML = player.dataset.posterMarkup || '';
    }

    function bind(player) {
        player.addEventListener('click', function (event) {
            if (event.target.closest('a')) return;
            play(player);
        });

        player.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            play(player);
        });
    }

    document.querySelectorAll('.inline-youtube-player[data-youtube-id]').forEach(bind);

    window.LuckyInlineYouTube = { play: play, stop: stop };
})();
