import gql from 'graphql-tag';

export const getListQuery = `
query {
  product_variants {
    id
    default_sku
    default_options
    product {
      id
      default_master_sku
    }
    store_product_variants {
      id
      sku
    }
  }
}`;

export const createProductVariantQuery = `
mutation createProductVariant(
  $default_sku:String!, $default_options:JsonType!,
  $product_id:ID!
) {
  createProductVariant(
    default_sku: $default_sku
    default_options: $default_options
    product_id: $product_id
  ) {
    id
  }
}`;

export const productVariantAutocompleteQuery = `
query {
  product_variants {
    id
    default_sku
  }
}`;

export const updateProductVariantQuery = `
mutation updateProductVariant(
  $default_sku:String!, $default_options:JsonType!,
  $id:ID!
) {
  updateProductVariant(
    default_sku: $default_sku
    default_options: $default_options
    id: $id
  ) {
    id
  }
}`;

export const destroyProductVariantQuery = `
mutation destroyProductVariant (
  $id: ID!
) {
  destroyProductVariant (
    id: $id
  )
}`;

export default {
  getList: gql`${getListQuery}`,
  createProductVariant: gql`${createProductVariantQuery}`,
  updateProductVariant: gql`${updateProductVariantQuery}`,
  destroyProductVariant: gql`${destroyProductVariantQuery}`,
  productVariantAutocomplete: gql`${productVariantAutocompleteQuery}`,
};
