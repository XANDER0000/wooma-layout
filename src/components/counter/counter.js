class Counters {
  constructor(selector) {
    this.counters = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.counters.forEach((counter) => {
      const minusButton = counter.querySelector('.counter__btn--minus');
      const plusButton = counter.querySelector('.counter__btn--plus');
      const input = counter.querySelector('.counter__input');

      // Инициализация значения input
      Counters.ensureValidInput(input, minusButton);

      // Обработчик для кнопки минус
      minusButton.addEventListener('click', () => {
        const value = parseInt(input.value, 10);
        if (value > 0) {
          input.value = value - 1;
          Counters.toggleMinusButton(input, minusButton);
        }
      });

      // Обработчик для кнопки плюс
      plusButton.addEventListener('click', () => {
        const value = parseInt(input.value, 10);
        input.value = value + 1;
        Counters.toggleMinusButton(input, minusButton);
      });

      // Валидация ввода
      input.addEventListener('input', () => {
        input.value = input.value.replace(/[^0-9]/g, ''); // Удаляем все, кроме цифр
        Counters.ensureValidInput(input, minusButton);
      });

      // Автозамена пустого значения
      input.addEventListener('blur', () => {
        Counters.ensureValidInput(input, minusButton);
      });
    });
  }

  static toggleMinusButton(input, minusButton) {
    const isDisabled = parseInt(input.value, 10) === 0;
    if (isDisabled) {
      minusButton.style.pointerEvents = 'none';
    } else {
      minusButton.style.removeProperty('pointer-events');
    }
  }

  static ensureValidInput(input, minusButton) {
    const value = parseInt(input.value, 10);
    if (input.value === '' || Number.isNaN(value)) {
      input.value = '0';
    }
    Counters.toggleMinusButton(input, minusButton);
  }
}

// Инициализация компонента
window.counters = Counters;
window.counters = new Counters('.counter');
