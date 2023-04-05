class Slider {
  constructor({
    container = null,
    btns = null,
    next = null,
    prev = null,
    nextModule = null,
    prevModule = null,
    activeClass = '',
    autoplay = false,
  } = {}) {
    this.container = document.querySelector(container);
    this.slideIndex = 1;

    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.btns = document.querySelectorAll(btns);
    this.nextModule = document.querySelectorAll(nextModule);
    this.prevModule = document.querySelectorAll(prevModule);

    this.activeClass = activeClass;
    this.autoplay = autoplay;

    try {
      this.slides = this.container.children;
    } catch (e) {}
  }
}

export default Slider;
