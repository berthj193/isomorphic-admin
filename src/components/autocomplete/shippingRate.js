import React from 'react';
import PropTypes from 'prop-types';
import withStoresManager from '../apolloProviders/withStoresManager';
import { getAutocompleteList as shippingRateAutocompleteList } from '../../graphql/shippingRates';
import Select, { SelectOption } from '../uielements/select';

export class ShippingRateAutocomplete extends React.Component {
  static propTypes = {
    shipping_rates: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })),
  };

  static defaultProps = {
    shipping_rates: [],
  };

  dataSource = (this.props.shipping_rates || [])
    .map(({ id, name }) =>
      <SelectOption value={id} key={id}>{`${name}`}</SelectOption>
    );

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

export default withStoresManager(ShippingRateAutocomplete,
  [{
    query: shippingRateAutocompleteList,
  }]);
