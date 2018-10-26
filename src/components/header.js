import React, { Component } from 'react';
import { Link, navigate } from 'gatsby';

import { GoogleLogout } from 'react-google-login';

import Auth from '../lib/auth';
class Header extends Component {
  constructor(props) {
    super(props);
  }
  logout() {
    Auth.get('http://localhost:3030/logout')
      .then((res) => {
        console.log(res);
        localStorage.removeItem('Authorization');
        navigate('/');
      })
      .catch((ex) => {
        console.log(ex);
      });
  }

  render() {
    return (
      <div
        style={{
          background: 'rebeccapurple',
          marginBottom: '1.45rem',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '1.45rem 1.0875rem',
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              {this.props.siteTitle}
            </Link>

            <GoogleLogout
              style={{ padding: '10px 20px', margin: '10px' }}
              buttonText="Logout"
              onLogoutSuccess={this.logout.bind(this)}
            />
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem('Authorization');
              navigate('/');
            }}
          >
            Kill
          </button>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    );
  }
}

export default Header;
