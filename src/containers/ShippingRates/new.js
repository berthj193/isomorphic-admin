import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ShippingRateForm from './shippingRateForm';

import withStoresManager from '../../components/apolloProviders/withStoresManager';

import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';

import { createShippingRate, getList } from '../../graphql/shippingRates';

export class NewShippingRate extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  };

  handleSubmit = values => {
    this.props.mutate({
      mutation: createShippingRate,
      variables: {
        ...values,
        price_pence: parseInt(values.price_pence, 0),
        min_items: parseInt(values.min_items, 0),
        max_items: parseInt(values.max_items, 0),
      },
      refetchQueries: [
        { query: getList },
      ],
      messages: ['Shipping rate was added successfully'],
    });
  };

  render() {
    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Shipping rates</h1>
          <ButtonList buttons={[{ link: '/dashboard/shipping_rates', title: 'Go back' }]} />
          <ShippingRateForm
            onSubmit={this.handleSubmit}
            resetOnSuccess
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(NewShippingRate);
