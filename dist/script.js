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
    this.parent = document.querySelector(parent);
    this.items = this.parent.querySelectorAll(items);
    this.plusBtn = this.parent.querySelector('.plus');
    this.counter = 0;
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
    this.plusBtn.addEventListener('click', () => {
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
    this.hideItems();
    this.bindTriggers();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Difference);

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
    this.btns.forEach(btn => {
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
      videoId: url
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
      slide.classList.add('hide', 'animated', 'slideInDown');
    });
    this.slides[this.slideIndex - 1].classList.remove('hide');
    this.slides[this.slideIndex - 1].classList.add('show');
  }
  plusSlide(n) {
    this.showSlides(this.slideIndex += n);
  }
  render() {
    try {
      this.hanson = document.querySelector('.hanson');
    } catch (e) {}
    this.showSlides(this.slideIndex);
    this.btns.forEach(btn => {
      const logoBtn = btn.parentNode.previousElementSibling;
      btn.addEventListener('click', () => {
        this.plusSlide(1);
      });
      logoBtn.addEventListener('click', e => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
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
    return Array.from(this.slides).filter(item => item.tagName === 'BUTTON');
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
      activeClass = '',
      autoplay = false
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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





window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  //Slider
  const mainSlider = new _modules_slider_main_slider__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.page',
    btns: '.next'
  });
  mainSlider.render();
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
  const videoPlayer = new _modules_playVideo__WEBPACK_IMPORTED_MODULE_3__["default"]('.showup .play', '.overlay');
  videoPlayer.init();

  //Difference

  const oldOfficer = new _modules_difference__WEBPACK_IMPORTED_MODULE_4__["default"]('.officerold', '.officer__card-item');
  oldOfficer.init();
  const newOfficer = new _modules_difference__WEBPACK_IMPORTED_MODULE_4__["default"]('.officernew', '.officer__card-item');
  newOfficer.init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map