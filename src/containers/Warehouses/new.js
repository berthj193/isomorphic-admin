import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WarehouseForm from './warehouseForm';

import withStoresManager from '../../components/apolloProviders/withStoresManager';

import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';

import { createWarehouse, getList } from '../../graphql/warehouses';

export class NewWarehouse extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  };

  handleSubmit = values => {
    this.props.mutate({
      mutation: createWarehouse,
      variables: {
        ...values,
      },
      refetchQueries: [{
        query: getList,
      }],
      messages: ['Warehouse added successfully'],
    });
  };

  render() {
    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Warehouses</h1>
          <ButtonList buttons={[{ link: '/dashboard/warehouses', title: 'Go back' }]} />
          <WarehouseForm
            onSubmit={this.handleSubmit}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(NewWarehouse);
