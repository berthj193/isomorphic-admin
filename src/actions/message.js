import {
  EMIT_SUCCESS,
  EMIT_INFO,
  EMIT_ERROR,
} from '../constants/actionTypes/message';

const actions = {
  emitSuccess: message => ({
    type: EMIT_SUCCESS,
    payload: message,
  }),
  emitInfo: message => ({
    type: EMIT_INFO,
    payload: message,
  }),
  emitError: message => ({
    type: EMIT_ERROR,
    payload: message,
  }),
};

export default actions;

export const emitSuccess = actions.emitSuccess;
export const emitInfo = actions.emitInfo;
export const emitError = actions.emitError;
