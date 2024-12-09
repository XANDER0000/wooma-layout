const initStarsField = (element) => {
  if (!element) return;
  const input = element.querySelector('input');
  const valueLabel = element.querySelector('.stars-field__value');
  if (!input || !valueLabel) return;

  const setValue = (value) => {
    input.value = value;
    input.setAttribute('data-value', value);
    valueLabel.textContent = value.toFixed(1);
  };

  const value = +input.value || 0;
  setValue(value);

  element.querySelectorAll('.stars-field__star').forEach((button, index) => {
    button.setAttribute('data-value', index + 1);
    button.addEventListener('click', () => {
      const newValue = +button.getAttribute('data-value') || 0;
      setValue(newValue);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
};

window.iniStarsField = initStarsField;

const initStarsFields = () => {
  document.querySelectorAll('.stars-field').forEach((element) => {
    initStarsField(element);
  });
};

window.initStarsFields = initStarsFields;

initStarsFields();
