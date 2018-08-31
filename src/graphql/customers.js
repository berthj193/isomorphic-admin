import gql from 'graphql-tag';

export const getListQuery = () => `
query {
  customers {
    given_name
    family_name
    auth0_id
    email

    addresses {
      line_one
      postcode
    }

    payment_sources {
      id
      last4
      brand
      payment_method
      created_at
      updated_at
    }

    created_at
    updated_at
  }
}
`;

export default {
  getList: () => gql(getListQuery()),
};
