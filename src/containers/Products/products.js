import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import columns from './columns';
import { Icon, Tooltip } from 'antd';
import ItemList from '../../components/list/item-list';
import productQueries from '../../graphql/products';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import DeleteButton from '../../components/uielements/deleteButton';

export class Products extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      default_name: PropTypes.string,
      default_description: PropTypes.string,
      default_master_sku: PropTypes.string,
      stores: PropTypes.arrayOf(PropTypes.object),
    })),
    error: PropTypes.string,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    mutate: PropTypes.func,
  };

  static defaultProps = {
    products: [],
  };

  constructor() {
    super();
    autoBind(this);
  }

  dataSource() {
    return this.props.products.map(product => ({
      key: product.id,
      id: product.id,
      name: product.default_name,
      description: product.default_description,
      sku: product.default_master_sku,
      stores_count: product.stores.length,
    }));
  }

  editProductVariants = id => e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.history.push(`/dashboard/product_variants/${id}`);
  };

  deleteProduct = id => e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.mutate({
      mutation: productQueries.destroyProduct,
      variables: {
        id,
      },
      messages: ['Product has been removed successfully'],
    });
  };

  actionColumn = ({ id }) => (
    <ul className="table-action">
      <li>
        <Tooltip title="Edit product variants">
          <a onClick={this.editProductVariants(id)}><Icon type="tags-o" /></a>
        </Tooltip>
        <DeleteButton
          onConfirm={this.deleteProduct(id)}
          tooltipText="Remove a product"
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
        title="Products"
        columns={this.columns}
        buttons={[{
          title: 'New product',
          link: '/dashboard/products/new',
        }]}
      />
    );
  }
}

export default withStoresManager(Products,
  {
    query: productQueries.getProducts(),
  }
);
