import React, { Component } from 'react';
import { graphql, navigate } from 'gatsby';

import styles from '../styles';
import { GoogleLogout } from 'react-google-login';
import Auth from '../lib/auth';

export default class BlogTemplate extends Component {
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
    const { data } = this.props;
    const { frontmatter, html } = data.markdownRemark;
    return (
      <div style={styles.Grid.gridContainer}>
        <GoogleLogout
          style={{ padding: '10px 20px', margin: '10px' }}
          buttonText="Logout"
          onLogoutSuccess={this.logout.bind(this)}
        />
        <div
          style={Object.assign({}, styles.Grid.gridContentArea, {
            gridArea: `aboutMe`,
          })}
        >
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <button
            onClick={() => {
              localStorage.removeItem('Authorization');
              navigate('/');
            }}
          >
            Kill
          </button>
        </div>
      </div>
    );
  }
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
