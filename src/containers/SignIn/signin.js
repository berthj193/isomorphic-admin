import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auth0 from '../../helpers/auth0';

import background from '../../assets/signin.jpg';
import './signin.scss';


class SignIn extends Component {
  componentDidMount() {
    if (Auth0.isValid && Auth0.isTokenMissing()) {
      Auth0.showLock();
    }
  }

  render() {
    return (
      <div className="isoSignInPage sign-in-wrapper" style={{ background: `url(${background}) no-repeat center center` }} />
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.isLoggedIn,
  })
)(SignIn);
