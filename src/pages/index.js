import React, { Component } from 'react';

import { Redirect } from '@reach/router';

import Layout from '../components/layout.js';
import LoginForm from '../components/login';
import styles from '../styles';
import Blurb from '../components/blurb.js';

const STATUSES = {
  loading: 'loading',
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

  loginSuccess() {
    this.setState({
      status: STATUSES.loggedIn,
    });
  }
  loginFail(ex) {
    console.log(ex);
  }
  render() {
    if (this.state.status === STATUSES.loggedIn) {
      return <Redirect to="/page-2/" noThrow />;
    } else if (this.state.status === STATUSES.loading) {
      return <Layout>Validating Login Status</Layout>;
    } else {
      return (
        <Layout>
          <div style={styles.Header.headerContainer}>
            <h2 style={styles.Header.jumbotronText}>
              Gregory Padin's Coding and Interviewing Blog
            </h2>
          </div>
          <div style={styles.Grid.gridContainer}>
            <Blurb />
            <div
              style={Object.assign({}, styles.Grid.gridContentArea, {
                gridArea: `purpose`,
              })}
            >
              <h2>About Me</h2>
              <p>Welcome to your new Gatsby site.</p>
              <p>Now go build something great.</p>

              <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <p>tent</p>
              </div>
            </div>

            <div
              style={Object.assign({}, styles.Grid.gridContentArea, {
                gridArea: `login`,
              })}
            >
              <h2>Request Access or Login</h2>
              <div
                style={{
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `center`,
                }}
              >
                <LoginForm
                  onLogin={this.loginSuccess.bind(this)}
                  onLoginFail={this.loginFail.bind(this)}
                />
              </div>
            </div>
          </div>
          <div style={styles.Footer.background}>(c) Greg Padin 2018</div>
        </Layout>
      );
    }
  }
}

export default IndexPage;
