import Swiper from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

document.querySelectorAll('.hero-slider').forEach((component) => {
  const baseClass = 'hero-slider';
  // const containerMain = component.querySelector(`.${baseClass}__slider`);

  const carouselOptions = {
    modules: [Navigation, Autoplay, Pagination],
    effect: 'fade',
    speed: 1200,
    autoplay: false,
    navigation: false,
    pagination: {
      el: component.querySelector(`.${baseClass}__pagination`),
      clickable: true,
    },
  };

  const btnPrev = component.querySelector(`.${baseClass}__prev`);
  const btnNext = component.querySelector(`.${baseClass}__next`);

  if (btnPrev && btnNext) {
    carouselOptions.navigation = {
      prevEl: btnPrev,
      nextEl: btnNext,
    };
  }

  const dataAutoplay = component.hasAttribute('data-autoplay')
    ? +component.getAttribute('data-autoplay') || 5000
    : false;
  if (dataAutoplay) {
    carouselOptions.autoplay = {
      delay: dataAutoplay,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    };
  }

  component.swiper = new Swiper(component, carouselOptions);

  // function updateCounter(swiper) {
  //   const labelCurrent = component.querySelector(`.${baseClass}__counter-current`);
  //   const labelAll = component.querySelector(`.${baseClass}__counter-all`);
  //   if (labelCurrent && labelAll) {
  //     labelCurrent.textContent = swiper.realIndex + 1;
  //     labelAll.textContent = swiper.slides.length;
  //   }
  // }

  // component.swiper.on('slideChange', (swiper) => {
  //   updateCounter(swiper);
  // });

  // updateCounter(component.swiper);
});
