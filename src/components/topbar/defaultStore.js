import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select, { SelectOption } from '../uielements/select';
import { setDefaultStore } from '../../actions/defaultStore';
import storeQueries from '../../graphql/stores';
import withStoresManager from '../apolloProviders/withStoresManager';

import './defaultStore.scss';

export class DefaultStore extends PureComponent {
  static propTypes = {
    setDefaultStore: PropTypes.func.isRequired,
    stores: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        key: PropTypes.string,
      }),
    ),
    defaultStore: PropTypes.string,
  };

  static defaultProps = {
    stores: [],
  };

  handleChange = storeId => {
    this.props.setDefaultStore(storeId);
  };

  render() {
    return (
      this.props.stores.length > 0
        && <Select
          className="default-store"
          onSelect={this.handleChange}
          value={this.props.defaultStore}
        >
          <SelectOption value={null}>Choose default store...</SelectOption>
          {
            this.props.stores
              .map(({ id, key }) => <SelectOption key={id} value={id}>{key}</SelectOption>)
          }
        </Select>
    );
  }
}

const connectedDefaultStore = connect(
  ({ DefaultStore: { store } }) => ({
    defaultStore: store,
  }),
  { setDefaultStore }
)(DefaultStore);

export default withStoresManager(connectedDefaultStore, {
  query: storeQueries.getList,
});
