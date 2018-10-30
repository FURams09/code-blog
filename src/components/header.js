import React, { Component } from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';

import { GoogleLogout } from 'react-google-login';

import Auth from '../../lib/auth';

import Spinner from './spinner';
const Container = styled.div`
  background-color: rebeccapurple;
  width: 100%;
  display: grid;
  height: 60px;
  grid-template-columns: 35px 1fr 200px;
`;

const GregSpinner = styled.div`
  margin: 15px 0 0 5px;
  height: 30px;
  width: 30px;
`;
class Header extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  logout(e) {
    e.preventDefault();
    Auth.get('http://localhost:3030/logout')
      .then(() => {
        this.localLogout();
      })
      .catch((ex) => {
        console.log(ex);
      });
  }
  /**
   * if we were to find ourselves in a state where a user was logged out of Google
   * but didn't properly kill the session locally, we would not be able to logout without
   * TODO: Look into error handling logouts
   */
  localLogout() {
    localStorage.removeItem('Authorization');
    navigate('/');
  }

  render() {
    return (
      <Container>
        <GregSpinner>
          <Spinner />
        </GregSpinner>
        <h1 style={{ paddingLeft: `15px` }}>
          <Link
            to="/blog-index/"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            {this.props.siteTitle}
          </Link>
        </h1>

        <div style={{ float: `right`, padding: '10px 20px' }}>
          <div
            style={{
              display: `inline`,
              marginRight: `10px`,
              backgroundColor: `gray`,
            }}
          >
            <Link to="/admin">Admin</Link>
          </div>

          <div
            onClick={this.localLogout.bind(this)}
            style={{ dislpay: 'inline-block' }}
          >
            <GoogleLogout
              style={{ margin: '10px' }}
              buttonText="Logout"
              onLogoutSuccess={this.logout.bind(this)}
            />
          </div>
        </div>
      </Container>
    );
  }
}

export default Header;
