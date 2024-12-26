import RangeFields from './RangeFields.js';

document.querySelectorAll('.range-fields').forEach((el) => {
  el.rangeFields = new RangeFields(el);
});
