import userLockScroll from './functions/userLockScroll';
import { HoldAllScrollPage, HoldScrollPage } from './functions/holdScrollPage';

export default {
  install(app) {
    app.directive('lock-scroll', userLockScroll);
    app.config.globalProperties.$HoldAllScrollPage = HoldAllScrollPage;
    app.config.globalProperties.$HoldScrollPage = HoldScrollPage;
  },
};
