import {
  SET_DEFAULT_STORE,
  UNSET_DEFAULT_STORE,
} from '../constants/actionTypes/defaultStore';

export const setDefaultStore = store => ({
  type: SET_DEFAULT_STORE,
  payload: { store },
});

export const unsetDefaultStore = () => ({
  type: UNSET_DEFAULT_STORE,
});
