import { getDefaultPath } from '../helpers/urlSync';
import getView from '../helpers/getView';
import {
  COLLAPSE_CHANGE, COLLAPSE_OPEN_DRAWER, TOGGLE_ALL,
  CHANGE_OPEN_KEYS, CHANGE_CURRENT,
} from '../constants/actionTypes/app';

const preKeys = getDefaultPath();

const initState = {
  collapsed: !(window.innerWidth > 1220),
  view: getView(window.innerWidth),
  height: window.innerHeight,
  openDrawer: false,
  openKeys: preKeys,
  current: preKeys,
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case COLLAPSE_CHANGE:
      return {
        ...state,
        collapsed: !state.collapsed,
      };
    case COLLAPSE_OPEN_DRAWER:
      return {
        ...state,
        openDrawer: !state.openDrawer,
      };
    case TOGGLE_ALL:
      if (state.view !== action.view || action.height !== state.height) {
        const height = action.height ? action.height : state.height;
        return {
          ...state,
          collapsed: action.collapsed,
          view: action.view,
          height,
        };
      } else {
        return state;
      }
    case CHANGE_OPEN_KEYS:
      return {
        ...state,
        openKeys: action.openKeys,
      };
    case CHANGE_CURRENT:
      return {
        ...state,
        current: action.current,
      };
    default:
      return state;
  }
}
