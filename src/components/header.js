import React, { Component } from 'react';
import { Link, navigate } from 'gatsby';

import { GoogleLogout } from 'react-google-login';

import Auth from '../../lib/auth';
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
      <div style={{ background: 'rebeccapurple', marginBottom: '1.45rem' }}>
        <div className="content-layout">
          <h1 style={{ margin: 0, display: `inline` }}>
            <Link
              to="/blog-index/"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              {this.props.siteTitle}
            </Link>
          </h1>
          <div style={{ display: `inline` }}>
            <Link to="/admin">Admin</Link>
          </div>

          <div style={{ float: `right`, padding: '10px 20px' }}>
            <button
              onClick={() => {
                localStorage.removeItem('Authorization');
                navigate('/');
              }}
            >
              Kill
            </button>

            <GoogleLogout
              style={{ margin: '10px' }}
              buttonText="Logout"
              onLogoutSuccess={this.logout.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
