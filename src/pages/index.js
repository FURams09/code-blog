import React, { Component } from 'react';

import { Redirect } from '@reach/router';

import Layout from '../components/layout.js';
import LoginForm from '../components/login';
import styled from 'styled-components';

import BlurbCard from '../components/blurb-card';

const STATUSES = {
  loading: 'loading',
  loggedIn: 'loggedIn',
  landingPage: 'landingPage',
};

const HeaderBackground = styled.div`
  position: fixed;
  width: 1080px;
  height: 160px;
  border: 1px dashed black;
  background-color: green;
`;

const HeaderText = styled.h2`
  position: absolute;
  top: 40%;
  left: 18%;
  color: blue;
  z-index: 1;
`;

const ContentContainer = styled.div`
  padding-top: 160px;
  width: 1080px;
  display: grid;
  grid-template-areas:
    '. purpose techStack .'
    '. aboutMe login .';
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  border: 1px dashed red;
`;

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
          <BlurbCard
            gridArea={blurb.node.frontmatter.gridArea}
            title={blurb.node.frontmatter.title}
            borderColor="blue"
          >
            <div dangerouslySetInnerHTML={{ __html: blurb.node.html }} />
          </BlurbCard>
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
          <HeaderBackground>
            <HeaderText>
              Gregory Padin's Coding and Interviewing Blog
            </HeaderText>
          </HeaderBackground>

          <ContentContainer>
            {displayBlurbs}

            <BlurbCard gridArea="login" title="Request Access or Login">
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
            </BlurbCard>
          </ContentContainer>
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
            gridArea
          }
          html
        }
      }
    }
  }
`;
