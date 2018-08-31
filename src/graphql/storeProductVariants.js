import gql from 'graphql-tag';

export const getListQuery = `
query storeProductVariants (
  $store_key: String!
) {
  store_product_variants (
    store_key: $store_key
  ) {
    id
    currency
    options
    price_pence
    product_variant {
      id
      default_sku
    }
    sku
    use_defaults
  }
}`;

export const createStoreProductVariantMutation = `
mutation createStoreProductVariant (
  $store_product_id:ID!, $product_variant_id:ID!,
  $sku:String, $options:JsonType, $currency:Currency!,
  $price_pence:Int!, $use_defaults: Boolean
) {
  createStoreProductVariant (
    store_product_id: $store_product_id,
    product_variant_id:$product_variant_id,
  	sku:$sku,
    options:$options,
    currency:$currency,
  	price_pence:$price_pence,
    use_defaults:$use_defaults
  ) {
    id
  }
}`;

export const updateStoreProductVariantMutation = `
mutation updateStoreProductVariant (
  $id:ID!, $sku:String, $options:JsonType,
  $currency:Currency, $price_pence:Int,
  $use_defaults: Boolean
) {
  updateStoreProductVariant (
    id: $id,
  	sku:$sku,
    options:$options,
    currency:$currency,
  	price_pence:$price_pence,
    use_defaults:$use_defaults
  ) {
    id
  }
}`;

export const destroyStoreProductVariantQuery = `
mutation destroyStoreProductVariant (
  $id: ID!
) {
  destroyStoreProductVariant (
    id: $id
  )
}`;

export default {
  getList: gql(getListQuery),
  createStoreProductVariant: gql(createStoreProductVariantMutation),
  updateStoreProductVariant: gql(updateStoreProductVariantMutation),
  destroyStoreProductVariant: gql(destroyStoreProductVariantQuery),
};
