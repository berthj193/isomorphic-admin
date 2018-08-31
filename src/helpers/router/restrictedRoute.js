import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';

class RestrictedRoute extends Component {
  static propTypes = {
    component: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired }),
  };

  render() {
    const { component: AppComponent, isLoggedIn, ...otherProps } = this.props;
    const componentToRender = props => isLoggedIn
      ? <AppComponent {...props} />
      : <Redirect
        to={{
          pathname: '/signin',
          state: { from: props.location.pathname },
        }}
      />;
    return (
      <Route
        {...otherProps}
        render={componentToRender}
      />
    );
  }
}

export default withRouter(RestrictedRoute);
