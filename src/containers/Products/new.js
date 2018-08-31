import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProductForm from './productForm';

import withStoresManager from '../../components/apolloProviders/withStoresManager';
import storeQueries from '../../graphql/stores';
import productQueries from '../../graphql/products';

import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';
import Error from '../../components/error/error';

export class NewProduct extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    stores: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
  };

  handleSubmit = ({ default_name, default_description, default_master_sku }) =>
    this.props.mutate({
      mutation: productQueries.createProduct(),
      variables: {
        default_name,
        default_description,
        default_master_sku,
      },
      refetchQueries: [
        { query: productQueries.getProducts() },
      ],
      messages: ['Product created successfully'],
    });

  render() {
    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Product</h1>
          <ButtonList buttons={[{ link: '/dashboard/products', title: 'Go back' }]} />
          <ProductForm
            onSubmit={this.handleSubmit}
            stores={this.props.stores}
            resetOnSuccess
          />
          <Error error={this.props.error} />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(NewProduct, {
  query: storeQueries.storesAutocomplete,
});
