import { slideUp } from '../../scripts/utils/slide.js';

document.addEventListener('click', (event) => {
  const btn = event.target.closest('.alert__btn-close') || event.target.closest('.alert-timer__btn-close');
  if (btn) {
    const alert = btn.closest('.alert') || btn.closest('.alert-timer');
    if (alert) {
      slideUp(alert, 250);
    }
  }
});
