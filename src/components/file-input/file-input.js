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

const initFileInputReview = (element) => {
  const filesContainer = element.querySelector('.file-input__files');
  if (!filesContainer) return;

  function getFileExtension(filename) {
    const extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
    return extension;
  }
  const fileInput = element.FileInput;
  if (fileInput) {
    fileInput.on('change', () => {
      filesContainer.innerHTML = '';
      for (let i = 0; i < fileInput.items.length; i += 1) {
        const item = fileInput.items[i];
        const { file } = item;
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-input__file');
        filesContainer.append(fileItem);

        fileItem.addEventListener('click', () => {
          fileItem.remove();
          fileInput.removeFile(file);
        });

        const ext = getFileExtension(file.name).toLowerCase();
        const acceptableImgExts = ['png', 'jpg', 'svg', 'gif', 'jpeg'];

        if (file.type.startsWith('image/') && acceptableImgExts.includes(ext)) {
          const fileImg = document.createElement('div');
          fileImg.classList.add('file-input__file-img');
          fileItem.append(fileImg);

          const img = document.createElement('img');
          fileImg.append(img);

          img.alt = file.name;
          img.src = URL.createObjectURL(file);
          img.onload = () => {
            URL.revokeObjectURL(img.src);
          };
        } else {
          const fileIcon = document.createElement('div');
          fileIcon.classList.add('file-input__file-icon');
          fileIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m16.3 7.3-5.5-5.5c-.3-.4-.8-.5-1.3-.5H5.6c-.6 0-1.3.2-1.7.7s-.8 1.1-.8 1.8v12.5c0 .7.3 1.3.7 1.8.5.5 1.1.7 1.8.7h8.8c.7 0 1.3-.3 1.8-.7.5-.5.7-1.1.7-1.8V8.6c0-.5-.2-.9-.6-1.3zm-1.6.2h-3.5c-.2 0-.3-.1-.4-.2s-.2-.3-.2-.4V3.4l4.1 4.1zm.6 9.6c-.2.2-.6.4-.9.4H5.6c-.3 0-.7-.1-.9-.4-.2-.2-.4-.6-.4-.9V3.8c0-.3.1-.7.4-.9s.6-.4.9-.4h3.8v4.4c0 .5.2 1 .5 1.3s.8.5 1.3.5h4.4v7.5c0 .4-.1.7-.3.9z"/></svg>';
          fileItem.append(fileIcon);
        }

        const fileCaption = document.createElement('div');
        fileCaption.classList.add('file-input__file-caption');
        fileItem.append(fileCaption);

        const fileTitle = document.createElement('div');
        fileTitle.classList.add('file-input__file-title');
        fileTitle.textContent = file.name;
        fileCaption.append(fileTitle);

        // const fileSize = document.createElement('div');
        // fileSize.classList.add('input-file__file-size');
        // fileSize.textContent = returnFileSize(file.size);
        // fileCaption.append(fileSize);
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
    if (element.classList.contains('file-input--review')) {
      initFileInputReview(element);
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
