import React, { Component } from 'react';
import { Link } from 'gatsby';
import axios from 'axios';

import { Redirect } from '@reach/router';

import { GoogleLogin } from 'react-google-login';
import GoogleCredentials from '../../credentials.json';
import LandingPage from '../components/landingPage';
const STATUSES = {
  loading: 'loading',
  validating: 'validating',
  loggedIn: 'loggedIn',
  landingPage: 'landingPage',
};

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: STATUSES.loading,
    };
  }
  componentDidMount() {
    if (this.state.status === STATUSES.loading) {
      if (localStorage.getItem('Authorization')) {
        this.setState({ status: STATUSES.loggedIn });
      } else {
        this.setState({ status: STATUSES.landingPage });
      }
    }
  }
  loginSuccess(e) {
    const authorizationTicket = e.tokenObj;
    console.log(e);
    axios
      .post('http://localhost:3030/auth', { authorizationTicket })
      .then(() => {
        localStorage.setItem('Authorization', authorizationTicket.access_token);
        this.setState({
          status: STATUSES.loggedIn,
        });
      })
      .catch((ex) => {
        console.log(ex);
      });
  }
  loginError(e) {
    console.log(e);
  }

  render() {
    if (this.state.status === STATUSES.loggedIn) {
      return <Redirect to="/page-2/" noThrow />;
    } else if (
      this.state.status === STATUSES.validating ||
      this.state.status === STATUSES.loading
    ) {
      return <LandingPage>Validating Login Status</LandingPage>;
    } else {
      return (
        <LandingPage>
          <h1>Hi people</h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
          <Link to="/page-2/">Go to page 2</Link>
          <GoogleLogin
            buttonText="Login With Google"
            onSuccess={this.loginSuccess.bind(this)}
            onFailure={this.loginError.bind(this)}
            style={{ padding: '10px 20px', display: 'block' }}
            clientId={GoogleCredentials.web.client_id}
          />
        </LandingPage>
      );
    }
  }
}

export default IndexPage;
