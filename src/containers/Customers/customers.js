import React, { Component } from 'react';
import PropTypes from 'prop-types';
import columns from './columns';
import customersQueries from '../../graphql/customers';
import ItemList from '../../components/list/item-list';
import withOrdersManager from '../../components/apolloProviders/withOrdersManager';

export class Customers extends Component {
  static propTypes = {
    customers: PropTypes.arrayOf(
      PropTypes.shape({
        auth0_id: PropTypes.string,
        given_name: PropTypes.string,
        family_name: PropTypes.string,
        email: PropTypes.string,
      }),
    ),
    error: PropTypes.string,
  };

  static defaultProps = {
    customers: [],
  };

  dataSource() {
    return this.props.customers
      .map(customer => ({
        key: customer.auth0_id,
        id: customer.auth0_id,
        name: `${customer.given_name} ${customer.family_name}`,
        email: customer.email,
      }));
  }

  render() {
    return (
      <ItemList
        data={this.dataSource()}
        error={this.props.error}
        title="Customers"
        columns={columns}
      />
    );
  }
}

export default withOrdersManager(Customers, {
  query: customersQueries.getList(),
});
