import Swiper from 'swiper';
import {
  Navigation, Autoplay, EffectFade, Thumbs,
} from 'swiper/modules';
import { Fancybox } from '@fancyapps/ui';

document.querySelectorAll('.product-section-slider').forEach((component) => {
  const baseClass = 'product-section-slider';
  const containerMain = component.querySelector(`.${baseClass}__swiper`);
  const containerThumbs = component.querySelector(`.${baseClass}__thumbs`); // Контейнер для миниатюр

  const carouselOptions = {
    modules: [Navigation, Autoplay, EffectFade, Thumbs],
    speed: 700,
    loop: false,
    autoplay: false,
    navigation: true,
    pagination: false,
    allowTouchMove: true,
  };

  const btnPrev = containerMain.querySelector(`.${baseClass}__navigation-prev`);
  const btnNext = containerMain.querySelector(`.${baseClass}__navigation-next`);
  if (btnPrev && btnNext) {
    carouselOptions.navigation = {
      prevEl: btnPrev,
      nextEl: btnNext,
    };
  }

  const dataAutoplay = containerMain.hasAttribute('data-autoplay')
    ? +containerMain.getAttribute('data-autoplay') || 5000
    : false;
  if (dataAutoplay) {
    carouselOptions.autoplay = {
      delay: dataAutoplay,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    };
  }

  let thumbsSlider = null;
  if (containerThumbs) {
    thumbsSlider = new Swiper(containerThumbs, {
      slidesPerView: 5,
      spaceBetween: 10,
      watchSlidesProgress: true,
      loop: false,
      breakpoints: {
        900: {
          slidesPerView: 8,
        },
        1300: {
          slidesPerView: 7,
        },
        1600: {
          slidesPerView: 8,
        },
      },
    });

    carouselOptions.thumbs = {
      swiper: thumbsSlider,
    };
  }

  // Связывание Fancybox
  containerMain.querySelectorAll('.fancybox-trigger').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();

      const fancyboxGroup = trigger.getAttribute('data-fancybox'); // Группа триггеро

      // Фильтруем элементы с тем же data-fancybox
      const items = Array.from(containerMain.querySelectorAll('.fancybox-trigger')).filter(
        (item) => item.getAttribute('data-fancybox') === fancyboxGroup,
      );
      Fancybox.show(
        items.map((item) => ({
          src: item.getAttribute('href') || item.getAttribute('data-src'),
        })),
        {
          startIndex: items.indexOf(trigger), // Текущий элемент в фильтрованном массиве
        },
      );
    });
  });

  containerMain.swiper = new Swiper(containerMain, carouselOptions);
});
