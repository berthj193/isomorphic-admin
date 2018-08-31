import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from './storeProductForm';

import withStoresManager from '../../components/apolloProviders/withStoresManager';

import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';

import storeProductQueries from '../../graphql/storeProducts';

export class NewStoreProduct extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  };

  handleSubmit = values => {
    this.props.mutate({
      mutation: storeProductQueries.createStoreProduct,
      variables: {
        ...values,
      },
      messages: ['Store product was added successfully'],
    });
  };

  render() {
    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Store Products</h1>
          <ButtonList buttons={[{ link: '/dashboard/store_products', title: 'Go back' }]} />
          <Form
            onSubmit={this.handleSubmit}
            initialValues={{
              use_defaults: true,
            }}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(NewStoreProduct);
