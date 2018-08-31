import React from 'react';
import PropTypes from 'prop-types';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';
import withOrdersManager from '../../components/apolloProviders/withOrdersManager';
import RefundForm from './refundForm';
import { createRefund } from '../../graphql/orders';

export class CreateRefund extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    mutate: PropTypes.func.isRequired,
    orders: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    orders: [{}],
  };

  handleSubmit = values => {
    const { payment_id, amount_pence } = values;
    this.props.mutate({
      mutation: createRefund,
      variables: {
        payment_id,
        amount_pence: parseInt(amount_pence, 0),
      },
      messages: ['Refund added successfully'],
    });
  };

  render() {
    const order = this.props.orders[0];

    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Orders</h1>
          <ButtonList buttons={[{ link: `/dashboard/orders/${order.id}`, title: 'Go back' }]} />
          <RefundForm
            onSubmit={this.handleSubmit}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withOrdersManager(CreateRefund);
