import React from 'react';
import PropTypes from 'prop-types';
import withStoresManager from '../apolloProviders/withStoresManager';
import storeQueries from '../../graphql/stores';
import Select, { SelectOption } from '../uielements/select';

export class StoreAutocomplete extends React.Component {
  static propTypes = {
    stores: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
    })),
  };

  static defaultProps = {
    stores: [],
  };

  dataSource = (this.props.stores || [])
    .map(({ key }) =>
      <SelectOption value={key} key={key}>{`${key}`}</SelectOption>
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

export default withStoresManager(StoreAutocomplete, [
  {
    query: storeQueries.storesAutocomplete,
  },
]);
