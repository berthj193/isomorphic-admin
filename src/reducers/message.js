import {
  EMIT_SUCCESS,
  EMIT_INFO,
  EMIT_ERROR,
} from '../constants/actionTypes/message';

const initState = {
  content: null,
  type: null,
  timestamp: 0,
};

export default function authReducer(state = initState, action) {
  const { payload: content } = action;
  switch (action.type) {
    case EMIT_SUCCESS:
      return {
        content,
        type: 'success',
        timestamp: new Date().getTime(),
      };
    case EMIT_INFO:
      return {
        content,
        type: 'info',
        timestamp: new Date().getTime(),
      };
    case EMIT_ERROR:
      return {
        content,
        type: 'error',
        timestamp: new Date().getTime(),
      };
    default:
      return state;
  }
}
