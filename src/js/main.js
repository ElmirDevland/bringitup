import Slider from './modules/slider';
import VideoPlayer from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const slider = new Slider('.page', '.next');
  const videoPlayer = new VideoPlayer('.showup .play', '.overlay');

  slider.render();
  videoPlayer.init();
});
