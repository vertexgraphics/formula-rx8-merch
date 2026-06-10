const SHOPIFY_DOMAIN = "qsccb0-xv.myshopify.com";
const STOREFRONT_ACCESS_TOKEN = "8b09e4bf0c667bee3f44411832ccd90c";

async function shopifyFetch(query, variables = {}) {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2025-04/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Shopify API error");
  }

  return json.data;
}

export async function getProductsByCollection(collectionHandle) {
  const query = `
    query getProductsByCollection($handle: String!) {
      collection(handle: $handle) {
        title
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              description
              availableForSale
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query, { handle: collectionHandle });

  if (!data.collection) return [];

  return data.collection.products.edges.map(({ node }) => ({
    id: node.id,
    name: node.title,
    description: node.description,
    image: node.featuredImage?.url,
    price: `$${Number(node.priceRange.minVariantPrice.amount).toFixed(2)}`,
    link: `https://vertexgraphics.com.au/products/${node.handle}`,
    available: node.availableForSale,
  }));
}