const clearOverMaxFileSize = (inputEl) => {
  const maxFileSize = +inputEl.getAttribute('data-max-file-size') || -1;
  if (maxFileSize > 0) {
    const dt = new DataTransfer();
    let update = false;
    for (let i = 0; i < inputEl.files.length; i += 1) {
      const file = inputEl.files[i];
      if (file.size > maxFileSize) {
        update = true;
      } else {
        dt.items.add(file);
      }
    }
    if (update) {
      inputEl.files = dt.files;
    }
  }
};

export default clearOverMaxFileSize;
