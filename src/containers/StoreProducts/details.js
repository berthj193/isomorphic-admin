import React from 'react';
import PropTypes from 'prop-types';
import storeProductQueries from '../../graphql/storeProducts';
import PageLoading from '../PageLoading/PageLoading';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import DetailPage from '../../components/details/details';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';

export class StoreProductDetails extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    store_products: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
    match: PropTypes.object,
  };

  static defaultProps = {
    store_products: [{}],
  };

  loadDetailList = () => {
    const {
      name, master_sku, description,
      product: { default_name: product } = {},
      store: { key: store } = {},
      product_variants = [],
    } = this.props.store_products[0] || {};

    return [
      { Name: name },
      { 'Master SKU': master_sku },
      '---',
      { Product: product },
      { Store: store },
      '---',
      { Description: description },
      { 'Product variants': product_variants.map(({ name }) => name).join(', ') },
    ];
  };

  render() {
    if (!this.props.error && !this.props.store_products[0].id) {
      return (<PageLoading style={{ height: '50vh' }} />);
    }

    const { match: { params: { store_key, id } } } = this.props;

    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Store Products</h1>
          <ButtonList
            buttons={[
              { link: '/dashboard/store_products', title: 'Go back' },
              { link: `/dashboard/store_products/${store_key}/${id}/edit`, title: 'Edit' },
            ]} />
          <DetailPage details={this.loadDetailList()} />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(StoreProductDetails,
  ({ match: { params: { store_key } } }) => ({
    query: storeProductQueries.getDetails,
    variables: {
      store_key,
    },
  }),
);
