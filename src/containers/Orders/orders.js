import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemList from '../../components/list/item-list';
import withOrdersManager from '../../components/apolloProviders/withOrdersManager';
import { toListItem } from '../../mappers/order';

import columns from './columns';
import { getList } from '../../graphql/orders';

export class Orders extends Component {
  static propTypes = {
    orders: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
    mutate: PropTypes.func.isRequired,
  };

  dataSource() {
    return toListItem(this.props.orders);
  }

  render() {
    return (
      <ItemList
        data={this.dataSource()}
        error={this.props.error}
        title="Orders"
        columns={columns}
        buttons={[{
          title: 'New form',
          link: '/dashboard/orders/new',
        }]}
        loading={!this.props.orders && !this.props.error}
      />
    );
  }
}

export default withOrdersManager(Orders, { query: getList });
