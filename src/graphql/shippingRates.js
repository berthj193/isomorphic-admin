import gql from 'graphql-tag';

export const getList = gql`query shipping_rates{
  shipping_rates {
    id
    country
    name
    premium
    live
    created_at
  }
}`;

export const getDetails = gql`query shipping_rate(
  $id: ID, $cart_item_count: Int, $country: Country
) {
  shipping_rates(
    id: $id,
    cart_item_count: $cart_item_count,
    country: $country
  ) {
    id
    country
    name
    premium
    live
    created_at
    min_items
    max_items
    shipping_code
    updated_at
    currency
    price_pence
    warehouse {
      id
    }
  }
}`;

export const destroyShippingRate = gql`mutation destroyShippingRate(
  $id: ID!
) {
  destroyShippingRate(
    id: $id
  )
}`;

export const createShippingRate = gql`mutation createShippingRate(
  $warehouse_id: ID!, $country: Country!, $name: String!,
  $live: Boolean, $min_items: Int, $max_items: Int,
  $premium: Boolean, $currency: Currency!, $price_pence: Int!,
  $shipping_code: String!
) {
  createShippingRate(
    warehouse_id: $warehouse_id,
    country: $country,
    live: $live,
    max_items: $max_items,
    min_items: $min_items,
    name: $name,
    premium: $premium,
    currency: $currency,
    price_pence: $price_pence
    shipping_code: $shipping_code
  ) {
    id
  }
}`;

export const updateShippingRate = gql`mutation updateShippingRate(
  $id: ID!, $warehouse_id: ID, $country: Country, $name: String,
  $live: Boolean, $min_items: Int, $max_items: Int,
  $premium: Boolean, $currency: Currency, $price_pence: Int,
  $shipping_code: String
) {
  updateShippingRate(
    id: $id,
    warehouse_id: $warehouse_id,
    country: $country,
    live: $live,
    max_items: $max_items,
    min_items: $min_items,
    name: $name,
    premium: $premium,
    currency: $currency,
    price_pence: $price_pence
    shipping_code: $shipping_code
  ) {
    id
  }
}`;

export const getAutocompleteList = gql`query {
  shipping_rates {
    id
    country
    name
  }
}`;
