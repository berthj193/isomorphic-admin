import React from 'react';
import PropTypes from 'prop-types';
import withStoresManager from '../apolloProviders/withStoresManager';
import { getAutocompleteList as getLegalEntitiesAutocompleteList } from '../../graphql/legalEntities';
import Select, { SelectOption } from '../uielements/select';

export class LegalEntitiesAutocomplete extends React.Component {
  static propTypes = {
    legal_entities: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })),
  };

  static defaultProps = {
    legal_entities: [],
  };

  dataSource = (this.props.legal_entities || []).map(({ id, name }) =>
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

export default withStoresManager(LegalEntitiesAutocomplete, [
  {
    query: getLegalEntitiesAutocompleteList,
  },
]);
