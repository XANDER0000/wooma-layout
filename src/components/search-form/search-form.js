document.querySelectorAll('.search-form').forEach((component) => {
  const baseClass = 'search-form';
  const suggestions = component.querySelector(`.${baseClass}__suggestions`);
  const input = component.querySelector(`.${baseClass}__input`);

  if (!suggestions) return;

  const close = () => {
    suggestions.classList.remove('is-open');
  };

  const open = () => {
    suggestions.classList.add('is-open');
  };

  const isOpen = () => suggestions.classList.contains('is-open');

  // Закрываем навигационную панель по ESC
  document.addEventListener('keydown', (event) => {
    if ((event.code === 'Escape') && isOpen()) {
      close();
    }
  }, false);

  document.addEventListener('input', (event) => {
    if (event.target === input) {
      open();
    }
  }, false);

  // Закрываем навигационную панель по клику на документ
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-form') && isOpen() && !event.target.closest(`.${baseClass}__suggestions`)) {
      close();
    }
  }, false);
});
