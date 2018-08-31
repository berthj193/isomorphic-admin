import React from 'react';
import PropTypes from 'prop-types';
import withStoresManager from '../apolloProviders/withStoresManager';
import channelQueries from '../../graphql/channels';
import Select, { SelectOption } from '../uielements/select';

export class ChannelAutocomplete extends React.Component {
  static propTypes = {
    channels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })),
  };

  static defaultProps = {
    channels: [],
  };

  dataSource = (this.props.channels || []).map(({ id, name }) =>
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

export default withStoresManager(ChannelAutocomplete, [
  {
    query: channelQueries.getAutocompleteList,
  },
]);
