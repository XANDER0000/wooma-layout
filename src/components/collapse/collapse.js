import isClick from '../../scripts/utils/click.js';
import { slideUp, slideDown } from '../../scripts/utils/slide.js';

const collapseAll = (parentEl) => {
  if (!parentEl) return;
  const speed = 400;
  parentEl.querySelectorAll('[data-collapse]').forEach((toggle) => {
    const collapse = document.querySelector(toggle.getAttribute('data-collapse'));
    if (collapse.classList.contains('show')) {
      collapse.classList.add('is-collapsing');
      toggle.setAttribute('aria-expanded', false);
      slideUp(collapse, speed, () => {
        collapse.classList.remove('is-collapsing');
        collapse.classList.remove('show');
      });
    }
  });
};

const handleCollapseToggleClick = (event) => {
  const speed = 400;
  const toggle = event.target.closest('[data-collapse]');
  if (toggle) {
    if (isClick(event) === true) {
      const checkbox = toggle.querySelector('input[type="checkbox"]');
      const radio = toggle.querySelector('input[type="radio"]');
      if (!checkbox && !radio) {
        event.preventDefault();
      } else {
        if (checkbox) {
          checkbox.click();
          checkbox.checked = !checkbox.checked;
        }
        if (radio) {
          if (radio.checked === true) {
            return;
          }
          if (radio.checked !== true) {
            const collapse = document.querySelector(toggle.getAttribute('data-collapse'));
            const parentSelector = collapse.closest('[data-parent]') || '';
            if (parentSelector) {
              collapseAll(parentSelector);
            }
            radio.click();
          }
        }
      }
      const collapse = document.querySelector(toggle.getAttribute('data-collapse'));
      if (collapse && !collapse.classList.contains('is-collapsing')) {
        if (collapse.classList.contains('show')) {
          collapse.classList.add('is-collapsing');
          toggle.setAttribute('aria-expanded', false);
          if (toggle.closest('.collapse-item')) toggle.closest('.collapse-item').classList.remove('active');
          slideUp(collapse, speed, () => {
            collapse.classList.remove('is-collapsing');
            collapse.classList.remove('show');
          });
        } else {
          const parentSelector = collapse.getAttribute('data-parent') || '';
          if (parentSelector) {
            const parent = document.querySelector(parentSelector);
            collapseAll(parent);
          }
          collapse.classList.add('is-collapsing');
          toggle.setAttribute('aria-expanded', true);
          if (toggle.closest('.collapse-item')) toggle.closest('.collapse-item').classList.add('active');
          slideDown(collapse, speed, () => {
            collapse.classList.remove('is-collapsing');
            collapse.classList.add('show');
          });
        }
      }
    }
  }
};

document.addEventListener('click', handleCollapseToggleClick);
document.addEventListener('keypress', handleCollapseToggleClick);
