import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import RestrictedRoute from './helpers/router/restrictedRoute';
import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';
import PageLoading from './containers/PageLoading/PageLoading';

const withPageLoading = props => <PageLoading {...props} />;
const redirectToDashboard = () => <Redirect to="/dashboard" />;

const PublicRoutes = ({ history, isLoggedIn }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route
        exact
        path="/signin"
        component={asyncComponent(() => import('./containers/SignIn'))}
      />
      <Route
        path="/auth0loginCallback"
        render={withPageLoading}
      />
      <Route
        path="/loading"
        render={withPageLoading}
      />
      <RestrictedRoute
        path="/dashboard"
        component={App}
        isLoggedIn={true}
      />
      <Route
        render={redirectToDashboard}
      />
    </Switch>
  </ConnectedRouter>
);

PublicRoutes.propTypes = {
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool,
};

export default connect(state => ({
  isLoggedIn: state.Auth.isLoggedIn,
}))(PublicRoutes);
