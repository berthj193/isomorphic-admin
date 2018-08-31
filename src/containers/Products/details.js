import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import productQueries from '../../graphql/products';
import PageLoading from '../PageLoading/PageLoading';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import DetailPage from '../../components/details/details';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';
import Error from '../../components/error/error';

export class ProductDetails extends React.Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      default_master_sku: PropTypes.string,
      default_name: PropTypes.string,
      defaultDescription: PropTypes.string,
    })),
    error: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    products: [],
  };

  getProductId() {
    return _get(this.props, 'match.params.id');
  }

  // Temporary solution. No way to get single product yet
  getProduct() {
    const productId = this.getProductId();
    return this.props.products.find(({ id }) => id === productId);
  }

  loadDetailList = () => {
    const {
      default_master_sku,
      default_name,
      default_description,
    } = this.getProduct();

    return [
      { Name: default_name },
      { Description: default_description },
      '---',
      { SKU: default_master_sku },
    ];
  };

  render() {
    if (!this.props.error && !this.getProduct()) {
      return (<PageLoading style={{ height: '50vh' }} />);
    }
    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Product</h1>
          <ButtonList
            buttons={[
              { link: '/dashboard/products', title: 'Go back' },
              { link: `/dashboard/products/${this.getProductId()}/edit`, title: 'Edit' },
            ]} />
          <DetailPage details={this.loadDetailList()} />
          <Error error={this.props.error} />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(ProductDetails, {
  query: productQueries.getProducts(),
} );
