const initTextareaLimitedLength = (textarea) => {
  if (!textarea || !textarea.hasAttribute('maxlength')) return;

  const maxLength = textarea.getAttribute('maxlength') || 0;

  const wrapper = document.createElement('div');
  wrapper.classList.add('textarea-count-wrapper');
  textarea.parentNode.insertBefore(wrapper, textarea);
  wrapper.appendChild(textarea);

  const labelLength = document.createElement('div');
  labelLength.classList.add('textarea-count-length');
  labelLength.textContent = `0/${maxLength}`;
  wrapper.appendChild(labelLength);

  labelLength.textContent = `${textarea.value.length}/${maxLength}`;

  textarea.addEventListener('input', (event) => {
    labelLength.textContent = `${event.target.value.length}/${maxLength}`;
  });
};

window.initTextareaLimitedLength = initTextareaLimitedLength;

document.querySelectorAll('textarea[maxlength]').forEach((textarea) => {
  initTextareaLimitedLength(textarea);
});
