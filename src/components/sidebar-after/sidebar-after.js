import debounce from '../../scripts/utils/debounce.js';

document.querySelectorAll('.sidebar-after').forEach((component) => {
  const baseClass = 'sidebar-after';

  const toggles = document.querySelectorAll('[data-sidebar-after-toggle]');
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

  const open = (sidebarId, actionId) => {
    const action = sidebarId && actionId ? component.querySelector(`#${actionId}`) : null;

    if (action) {
      action.classList.add('active');
    }
    if (component.id === sidebarId) {
      component.classList.add('is-open');

      component.setAttribute('aria-hidden', 'false');
      component.setAttribute('aria-modal', 'true');
      component.setAttribute('role', 'dialog');
      component.style.visibility = 'visible';

      toggles.forEach((toggle) => {
        if (toggle.getAttribute('data-sidebar-after-toggle') === sidebarId) {
          toggle.classList.add('active');
        }
      });

      if (page) page.classList.add('page--overlay-show');

      component.dispatchEvent(new CustomEvent('open'));
    }
  };

  const close = () => {
    component.querySelectorAll(`.${baseClass}__content-action`).forEach((action) => {
      action.classList.remove('active');
    });

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
      if (!page.classList.contains('page--sidebar-open')) {
        page.classList.remove('page--overlay-show');
      }
    }
    component.dispatchEvent(new CustomEvent('close'));
  };

  const isOpen = () => component.classList.contains('is-open');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      const sidebarId = toggle.getAttribute('data-sidebar-after-toggle');
      const actionId = toggle.getAttribute('data-sidebar-after-action');

      if (isOpen()) {
        close();
      } else {
        open(sidebarId, actionId);
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
    if (!event.target.closest('.sidebar-after') && isOpen() && !event.target.closest('[data-sidebar-after-toggle]')) {
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
    }
  };

  window.addEventListener('resize', debounce(handleResizePage, 200));
});
