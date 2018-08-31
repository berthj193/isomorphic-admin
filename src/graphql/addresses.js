import gql from 'graphql-tag';

export const getAutocompleteListQuery = `
query {
  addresses {
    id,
    given_name,
    family_name,
    line_one,
    city,
  }
}`;

export default {
  getAutocompleteList: gql`${getAutocompleteListQuery}`,
};
