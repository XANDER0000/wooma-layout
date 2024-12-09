// debounce calls a function when a user hasn’t carried out an event in a specific amount of time
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

export default debounce;
// Пример:
// debounceBtn.addEventListener('click', debounce(function() {
//   console.info('Hey! It is', new Date().toUTCString());
// }, 3000));
// или
// window.addEventListener("scroll", debounce(handleScroll, 300));
