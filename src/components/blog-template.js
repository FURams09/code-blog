import React, { Component } from 'react';
import { graphql } from 'gatsby';

import styles from '../styles';
import Layout from './layout';
export default class BlogTemplate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const { frontmatter, html } = data.markdownRemark;
    console.log(frontmatter);
    return (
      <Layout showHeader>
        <div className="blogPost">
          <h3>{frontmatter.title}</h3>
          <a href={frontmatter.link}>{frontmatter.linkText}</a>

          <div dangerouslySetInnerHTML={{ __html: html }} />
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
        link
        linkText
      }
    }
  }
`;
