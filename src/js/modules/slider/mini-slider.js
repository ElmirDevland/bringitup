import Slider from './slider';
class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, autoplay) {
    super(container, next, prev, activeClass, autoplay);
    this.buttons = this.findBtn();
  }
  findBtn() {
    return Array.from(this.slides).filter((item) => item.tagName === 'BUTTON');
  }
  addActive() {
    Array.from(this.slides).forEach((slide) => {
      slide.classList.remove(this.activeClass);
    });
    if (!this.slides[0].closest('button')) {
      this.slides[0].classList.add(this.activeClass);
    }
  }
  nextSlide() {
    this.container.append(this.slides[0]);
    if (this.buttons.length > 0) {
      this.buttons.forEach((btn) => this.container.append(btn));
    }
    this.addActive();
  }
  prevSlide() {
    if (this.buttons.length > 0) {
      this.buttons.forEach((btn) => this.container.prepend(btn));
    }
    this.container.insertBefore(
      this.slides[this.slides.length - 1],
      this.slides[0]
    );

    this.addActive();
  }

  bindTriggers() {
    this.next.addEventListener('click', () => this.nextSlide());
    this.prev.addEventListener('click', () => this.prevSlide());
  }

  init() {
    this.container.style.cssText = `
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    `;

    if (this.autoplay) {
      setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
    this.bindTriggers();
  }
}
export default MiniSlider;
