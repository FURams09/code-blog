import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import headerImage from '../../public/images/landing-cover.jpg';
import './layout.css';

const styles = {
  Header: {
    headerContainer: {
      position: `fixed`,
      width: `100%`,
      height: `250px`,
      border: `1px dashed black`,
    },
    headerBg: {
      position: `absolute`,
      maxWidth: `1400px`,
      width: `100%`,
      height: `250px`,
    },
    jumbotronText: {
      position: `absolute`,
      top: `40%`,
      left: `30%`,
      color: `green`,
      zIndex: `1`,
    },
  },
  Grid: {
    gridContainer: {
      display: 'grid',
      gridTemplateAreas: `
      ". content ."
      "footer footer footer"`,
      gridTemplateColumns: `1fr 800px 1fr`,
      gridTemplateRows: `minmax(300px, 600p) 1fr`,
      textAlign: `center`,
      paddingTop: `260px`,
      border: `1px dashed red`,
    },
    gridContentArea: {
      gridArea: `content`,
      textAlign: `center`,
      border: `1px dashed red`,
    },
    footer: {
      gridArea: `footer`,
      backgroundColor: 'blue',
      height: `120px`,
      textAlign: `left`,
      verticalAlign: `bottom`,
      padding: `10px 25px`,
    },
  },
};
const LandingPage = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <div style={styles.Header.headerContainer}>
          <img src={headerImage} style={styles.Header.headerBg} />
          <h2 style={styles.Header.jumbotronText}>
            Gregory Padin's Coding and Interviewing Blog
          </h2>
        </div>
        <div style={styles.Grid.gridContainer}>
          <div style={styles.Grid.gridContentArea}>
            {children}
            <div>
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
          <div style={styles.Grid.footer}>(c) Greg Padin 2018</div>
        </div>
      </>
    )}
  />
);

LandingPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LandingPage;
