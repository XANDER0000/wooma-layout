/* eslint-disable prefer-destructuring */
import noUiSlider from 'nouislider';
import Events from '../../scripts/Events.js';

export default class RangeFields {
  constructor(element, options) {
    if (!element) throw new Error('undefined element');
    this.element = element;
    this.options = { ...RangeFields.defaults(), ...options };
    this.init();
  }

  static defaults() {
    return {
      baseClass: 'range-fields',
    };
  }

  init() {
    this.events = new Events(this);

    this.inputs = this.element.querySelectorAll(`.${this.options.baseClass}__input`);
    this.inputFrom = this.inputs[0];
    this.inputTo = this.inputs[1];

    this.hiddenInputs = this.element.querySelectorAll(`.${this.options.baseClass}__hidden-input`);
    this.hiddenInputFrom = this.hiddenInputs[0];
    this.hiddenInputTo = this.hiddenInputs[1];

    this.format = this.element.getAttribute('data-format') || 'decimal';
    this.currency = this.element.getAttribute('data-currency') || 'RUB';

    this.slider = this.element.querySelector(`.${this.options.baseClass}__slider`);

    this.processing = true;

    this.from = +this.hiddenInputFrom.value || 0;
    this.to = +this.hiddenInputTo.value || 750000;
    this.min = +this.element.getAttribute('data-min') || 0;
    this.max = +this.element.getAttribute('data-max') || 1000000;
    this.step = +this.element.getAttribute('data-step') || 1000;

    this.from = this.checkValue(this.from);
    this.to = this.checkValue(this.to);

    if ((this.from > this.to) || (this.to < this.from)) {
      this.from = this.to;
    }

    this.inputFrom.value = this.formatNumber(this.from);
    this.inputTo.value = this.formatNumber(this.to);

    this.hiddenInputFrom.value = RangeFields.clearNumber(this.from);
    this.hiddenInputTo.value = RangeFields.clearNumber(this.to);

    this.initialFrom = this.from;
    this.initialTo = this.to;

    this.inputFrom.addEventListener('change', this.updateValues.bind(this));
    this.inputTo.addEventListener('change', this.updateValues.bind(this));

    this.initSlider();

    this.slider.noUiSlider.on('update', this.handleSliderUpdate.bind(this));

    this.slider.noUiSlider.on('update', RangeFields.debounce((values, handle) => {
      if (!this.processing) {
        let fireChange = false;
        const value = values[handle];
        if (handle) {
          if (this.to !== value) {
            this.to = +value;
            fireChange = true;
          }
        } else if (this.from !== value) {
          this.from = +value;
          fireChange = true;
        }
        if (fireChange) {
          this.element.dispatchEvent(new CustomEvent('change-range', {
            detail: {
              from: this.from,
              to: this.to,
            },
          }));
        }
      }
    }, 500));

    setTimeout(() => {
      this.processing = false;
    }, 510);

    const form = this.element.closest('form');
    if (form) {
      form.addEventListener('reset', () => {
        this.processing = true;
        setTimeout(() => {
          this.reset();
          this.processing = false;
        }, 500);
      });
    }
  }

  initSlider() {
    noUiSlider.create(this.slider, {
      start: [this.from, this.to],
      step: this.step,
      connect: true,
      range: {
        min: this.min,
        max: this.max,
      },
    });
  }

  handleSliderUpdate(values, handle) {
    const value = values[handle];
    if (handle) {
      this.inputTo.value = this.formatNumber(this.checkValue(value));
      this.hiddenInputTo.value = this.checkValue(value);
    } else {
      this.inputFrom.value = this.formatNumber(this.checkValue(value));
      this.hiddenInputFrom.value = this.checkValue(value);
    }
  }

  reset() {
    this.from = this.initialFrom;
    this.to = this.initialTo;
    this.hiddenInputFrom.value = this.from;
    this.inputFrom.value = this.formatNumber(this.from);
    this.hiddenInputTo.value = this.to;
    this.inputTo.value = this.formatNumber(this.to);
    this.slider.noUiSlider.set([this.from, this.to]);
  }

  updateValues() {
    let fromValue = this.checkValue(+RangeFields.clearNumber(this.inputFrom.value));
    const toValue = (this.inputTo.value === '') ? this.max : this.checkValue(+RangeFields.clearNumber(this.inputTo.value));
    if ((fromValue > toValue) || (toValue < fromValue)) {
      fromValue = toValue;
    }

    this.inputFrom.value = this.formatNumber(fromValue);
    this.hiddenInputFrom.value = fromValue;

    this.inputTo.value = this.formatNumber(toValue);
    this.hiddenInputTo.value = toValue;

    if ((this.from !== fromValue) || (this.to !== toValue)) {
      this.processing = true;
      this.from = fromValue;
      this.to = toValue;
      this.slider.noUiSlider.set([fromValue, toValue]);
      setTimeout(() => {
        this.processing = false;
        this.element.dispatchEvent(new CustomEvent('change-range', {
          detail: {
            from: this.from,
            to: this.to,
          },
        }));
      });
    }
  }

  static debounce(func, delay) {
    let timeout;
    return (...args) => {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  formatNumber(number) {
    if (this.format === 'currency') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: this.currency,
        maximumFractionDigits: 0,
      }).format(number);
    }
    if (this.format === 'hours') {
      return `${new Intl.NumberFormat('ru-RU', { style: 'decimal', maximumFractionDigits: 0 }).format(number)} ч`;
    }
    return new Intl.NumberFormat('ru-RU', { style: 'decimal', maximumFractionDigits: 0 }).format(number);
  }

  checkValue(value) {
    let result = value;
    if (result < this.min) {
      result = this.min;
    }
    if (result > this.max) {
      result = this.max;
    }
    return Math.round(result);
  }

  static clearNumber(str) {
    let res = 0;
    if (str.length) {
      res = str.replace(/[^0-9]/g, '');
    }
    return res;
  }
}
