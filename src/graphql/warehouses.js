import gql from 'graphql-tag';

// Currently there is an error with shipping_rates. After resolving the issue, include code below in warehouses query:
// shipping_rates {
//   id
//   name
//   country
//   currency
//   price_pence
// }
// options {
//   key
//   value
// }
export const getList = gql`
query {
  warehouses {
    id
  	name
    export_class
    created_at
    stores {
      id
    }
  }
}`;

export const getDetails = gql`
query getDetails($id: ID!){
  warehouses (id: $id) {
    id
  	name
    export_class
    created_at
    updated_at
    stores {
      id
      key
    }
  }
}`;

export const createWarehouse = gql`mutation createWarehouse(
  $name: String!, $export_class: String!
) {
  createWarehouse(
    name: $name,
    export_class: $export_class
  ) {
    id
  }
}`;

export const destroyWarehouse = gql`mutation destroyWarehouse(
  $id: ID!
) {
  destroyWarehouse(
    id: $id
  )
}`;

export const updateWarehouse = gql`mutation updateWarehouse(
  $id: ID!, $name: String!, $export_class: String!
) {
  updateWarehouse(
    id: $id,
    name: $name,
    export_class: $export_class
  ) {
    id
  }
}`;

export const getAutocompleteList = gql`query {
  warehouses {
    id
    name
  }
}`;
