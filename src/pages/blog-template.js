import React, { Component } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
// eslint-disable-next-line
export default class BlogTemplate extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const { frontmatter, html } = data.markdownRemark;
    const { links, tags, summary, title } = frontmatter;

    let references = <></>;
    if (links && links.length > 0) {
      const referenceLinks = links.map((link, i) => {
        return (
          <li>
            <a key={i} href={link[0]}>
              {link[1] || link[0]}
            </a>
          </li>
        );
      });

      references = (
        <>
          <h4>References</h4>
          <ul>{referenceLinks}</ul>
        </>
      );
    }

    const blogTags = <></>;
    if (tags && tags.length > 0) {
      tags.map((tag, i) => {
        return <li key={i}>{tag}</li>;
      });
    }
    return (
      <Layout showHeader>
        <div className="blog-post content-layout">
          <h1>{title}</h1>
          <div className="summary-block" style={{ marginLeft: `20px` }}>
            <div className="blog-summary">
              <em>{summary}</em>
            </div>
            <div>
              <ul className="blog-topic-list">
                <li>
                  <b>Topics:</b>
                </li>
                {blogTags}
              </ul>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: html }} />
          {references}
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
        links
        tags
        summary
      }
    }
  }
`;
