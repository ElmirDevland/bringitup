class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
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
    this.btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (document.querySelector('iframe#frame')) {
          this.showOverlay();
        } else {
          const path = btn.getAttribute('data-url');
          this.createPlayer(path);
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
    });
  }

  init() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    const firstScriptTag = document.querySelectorAll('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindTriggers();
    this.bindCloseBtn();
  }
}

export default VideoPlayer;
