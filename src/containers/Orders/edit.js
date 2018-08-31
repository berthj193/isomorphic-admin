import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OrderForm from './orderForm';

import withOrdersManager from '../../components/apolloProviders/withOrdersManager';

import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';

import { getDetails, updateOrders } from '../../graphql/orders';

export class EditOrder extends Component {
  static propTypes = {
    mutate: PropTypes.func,
    orders: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    orders: [{}],
  };

  handleSubmit = values => {
    const { shipping_address_id, shipping_rate_id } = values;

    this.props.mutate({
      mutation: updateOrders,
      variables: {
        ...values,
        ids: [this.props.orders[0].id],
        shipping_address_id: parseInt(shipping_address_id, 0),
        shipping_rate_id: parseInt(shipping_rate_id, 0),
      },
      messages: ['Order modified successfully'],
    });
  };

  render() {
    const order = this.props.orders[0];
    const {
      customer: {
        email: guest_email,
        given_name: guest_given_name,
        family_name: guest_family_name,
        phone_number,
      } = {},
      shipping_address: {
        id: shipping_address_id,
      } = {},
      shipping_rate: {
        id: shipping_rate_id,
      } = {},
    } = order;

    const orders = {
      ...order,
      guest_email,
      guest_given_name,
      guest_family_name,
      phone_number,
      shipping_address_id,
      shipping_rate_id,
    };

    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Orders</h1>
          <ButtonList buttons={[{ link: `/dashboard/orders/${order.id}`, title: 'Go back' }]} />
          <OrderForm
            onSubmit={this.handleSubmit}
            initialValues={orders}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withOrdersManager(EditOrder,
  ({ match: { params: { key } } }) => ({
    query: getDetails,
    variables: {
      id: key,
    },
  }),
);
