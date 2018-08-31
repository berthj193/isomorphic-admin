import { CHECK_AUTHORIZATION, LOGIN_REQUEST, LOGOUT } from '../constants/actionTypes/auth';

export const checkAuthorization = callbackPathname => ({
  type: CHECK_AUTHORIZATION,
  payload: {
    callbackPathname,
  },
});

export const login = callbackPathname => ({
  type: LOGIN_REQUEST,
  payload: {
    callbackPathname,
  },
});

export const logout = () => ({
  type: LOGOUT,
});
