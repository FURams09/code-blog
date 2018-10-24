import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import GoogleLogin from './google-login';
import FormInputGroup from './form-input-group';
import styles from '../styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', email: '' };
  }
  requestLogin() {
    axios.post('http://localhost:3030/register', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
    });
  }
  loginSuccess(e) {
    const authorizationTicket = e.tokenObj;
    axios
      .post('http://localhost:3030/login', { authorizationTicket })
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

  inputChange(label, value) {
    this.setState({
      [label]: value,
    });
  }
  render() {
    const emailIcon = <FontAwesomeIcon icon={faEnvelope} />;
    const personIcon = <FontAwesomeIcon icon={faUser} />;
    return (
      <form style={{ border: `1px dashed green`, textAlign: `left` }}>
        <FormInputGroup
          label="Firt Name"
          id="firstName"
          icon={personIcon}
          updateInput={this.inputChange.bind(this)}
        />
        <FormInputGroup
          label="Last Name"
          id="lastName"
          icon={personIcon}
          updateInput={this.inputChange.bind(this)}
        />
        <FormInputGroup
          label="Email"
          id="email"
          icon={emailIcon}
          updateInput={this.inputChange.bind(this)}
        />

        <div style={styles.Form.formGroup}>
          <button
            type="button"
            style={styles.Form.button}
            onClick={this.requestLogin.bind(this)}
          >
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
