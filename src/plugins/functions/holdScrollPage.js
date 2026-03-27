let ts;

document.addEventListener('touchstart', function (e) {
  ts = e.touches[0].clientY;
});

function preventDefault(e) {
  e = e || window.event;
  let area;

  if (e.target.closest('.mobileRow')) {
    area = e.target.closest('.mobileRow');
  } else if (e.target.closest('.cky-preference-body-wrapper')) {
    area = e.target.closest('.cky-preference-body-wrapper');
  } else {
    area = e.target;
  }

  const parentPopup = (() => {
    if (e.target.classList.contains('popupContent')) return true;

    let target = e.target;
    let closestMatch = null;

    if (target.closest('.cky-preference-body-wrapper')) return true;

    while (target !== null) {
      if (target.matches('.mobileRow')) {
        closestMatch = target;
        break;
      }
      target = target.parentElement;
    }
    return closestMatch !== null ? 1 : 0;
  })();

  if (!parentPopup) {
    e.preventDefault();
    e.returnValue = false;
    return false;
  }

  let delta;
  if (e instanceof WheelEvent) {
    delta = e.deltaY;
  } else if (e instanceof TouchEvent) {
    const tob = e.changedTouches[0];
    const offset = parseInt(String(tob.clientY));
    if (ts < offset - 5) {
      delta = -100;
    } else if (ts > offset + 5) {
      delta = 100;
    } else {
      delta = 0;
    }
  } else {
    delta = e.detail || e.wheelDelta || 0;
  }

  if (delta <= 0 && area.scrollTop <= 0) {
    e.preventDefault();
  }
  if (delta > 0 && area.scrollHeight - area.clientHeight - area.scrollTop <= 1) {
    e.preventDefault();
  }
  return true;
}

function holdScroll(e) {
  e = e || window.event;
  if (e.preventDefault) e.preventDefault();
  e.returnValue = false;
  return false;
}

const HoldAllScrollPage = (fix = false) => {
  HoldScrollPagePosition(fix);
  if (fix) {
    document.body.classList.add('no-scroll');
    window.addEventListener('scroll', holdScroll);
    window.addEventListener('wheel', holdScroll);
    window.addEventListener('DOMMouseScroll', holdScroll);
    document.addEventListener('touchmove', holdScroll);
    window.addEventListener('keydown', preventDefaultForScrollKeys);
  } else {
    document.body.classList.remove('no-scroll');
    window.removeEventListener('scroll', holdScroll);
    window.removeEventListener('wheel', holdScroll);
    window.removeEventListener('DOMMouseScroll', holdScroll);
    document.removeEventListener('touchmove', holdScroll);
    window.removeEventListener('keydown', preventDefaultForScrollKeys);
  }
};

function preventDefaultForScrollKeys(e) {
  // Prevent scrolling with arrow keys, spacebar, page up/down, home/end
  if ([37, 38, 39, 40, 32, 33, 34, 35, 36].includes(e.keyCode)) {
    e.preventDefault();
  }
}

const HoldScrollPage = (fix = false) => {
  HoldScrollPagePosition(fix);
  if (fix) {
    window.addEventListener('wheel', preventDefault);
    window.addEventListener('DOMMouseScroll', preventDefault);
    document.addEventListener('touchmove', preventDefault);
  } else {
    window.removeEventListener('wheel', preventDefault);
    window.removeEventListener('DOMMouseScroll', preventDefault);
    document.removeEventListener('touchmove', preventDefault);
  }
};

const HoldScrollPagePosition = (fix = false) => {
  if (window.lenis) window.lenis[fix ? 'stop' : 'start']();
};

export { HoldAllScrollPage, HoldScrollPage, HoldScrollPagePosition };
