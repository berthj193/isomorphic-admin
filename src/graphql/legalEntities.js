import gql from 'graphql-tag';

export const getList = gql`
query {
  legal_entities {
    id
    name
    stores {
      id
      key
    }
    vat_number
    created_at
  }
}`;

export const getAutocompleteList = gql`
query {
  legal_entities {
    id
    name
  }
}`;

export const createLegalEntity = gql`mutation createLegalEntity(
  $name: String!, $vat_number: String
) {
  createLegalEntity(
    name: $name,
    vat_number: $vat_number
  ) {
    id
  }
}`;

export const destroyLegalEntity = gql`mutation destroyLegalEntity(
  $id: ID!
) {
  destroyLegalEntity(
    id: $id
  )
}`;

export const updateLegalEntity = gql`mutation updateLegalEntity(
  $id: ID!, $name: String, $vat_number: String
) {
  updateLegalEntity(
    id: $id,
    name: $name,
    vat_number: $vat_number
  ) {
    id
  }
}`;
