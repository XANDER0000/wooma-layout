import Swiper from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';

document.querySelectorAll('.bg-slider').forEach((component) => {
  // const baseClass = 'bg-slider';
  // const containerMain = component.querySelector(`.${baseClass}__slider`);

  const carouselOptions = {
    modules: [Navigation, Autoplay, EffectFade],
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    speed: 700,
    loop: true,
    autoplay: false,
    navigation: false,
    pagination: false,
    allowTouchMove: false,
  };

  const dataAutoplay = component.hasAttribute('data-autoplay')
    ? +component.getAttribute('data-autoplay') || 5000
    : false;
  if (dataAutoplay) {
    carouselOptions.autoplay = {
      delay: dataAutoplay,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    };
  }

  component.swiper = new Swiper(component, carouselOptions);
});
