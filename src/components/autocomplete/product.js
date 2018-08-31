import React from 'react';
import PropTypes from 'prop-types';
import withStoresManager from '../apolloProviders/withStoresManager';
import productQueries from '../../graphql/products';
import Select, { SelectOption } from '../uielements/select';

export class ProductAutocomplete extends React.Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      default_name: PropTypes.string,
    })),
  };

  static defaultProps = {
    products: [],
  };

  dataSource = (this.props.products || []).map(({ id, default_name }) =>
    <SelectOption value={id} key={id}>{`${default_name}`}</SelectOption>);

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

export default withStoresManager(ProductAutocomplete, [
  {
    query: productQueries.productsAutocomplete,
  }]);
