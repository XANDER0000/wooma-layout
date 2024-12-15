import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';

const initReviewsSingleSwiper = (el) => {
  const carouselEl = el;

  const carouselOptions = {
    modules: [Pagination, Autoplay],
    loop: false,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 30,
    speed: 1200,
    autoplay: {
      delay: '3000',
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
      reverseDirection: false,
    },
    navigation: false,
    pagination: {
      el: el.querySelector('.reviews-single__swiper-pagination'),
      clickable: true,
    },
  };

  carouselEl.swiper = new Swiper(carouselEl, carouselOptions);
};

document.querySelectorAll('.reviews-single__swiper').forEach((el) => {
  initReviewsSingleSwiper(el);
});
