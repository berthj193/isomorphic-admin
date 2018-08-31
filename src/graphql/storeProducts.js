import gql from 'graphql-tag';

export const getListQuery = `
query storeProducts (
  $store_key: String!
) {
  store_products (
    store_key: $store_key
  ) {
    id
    description
    master_sku
    name
    product {
      id
      default_name
    }
    store {
      key
    }
    store_product_variants {
      id
    }
    use_defaults
  }
}`;

export const getDetailsQuery = `
query storeProducts (
  $store_key: String!
) {
  store_products (
    store_key: $store_key
  ) {
    id
    description
    master_sku
    name
    product {
      id
      default_name
    }
    store {
      key
    }
    store_product_variants {
      id
    }
    use_defaults
  }
}`;

export const createStoreProductMutation = `
mutation createStoreProduct(
  $store_key: String!, $product_id: ID!, $name: String,
  $description: String, $master_sku: String!, $use_defaults: Boolean
) {
  createStoreProduct (
    store_key: $store_key, product_id: $product_id, name: $name,
    description: $description, master_sku: $master_sku, use_defaults: $use_defaults
  ) {
    id
  }
}`;

export const updateStoreProductMutation = `
mutation updateStoreProduct(
  $id: ID!, $name: String, $description: String,
  $master_sku: String, $use_defaults: Boolean
) {
  updateStoreProduct (
    id: $id, name: $name, description: $description,
    master_sku: $master_sku, use_defaults: $use_defaults
  ) {
    id
  }
}`;

export const destroyStoreProductQuery = `
mutation destroyStoreProduct(
  $id: ID!
) {
  destroyStoreProduct(
    id: $id
  )
}`;

export default {
  getList: gql(getListQuery),
  getDetails: gql(getDetailsQuery),
  createStoreProduct: gql(createStoreProductMutation),
  updateStoreProduct: gql(updateStoreProductMutation),
  destroyStoreProduct: gql(destroyStoreProductQuery),
};
