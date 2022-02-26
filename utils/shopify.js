import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const CART_RETURN_FIELDS = gql`
  fragment CartReturnFields on Cart {
    id
    createdAt
    updatedAt
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              product {
                handle
                title
                collections(first: 1) {
                  edges {
                    node {
                      handle
                    }
                  }
                }
              }
              id
              image {
                url(transform: { preferredContentType: WEBP })
                altText
              }
              price
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    attributes {
      key
      value
    }
    estimatedCost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      email
      phone
      customer {
        id
      }
      countryCode
    }
  }
`;

export const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_SHOPIFY_API_URL}`,
  headers: {
    "X-Shopify-Storefront-Access-Token": `${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

export async function getAllProducts() {
  return client
    .query({
      query: gql`
        query AllProducts {
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                tags
                collections(first: 1) {
                  edges {
                    node {
                      handle
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      `,
    })
    .then((products) => {
      return products.data.products.edges;
    })
    .catch((err) => console.log(err));
}

export async function getProductByHandle({ productHandle }) {
  return client
    .query({
      query: gql`
        query ProductByHandle($productHandle: String!) {
          product(handle: $productHandle) {
            id
            handle
            title
            description
            tags
            productType
            vendor
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  url(transform: { preferredContentType: WEBP })
                  altText
                }
              }
            }
          }
        }
      `,
      variables: {
        productHandle,
      },
    })
    .then((product) => {
      return product.data.product;
    })
    .catch((err) => console.log(err));
}

export async function getAllCollections() {
  return client
    .query({
      query: gql`
        query AllCollections {
          collections(first: 10) {
            edges {
              node {
                id
                handle
                image {
                  url(transform: { preferredContentType: WEBP })
                }
              }
            }
          }
        }
      `,
    })
    .then((collections) => {
      return collections.data.collections.edges;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getAllProductsByCollectionHandle({ collectionHandle }) {
  return client
    .query({
      query: gql`
        query AllProductsByCollectionHandle($collectionHandle: String!) {
          collection(handle: $collectionHandle) {
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  handle
                  tags
                  collections(first: 1) {
                    edges {
                      node {
                        handle
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        url(transform: { preferredContentType: WEBP })
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        collectionHandle,
      },
    })
    .then((collection) => {
      return collection.data.collection.products.edges;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getCart(variables) {
  return client
    .query({
      query: gql`
        ${CART_RETURN_FIELDS}
        query getCart($cartId: ID!) {
          cart(id: $cartId) {
            ...CartReturnFields
          }
        }
      `,
      variables,
    })
    .then((cart) => {
      return cart.data.cart;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function createCart(cartInput = {}) {
  return client
    .mutate({
      mutation: gql`
        ${CART_RETURN_FIELDS}
        mutation createCart($cartInput: CartInput) {
          cartCreate(input: $cartInput) {
            cart {
              ...CartReturnFields
            }
          }
        }
      `,
      variables: {
        cartInput,
      },
    })
    .then((cart) => {
      return cart.data.cartCreate.cart;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateCartItem(variables = {}) {
  return client
    .mutate({
      mutation: gql`
        ${CART_RETURN_FIELDS}
        mutation cartLinesUpdate(
          $cartId: ID!
          $lines: [CartLineUpdateInput!]!
        ) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              ...CartReturnFields
            }
          }
        }
      `,
      variables,
    })
    .then((cart) => {
      return cart.data.cartLinesUpdate.cart;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function addCartItem(variables) {
  return client
    .mutate({
      mutation: gql`
        ${CART_RETURN_FIELDS}
        mutation addCartLineItem($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              ...CartReturnFields
            }
          }
        }
      `,
      variables,
    })
    .then((cart) => {
      return cart.data.cartLinesAdd.cart;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getCheckoutURL(variables) {
  return client
    .query({
      query: gql`
        query checkoutURL($cartId: ID!) {
          cart(id: $cartId) {
            checkoutUrl
          }
        }
      `,
      variables,
    })
    .then((url) => {
      return url.data.cart.checkoutUrl;
    })
    .catch((err) => {
      console.log(err);
    });
}
