import React from 'react';
import PropTypes from 'prop-types';
import withOrdersManager from '../apolloProviders/withOrdersManager';
import addressQueries from '../../graphql/addresses';
import Select, { SelectOption } from '../uielements/select';

export class AddressAutocomplete extends React.Component {
  static propTypes = {
    addresses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      given_name: PropTypes.string,
      family_name: PropTypes.string,
      line_one: PropTypes.string,
      city: PropTypes.string,
    })),
  };

  static defaultProps = {
    addresses: [],
  };

  dataSource = (this.props.addresses || [])
    .map(({ id, given_name, family_name, line_one, city }) =>
      <SelectOption value={id} key={id}>{`${given_name} ${family_name}, ${line_one}, ${city}`}</SelectOption>
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

export default withOrdersManager(AddressAutocomplete, [
  {
    query: addressQueries.getAutocompleteList,
  }]);
