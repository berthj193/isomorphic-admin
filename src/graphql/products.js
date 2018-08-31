import gql from 'graphql-tag';

export const getListQuery = () => `
query {
  products {
    id
    default_name
    default_description
    default_master_sku
    stores {
      key
    }
    store_products {
      master_sku
    }
    product_variants {
      default_sku
    }
  }
}`;

export const getDetailsQuery = id => `
query {
  products( filter: {
    id: ${id}
  }) {
    default_name
    default_description
    default_master_sku
    stores {
      key
    }
    store_products {
      master_sku
    }
    product_variants {
      default_sku
    }
  }
}`;

export const getAutocompleteQuery = `
query {
  products {
    id
    default_name
  }
}`;

export const getCreateQuery = () => `
  mutation createProduct(
    $default_name: String
    $default_description: String
    $default_master_sku: String!
    $store_keys: [String]
  ) {
    createProduct(
      default_name: $default_name
      default_description: $default_description
      default_master_sku: $default_master_sku
      store_keys: $store_keys
    )
    {
      id
      default_name
      default_description
      default_master_sku
      stores {
        key
      }
      store_products {
        master_sku
      }
      product_variants {
        default_sku
      }
    }
  }
`;

export const getUpdateQuery = () => `
mutation updateProduct(
  $id: ID!
  $default_name: String
  $default_description: String
  $default_master_sku: String!
) {
  updateProduct(
    id: $id
    default_name: $default_name
    default_description: $default_description
    default_master_sku: $default_master_sku
  )
  {
    id
    default_name
    default_description
    default_master_sku
    stores {
      key
    }
    store_products {
      master_sku
    }
    product_variants {
      default_sku
    }
  }
}`;

export const destroyProductQuery = `
mutation destroyProduct(
  $id:ID!
) {
  destroyProduct(id:$id)
}`;

export default {
  getProducts: () => gql(getListQuery()),
  getProduct: id => gql(getDetailsQuery(id)),
  createProduct: () => gql(getCreateQuery()),
  updateProduct: () => gql(getUpdateQuery()),
  productsAutocomplete: gql(getAutocompleteQuery),
  destroyProduct: gql(destroyProductQuery),
};
