import React from 'react';
import PropTypes from 'prop-types';
import withStoresManager from '../apolloProviders/withStoresManager';
import productVariantQueries from '../../graphql/productVariants';
import Select, { SelectOption } from '../uielements/select';

export class ProductVariantAutocomplete extends React.Component {
  static propTypes = {
    product_variants: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      default_sku: PropTypes.string,
    })),
  };

  static defaultProps = {
    product_variants: [],
  };

  dataSource = (this.props.product_variants || []).map(({ id, default_sku }) =>
    <SelectOption value={id} key={id}>{`${default_sku}`}</SelectOption>);

  render() {
    return (
      <Select
        showSearch
        {...this.props}
      >
        {this.dataSource}
      </Select>
    );
  }
}

export default withStoresManager(ProductVariantAutocomplete, [
  {
    query: productVariantQueries.productVariantAutocomplete,
  },
]);
