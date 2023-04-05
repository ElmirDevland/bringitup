import Slider from './slider';
class MainSlider extends Slider {
  constructor(btns) {
    super(btns);
  }
  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      this.hanson.style.opacity = 0;
      if (n === 3) {
        setTimeout(() => {
          this.hanson.classList.add('animated', 'fadeInUp');
        }, 3000);
      } else {
        this.hanson.classList.remove('animated', 'fadeInUp');
      }
    } catch (e) {}

    Array.from(this.slides).forEach((slide) => {
      slide.classList.remove('show');
      slide.classList.add('hide');
    });

    this.slides[this.slideIndex - 1].classList.remove('hide');
    this.slides[this.slideIndex - 1].classList.add('show');
  }
  plusSlide(n) {
    this.showSlides((this.slideIndex += n));
  }
  bindTriggers() {
    function slideTo(array, add, ...remove) {
      Array.from(array).forEach((slide) => {
        slide.classList.remove(...remove);
        slide.classList.add('hide', 'animated', add);
      });
    }

    this.btns.forEach((btn) => {
      const logoBtn = btn.parentNode.previousElementSibling;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        slideTo(
          this.slides,
          'slideInDown',
          'show',
          'slideInRight',
          'slideInLeft'
        );
        this.plusSlide(1);
      });

      logoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        slideTo(
          this.slides,
          'slideInDown',
          'show',
          'slideInRight',
          'slideInLeft'
        );
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    this.nextModule.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        slideTo(
          this.slides,
          'slideInRight',
          'show',
          'slideInDown',
          'slideInLeft'
        );
        this.plusSlide(1);
      });
    });

    this.prevModule.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        slideTo(
          this.slides,
          'slideInLeft',
          'show',
          'slideInRight',
          'slideInDown'
        );
        this.plusSlide(-1);
      });
    });
  }

  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector('.hanson');
      } catch (e) {}
      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
  }
}

export default MainSlider;
