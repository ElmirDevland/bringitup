class Slider {
  constructor({
    container = null,
    btns = null,
    next = null,
    prev = null,
    activeClass = '',
    autoplay = false,
  } = {}) {
    this.container = document.querySelector(container);
    this.slides = this.container.children;
    this.slideIndex = 1;

    this.btns = document.querySelectorAll(btns);
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);

    this.activeClass = activeClass;
    this.autoplay = autoplay;
  }
}

export default Slider;
