import MainSlider from './modules/slider/main-slider';
import MiniSlider from './modules/slider/mini-slider';
import Slider from './modules/slider/slider';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Forms from './modules/forms';
import ShowInfo from './modules/showInfo';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  //Main Slides
  const mainSlider = new MainSlider({
    container: '.page',
    btns: '.page .sidecontrol__controls .next',
  });
  mainSlider.render();

  const moduleAppSlider = new MainSlider({
    container: '.moduleapp',
    btns: '.moduleapp .sidecontrol__controls .next',
    nextModule: '.moduleapp .nextmodule',
    prevModule: '.moduleapp .prevmodule',
  });
  moduleAppSlider.render();

  // Mini Slides
  const showUpSlider = new MiniSlider({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active',
  });
  showUpSlider.init();

  const modulesSlider = new MiniSlider({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    autoplay: true,
  });
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active',
  });
  feedSlider.init();

  //Player
  new VideoPlayer('.showup .play', '.overlay').init();
  new VideoPlayer('.module__video-item .play', '.overlay').init();

  //Difference

  new Difference('.officerold', '.officer__card-item').init();
  new Difference('.officernew', '.officer__card-item').init();

  //Forms

  new Forms('.join .form').init();
  new Forms('.schedule .form').init();

  // Info
  new ShowInfo('.module__info-show .plus').init();

  //Download
  new Download('.download').init();
});
