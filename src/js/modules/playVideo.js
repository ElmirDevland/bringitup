class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  hideOverlay() {
    this.overlay.classList.remove('flex');
    this.overlay.classList.add('hide');
    this.player.stopVideo();
  }

  showOverlay() {
    this.overlay.classList.remove('hide');
    this.overlay.classList.add('flex');
  }

  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blockedElem = btn.closest(
          '.module__video-item'
        ).nextElementSibling;

        if (i % 2 == 0) {
          blockedElem.setAttribute('data-disabled', 'true');
        }
      } catch (e) {}

      btn.addEventListener('click', () => {
        if (
          !btn.closest('.module__video-item') ||
          btn.closest('.module__video-item').getAttribute('data-disabled') !==
            'true'
        ) {
          this.activeBtn = btn;
          if (document.querySelector('iframe#frame')) {
            this.showOverlay();
            if (this.path !== btn.getAttribute('data-url')) {
              this.path = btn.getAttribute('data-url');
              this.player.loadVideoById({ videoId: this.path });
            }
          } else {
            this.path = btn.getAttribute('data-url');
            this.createPlayer(this.path);
          }
        }
      });
    });
  }

  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.hideOverlay();
    });
  }

  createPlayer(url) {
    this.showOverlay();

    this.player = new YT.Player('frame', {
      height: '100%',
      weight: '100%',
      videoId: url,
      events: {
        onStateChange: this.onPlayerStateChange,
      },
    });
  }

  onPlayerStateChange(state) {
    try {
      const blockedElem = this.activeBtn.closest(
        '.module__video-item'
      ).nextElementSibling;
      const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);

      if (
        state.data === 0 &&
        blockedElem.querySelector('.play__circle').classList.contains('closed')
      ) {
        blockedElem.querySelector('.play__circle').classList.remove('closed');
        blockedElem.querySelector('.play__circle svg').remove();
        blockedElem.querySelector('.play__circle').append(playBtn);
        blockedElem.querySelector('.play__text').textContent = 'play video';
        blockedElem.querySelector('.play__text').classList.remove('attention');
        blockedElem.style.cssText = `opacity: 1; filter: none`;
        blockedElem.setAttribute('data-disabled', 'false');
      }
    } catch (e) {}
  }

  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      const firstScriptTag = document.querySelectorAll('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.bindTriggers();
      this.bindCloseBtn();
    }
  }
}

export default VideoPlayer;
