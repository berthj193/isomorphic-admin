import {
  SET_DEFAULT_STORE,
  UNSET_DEFAULT_STORE,
} from '../constants/actionTypes/defaultStore';

const initialState = {
  store: null,
};

export default function defaultStoreReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DEFAULT_STORE:
      return { ...state, store: action.payload.store };
    case UNSET_DEFAULT_STORE:
      return { ...state, store: null };
    default:
      return state;
  }
}
