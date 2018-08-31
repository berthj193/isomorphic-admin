import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import Auth0 from '../helpers/auth0';
import {
  LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT,
  CHECK_AUTHORIZATION, LOGIN_REQUEST,
} from '../constants/actionTypes/auth';


export function *loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function *(action) {
    try {
      yield put(replace('/loading'));

      const { callbackPathname } = action.payload;
      const profile = yield call(Auth0.getAuth0User);

      yield put({
        type: LOGIN_SUCCESS,
        payload: {
          profile,
          callbackPathname,
        },
      });
    } catch (e) {
      yield put({ type: LOGIN_ERROR });
    }
  });
}

export function *loginSuccess() {
  yield takeEvery(LOGIN_SUCCESS, function *(action) {
    Auth0.hideLock();

    const { callbackPathname } = action.payload;
    const isPublicUrl = /^\/(loading|auth0loginCallback|signin)/i.test(callbackPathname);
    if (!callbackPathname || isPublicUrl) {
      yield put(replace('/dashboard'));
    } else {
      yield put(replace(callbackPathname));
    }
  });
}

export function *loginError() {
  yield takeEvery(LOGIN_ERROR, function *() {
    Auth0.logout();
    yield put(replace('/signin'));
  });
}

export function *logout() {
  yield takeEvery(LOGOUT, function *() {
    Auth0.logout();
    yield put(replace('/signin'));
  });
}

export function *checkAuthorization() {
  yield takeEvery(CHECK_AUTHORIZATION, function *(action) {
    const isTokenValid = Auth0.isTokenValid();
    const { callbackPathname } = action.payload;

    if (isTokenValid) {
      yield put({
        type: LOGIN_REQUEST,
        payload: {
          callbackPathname,
        },
      });
    } else {
      Auth0.logout();

      // if redirected from auth0 with success, still no token, but don't go to /siginin
      // otherwise (/loading for now) go to /signin page
      if (/^\/auth0loginCallback/i.test(callbackPathname) === false) {
        // yield put(replace('/signin', { from: callbackPathname }));
      }
    }
  });
}

export default function *rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
