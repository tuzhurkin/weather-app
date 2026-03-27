import vhCheck from 'vh-check';

let root = null;
let window_width;

const setWindowSize = () => {
  if (typeof window === 'undefined') return;

  if (!root) root = document.documentElement;
  const currentWidth = window.innerWidth;
  if (currentWidth !== window_width || currentWidth <= 1100) {
    window_width = currentWidth;

    const { vh, windowHeight } = vhCheck();
    root.style.setProperty('--vh', `${vh}px`);
    root.style.setProperty('--windowHeight', `${windowHeight}px`);
  }
};

export { setWindowSize };
