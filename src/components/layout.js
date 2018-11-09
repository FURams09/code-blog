import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import './layout.css';
import Header from './header';
import Footer from './footer';

const ViewPort = styled.div`
  margin: 0 auto;
  min-width: 450px;
  max-width: 1080px;
  height: 100%;
`;
const Layout = ({ children, showHeader }) => {
  let body = (title) => {
    if (showHeader) {
      return (
        <>
          <Header siteTitle={title} />
          {children}
        </>
      );
    } else {
      return children;
    }
  };

  return (
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
          <ViewPort>
            {body(data.site.siteMetadata.title)}
            <Footer />
          </ViewPort>
        </>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showHeader: PropTypes.bool,
};

export default Layout;
