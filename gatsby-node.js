const path = require('path');
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const BlogTemplate = path.resolve(`./src/components/blog-template.js`);

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  title
                  path
                  links
                  tags
                  summary
                  type
                  lastEdited
                }
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          createPage({
            path: node.frontmatter.path,
            title: node.frontmatter.title,
            lastEdited: node.frontmatter.lastEdited,
            links: node.frontmatter.links,
            tags: node.frontmatter.tags,
            summary: node.frontmatter.summary,
            type: node.frontmatter.type,
            component: BlogTemplate,
            context: {
              path: node.frontmatter.path,
            },
          });
        });
      })
    );
  });
};
