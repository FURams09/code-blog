import React, { Component } from 'react';
import { Link } from 'gatsby';

import { Redirect } from '@reach/router';
import Layout from '../components/layout';
import { GoogleLogout } from 'react-google-login';

import axios from 'axios';
class SecondPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    };
  }

  logout() {
    this.setState({
      loggedIn: false,
    });
  }

  fakeRequest() {
    axios
      .get(
        'http://localhost:3030',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
          },
          withCredentials: true,
        },
        {}
      )
      .then((res) => {
        console.log(res);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }
  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/" noThrow />;
    }
    return (
      <Layout>
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        <Link to="/">Go back to the homepage</Link>
        <GoogleLogout
          style={{ padding: '10px 20px' }}
          buttonText="Logout"
          onLogoutSuccess={this.logout.bind(this)}
        />
        <button onClick={this.fakeRequest.bind(this)}>Get</button>
      </Layout>
    );
  }
}

export default SecondPage;
