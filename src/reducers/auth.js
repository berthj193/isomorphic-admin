import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../constants/actionTypes/auth';

const initState = {
  isLoggedIn: false,
  profile: null,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        profile: action.payload.profile,
      };
    case LOGIN_ERROR:
    case LOGOUT:
      return initState;
    default:
      return state;
  }
}
