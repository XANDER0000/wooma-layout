import Events from '../../scripts/Events.js';

export default class PopupComponent {
  #scrollTop = 0;

  #scrollDisableCounter = 0;

  constructor(options) {
    this.options = { ...PopupComponent.defaults(), ...options };
    this.init();
  }

  static defaults() {
    return {
      baseClass: 'popup',
      openTrigger: 'data-popup-open',
      closeTrigger: 'data-popup-close',
      closeOnBackdropClick: true,
      disableScroll: true,
      fixHeaderPadding: false,
    };
  }

  init() {
    this.events = new Events(this);
    this.dialog = null;
    this.popupId = '';
    document.addEventListener('click', this.handleDocumentClick.bind(this));
  }

  handleDocumentClick(event) {
    const trigger = event.target.closest(`[${this.options.openTrigger}]`);
    if (trigger) {
      event.preventDefault();
      this.trigger = trigger;
      const target = trigger.getAttribute(this.options.openTrigger) || trigger.getAttribute('href') || '';
      this.open(target);
    } else if (event.target.closest(`[${this.options.closeTrigger}]`)) {
      event.preventDefault();
      this.close();
    }
  }

  // handleModalClick(event) {
  //   if (this.dialog && this.options.closeOnBackdropClick) {
  //     const container = this.dialog.querySelector('.popup__container');
  //     if (container) {
  //       const containerRect = container.getBoundingClientRect();
  //       if (event.clientX < containerRect.left
  //         || event.clientX > containerRect.right
  //         || event.clientY < containerRect.top
  //         || event.clientY > containerRect.bottom) {
  //         this.close();
  //       }
  //     }
  //   }
  // }

  disableScrolling() {
    if (!this.options.disableScroll) return;

    const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

    const getBodyScrollTop = () => window.scrollY
      || (document.documentElement && document.documentElement.scrollTop)
      || (document.body && document.body.scrollTop);

    this.#scrollDisableCounter += 1;

    document.documentElement.style.scrollBehavior = 'auto';
    this.#scrollTop = document.body.dataset.scroll
      ? document.body.dataset.scroll
      : getBodyScrollTop();
    document.body.dataset.scroll = this.#scrollTop;
    if (getScrollbarWidth()) {
      document.body.style.paddingRight = `${getScrollbarWidth()}px`;
      if (this.options.fixHeaderPadding) {
        const header = document.querySelector('.header__wrapper');
        if (header) header.style.paddingRight = `${getScrollbarWidth()}px`;
      }
    }
    document.body.style.top = `-${this.#scrollTop}px`;
    document.body.style.position = 'fixed';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.body.classList.add('is-scroll-locked');
  }

  enableScrolling() {
    if (!this.options.disableScroll) return;

    this.#scrollDisableCounter -= 1;

    if (this.#scrollDisableCounter > 0) return;

    document.body.style.position = '';
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    document.body.style.paddingRight = '';
    document.body.style.top = '';
    if (this.options.fixHeaderPadding) {
      const header = document.querySelector('.header__wrapper');
      if (header) header.style.paddingRight = '';
    }
    document.body.classList.remove('is-scroll-locked');
    this.#scrollTop = null;
    const savedScrollTop = +document.body.dataset.scroll;
    if (savedScrollTop) {
      window.scrollTo(0, savedScrollTop);
    }
    document.body.removeAttribute('data-scroll');
    document.documentElement.style.scrollBehavior = '';
  }

  static getElementFromTarget(target) {
    if (typeof target === 'string') {
      return document.getElementById(target.replace('#', ''));
    }
    if (typeof target === 'object') {
      return target;
    }
    return null;
  }

  static hasAnimation(element) {
    const style = window.getComputedStyle(element);
    return style.animationName !== 'none' || style.transitionDuration !== '0s';
  }

  isOpen() {
    return this.dialog && this.dialog.open;
  }

  async open(target) {
    if (this.isOpen()) {
      await this.close();
      this.#openDialog(target);
    } else {
      this.#openDialog(target);
    }
  }

  async #openDialog(target) {
    const doOpen = () => {
      if (this.dialog) {
        this.dialog.classList.remove('is-opening');
        this.dialog.classList.add('is-open');
        this.createBackdrop();
        this.emit('open');
      }
    };
    this.popupId = target.replace('#', '');
    this.dialog = PopupComponent.getElementFromTarget(target);
    if (this.dialog) {
      // this.dialog.addEventListener('click', this.handleModalClick.bind(this));
      this.dialog.addEventListener('cancel', (event) => {
        event.preventDefault();
        this.close();
      });

      this.dialog.querySelectorAll('form').forEach((form) => {
        const formMethod = form.getAttribute('method');
        if (formMethod === 'dialog' || form.querySelectorAll('[formmethod=dialog]').length > 0) {
          form.addEventListener('submit', () => {
            this.enableScrolling();
          });
        }
      });
      // this.dialog.addEventListener('close', () => {
      //   this.enableScrolling();
      // });
      this.emit('beforeOpen');
      this.dialog.classList.add('is-opening');
      this.disableScrolling();
      this.dialog.showModal();

      if (PopupComponent.hasAnimation(this.dialog)) {
        const animationEndPromise = new Promise((resolve) => {
          this.dialog.addEventListener('animationend', () => {
            resolve();
          });
        });
        await animationEndPromise;
        doOpen();
      } else {
        doOpen();
      }
    }
  }

  #doClose = () => {
    if (this.dialog) {
      this.dialog.classList.remove('is-closing');
      this.dialog.classList.remove('is-open');
      this.enableScrolling();
      this.dialog.close();
      this.emit('close');
    }
  };

  async close() {
    this.emit('beforeClose');
    if (this.dialog) {
      this.dialog.classList.add('is-closing');
      this.deleteBackdrop();
      if (PopupComponent.hasAnimation(this.dialog)) {
        const animationEndPromise = new Promise((resolve) => {
          this.dialog.addEventListener('animationend', () => {
            resolve();
          });
        });
        await animationEndPromise;
        this.#doClose();
      } else {
        this.#doClose();
      }
    }
  }

  createBackdrop() {
    if (!this.backdrop) {
      this.backdrop = document.createElement('div');
      this.backdrop.classList.add('popup__backdrop');
      this.dialog.prepend(this.backdrop);
      if (this.options.closeOnBackdropClick) {
        this.backdrop.addEventListener('click', () => {
          this.close();
        });
      }
    }
  }

  deleteBackdrop() {
    if (this.backdrop) {
      this.backdrop.remove();
      this.backdrop = null;
    }
  }
}
