import AirDatepicker from 'air-datepicker';

function parseDate(value) {
  const [day, month, year] = value.split('.');
  return new Date(+year, +month - 1, +day);
}

function ruFormatToDate(value) {
  const [day, month, year] = value.split('.');
  return new Date(+year, +month - 1, +day);
}

function dateToRuFormat(date) {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  return `${dd}.${mm}.${yyyy}`;
}

document.querySelectorAll('input[data-datepicker]').forEach((input) => {
  const dataMinDate = input.getAttribute('data-min-date') || '';
  const dataMaxDate = input.getAttribute('data-max-date') || '';

  input.datepicker = new AirDatepicker(input, {
    dateFormat: 'dd.MM.yyyy',
    timepicker: input.hasAttribute('data-datepicker-timepicker'),
    onlyTimepicker: input.getAttribute('data-datepicker-timepicker') === 'only',
    range: input.hasAttribute('data-datepicker-range'),
    multipleDates: input.hasAttribute('data-datepicker-multiple'),
    multipleDatesSeparator: ';',
    minDate: (dataMinDate === 'today') ? new Date() : dataMinDate,
    maxDate: ((dataMaxDate === 'today') || (input.name === 'birthdate')) ? new Date() : dataMaxDate,
    autoClose: true,
    isMobile: !matchMedia('(min-width: 80em)').matches,
    position: input.getAttribute('data-datepicker-position') || 'bottom left',
    container: input.parentNode,
    onSelect() {
      input.dispatchEvent(new Event('change', { bubbles: true }));
      input.dispatchEvent(new Event('input', { bubbles: true }));
    },
  });

  function updateMinDate(date) {
    const minSelector = input.getAttribute('data-min-field') || '';
    if (minSelector) {
      const minInput = document.querySelector(minSelector);
      if (minInput) {
        const minDatepicker = minInput.datepicker;
        if (minDatepicker) {
          const inputValue = minInput.value;
          minDatepicker.update({ maxDate: date });
          minInput.value = inputValue;
        }
      }
    }
  }

  function setToday() {
    const { datepicker } = input;
    if (datepicker) {
      const today = new Date();
      datepicker.setViewDate(today);
      datepicker.selectDate(today, { silent: true });
      input.value = dateToRuFormat(today);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  function updateMaxDate(date) {
    const maxSelector = input.getAttribute('data-max-field') || '';
    if (maxSelector) {
      const maxInput = document.querySelector(maxSelector);
      if (maxInput) {
        const maxDatepicker = maxInput.datepicker;
        if (maxDatepicker) {
          const inputValue = maxInput.value;
          maxDatepicker.update({ minDate: date });
          maxInput.value = inputValue;
        }
      }
    }
  }

  function updateDatepickerFromInput() {
    const { datepicker } = input;
    if (input.value && datepicker) {
      const date = parseDate(input.value).getTime();
      if (date) {
        datepicker.setViewDate(date);
        datepicker.selectDate(date, { silent: true });
        updateMinDate(date);
        updateMaxDate(date);
      }

      if (datepicker.maxDate
        && (ruFormatToDate(input.value).getTime() > datepicker.maxDate.getTime())) {
        setToday();
      }

      if (datepicker.minDate
        && (ruFormatToDate(input.value).getTime() < datepicker.minDate.getTime())) {
        setToday();
      }

      const year = ruFormatToDate(input.value).getFullYear();
      if ((year < 1900) || (year > 2100)) {
        setToday();
      }
    }
  }

  input.addEventListener('change', () => {
    updateDatepickerFromInput();
  });

  const form = input.closest('form');
  if (form) {
    form.addEventListener('reset', () => {
      setTimeout(() => {
        input.datepicker.update({ maxDate: '', minDate: '' });
        input.datepicker.clear({ silent: true });
      }, 100);
    });
  }

  setTimeout(updateDatepickerFromInput, 1000);
});
