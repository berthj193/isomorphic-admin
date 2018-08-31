import { REQUEST_STARTED } from '../constants/actionTypes/request';

export const startRequest = (promise, messages = []) => ({
  type: REQUEST_STARTED,
  payload: {
    promise,
    messages,
  },
});
