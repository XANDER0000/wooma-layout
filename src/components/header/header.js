import { throttleComplete } from '../../scripts/utils/throttle.js';
import { getScrollTop, getDocumentHeight } from '../../scripts/utils/document.js';

const getVeiwportHeight = () => window.innerHeight || document.documentElement.clientHeight;

const handleScroll = () => {
  const scrollTop = getScrollTop();
  const header = document.querySelector('.header');
  if (getDocumentHeight() > getVeiwportHeight() + 40) {
    if (scrollTop > 35) {
      header?.classList.add('header--scrolled');
    } else if (scrollTop < 5) {
      header?.classList.remove('header--scrolled');
    }
  }
};

window.addEventListener('scroll', throttleComplete(handleScroll, 200));
