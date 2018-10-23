import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import styles from '../styles';

export default function Blurb(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          markdownRemark(frontmatter: { path: { eq: "/landing/about" } }) {
            html
            frontmatter {
              path
              title
            }
          }
        }
      `}
      variables={{ $path: '/landing/about' }}
      render={({ markdownRemark }) => {
        if (markdownRemark === null) {
          return <h2>Loading</h2>;
        }
        const { frontmatter, html } = markdownRemark;
        return (
          <div
            style={Object.assign({}, styles.Grid.gridContentArea, {
              gridArea: `aboutMe`,
            })}
          >
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        );
      }}
    />
  );
}
