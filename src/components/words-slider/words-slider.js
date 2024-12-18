const initWordsSlider = (items) => {
  if (!items) return;
  items.forEach((item) => {
    const slides = item.querySelectorAll('.words-slider__item');
    const delay = item.getAttribute('data-autoplay') ? item.getAttribute('data-autoplay') : 3000;

    let count = 0;
    let width = 0;
    let height = 0;

    slides.forEach((slide) => {
      if (slide.offsetWidth > width) width = slide.offsetWidth;
      if (slide.offsetHeight > height) height = slide.offsetHeight;
      slide.classList.remove('is-visible');
      slide.classList.add('is-hidden');
    });
    slides[count].classList.remove('is-hidden');
    slides[count].classList.add('is-visible');
    item.style.width = `${width}px`;
    item.style.height = `${height}px`;

    function changeItems() {
      count += 1;
      if (count > slides.length - 1) count = 0;
      slides.forEach((slide) => {
        slide.classList.remove('is-visible');
        slide.classList.add('is-hidden');
      });
      slides[count].classList.remove('is-hidden');
      slides[count].classList.add('is-visible');
    }

    setInterval(() => {
      changeItems();
    }, delay);
  });
};

window.initWordsSlider = initWordsSlider;
window.initWordsSlider(document.querySelectorAll('.words-slider'));
