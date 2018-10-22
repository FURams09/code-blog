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
    console.log(localStorage.getItem('Authorization'));
    localStorage.removeItem('Authorization');
    this.setState({
      loggedIn: false,
    });
  }

  fakeRequest() {
    let headers = {};
    if (localStorage.getItem('Authorization'))
      headers = {
        Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
      };
    axios
      .get('http://localhost:3030', {
        headers,
        withCredentials: true,
      })
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
        <GoogleLogout
          style={{ padding: '10px 20px', margin: '10px' }}
          buttonText="Logout"
          onLogoutSuccess={this.logout.bind(this)}
        />
        <button
          onClick={this.fakeRequest.bind(this)}
          style={{ padding: '10px 20px' }}
        >
          Get
        </button>
      </Layout>
    );
  }
}

export default SecondPage;
