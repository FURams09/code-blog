import React, { Component } from 'react';
import { graphql } from 'gatsby';

import styles from '../styles';
import Auth from '../lib/auth';
import Layout from './layout';
export default class BlogTemplate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const { frontmatter, html } = data.markdownRemark;
    return (
      <Layout showHeader>
        <div style={styles.Grid.gridContainer}>
          <div
            style={Object.assign({}, styles.Grid.gridContentArea, {
              gridArea: `aboutMe`,
            })}
          >
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </Layout>
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
