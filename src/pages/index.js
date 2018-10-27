import React, { Component } from 'react';

import { Redirect } from '@reach/router';

import Layout from '../components/layout.js';
import LoginForm from '../components/login';
import styles from '../styles';

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
    const { allMarkdownRemark } = this.props.data;
    let displayBlurbs = <></>;
    if (allMarkdownRemark) {
      displayBlurbs = allMarkdownRemark.edges.map((blurb) => {
        return (
          <div
            style={Object.assign({}, styles.Grid.gridContentArea, {
              gridArea: blurb.node.frontmatter.title,
            })}
          >
            <div dangerouslySetInnerHTML={{ __html: blurb.node.html }} />
          </div>
        );
      });
    }

    if (this.state.status === STATUSES.loggedIn) {
      return <Redirect to="/blog-index/" noThrow />;
    } else if (this.state.status === STATUSES.loading) {
      return <Layout>Validating Login Status</Layout>;
    } else {
      return (
        <Layout showHeader={false}>
          <div style={styles.Header.headerContainer}>
            <h2 style={styles.Header.jumbotronText}>
              Gregory Padin's Coding and Interviewing Blog
            </h2>
          </div>
          <div style={styles.Grid.gridContainer}>
            {displayBlurbs}

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
        </Layout>
      );
    }
  }
}

export default IndexPage;

export const pageQuery = graphql`
  query Blurbs {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "blurb" } } }) {
      edges {
        node {
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`;
