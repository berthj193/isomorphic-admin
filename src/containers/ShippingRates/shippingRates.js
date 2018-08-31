import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import ItemList from '../../components/list/item-list';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import Edit from './edit';
import Icon from '../../components/uielements/icon';

import columns from './columns';
import { getList, destroyShippingRate } from '../../graphql/shippingRates';
import DeleteButton from '../../components/uielements/deleteButton';

export class ShippingRates extends Component {
  static propTypes = {
    shipping_rates: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      country: PropTypes.string,
      name: PropTypes.string,
      premium: PropTypes.bool,
      live: PropTypes.bool,
      created_at: PropTypes.string,
    })),
    error: PropTypes.string,
    mutate: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
  };

  static defaultProps = {
    shipping_rates: [],
  };

  dataSource() {
    return map(this.props.shipping_rates, rate => ({
      key: rate.id,
      id: rate.id,
      country: rate.country,
      name: rate.name,
      premium: <Icon type={rate.premium ? 'check' : 'close'} />,
      live: <Icon type={rate.live ? 'check' : 'close'} />,
      created_at: rate.created_at,
    }));
  }

  deleteShippingRate = id => e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.mutate({
      mutation: destroyShippingRate,
      variables: {
        id,
      },
      messages: ['Legal entity removed successfully'],
    });
  };

  actionColumn = ({ id }) => (
    <ul className="table-action">
      <li>
        <DeleteButton
          tooltipText="Delete shipping rate"
          onConfirm={this.deleteShippingRate(id)}
        />
      </li>
    </ul>
  );

  columns = [
    ...columns,
    {
      title: 'Action',
      dataIndex: '',
      key: 'a',
      render: this.actionColumn,
    },
  ];

  render() {
    return (
      <ItemList
        data={this.dataSource()}
        error={this.props.error}
        title="Shipping rates"
        columns={this.columns}
        detailsComponent={Edit}
        onModalClose={this.onModalClose}
        detailsProps={{ onSubmit: this.handleRefund }}
        buttons={[{
          title: 'New shipping rate',
          link: '/dashboard/shipping_rates/new',
        }]}
        loading={!this.props.shipping_rates && !this.props.error}
      />
    );
  }
}

export default withStoresManager(ShippingRates, { query: getList });
