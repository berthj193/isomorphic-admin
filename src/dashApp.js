import React from 'react';
import { Provider } from 'react-redux';
import { store, history } from './store';
import PublicRoutes from './router';
import Boot from './boot';
import './styles/dashApp.scss';

const DashApp = () => (
  <div className="dash-app">
    <Provider store={store}>
      <PublicRoutes history={history} />
    </Provider>
  </div>
);

Boot()
  .then(() => DashApp())
  .catch(console.error);

export default DashApp;
