import PopupComponent from './PopupComponent.js';

const popupOptions = {
  fixHeaderPadding: true,
};

window.Popup = new PopupComponent(popupOptions);

if (window.location.hash.indexOf('#popup') !== -1) {
  window.Popup.open(window.location.hash);
}

// window.Popup.addEventListener('beforeOpen', () => {
//   console.log('beforeOpen', window.Popup.dialog);
// });

// window.Popup.addEventListener('open', () => {
//   console.log('open', window.Popup.dialog);
// });

// window.Popup.addEventListener('beforeClose', () => {
//   console.log('beforeClose', window.Popup.dialog);
// });

// window.Popup.addEventListener('close', () => {
//   console.log('close', window.Popup.dialog);
// });

document.querySelectorAll('.popup--review').forEach((element) => {
  const updateButtonsVisibility = () => {
    element.querySelectorAll('[data-visible-for]').forEach((button) => {
      const targetId = button.getAttribute('data-visible-for') || '';
      const targetElement = document.getElementById(targetId);
      button.classList.add('hidden');
      if (targetElement && targetElement.classList.contains('active')) {
        button.classList.remove('hidden');
      }
    });
  };
  const tabs = element.querySelector('.tabs');
  tabs?.addEventListener('change', () => {
    updateButtonsVisibility();
  });
  setTimeout(updateButtonsVisibility, 1000);
});
