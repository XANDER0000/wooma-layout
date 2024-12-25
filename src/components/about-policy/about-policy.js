import { throttleComplete } from '../../scripts/utils/throttle.js';

const mainContainers = document.querySelectorAll('.about-policy');

mainContainers.forEach((mainContainer) => {
  const mediaContainers = mainContainer.querySelectorAll('.about-policy__media');

  mediaContainers.forEach((mediaContainer) => {
    const iframe = mediaContainer.querySelector('.about-policy__media-iframe');

    if (!iframe) return;

    const resizeIframe = () => {
      const containerWidth = mediaContainer.offsetWidth;
      const containerHeight = mediaContainer.offsetHeight;

      // Пропорции видео (например, 16:9)
      const videoRatio = 16 / 9;

      if (containerWidth / containerHeight > videoRatio) {
        iframe.style.width = `${containerWidth * 1.2}px`;
        iframe.style.height = `${(containerWidth * 1.2) / videoRatio}px`;
      } else {
        iframe.style.width = `${containerHeight * videoRatio * 1.2}px`;
        iframe.style.height = `${containerHeight * 1.2}px`;
      }

      iframe.style.position = 'absolute';
      iframe.style.top = '50%';
      iframe.style.left = '50%';
      iframe.style.transform = 'translate(-50%, -50%)';
    };

    resizeIframe();

    window.addEventListener('resize', throttleComplete(resizeIframe, 200));
  });
});
