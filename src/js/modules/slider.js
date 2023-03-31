class Slider {
  constructor(page, btns) {
    this.page = document.querySelector(page);
    this.slides = Array.from(this.page.children);
    this.btns = document.querySelectorAll(btns);
    this.slideIndex = 1;
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

    this.slides.forEach((slide) => {
      slide.classList.remove('show');
      slide.classList.add('hide', 'animated', 'slideInDown');
    });

    this.slides[this.slideIndex - 1].classList.remove('hide');
    this.slides[this.slideIndex - 1].classList.add('show');
  }

  plusSlide(n) {
    this.showSlides((this.slideIndex += n));
  }

  render() {
    try {
      this.hanson = document.querySelector('.hanson');
    } catch (e) {}
    this.showSlides(this.slideIndex);

    this.btns.forEach((btn) => {
      const logoBtn = btn.parentNode.previousElementSibling;

      btn.addEventListener('click', () => {
        this.plusSlide(1);
      });

      logoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
  }
}

export default Slider;
