import React, { Component } from 'react';
import { Link } from 'gatsby';
import axios from 'axios';

import { Redirect } from '@reach/router';

import { GoogleLogin } from 'react-google-login';
import GoogleCredentials from '../../credentials.json';

import { StaticQuery, graphql } from 'gatsby';

import headerImage from '../../public/images/landing-cover.jpg';
import Layout from '../components/layout.js';

const STATUSES = {
  loading: 'loading',
  loggedIn: 'loggedIn',
  landingPage: 'landingPage',
};

const styles = {
  Header: {
    headerContainer: {
      position: `fixed`,
      width: `100%`,
      height: `200px`,
      border: `1px dashed black`,
      backgroundColor: `green`,
    },
    jumbotronText: {
      position: `absolute`,
      top: `40%`,
      left: `30%`,
      color: `blue`,
      zIndex: `1`,
    },
  },
  Grid: {
    //TODO: convert this to flexbox. More in line with what it is
    gridContainer: {
      display: 'grid',
      gridTemplateAreas: `
      ". aboutMe purpose login ."`,
      gridTemplateColumns: `1fr minmax(200px, 400p) minmax(200px, 400p) minmax(200px, 400p) 1fr`,
      gridTemplateRows: `minmax(300px, 600p)`,
      textAlign: `center`,
      paddingTop: `200px`,
      border: `1px dashed red`,
    },
    gridContentArea: {
      textAlign: `center`,
      border: `1px dashed red`,
    },
  },
  Footer: {
    background: {
      bottom: `0px`,
      backgroundColor: 'black',
      color: `grey`,
      height: `60px`,
      textAlign: `left`,
      verticalAlign: `bottom`,
      width: `100%`,
      padding: `10px 25px`,
    },
  },
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
            <div
              style={Object.assign({}, styles.Grid.gridContentArea, {
                gridArea: `aboutMe`,
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
                gridArea: `purpose`,
              })}
            >
              <h2>Where are you</h2>
              <p>Welcome to your new Gatsby site.</p>
              <p>Now go build something great.</p>
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
                <GoogleLogin
                  buttonText="Login With Google"
                  onSuccess={this.loginSuccess.bind(this)}
                  onFailure={this.loginError.bind(this)}
                  style={{ padding: '10px 20px', display: 'block' }}
                  clientId={GoogleCredentials.web.client_id}
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
