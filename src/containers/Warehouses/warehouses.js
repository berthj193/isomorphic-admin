import React, { Component } from 'react';
import PropTypes from 'prop-types';
import columns from './columns';
import { getList, destroyWarehouse } from '../../graphql/warehouses';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import ItemList from '../../components/list/item-list';
import DeleteButton from '../../components/uielements/deleteButton';

export class Warehouses extends Component {
  static propTypes = {
    warehouses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        export_class: PropTypes.string,
        created_at: PropTypes.string,
        stores: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })),
        shipping_rates: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })),
      }),
    ),
    error: PropTypes.string,
    mutate: PropTypes.func,
  };

  static defaultProps = {
    warehouses: [],
  };

  dataSource = () => this.props.warehouses.map(
    warehouse => ({
      key: warehouse.id,
      id: warehouse.id,
      name: warehouse.name,
      export_class: warehouse.export_class,
      created_at: warehouse.created_at,
      stores: warehouse.stores.length,
      shipping_rates: warehouse.shipping_rates,
    })
  );

  deleteWarehouse = id => e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.mutate({
      mutation: destroyWarehouse,
      variables: {
        id,
      },
      messages: ['Warehouse removed successfully'],
    });
  };

  actionColumn = ({ id }) => (
    <ul className="table-action">
      <li>
        <DeleteButton
          tooltipText="Remove a warehouse"
          onConfirm={this.deleteWarehouse(id)}
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
        columns={this.columns}
        title="Warehouses"
        buttons={[{
          title: 'New warehouse',
          link: '/dashboard/warehouses/new',
        }]}
        loading={!this.props.warehouses && !this.props.error}
      />
    );
  }
}

export default withStoresManager(Warehouses, { query: getList });
