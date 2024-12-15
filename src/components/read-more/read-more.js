import ReadMore from './ReadMore.js';

const initReadMore = (element) => {
  element.ReadMore = new ReadMore(element, {});
};

window.initReadMore = initReadMore;

document.querySelectorAll('.read-more').forEach((element) => {
  initReadMore(element);
});

const updateReadMore = (element) => {
  if (element.ReadMore) {
    element.ReadMore.update();
  }
};

window.updateReadMore = updateReadMore;

const updateAllReadMore = () => {
  document.querySelectorAll('.read-more').forEach((element) => {
    updateReadMore(element);
  });
};

window.updateAllReadMore = updateAllReadMore;
