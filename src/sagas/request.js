import { fork, takeEvery, put, call, all } from 'redux-saga/effects';
import { REQUEST_STARTED, REQUEST_SUCCESS, REQUEST_FAILURE } from '../constants/actionTypes/request';
import { EMIT_SUCCESS, EMIT_ERROR } from '../constants/actionTypes/message';

export function *startRequest() {
  yield takeEvery(REQUEST_STARTED, function *({ payload: { messages = [], promise } }) {
    const [successMessage, errorMessages = 'Error ocurred'] = messages;
    try {
      const result = yield call(() => promise);
      yield put({
        type: REQUEST_SUCCESS,
        payload: result,
      });
      if (successMessage) {
        yield put({
          type: EMIT_SUCCESS,
          payload: successMessage,
        });
      }
    } catch (error) {
      yield put({
        type: REQUEST_FAILURE,
        error,
      });
      if (messages.length > 0) {
        yield put({
          type: EMIT_ERROR,
          payload: errorMessages,
        });
      }
    }
  });
}

export default function *rootSaga() {
  yield all([
    fork(startRequest),
  ]);
}
