const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

async function shopifyFetch(query, variables = {}) {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2025-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
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

export async function getProductsByCollectionHandle(collectionHandle) {
  const query = `
    query GetCollectionProducts($handle: String!) {
      collection(handle: $handle) {
        title
        handle
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              productType
              description
featuredImage {
  url
  altText
}

images(first: 20) {
  edges {
    node {
      url
      altText
    }
  }
}
              variants(first: 20) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query, {
    handle: collectionHandle,
  });

  return data.collection?.products.edges.map((edge) => edge.node) || [];
}

export const getProductsByCollection = getProductsByCollectionHandle;

export async function createShopifyCart(lines) {
  const query = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch(query, {
    input: {
      lines,
    },
  });

  const errors = data.cartCreate.userErrors;

  if (errors && errors.length > 0) {
    console.error("Shopify cart errors:", errors);
    throw new Error(errors[0].message);
  }

  return data.cartCreate.cart;
}