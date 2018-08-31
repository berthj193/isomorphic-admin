import { all } from 'redux-saga/effects';
import authSagas from './auth';
import requestSagas from './request';

export default function *rootSaga() {
  yield all([
    authSagas(),
    requestSagas(),
  ]);
}
