const path = require('path');
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const LandingCard = path.resolve(`./src/components/blog-template.js`);

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
            component: LandingCard,
            context: {
              path: node.frontmatter.path,
            },
          });
        });
      })
    );
  });
};
