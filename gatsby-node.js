const path = require("path");

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    const layoutTemplate = path.resolve(`src/templates/pageTemplate.js`);
    const commercialLayout = path.resolve(`src/templates/commercialTemplate.js`)
    const contentfulPages = graphql(`
    query {
        allContentfulLayout {
            edges {
                node {
                    slug
                    node_locale
                }
            }
        }
        
    }
  `).then(result => {
        if (result.errors) {
            throw result.errors;
        }
        result.data.allContentfulLayout.edges.forEach(edge => {
            if (edge.node.slug === "404") {
                // for 404 page we use custom page at src/pages/404.js
                return;
            }
            createPage({
                path: edge.node.slug,
                component: layoutTemplate,
                context: {
                    slug: edge.node.slug
                }
            });
        });
    });
//shopify Commercial query
const shopifyCommercialPages = graphql(`
    query {
 shopifyCollection(title: {in: "Commercial Site Products"}) {
    title
    products {
      handle
      title
      images {
        originalSrc
      }
      description
      onlineStoreUrl
      id
    }
    shopifyId
  }
    }
  `).then(result => {
      console.log(result)
        if (result.errors) {
            throw result.errors;
        }
        result.data.shopifyCollection.products.forEach(edge => {
           
            createPage({
                path: edge.handle,
                component: commercialLayout,
                context: {
                    id: edge.id
                }
            });
        });
    });


return Promise.all([contentfulPages, shopifyCommercialPages]);


};

