import Swiper from 'swiper';
import {
  Navigation, Pagination, Autoplay, Mousewheel,
} from 'swiper/modules';

const initCarousel = (component) => {
  const carouselOptions = {
    modules: [Navigation, Pagination, Autoplay, Mousewheel],
    slidesPerView: 'auto',
    spaceBetween: 12,
    speed: 700,
    autoplay: false,
    mousewheel: {
      enabled: true,
      releaseOnEdges: true,
    },
    breakpoints: {
      1280: {
        spaceBetween: 12,
      },
    },
  };

  const dataAutoplay = component.hasAttribute('data-autoplay') ? +component.getAttribute('data-autoplay') || 5000 : false;
  if (dataAutoplay) {
    carouselOptions.autoplay = {
      delay: dataAutoplay,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    };
  }

  const dataPagination = component.hasAttribute('data-pagination');
  if (dataPagination) {
    carouselOptions.pagination = {
      el: component.querySelector('.carousel__pagination'),
      dynamicBullets: false,
      clickable: true,
    };
  }

  if (component.classList.contains('carousel--offers')) {
    carouselOptions.breakpoints = {
      1280: {
        spaceBetween: 40,
      },
    };
  }

  component.swiper = new Swiper(component, carouselOptions);
};

window.initCarousel = initCarousel;

document.querySelectorAll('.carousel').forEach((el) => {
  initCarousel(el);
});
