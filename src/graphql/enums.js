import gql from 'graphql-tag';

export const getEnum = gql`
  query ($enumName: String!){
    __type(name: $enumName) {
      name
      enumValues {
        name
      }
    }
  }
`;
