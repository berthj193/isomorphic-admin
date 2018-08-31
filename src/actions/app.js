import {
  COLLAPSE_CHANGE,
  TOGGLE_ALL,
  COLLAPSE_OPEN_DRAWER,
  CHANGE_OPEN_KEYS,
  CHANGE_CURRENT,
} from '../constants/actionTypes/app';
import getView from '../helpers/getView';
import { views } from '../constants';

const { desktopView } = views;

export const toggleCollapsed = () => ({
  type: COLLAPSE_CHANGE,
});

export const toggleAll = (width, height) => {
  const view = getView(width);
  const collapsed = view !== desktopView;
  return {
    type: TOGGLE_ALL,
    collapsed,
    view,
    height,
  };
};

export const toggleOpenDrawer = () => ({
  type: COLLAPSE_OPEN_DRAWER,
});

export const changeOpenKeys = openKeys => ({
  type: CHANGE_OPEN_KEYS,
  openKeys,
});

export const changeCurrent = current => ({
  type: CHANGE_CURRENT,
  current,
});
