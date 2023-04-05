/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/difference.js":
/*!**************************************!*\
  !*** ./src/js/modules/difference.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Difference {
  constructor(parent, items) {
    try {
      this.parent = document.querySelector(parent);
      this.items = this.parent.querySelectorAll(items);
      this.counter = 0;
    } catch (e) {}
  }
  hideItems() {
    this.items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = 'none';
        item.classList.add('animated', 'slideInDown');
      }
    });
  }
  bindTriggers() {
    this.parent.querySelector('.plus').addEventListener('click', () => {
      if (this.counter >= this.items.length - 2) {
        this.items[this.counter].style.display = 'flex';
        this.items[this.items.length - 1].remove();
      } else {
        this.items[this.counter].style.display = 'flex';
        this.counter++;
      }
    });
  }
  init() {
    try {
      this.hideItems();
      this.bindTriggers();
    } catch (e) {}
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Difference);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Forms {
  constructor(form) {
    this.form = document.querySelector(form);
    this.path = 'assets/question.php';
    this.messages = {
      fail: 'Oops...',
      success: 'Success!'
    };
  }
  checkMailInputs() {
    const mailInput = this.form.querySelector('[name="email"]');
    mailInput.addEventListener('input', () => {
      mailInput.value = mailInput.value.replace(/[а-яё]/gi, '');
    });
  }
  async postData(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      body: data
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url} ${res.status} (${res.statusText})`);
    }
    return await res.text();
  }
  initMask() {
    function setCursorPosition(pos, elem) {
      elem.setSelectionRange(pos, pos);
      elem.focus();
    }
    function createMask(event) {
      const matrix = '+1 (___) ___-____';
      const def = matrix.replace(/\D/g, '');
      let val = this.value.replace(/\D/g, '');
      let i = 0;
      if (def.length >= val.length) {
        val = def;
      }
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });
      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
    const input = this.form.querySelector('[name="phone"]');
    if (input) {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
      input.addEventListener('keypress', createMask);
    }
  }
  init() {
    try {
      this.checkMailInputs();
      this.initMask();
      const statusModal = document.createElement('div');
      statusModal.classList.add('status-modal');
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(this.form);
        document.body.prepend(statusModal);
        this.postData(this.path, formData).then(data => {
          statusModal.innerHTML = `
           <div class="text-window">
              <p>${this.messages.success}</p>
           </div>
           `;
          console.log(data);
        }).catch(e => {
          statusModal.innerHTML = `
           <div class="text-window">
              <p>${this.messages.fail}</p>
           </div>
           `;
          console.log(e.message);
        }).finally(() => {
          this.form.reset();
          setTimeout(() => {
            statusModal.remove();
          }, 3500);
        });
      });
    } catch (e) {}
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Forms);

/***/ }),

/***/ "./src/js/modules/playVideo.js":
/*!*************************************!*\
  !*** ./src/js/modules/playVideo.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
        const blockedElem = btn.closest('.module__video-item').nextElementSibling;
        if (i % 2 == 0) {
          blockedElem.setAttribute('data-disabled', 'true');
        }
      } catch (e) {}
      btn.addEventListener('click', () => {
        if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
          this.activeBtn = btn;
          if (document.querySelector('iframe#frame')) {
            this.showOverlay();
            if (this.path !== btn.getAttribute('data-url')) {
              this.path = btn.getAttribute('data-url');
              this.player.loadVideoById({
                videoId: this.path
              });
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
        onStateChange: this.onPlayerStateChange
      }
    });
  }
  onPlayerStateChange(state) {
    try {
      const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
      const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
      if (state.data === 0 && blockedElem.querySelector('.play__circle').classList.contains('closed')) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoPlayer);

/***/ }),

/***/ "./src/js/modules/slider/main-slider.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/main-slider.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    Array.from(this.slides).forEach(slide => {
      slide.classList.remove('show');
      slide.classList.add('hide');
    });
    this.slides[this.slideIndex - 1].classList.remove('hide');
    this.slides[this.slideIndex - 1].classList.add('show');
  }
  plusSlide(n) {
    this.showSlides(this.slideIndex += n);
  }
  bindTriggers() {
    function slideTo(array, add) {
      for (var _len = arguments.length, remove = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remove[_key - 2] = arguments[_key];
      }
      Array.from(array).forEach(slide => {
        slide.classList.remove(...remove);
        slide.classList.add('hide', 'animated', add);
      });
    }
    this.btns.forEach(btn => {
      const logoBtn = btn.parentNode.previousElementSibling;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        slideTo(this.slides, 'slideInDown', 'show', 'slideInRight', 'slideInLeft');
        this.plusSlide(1);
      });
      logoBtn.addEventListener('click', e => {
        e.preventDefault();
        slideTo(this.slides, 'slideInDown', 'show', 'slideInRight', 'slideInLeft');
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
    this.nextModule.forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        slideTo(this.slides, 'slideInRight', 'show', 'slideInDown', 'slideInLeft');
        this.plusSlide(1);
      });
    });
    this.prevModule.forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        slideTo(this.slides, 'slideInLeft', 'show', 'slideInRight', 'slideInDown');
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainSlider);

/***/ }),

/***/ "./src/js/modules/slider/mini-slider.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/mini-slider.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(container, next, prev, activeClass, autoplay) {
    super(container, next, prev, activeClass, autoplay);
    this.buttons = this.findBtn();
  }
  findBtn() {
    try {
      return Array.from(this.slides).filter(item => item.tagName === 'BUTTON');
    } catch (e) {}
  }
  addActive() {
    Array.from(this.slides).forEach(slide => {
      slide.classList.remove(this.activeClass);
    });
    if (!this.slides[0].closest('button')) {
      this.slides[0].classList.add(this.activeClass);
    }
  }
  nextSlide() {
    this.container.append(this.slides[0]);
    if (this.buttons.length > 0) {
      this.buttons.forEach(btn => this.container.append(btn));
    }
    this.addActive();
  }
  prevSlide() {
    if (this.buttons.length > 0) {
      this.buttons.forEach(btn => this.container.prepend(btn));
    }
    this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
    this.addActive();
  }
  bindTriggers() {
    this.next.addEventListener('click', () => this.nextSlide());
    this.prev.addEventListener('click', () => this.prevSlide());
  }
  init() {
    try {
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
    } catch (e) {}
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MiniSlider);

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Slider {
  constructor() {
    let {
      container = null,
      btns = null,
      next = null,
      prev = null,
      nextModule = null,
      prevModule = null,
      activeClass = '',
      autoplay = false
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slider);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider_main_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider/main-slider */ "./src/js/modules/slider/main-slider.js");
/* harmony import */ var _modules_slider_mini_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider/mini-slider */ "./src/js/modules/slider/mini-slider.js");
/* harmony import */ var _modules_slider_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider/slider */ "./src/js/modules/slider/slider.js");
/* harmony import */ var _modules_playVideo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/playVideo */ "./src/js/modules/playVideo.js");
/* harmony import */ var _modules_difference__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/difference */ "./src/js/modules/difference.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");






window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  //Main Slides
  const mainSlider = new _modules_slider_main_slider__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.page',
    btns: '.page .sidecontrol__controls .next'
  });
  mainSlider.render();
  const moduleAppSlider = new _modules_slider_main_slider__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.moduleapp',
    btns: '.moduleapp .sidecontrol__controls .next',
    nextModule: '.moduleapp .nextmodule',
    prevModule: '.moduleapp .prevmodule'
  });
  moduleAppSlider.render();

  // Mini Slides
  const showUpSlider = new _modules_slider_mini_slider__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active'
  });
  showUpSlider.init();
  const modulesSlider = new _modules_slider_mini_slider__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    autoplay: true
  });
  modulesSlider.init();
  const feedSlider = new _modules_slider_mini_slider__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active'
  });
  feedSlider.init();

  //Player
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_3__["default"]('.showup .play', '.overlay').init();
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_3__["default"]('.module__video-item .play', '.overlay').init();

  //Difference

  const oldOfficer = new _modules_difference__WEBPACK_IMPORTED_MODULE_4__["default"]('.officerold', '.officer__card-item');
  oldOfficer.init();
  const newOfficer = new _modules_difference__WEBPACK_IMPORTED_MODULE_4__["default"]('.officernew', '.officer__card-item');
  newOfficer.init();

  //Forms
  const formOne = new _modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"]('.join .form');
  formOne.init();
  const secondForm = new _modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"]('.schedule .form');
  secondForm.init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map