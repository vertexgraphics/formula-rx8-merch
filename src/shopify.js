
const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

// Shopify collection handle, not the display name
export const RX8_COLLECTION_HANDLE = "formula-rx8-official";

async function shopifyFetch(query, variables = {}) {
  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2025-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (!response.ok) {
    throw new Error(`Shopify HTTP error: ${response.status}`);
  }

  const json = await response.json();

  if (json.errors?.length) {
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error("Shopify API error");
  }

  return json.data;
}

export async function getProductsByCollectionHandle(collectionHandle) {
  const query = `
    query GetCollectionProducts($handle: String!, $cursor: String) {
      collection(handle: $handle) {
        title
        handle
        products(first: 100, after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
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

  const products = [];
  let cursor = null;

  do {
    const data = await shopifyFetch(query, {
      handle: collectionHandle,
      cursor,
    });

    if (!data.collection) {
      throw new Error(
        `Shopify collection not found or unpublished: ${collectionHandle}`
      );
    }

    const connection = data.collection.products;

    products.push(
      ...connection.edges.map(({ node }) => node)
    );

    cursor = connection.pageInfo.hasNextPage
      ? connection.pageInfo.endCursor
      : null;

  } while (cursor);

  return products;
}

// Preserve existing imports elsewhere in the React project
export const getProductsByCollection =
  getProductsByCollectionHandle;

// Filter products by Shopify Product Type
export function filterProductsByType(products, productType) {
  const normalise = (value) =>
    String(value ?? "").trim().toLowerCase();

  return products.filter(
    (product) =>
      normalise(product.productType) === normalise(productType)
  );
}

// Fetch all products from the RX8 collection
export async function getRX8Products() {
  return getProductsByCollectionHandle(RX8_COLLECTION_HANDLE);
}

// Fetch RX8 products matching a specific Product Type
export async function getRX8ProductsByType(productType) {
  const products = await getRX8Products();

  return filterProductsByType(products, productType);
}

// Existing Shopify checkout functionality
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
    input: { lines },
  });

  const errors = data.cartCreate.userErrors;

  if (errors?.length) {
    console.error("Shopify cart errors:", errors);
    throw new Error(errors[0].message);
  }

  return data.cartCreate.cart;
}
