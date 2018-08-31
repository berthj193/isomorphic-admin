import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import Auth from './auth';
import App from './app';
import Message from './message';
import DefaultStore from './defaultStore';

export default combineReducers({
  Auth,
  App,
  Message,
  DefaultStore,
  router,
  form,
});
