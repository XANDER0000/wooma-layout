const initSearchFilter = (element) => {
  const input = element.querySelector('.search-filter__input');
  const btnClear = element.querySelector('.search-filter__btn-clear');

  const handleInputChange = (event) => {
    if (event.target.value && !input.classList.contains('is-touched')) {
      input.classList.add('is-touched');
    } else if (!event.target.value && input.classList.contains('is-touched')) {
      input.classList.remove('is-touched');
    }
  };

  const handleBtnClearClick = () => {
    if (!input) return;
    const prevValue = input.value;
    input.value = '';
    input.focus();
    input.classList.remove('is-touched');
    if (prevValue) {
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  if (input && btnClear) {
    btnClear.addEventListener('click', handleBtnClearClick);
    input.addEventListener('input', handleInputChange);
    input.addEventListener('change', handleInputChange);
    input.addEventListener('focus', handleInputChange);
  }
};

document.querySelectorAll('.search-filter').forEach((element) => {
  initSearchFilter(element);
});
