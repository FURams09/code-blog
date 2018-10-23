import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import GoogleLogin from './google-login';
import styles from '../styles/styles';

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }
  loginSuccess(e) {
    const authorizationTicket = e.tokenObj;
    console.log(e);
    axios
      .post('http://localhost:3030/auth', { authorizationTicket })
      .then(() => {
        localStorage.setItem('Authorization', authorizationTicket.access_token);
        this.props.onLogin();
      })
      .catch((ex) => {
        this.props.onLoginFail(ex);
      });
  }
  loginError(ex) {
    this.props.onLoginFail(ex);
  }
  render() {
    return (
      <form style={{ border: `1px dashed green`, textAlign: `left` }}>
        <div style={styles.Form.formGroup}>
          <label htmlFor="name" style={styles.Form.label}>
            Name:
          </label>
          <input type="input" id="name" placeholder="name" />
        </div>
        <div style={styles.Form.formGroup}>
          <label htmlFor="name" style={styles.Form.label}>
            Email:
          </label>
          <input type="input" id="email" placeholder="email" />
        </div>
        <div style={styles.Form.formGroup}>
          <button type="button" style={{ padding: '10px 20px' }}>
            Request Access
          </button>
          <GoogleLogin
            onSuccess={this.loginSuccess.bind(this)}
            onFailure={this.loginError.bind(this)}
          />
        </div>
      </form>
    );
  }
}

GoogleLogin.propTypes = {
  onLogin: PropTypes.func,
  onLoginFail: PropTypes.func,
};

export default LoginForm;
