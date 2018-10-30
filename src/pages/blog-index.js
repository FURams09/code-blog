import React, { Component } from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';

export default class BlogIndex extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  //TODO: Rerender when blogs are added or deleted
  render() {
    const { data } = this.props;
    const blogs = data.allMarkdownRemark.edges.map((blog, i) => {
      let { title, summary, tags, path } = blog.node.frontmatter;
      return (
        <div key={i}>
          <Link to={path}>{title}</Link>
          {`: ${summary}
      ${JSON.stringify(tags)}`}
        </div>
      );
    });
    return (
      <Layout showHeader>
        <div className="content-layout">{blogs}</div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query allBlogs {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "blog" } } }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            summary
            tags
          }
        }
      }
    }
  }
`;
