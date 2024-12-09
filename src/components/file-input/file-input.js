import FileInputComponent from './FileInputComponent.js';

const initFileInputImg = (element) => {
  const fileInput = element.FileInput;
  if (fileInput) {
    fileInput.on('change', () => {
      const item = fileInput.items[0];
      const content = element.querySelector('.file-input__content');
      if (content) {
        const fileDiv = content.querySelector('.file-input__file');
        if (fileDiv) content.removeChild(fileDiv);
        if (item) {
          const fileSrc = URL.createObjectURL(item.file);
          const template = `
            <div class="file-input__file">
              <a class="file-input__file-link" href="${fileSrc}" target="_blank">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--check file-input__file-icon">
                  <path d="M9 17.9c-.2 0-.5-.1-.6-.3l-5-5-.4-.3.1-.1v-.4l-.1-.1.3-.3.4-.4.1.1H4c.2 0 .5.1.6.3L9 15.7 19.4 5.4c.4-.4.9-.4 1.3 0 .2.2.3.4.3.6 0 .2-.1.5-.3.6l-11 11c-.2.2-.5.3-.7.3z"></path>
                </svg>
                <div class="file-input__file-name">${item.name}</div>
              </a>
              <div class="file-input__file-size">${item.formattedSize}</div>
            </div>
          `;
          content.insertAdjacentHTML('afterbegin', template);
        }
      }
    });
  }
};

const initFileInputImgFree = (element) => {
  const fileInput = element.FileInput;
  if (fileInput) {
    fileInput.on('change', () => {
      const item = fileInput.items[0];
      const content = element.querySelector('.file-input__grid');
      if (content) {
        const fileDiv = content.querySelector('.file-input__file');
        if (fileDiv) content.removeChild(fileDiv);
        if (item) {
          const fileSrc = URL.createObjectURL(item.file);
          const template = `
            <div class="file-input__file">
              <div class="file-input__file-img"><img src="${fileSrc}" alt=""></div>
              <div class="file-input__file-info">
                <div class="file-input__file-name">${item.name}</div>
                <div class="file-input__file-size">${item.formattedSize}</div>
              </div>
              <button class="button button--small button--square button--delete file-input__btn-delete" title="Удалить" type="button">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--trash button__icon">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.1A2.9 2.9 0 007.1 4v1.1H3a.9.9 0 100 1.8h1.1V20A2.9 2.9 0 007 22.9h10a2.9 2.9 0 002.9-2.9V6.9H21a.9.9 0 100-1.8h-4.1V4A2.9 2.9 0 0014 1.1h-4zm-.778 2.122A1.1 1.1 0 0110 2.9h4A1.1 1.1 0 0115.1 4v1.1H8.9V4a1.1 1.1 0 01.322-.778zM5.9 20V6.9h12.2V20a1.1 1.1 0 01-1.1 1.1H7A1.1 1.1 0 015.9 20z"></path>
                </svg>
              </button>
            </div>
          `;
          content.insertAdjacentHTML('beforeend', template);
        }
      }
    });
  }
  document.addEventListener('click', (event) => {
    const btnDelete = event.target.closest('.file-input--img-free .file-input__btn-delete');
    if (btnDelete) {
      btnDelete.closest('.file-input')?.FileInput?.clearFiles();
    }
  });
};

const initFileInputImgBlock = (element) => {
  if (!element) return;

  const visual = element.querySelector('.file-input__visual');
  const stub = document.createElement('div');
  stub.classList.add('file-input__stub');
  visual.append(stub);

  const fileInput = element.FileInput;
  if (fileInput) {
    fileInput.on('change', () => {
      const item = fileInput.items[0];
      const content = element.querySelector('.file-input__visual');
      if (item && content) {
        let img = content.querySelector('img');
        if (!img) {
          img = document.createElement('img');
          content.prepend(img);
        }
        img.alt = item.file.name;
        img.src = URL.createObjectURL(item.file);
        img.onload = () => {
          URL.revokeObjectURL(img.src);
        };
      } else if (content) {
        const img = content.querySelector('img');
        if (img) {
          content.removeChild(img);
        }
      }
    });
    const btnDelete = element.querySelector('.file-input__btn-delete');
    if (btnDelete) {
      btnDelete.addEventListener('click', (event) => {
        event.preventDefault();
        fileInput.clearFiles();
      });
    }
  }
};

const initFileInputProfilePhoto = (element) => {
  const fileInput = element.FileInput;
  if (fileInput) {
    fileInput.on('change', () => {
      const item = fileInput.items[0];
      const content = element.querySelector('.file-input__photo-avatar');
      if (item && content) {
        let img = content.querySelector('img');
        if (!img) {
          img = document.createElement('img');
          content.prepend(img);
        }
        img.alt = item.file.name;
        img.src = URL.createObjectURL(item.file);
        img.onload = () => {
          URL.revokeObjectURL(img.src);
        };
      } else if (content) {
        const img = content.querySelector('img');
        if (img) {
          content.removeChild(img);
        }
      }
    });
  }
};

const initFileInput = (element) => {
  if (!element.FileInput) {
    element.FileInput = new FileInputComponent(element, {});

    if (element.classList.contains('file-input--img')) {
      initFileInputImg(element);
    }
    if (element.classList.contains('file-input--img-free')) {
      initFileInputImgFree(element);
    }
    if (element.classList.contains('file-input--img-block')) {
      initFileInputImgBlock(element);
    }
    if (element.classList.contains('file-input--profile-photo')) {
      initFileInputProfilePhoto(element);
    }
    if (element.classList.contains('file-input--profile-photo-small')) {
      initFileInputProfilePhoto(element);
    }
  }
};

window.initFileInput = initFileInput;

const initFileInputs = () => {
  document.querySelectorAll('.file-input').forEach((element) => {
    initFileInput(element);
  });
};

window.initFileInputs = initFileInputs;

initFileInputs();
