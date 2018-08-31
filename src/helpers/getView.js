import { views } from '../constants';

const { mobileView, desktopView, tabView } = views;

export default function getView(width) {
  if (width > 1220) {
    return desktopView;
  } else if (width > 767) {
    return tabView;
  }
  return mobileView;
}
