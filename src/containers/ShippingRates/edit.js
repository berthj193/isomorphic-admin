import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';
import PageLoading from '../PageLoading/PageLoading';

import withStoresManager from '../../components/apolloProviders/withStoresManager';
import ShippingRateForm from './shippingRateForm';

import { getList, getDetails, updateShippingRate } from '../../graphql/shippingRates';

export class ShippingRateEdit extends Component {
  static propTypes = {
    mutate: PropTypes.func,
    shipping_rates: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      country: PropTypes.string,
      name: PropTypes.string,
      premium: PropTypes.bool,
      live: PropTypes.bool,
      created_at: PropTypes.string,
      warehouse: PropTypes.shape({
        id: PropTypes.string,
      }),
    })),
  };

  static defaultProps = {
    shipping_rates: [],
  };


  getShippingRate() {
    return this.props.shipping_rates[0];
  }

  handleSubmit = values => {
    this.props.mutate({
      mutation: updateShippingRate,
      variables: {
        ...values,
        price_pence: parseInt(values.price_pence, 0),
        min_items: parseInt(values.min_items, 0),
        max_items: parseInt(values.max_items, 0),
      },
      refetchQueries: [
        { query: getList },
      ],
      messages: ['Shipping rate updated successfully'],
    });
  };

  getInitialValues() {
    const { warehouse, live, premium, ...rest } = this.props.shipping_rates[0];
    return {
      ...rest,
      warehouse_id: warehouse && warehouse.id,
      live: live || false,
      premium: premium || false,
    };
  }

  render() {
    const shippingRate = this.getShippingRate();
    if (!shippingRate) {
      return (<PageLoading style={{ height: '50vh' }} />);
    }
    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Shipping rates</h1>
          <ButtonList buttons={[{ link: `/dashboard/shipping_rates/${shippingRate.id}`, title: 'Go back' }]} />
          <ShippingRateForm
            onSubmit={this.handleSubmit}
            initialValues={this.getInitialValues()}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(ShippingRateEdit,
  props => ({
    query: getDetails,
    variables: {
      id: props.match.params.id,
    },
  })
);
