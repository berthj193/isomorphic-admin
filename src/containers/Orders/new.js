import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OrderForm from './orderForm';

import withOrdersManager from '../../components/apolloProviders/withOrdersManager';

import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';

import { placeOrder } from '../../graphql/orders';

export class NewOrder extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  };

  handleSubmit = values => {
    const { shipping_address_id, shipping_rate_id, line_items } = values;

    this.props.mutate({
      mutation: placeOrder,
      variables: {
        ...values,
        shipping_address_id: parseInt(shipping_address_id, 0),
        shipping_rate_id: parseInt(shipping_rate_id, 0),
        line_items: JSON.stringify(line_items),
      },
      messaages: ['Order added successfully'],
    });
  };

  render() {
    const initialValues = {
      currency: 'GBP',
    };

    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Orders</h1>
          <ButtonList buttons={[{ link: '/dashboard/orders', title: 'Go back' }]} />
          <OrderForm
            onSubmit={this.handleSubmit}
            initialValues={initialValues}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withOrdersManager(NewOrder);
