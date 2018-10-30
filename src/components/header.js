import React, { Component } from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';

import { GoogleLogout } from 'react-google-login';

import Auth from '../../lib/auth';

const Container = styled.div`
  background-color: rebeccapurple;
  margin-bottom: 1.45rem;
  width: 100%;
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
        <div>
          <h1 style={{ margin: 0, display: `inline` }}>
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
        </div>
      </Container>
    );
  }
}

export default Header;
