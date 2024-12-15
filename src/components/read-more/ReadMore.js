export default class ReadMore {
  constructor(element, options) {
    if (!element) throw new Error('undefined element');
    this.element = element;
    this.options = { ...ReadMore.defaults(), ...options };
    this.init();
  }

  static defaults() {
    return {
      maxLines: 10,
      expandText: 'Читать полностью',
      collapseText: 'Свернуть',
    };
  }

  init() {
    this.options.maxLines = +this.element.getAttribute('data-max-lines') || this.options.maxLines;
    this.options.expandText = this.element.getAttribute('data-expand-text') || this.options.expandText;
    this.options.collapseText = this.element.getAttribute('data-collapse-text') || this.options.collapseText;

    this.contentElement = this.wrapContent();
    this.toggle = this.createToggle();
    this.update();
  }

  update() {
    const lines = this.getLines();
    if (lines > this.options.maxLines) {
      this.showToggle();
      this.collapse();
    }
  }

  static convertCssToNumber(cssValue) {
    const match = cssValue.match(/^(\d+(\.\d+)?)px$/);
    return match ? parseFloat(match[1]) : null;
  }

  wrapContent() {
    if (this.element.querySelector('.read-more__content')) return null;
    const content = this.element.innerHTML;
    const wrapper = document.createElement('div');
    wrapper.classList.add('read-more__content');
    wrapper.innerHTML = content;
    this.element.innerHTML = '';
    this.element.append(wrapper);
    wrapper.setAttribute('style', `--max-lines: ${this.options.maxLines}`);
    return wrapper;
  }

  createToggle() {
    if (this.element.querySelector('.read-more__toggle')) return null;

    const toggle = document.createElement('button');
    toggle.setAttribute('type', 'button');
    toggle.classList.add('read-more__toggle');

    toggle.innerHTML = `
      <span>${this.options.expandText}</span>
      <span>${this.options.collapseText}</span>
    `;

    toggle.style.display = 'none';

    this.element.append(toggle);

    toggle.addEventListener('click', this.handleToggleClick.bind(this));

    return toggle;
  }

  getLines() {
    if (!this.contentElement) return 0;
    const height = this.contentElement.offsetHeight;
    const compStyles = window.getComputedStyle(this.contentElement);
    const { lineHeight } = compStyles;
    const nLineHeight = ReadMore.convertCssToNumber(lineHeight);
    return Math.round(height / nLineHeight);
  }

  handleToggleClick() {
    if (this.isCollapsed()) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  isCollapsed() {
    return this.element.classList.contains('is-collapsed');
  }

  expand() {
    this.element.classList.remove('is-collapsed');
  }

  collapse() {
    this.element.classList.add('is-collapsed');
  }

  showToggle() {
    if (this.toggle) {
      this.toggle.style.display = '';
    }
  }

  hideToggle() {
    if (this.toggle) {
      this.toggle.style.display = 'none';
    }
  }
}
