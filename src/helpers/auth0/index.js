import Auth0Lock from 'auth0-lock';
import history from './history';
import _get from 'lodash/get';
import { Auth0Config } from '../../settings';
import { store } from '../../store';
import { login } from '../../actions/auth';
import { notification } from '../../components';

class Auth0Helper {
  isValid = Auth0Config.clientID && Auth0Config.domain;

  lock = this.isValid
    ? new Auth0Lock(
      Auth0Config.clientID,
      Auth0Config.domain,
      Auth0Config.options
    )
    : null;

  constructor() {
    this.registerCallbacks();
  }

  showLock = () => {
    this.lock.show();
  };

  hideLock = () => {
    this.lock.hide();
  };

  registerCallbacks = () => {
    this.lock.on('authenticated', authResult => {
      if (authResult && authResult.accessToken) {
        this.setSession(authResult);
        const state = store.getState();
        const callbackPathname = _get(state, 'router.location.state.from');
        store.dispatch(login(callbackPathname));
      }
    });

    this.lock.on('authorization_error', err => {
      // user doesn't have admin role
      if (err.error === 'unauthorized') {
        notification('error', err.errorDescription);
        setTimeout(() => {
          history.replace('/signin');
        }, 1000);

      // invalid user or password
      } else {
        notification('error', err.description);
      }
    });
  };

  setSession = authResult => {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  };

  logout = () => {
    // Clear access token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  };

  isTokenValid = () => {
    try {
      // Check whether the current time is past the
      // access token's expiry time
      const accessToken = localStorage.getItem('access_token');
      const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return accessToken && (new Date().getTime() < expiresAt);
    } catch (e) {
      return false;
    }
  };

  isTokenMissing = () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      return !accessToken;
    } catch (e) {
      return true;
    }
  };

  getAuth0User = () => {
    const accessToken = localStorage.getItem('access_token');

    return new Promise((resolve, reject) => {
      this.lock.getUserInfo(accessToken, (err, profile) => {
        if (err) {
          reject();
        } else {
          resolve(profile);
        }
      });
    });
  };
}

export default new Auth0Helper();
