import gql from 'graphql-tag';

const storeReturnData = `
    id
    key
    options
    created_at
    channel {
      id
      name
    }
    warehouse {
      id
      name
    }
    legal_entity {
      id
      name
    }
`;

export const storesAutocompleteQuery = `
query {
  stores {
    id
    key
  }
}`;

export const storeListQuery = `
query {
  stores {
    ${storeReturnData}
  }
}`;

export const storeDetailsQuery = `
query stores (
  $store_key: String!
) {
  stores(
    store_key: $store_key
  ) {
    ${storeReturnData}
  }
}`;

export const createStoreQuery = `
  mutation createStore(
    $key: String!
    $options: JsonType!
    $legal_entity_id: ID!
    $warehouse_id: ID!
    $channel_id: ID!
  ) {
    createStore(
      key: $key
      options: $options
      legal_entity_id: $legal_entity_id
      warehouse_id: $warehouse_id
      channel_id: $channel_id
    )
    {
      ${storeReturnData}
    }
  }
`;

export const updateStoreQuery = `
  mutation updateStore(
    $id: ID!
    $key: String!
    $options: JsonType!
    $legal_entity_id: ID!
    $warehouse_id: ID!
    $channel_id: ID!
  ) {
    updateStore(
      id: $id
      key: $key
      options: $options
      legal_entity_id: $legal_entity_id
      warehouse_id: $warehouse_id
      channel_id: $channel_id
    )
    {
      ${storeReturnData}
    }
  }
`;

export const destroyStoreQuery = `
mutation destroyStore (
  $id: ID!
) {
  destroyStore (
    id: $id
  )
}`;

export default {
  getDetails: gql`${storeDetailsQuery}`,
  getList: gql`${storeListQuery}`,
  createStore: gql`${createStoreQuery}`,
  updateStore: gql`${updateStoreQuery}`,
  destoryStore: gql`${destroyStoreQuery}`,
  storesAutocomplete: gql`${storesAutocompleteQuery}`,
};
