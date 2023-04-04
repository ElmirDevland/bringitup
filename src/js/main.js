import MainSlider from './modules/slider/main-slider';
import MiniSlider from './modules/slider/mini-slider';
import Slider from './modules/slider/slider';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  //Slider
  const mainSlider = new MainSlider({ container: '.page', btns: '.next' });
  mainSlider.render();

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
  const videoPlayer = new VideoPlayer('.showup .play', '.overlay');
  videoPlayer.init();

  //Difference

  const oldOfficer = new Difference('.officerold', '.officer__card-item');
  oldOfficer.init();

  const newOfficer = new Difference('.officernew', '.officer__card-item');
  newOfficer.init();
});
