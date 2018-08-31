import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import columns from './columns';
import storeQueries from '../../graphql/stores';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import ItemList from '../../components/list/item-list';

import Details from './details';
import DeleteButton from '../../components/uielements/deleteButton';

export class Stores extends Component {
  static propTypes = {
    stores: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        warehouse: PropTypes.shape({ name: PropTypes.string }),
        company: PropTypes.shape({ name: PropTypes.string }),
        channel: PropTypes.shape({ name: PropTypes.string }),
        store_products: PropTypes.arrayOf(PropTypes.object),
        created_at: PropTypes.string,
      }),
    ),
    error: PropTypes.string,
    mutate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    stores: [],
  };


  constructor() {
    super();
    autoBind(this);
  }

  dataSource() {
    return this.props.stores.map(({
      id, key, created_at, store_products = [],
      warehouse = {}, company = {}, channel = {},
    }) => ({
      key,
      id,
      warehouse_name: warehouse.name,
      company_name: company.name,
      channel_name: channel.name,
      created_at,
      products_count: store_products.length,
    }));
  }

  detailsPath = ({ pathname, record: { key } }) =>
    `${pathname}/${key}`;

  deleteStore = id => e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.mutate({
      mutation: storeQueries.destoryStore,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: storeQueries.getList,
        },
      ],
      messages: ['Store has been removed successfully'],
    });
  };

  actionColumn = ({ id }) => (
    <ul className="table-action">
      <li>
        <DeleteButton
          tooltipText="Remove a store"
          onConfirm={this.deleteStore(id)}
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
        title="Stores"
        columns={this.columns}
        detailsComponent={Details}
        buttons={[{
          title: 'New form',
          link: '/dashboard/stores/new',
        }]}
        detailsPath={this.detailsPath}
      />
    );
  }
}

export default withStoresManager(Stores,
  {
    query: storeQueries.getList,
  }
);
