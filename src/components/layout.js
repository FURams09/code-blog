import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import './layout.css';
import Header from './header';

const Layout = ({ children, showHeader }) => {
  let body = children;
  if (showHeader) {
    body = (
      <>
        <Header title="Greg's Code Blog" />
        {children}
      </>
    );
  }
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
          {body}
        </>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showHeader: PropTypes.string.isRequired,
};

export default Layout;
