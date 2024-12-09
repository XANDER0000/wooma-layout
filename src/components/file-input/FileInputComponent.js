import Events from '../../scripts/Events.js';

export default class FileInputComponent {
  #cacheDT = null;

  constructor(element, options) {
    if (!element) throw new Error('undefined element');
    this.element = element;

    this.options = { ...FileInputComponent.defaults(), ...options };

    this.input = element.querySelector('input[type="file"]');
    if (!this.input) throw new Error('input not found');

    this.init();
  }

  static defaults() {
    return {
      baseClass: 'file-input',
      triggerSelector: '',
      cacheFiles: false,
    };
  }

  init() {
    this.events = new Events(this);
    this.cacheDT = new DataTransfer();
    const triggerSelector = this.options.triggerSelector || `.${this.options.baseClass}__button`;
    this.trigger = this.element.querySelector(triggerSelector);
    this.trigger?.addEventListener('click', () => {
      this.input.click();
    });
    this.input.addEventListener('change', this.handleInputChange.bind(this));
  }

  #cacheFiles() {
    if (this.options.cacheFiles) {
      this.#cacheDT.files = this.input.files;
    }
  }

  #getCachedFiles() {
    return this.#cacheDT.files;
  }

  isMultiple() {
    this.input.hasAttribute('multiple');
  }

  emitChange() {
    this.emit('change');
    this.input.dispatchEvent(new Event('afterChange', { bubbles: true }));
  }

  get items() {
    const items = [];
    for (let i = 0; i < this.input.files.length; i += 1) {
      const file = this.input.files[i];
      items.push({
        name: file.name,
        size: file.size,
        formattedSize: FileInputComponent.formatFileSize(file.size),
        type: file.type,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        file,
      });
    }
    return items;
  }

  clearFiles() {
    const dataTransfer = new DataTransfer();
    this.input.files = dataTransfer.files;
    this.emitChange();
  }

  removeFile(filename) {
    let update = false;

    const dt = new DataTransfer();
    for (let i = 0; i < this.input.files.length; i += 1) {
      if (this.input.files[i] !== filename) {
        dt.items.add(this.input.files[i]);
      } else {
        update = true;
      }
    }

    this.input.files = dt.files;
    this.#cacheFiles();

    if (update) {
      this.emitChange();
    }
  }

  #updateFilesOnChange() {
    if (this.options.cacheFiles) {
      if ((this.input.files.length === 0) && (this.#cacheDT.files.length > 0)) {
        if (this.isMultiple) {
          for (let i = 0; i < this.input.files.length; i += 1) {
            const file = this.input.files[i];
            this.#cacheDT.items.add(file);
          }
        } else {
          this.input.files = this.#cacheDT.files;
        }
      }
    }
  }

  handleInputChange() {
    this.#updateFilesOnChange();
    // this.removeNotAcceptableFiles();
    this.removeFilesOverMaxCount();
    this.removeFilesOverMaxSize();
    this.emitChange();
    this.#cacheFiles();
  }

  removeFilesOverMaxCount() {
    const maxFiles = +this.input.getAttribute('data-max-files-count') || '-1';
    if ((maxFiles > 0) && (this.input.files.length > maxFiles)) {
      const dt = new DataTransfer();

      for (let i = 0; i < maxFiles; i += 1) {
        dt.items.add(this.input.files[i]);
      }

      this.input.files = dt.files;
    }
  }

  removeFilesOverMaxSize() {
    const maxFileSize = +this.input.getAttribute('data-max-file-size') || -1;
    if (maxFileSize > 0) {
      const dt = new DataTransfer();
      let update = false;

      for (let i = 0; i < this.input.files.length; i += 1) {
        const file = this.input.files[i];
        if (file.size > maxFileSize) {
          update = true;
        } else {
          dt.items.add(file);
        }
      }

      if (update) {
        this.input.files = dt.files;
      }
    }
  }

  removeNotAcceptableFiles() {
    const accept = this.input.getAttribute('accept') || '';
    if (!accept.length) return;

    let needUpdate = false;
    const dt = new DataTransfer();

    for (let i = 0; i < this.input.length; i += 1) {
      if (!FileInputComponent.isFileValid(this.input.item(i), accept)) {
        dt.items.add(this.input[i]);
      } else {
        needUpdate = true;
      }
    }

    if (needUpdate) {
      this.input.files = dt.files;
    }
  }

  static formatFileSize(bytes) {
    const ONE_KB = 1024;
    const ONE_MB = ONE_KB * ONE_KB;

    if (bytes < ONE_KB) {
      return `${bytes} B`;
    }

    if (bytes < ONE_MB) {
      return `${(bytes / ONE_KB).toFixed(0)} Kb`;
    }

    return `${(bytes / ONE_MB).toFixed(1)} Mb`;
  }

  static isFileValid(file, accept) {
    if (!accept) return true;

    const acceptList = accept.split(',');

    const mimeType = file.type;
    const baseMimeType = mimeType.replace(/\/.*$/, '');

    // eslint-disable-next-line no-restricted-syntax
    for (let validType of acceptList) {
      validType = validType.trim();
      if (validType.charAt(0) === '.') {
        // eslint-disable-next-line max-len
        const difference = file.name.length - validType.length;
        const fileName = file.name.toLowerCase();
        if (fileName.indexOf(validType.toLowerCase(), difference) !== -1) {
          return true;
        }
      } else if (/\/\*$/.test(validType)) {
        // This is something like a image/* mime type
        if (baseMimeType === validType.replace(/\/.*$/, '')) {
          return true;
        }
      } else if (mimeType === validType) {
        return true;
      }
    }

    return false;
  }
}
