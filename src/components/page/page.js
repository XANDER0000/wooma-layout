import { throttleComplete } from '../../scripts/utils/throttle.js';
import { getScrollTop } from '../../scripts/utils/document.js';

const handleScrollPage = () => {
  const offset = 10;
  if (getScrollTop() > offset) {
    document.querySelector('.page').classList.add('page--scrolled');
  } else {
    document.querySelector('.page').classList.remove('page--scrolled');
  }
};

window.addEventListener('scroll', throttleComplete(handleScrollPage, 100));
