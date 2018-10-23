import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GoogleLogin } from 'react-google-login';
import GoogleCredentials from '../../credentials.json';

class GoogleLoginButton extends Component {
  loginSuccess(res) {
    this.props.onSuccess(res);
  }
  loginError(ex) {
    this.props.onFailure(ex);
  }
  render() {
    return (
      <GoogleLogin
        buttonText="Login With Google"
        onSuccess={this.loginSuccess.bind(this)}
        onFailure={this.loginError.bind(this)}
        style={{ padding: '10px 20px' }}
        clientId={GoogleCredentials.web.client_id}
      />
    );
  }
}

GoogleLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
};

export default GoogleLoginButton;
