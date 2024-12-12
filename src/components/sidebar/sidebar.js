import debounce from '../../scripts/utils/debounce.js';

document.querySelectorAll('.sidebar').forEach((component) => {
  const baseClass = 'sidebar';

  const toggles = document.querySelectorAll('[data-toggle="sidebar"]');
  const page = document.querySelector('.page');

  // Инициализация переключаемого режима
  const init = () => {
    if (!matchMedia('(min-width: 80em)').matches) {
      component.style.visibility = 'hidden';
      component.setAttribute('aria-hidden', 'true');
    }
  };

  init();

  // Сброс переключаемого режима
  const reset = () => {
    component.removeAttribute('aria-hidden');
    component.removeAttribute('aria-modal');
    component.removeAttribute('role');
    component.style.visibility = '';
  };

  const open = () => {
    component.classList.add('is-open');

    component.setAttribute('aria-hidden', 'false');
    component.setAttribute('aria-modal', 'true');
    component.setAttribute('role', 'dialog');
    component.style.visibility = 'visible';

    toggles.forEach((toggle) => {
      toggle.classList.add('active');
    });

    if (page) {
      page.classList.add('page--overlay-show');
      page.classList.add('page--sidebar-open');
    }

    component.dispatchEvent(new CustomEvent('open'));
  };

  const close = () => {
    component.classList.remove('is-open');

    component.setAttribute('aria-hidden', 'true');
    component.setAttribute('aria-modal', 'false');
    component.setAttribute('role', 'none');
    setTimeout(() => {
      component.style.visibility = 'hidden';
    }, 300);

    toggles.forEach((toggle) => {
      toggle.classList.remove('active');
    });

    if (page) {
      page.classList.remove('page--overlay-show');
      page.classList.remove('page--sidebar-open');
    }
    component.dispatchEvent(new CustomEvent('close'));
  };

  const isOpen = () => component.classList.contains('is-open');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      if (isOpen()) {
        close();
      } else {
        open();
      }
    }, true);
  });

  // Клик по кнопке "Закрыть" меню
  const btnClose = component.querySelector(`.${baseClass}__btn-close`);
  if (btnClose) {
    btnClose.addEventListener('click', (event) => {
      event.preventDefault();
      close();
    }, false);
  }

  // Закрываем навигационную панель по ESC
  document.addEventListener('keydown', (event) => {
    if ((event.code === 'Escape') && isOpen()) {
      close();
    }
  }, false);

  // Закрываем навигационную панель по клику на документ
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.sidebar') && !event.target.closest('.sidebar-after') && isOpen() && !event.target.closest('[data-toggle="sidebar"]')) {
      close();
    }
  }, false);

  /*
    Принудительно закрываем и сбрасываем навигационную панель
    при расширении браузера за пределы мобильных разрешений
  */
  const handleResizePage = () => {
    if (matchMedia('(min-width: 80em)').matches) {
      if (isOpen()) close();
      setTimeout(reset, 310);
      // reset();
    }
  };

  window.addEventListener('resize', debounce(handleResizePage, 200));
});
