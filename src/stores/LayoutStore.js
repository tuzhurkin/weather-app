import { defineStore } from 'pinia';
import vhCheck from 'vh-check';

const TabletSize = 1024;
const Tablet2Size = 768;
const MobileSize = 540;

function getScrollbarWidth() {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

export const useLayoutStore = defineStore('layoutStore', {
  state: () => ({
    documentScreenSize: {
      width: 0,
      height: 0,
      isTablet: true,
      isTablet2: true,
      isMobile: true,
      isDesktop: null,
      scrollBarWidth: 0,
    },
    showModalName: [],
    activeModalContent: {},
  }),
  getters: {
    GET_DocumentScreenSize: state => state.documentScreenSize,
    IS_Tablet: state => state.documentScreenSize.isTablet,
    IS_Tablet2: state => state.documentScreenSize.isTablet2,
    IS_Mobile: state => state.documentScreenSize.isMobile,
    GET_ShowModal: state => state.showModalName,
    GET_ActiveModalContent: state => state.activeModalContent,
  },
  actions: {
    setDocScreenSize() {
      try {
        const root = document.documentElement;
        const width = root.offsetWidth;
        this.documentScreenSize.width = width;
        this.documentScreenSize.height = root.clientHeight;
        this.documentScreenSize.isTablet = width <= TabletSize;
        this.documentScreenSize.isTablet2 = width <= Tablet2Size;
        this.documentScreenSize.isMobile = width <= MobileSize;
        this.documentScreenSize.isDesktop =
          !this.documentScreenSize.isTablet && !this.documentScreenSize.isMobile;
        this.documentScreenSize.scrollBarWidth = getScrollbarWidth();
        const { vh, windowHeight } = vhCheck();
        let deltaVH = vh - windowHeight;
        if (this.documentScreenSize.isTablet && deltaVH < 83) deltaVH = 83;
        window.deltaVH = deltaVH;
        root.style.setProperty('--deltaVH', `${deltaVH}px`);
        root.style.setProperty(
          '--scrollPageBarWidth',
          `${this.documentScreenSize.scrollBarWidth}px`
        );
      } catch (e) {
        console.error('Error in setDocScreenSize:', e);
      }
    },
    SHOW_Modal(value) {
      this.showModalName.push(value);
    },
    HIDE_Modal(newValue = null) {
      this.showModalName.pop();
      if (newValue) this.showModalName.push(newValue);
    },
    HIDE_AllModal() {
      this.showModalName = [];
    },
    SET_ActiveModalContent(value) {
      this.activeModalContent = value;
    },
  },
});
