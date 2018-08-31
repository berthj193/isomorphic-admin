import gql from 'graphql-tag';

export const getTaxonomies = gql`
  query getTaxonomies($store_key: String!) {
    taxonomies (store_key: $store_key) {
      id,
      name,
      parent {
        id
      }
      store {
        id
      }
    }
  }
`;

export const updateTaxonomy = gql`
  mutation updateTaxonomy(
    $id: ID!
    $name: String!
    $store_id: ID!
    $parent_id: ID
  ) {
    updateTaxonomy (
      id: $id
      name: $name
      store_id: $store_id
      parent_id: $parent_id
    ) {
      id,
      name,
      parent {
        id
      }
      store {
        id
      }
    }
  }
`;

export const createTaxonomy = gql`
mutation createTaxonomy(
    $name: String!
    $store_id: ID!
    $parent_id: ID
  ) {
    createTaxonomy (
      name: $name
      store_id: $store_id
      parent_id: $parent_id
    ) {
      id,
      name,
      parent {
        id
      }
      store {
        id
      }
    }
  }
`;

export const destroyTaxonomy = gql`
mutation destroyTaxonomy(
    $id: ID!
  ) {
    destroyTaxonomy (
      id: $id
    )
  }
`;
