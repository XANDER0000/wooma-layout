import InputboxSearchField from './InputboxSearchField.js';

document.querySelectorAll('.inputbox').forEach((el) => {
  if (el.querySelector('.inputbox__btn-clear')) {
    el.inputboxSearchField = new InputboxSearchField(el);
  }
});

document.addEventListener('click', (event) => {
  const toggle = event.target.closest('.inputbox__btn-view');
  if (toggle) {
    const field = toggle.closest('.field');
    const input = field?.querySelector('input');
    if (input && input.type === 'password') {
      input.type = 'text';
    } else if (input) {
      input.type = 'password';
    }
  }
});

document.addEventListener('focusin', (event) => {
  const input = event.target;
  if (input.matches('input[required], select[required]')) {
    const field = input.closest('.field');
    field?.classList.add('field--required');
  }
});
