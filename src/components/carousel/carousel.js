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

  if (component.classList.contains('carousel--reviews')) {
    carouselOptions.spaceBetween = 20;
    carouselOptions.slidesPerView = 1;
    carouselOptions.breakpoints = {
      768: {
        spaceBetween: 20,
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 4,
      },
    };
  }

  if (component.classList.contains('carousel--categories')) {
    carouselOptions.spaceBetween = 20;
    carouselOptions.slidesPerView = 3;
    carouselOptions.loop = true;
    carouselOptions.breakpoints = {
      600: {
        spaceBetween: 30,
        slidesPerView: 5,
      },
      900: {
        slidesPerView: 6,
      },
      1200: {
        slidesPerView: 7,
      },
      1600: {
        slidesPerView: 8,
      },
      1890: {
        slidesPerView: 10,
      },
    };
  }

  if (component.classList.contains('carousel--insta')) {
    carouselOptions.spaceBetween = 20;
    carouselOptions.slidesPerView = 1;
    carouselOptions.loop = true;
    const btnPrev = component.querySelector('.carousel__navigation-prev');
    const btnNext = component.querySelector('.carousel__navigation-next');
    if (btnPrev && btnNext) {
      carouselOptions.navigation = {
        prevEl: btnPrev,
        nextEl: btnNext,
      };
    }
    carouselOptions.breakpoints = {
      540: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1100: {
        slidesPerView: 4,
      },
      1300: {
        slidesPerView: 5,
      },
      1600: {
        slidesPerView: 7,
      },
    };
  }

  if (component.classList.contains('carousel--interested')) {
    carouselOptions.spaceBetween = 20;
    carouselOptions.slidesPerView = 2;
    carouselOptions.breakpoints = {
      900: {
        slidesPerView: 3,
      },
      1300: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 5,
      },
    };
  }

  component.swiper = new Swiper(component, carouselOptions);
};

window.initCarousel = initCarousel;

document.querySelectorAll('.carousel').forEach((el) => {
  initCarousel(el);
});
