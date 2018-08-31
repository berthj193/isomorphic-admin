import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProductForm from './productForm';
import PageLoading from '../PageLoading/PageLoading';

import withStoresManager from '../../components/apolloProviders/withStoresManager';
import storeQueries from '../../graphql/stores';
import productQueries from '../../graphql/products';

import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';
import Error from '../../components/error/error';

export class EditProduct extends Component {
  static propTypes = {
    mutate: PropTypes.func,
    stores: PropTypes.arrayOf(PropTypes.object),
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        default_name: PropTypes.string,
        default_description: PropTypes.string,
        default_master_sku: PropTypes.string.isRequired,
      }),
    ),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    error: PropTypes.string,
  };

  static defaultProps = {
    products: [],
  };

  getProduct() {
    return this.props.products.find(({ id }) => id === this.props.match.params.id);
  }

  handleSubmit = ({ default_name, default_description, default_master_sku }) =>
    this.props.mutate({
      mutation: productQueries.updateProduct(),
      variables: {
        id: this.props.match.params.id,
        default_name,
        default_description,
        default_master_sku,
      },
      refetchQueries: [
        { query: productQueries.getProducts() },
      ],
      messages: ['Product updated successfully'],
    });

  render() {
    if (!this.props.error && !this.getProduct()) {
      return (<PageLoading style={{ height: '50vh' }} />);
    }

    const { id } = this.props.products[0];

    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Product</h1>
          <ButtonList buttons={[{ link: `/dashboard/products/${id}`, title: 'Go back' }]} />
          <ProductForm
            onSubmit={this.handleSubmit}
            stores={this.props.stores}
            initialValues={this.getProduct()}
          />
          <Error error={this.props.error} />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(EditProduct, ([
  {
    query: storeQueries.storesAutocomplete,
  },
  {
    query: productQueries.getProducts(),
  },
]));
