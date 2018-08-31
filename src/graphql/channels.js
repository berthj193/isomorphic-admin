import gql from 'graphql-tag';

export const getAutocompleteListQuery = `
query {
  channels {
    id,
    name,
  }
}`;

export default {
  getAutocompleteList: gql`${getAutocompleteListQuery}`,
};
