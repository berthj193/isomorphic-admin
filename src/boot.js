import { store } from './store';
import { checkAuthorization } from './actions/auth';

export default () =>
  new Promise(() => {
    store.dispatch(checkAuthorization(window.location.pathname));
  });
