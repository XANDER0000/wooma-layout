const initInputLimitedLength = (input) => {
  if (!input || !input.hasAttribute('maxlength')) return;

  const maxLength = input.getAttribute('maxlength') || 0;

  const wrapper = document.createElement('div');
  wrapper.classList.add('input-count-wrapper');
  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(input);

  const labelLength = document.createElement('div');
  labelLength.classList.add('input-count-length');
  labelLength.textContent = `0/${maxLength}`;
  wrapper.appendChild(labelLength);

  labelLength.textContent = `${input.value.length}/${maxLength}`;

  input.addEventListener('input', (event) => {
    labelLength.textContent = `${event.target.value.length}/${maxLength}`;
  });
};

window.initInputLimitedLength = initInputLimitedLength;

document.querySelectorAll('input[maxlength]').forEach((input) => {
  initInputLimitedLength(input);
});
