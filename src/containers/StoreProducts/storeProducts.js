import React, { Component } from 'react';
import PropTypes from 'prop-types';
import columns from './columns';
import storeProductQueries from '../../graphql/storeProducts';
import storeQueries from '../../graphql/stores';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import ItemList from '../../components/list/item-list';
import Select, { SelectOption } from '../../components/uielements/select';
import { isEqual } from 'lodash';

import Details from './details';
import DeleteButton from '../../components/uielements/deleteButton';

export class StoreProducts extends Component {
  static propTypes = {
    store_products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        master_sku: PropTypes.string,
        product: PropTypes.shape({ name: PropTypes.string }),
        store: PropTypes.shape({ name: PropTypes.string }),
        store_products: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
        })),
      }),
    ),
    stores: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      key: PropTypes.string,
    })),
    error: PropTypes.string,
    query: PropTypes.func.isRequired,
    mutate: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  static defaultProps = {
    store_products: [],
    stores: [],
  };

  state = {
    storeSelectValue: '',
  };

  componentDidUpdate(prevProps) {
    const { stores } = this.props;
    if (!isEqual(stores, prevProps.stores) && stores.length) {
      this.setState({
        storeSelectValue: stores[0].key,
      }, () => {
        this.loadStoreProducts(stores[0].key);
      });
    }
  }

  dataSource = () =>
    this.props.store_products.map(({
      id, name, master_sku,
      product = {}, store = {}, store_product_variants = [],
    }) => ({
      key: id,
      id,
      name,
      master_sku,
      product: product.default_name,
      store: store.key,
      product_variants: store_product_variants
        .map(productVariant => productVariant.name).join(', '),
    }));

  editStoreProductVariants = id => e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.history.push(`/dashboard/store_product_variants/${this.state.storeSelectValue}/${id}`);
  };

  loadStoreProducts = store_key => {
    this.setState({
      storeSelectValue: store_key,
    });
    return this.props.query({
      query: storeProductQueries.getList,
      variables: {
        store_key,
      },
    });
  };

  storeSelect = () =>
    <form>
      <Select
        label="Select store"
        onChange={this.loadStoreProducts}
        value={this.state.storeSelectValue}
      >
        {this.props.stores.map(store =>
          <SelectOption value={store.key} key={store.key}>{store.key}</SelectOption>
        )}
      </Select>
    </form>;

  detailPath = ({ pathname, record }) =>
    `${pathname}/${this.state.storeSelectValue}/${record.id}`;

  deleteStoreProduct = id => e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.mutate({
      mutation: storeProductQueries.destroyStoreProduct,
      variables: {
        id,
      },
      messages: ['Store product has been removed successfully'],
    });
  };

  actionColumn = ({ id }) => (
    <ul className="table-action">
      <li>
        <DeleteButton
          tooltipText="Remove a store product"
          onClick={this.deleteStoreProduct(id)}
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
        title="Store Products"
        columns={this.columns}
        detailsComponent={Details}
        filterComponent={this.storeSelect()}
        buttons={[{
          title: 'New form',
          link: '/dashboard/store_products/new',
        }]}
        detailPath={this.detailPath}
      />
    );
  }
}

export default withStoresManager(StoreProducts,
  {
    query: storeQueries.storesAutocomplete,
  },
);
