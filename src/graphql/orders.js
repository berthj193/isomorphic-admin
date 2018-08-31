import gql from 'graphql-tag';

export const getList = gql`
query {
  orders {
    id
    customer {
      given_name
      family_name
    }
    grand_total {
      value
      currency
    }
    created_at
  }
}`;

export const getDetails = gql`query ($id: ID!) {
  orders(filter: {
    id: $id
  }) {
    id
    customer {
      given_name
      family_name
      email
    }
    store_key
    grand_total {
      value
      currency
    }
    item_total {
      value
      currency
    }
    shipping_total {
      value
      currency
    }
    item_discount_total {
      value
      currency
    }
    shipping_discount_total {
      value
      currency
    }
    currency
    shipping_address
    shipping_rate
    warehouse
  }
}`;

export const getListFor = gql`query ($auth0Id: String!) {
  orders(filter: {
    customer: {
      auth0Id: $auth0Id
    }
  }) {
    id
    customer {
      given_name
      family_name
      email
    }
    store_key
    grand_total {
      value
      currency
    }
    item_total {
      value
      currency
    }
    shipping_total {
      value
      currency
    }
    item_discount_total {
      value
      currency
    }
    shipping_discount_total {
      value
      currency
    }
    currency
    shipping_address
    shipping_rate
    warehouse
  }
}`;

export const placeOrder = gql`mutation placeOrder(
  $store_key: String!, $shipping_address_id: Int!, $shipping_rate_id: Int!,
  $line_items: String!, $currency: String!, $guest_email: String,
  $guest_given_name: String, $guest_family_name: String, $payment_token: String,
  $discount_code: String, $phone_number: String, $gdpr_optout: Boolean
) {
  placeOrder(
    store_key: $store_key,
    shipping_address_id: $shipping_address_id,
    shipping_rate_id: $shipping_rate_id,
    line_items: $line_items,
    guest_email: $guest_email,
    guest_given_name: $guest_given_name,
    guest_family_name: $guest_family_name,
    currency: $currency,
    payment_token: $payment_token,
    discount_code: $discount_code,
    phone_number: $phone_number,
    gdpr_optout: $gdpr_optout
  ) {
    job_id
    errors
  }
}`;

export const updateOrders = gql`mutation updateOrders(
  $ids: [Int]!
  $store_key: String!, $shipping_address_id: Int!, $shipping_rate_id: Int!,
  $line_items: String!, $currency: String!, $guest_email: String,
  $guest_given_name: String, $guest_family_name: String, $payment_token: String,
  $discount_code: String, $phone_number: String, $gdpr_optout: Boolean
) {
  updateOrders(
    ids: $ids,
    store_key: $store_key,
    shipping_address_id: $shipping_address_id,
    shipping_rate_id: $shipping_rate_id,
    line_items: $line_items,
    guest_email: $guest_email,
    guest_given_name: $guest_given_name,
    guest_family_name: $guest_family_name,
    currency: $currency,
    payment_token: $payment_token,
    discount_code: $discount_code,
    phone_number: $phone_number,
    gdpr_optout: $gdpr_optout
  ) {
    job_id
    errors
  }
}`;

export const createRefund = gql`mutation createRefund(
  $payment_id: ID!, $amount_pence: Int!
) {
  createRefund(
    payment_id: $payment_id,
    amount_pence: $amount_pence
) {
    id
  }
}`;
