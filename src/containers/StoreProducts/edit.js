import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';

import withStoresManager from '../../components/apolloProviders/withStoresManager';
import Form from './storeProductForm';

import storeProductQueries from '../../graphql/storeProducts';
import _omit from 'lodash/omit';

export class StoreProductEdit extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    store_products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      master_sku: PropTypes.string,
      product: PropTypes.shape({ name: PropTypes.string }),
      store: PropTypes.shape({ name: PropTypes.string }),
      store_product_variants: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
    })),
    match: PropTypes.shape({
      params: PropTypes.shape({
        store_key: PropTypes.string.isRequired,
      }),
    }),
  };

  static defaultProps = {
    store_products: [{}],
  };

  handleSubmit = values => {
    const { id } = this.props.store_products[0];
    this.props.mutate({
      mutation: storeProductQueries.updateStoreProduct,
      variables: {
        ...values,
        id: parseInt(id),
      },
      messages: ['Store product was updated successfully'],
    });
  };

  render() {
    const { id, ...storeProduct } = this.props.store_products[0];
    const initialValues = _omit(storeProduct, ['store', 'product', 'store_product_variants']);

    const { match: { params: { store_key } } } = this.props;
    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Store Products</h1>
          <ButtonList buttons={[{ link: `/dashboard/store_products/${store_key}/${id}`, title: 'Go back' }]} />
          <Form
            onSubmit={this.handleSubmit}
            initialValues={initialValues}
            edit
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(StoreProductEdit,
  ({ match: { params: { store_key } } }) => ({
    query: storeProductQueries.getDetails,
    variables: {
      store_key,
    },
  }),
);
