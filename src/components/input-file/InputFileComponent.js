import Events from '../../scripts/Events.js';

export default class InputFileComponent {
  constructor(element, options) {
    if (!element) throw new Error('undefined element');
    this.element = element;

    this.options = { ...InputFileComponent.defaults(), ...options };

    this.input = element.querySelector(`.${this.options.baseClass}__input`);
    if (!this.input) throw new Error('input not found');

    this.init();
  }

  static defaults() {
    return {
      baseClass: 'input-file',
    };
  }

  init() {
    this.events = new Events(this);
    // this.emit('change');
  }

  isMultiple() {
    this.input.hasAttribute('multiple');
  }

  static formatFileSize(bytes) {
    if (bytes < 1024) {
      return `${bytes}B`;
    }

    if (bytes < 1048576) {
      return `${(bytes / 1024).toFixed(1)}KB`;
    }

    return `${(bytes / 1048576).toFixed(1)}MB`;
  }
}
