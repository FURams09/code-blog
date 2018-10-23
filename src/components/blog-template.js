import React from 'react';
import { graphql } from 'gatsby';

import styles from '../styles';

export default function BlogTemplate({ data }) {
  const { frontmatter, html } = data.markdownRemark;
  return (
    <div style={styles.Grid.gridContainer}>
      <div
        style={Object.assign({}, styles.Grid.gridContentArea, {
          gridArea: `aboutMe`,
        })}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
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
