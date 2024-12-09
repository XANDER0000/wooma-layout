import Inputmask from 'inputmask/dist/inputmask.es6.js';

// <input data-mask="+7 (999) 999-99-99">

const setInputmask = (input, mask) => {
  if (input && mask) {
    if (mask === 'date') {
      Inputmask({ alias: 'datetime', inputFormat: 'dd.mm.yyyy', placeholder: 'ДД.ММ.ГГГГ' }).mask(input);
    } else if (mask === 'datetime') {
      Inputmask({ alias: 'datetime', inputFormat: 'dd.mm.yyyy HH:MM', placeholder: 'ДД.ММ.ГГГГ ЧЧ:ММ' }).mask(input);
    } else if (mask === 'time') {
      Inputmask({ alias: 'datetime', inputFormat: 'HH:MM', placeholder: 'ЧЧ:ММ' }).mask(input);
    } else if (mask === 'times') {
      Inputmask({ alias: 'datetime', inputFormat: 'HH:MM:ss', placeholder: 'ЧЧ:ММ:СС' }).mask(input);
    } else {
      Inputmask({ mask }).mask(input);
    }
  }
};

const removeInputmask = (input) => {
  if (input && input.inputmask) {
    input.inputmask.remove();
  }
};

window.setInputmask = setInputmask;
window.removeInputmask = removeInputmask;

document.querySelectorAll('input[data-mask]').forEach((input) => {
  const mask = input.getAttribute('data-mask') || '';
  setInputmask(input, mask);
});
