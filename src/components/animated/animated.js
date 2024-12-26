const applyAnimation = (item) => {
  const settings = JSON.parse(item.getAttribute('data-settings'));
  if (settings && settings.animation) {
    const animationClass = settings.animation;
    const animationDelay = settings.animationDelay || 0;
    const animationDuration = settings.animationDuration || 0;

    if (animationDelay !== 0) item.style.animationDelay = `${animationDelay}ms`;
    if (animationDuration !== 0) item.style.animationDuration = `${animationDuration}ms`;
    item.classList.add(animationClass);

    const animationEndHandler = () => {
      item.classList.remove(animationClass);
      item.classList.add('animation-complete');
      item.removeEventListener('animationend', animationEndHandler);
    };
    item.addEventListener('animationend', animationEndHandler);
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animation-complete')) {
        applyAnimation(entry.target);
        entry.target.classList.add('animated');
      }
    });
  },
  {
    threshold: 0.1,
  },
);

window.observeAnimations = (animatedItems) => {
  animatedItems.forEach((item) => observer.observe(item));
};

const animatedItems = document.querySelectorAll('.animated-item');
window.applyAnimation = applyAnimation;
window.observeAnimations(animatedItems);
