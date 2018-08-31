import React from 'react';
import PropTypes from 'prop-types';
import withStoresManager from '../apolloProviders/withStoresManager';
import { getAutocompleteList as getWarehouseAutocompleteList } from '../../graphql/warehouses';
import Select, { SelectOption } from '../uielements/select';

export class WarehouseAutocomplete extends React.Component {
  static propTypes = {
    warehouses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })),
  };

  static defaultProps = {
    warehouses: [],
  };

  dataSource = (this.props.warehouses || []).map(({ id, name }) =>
    <SelectOption value={id} key={id}>{`${name}`}</SelectOption>);

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

export default withStoresManager(WarehouseAutocomplete, [
  {
    query: getWarehouseAutocompleteList,
  },
]);
