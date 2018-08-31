import React from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';
import Error from '../../components/error/error';
import DetailPage from '../../components/details/details';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import storeQueries from '../../graphql/stores';

export class StoreDetails extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    store: PropTypes.object,
    error: PropTypes.string,
    stores: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    stores: [],
  };

  getStoreKey() {
    return _get(this.props, 'match.params.key');
  }

  loadDetailList = () => {
    const {
      key,
      warehouse: { name: warehouseName } = {},
      channel: { name: channelName } = {},
      legal_entity: { name: legalEntityName } = {},
      storeProducts,
      created_at,
    } = this.props.stores[0] || {};

    return [
      { Key: key },
      '---',
      { Warehouse: warehouseName },
      { Channel: channelName },
      { 'Legal entity': legalEntityName },
      { 'Store products': storeProducts },
      { 'Created at': created_at },
    ];
  };

  render() {
    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Stores</h1>
          <ButtonList
            buttons={[
              { link: '/dashboard/stores', title: 'Go back' },
              { link: `/dashboard/stores/${this.getStoreKey()}/edit`, title: 'Edit' },
            ]} />
          <DetailPage details={this.loadDetailList()} />
          <Error error={this.props.error} />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(
  StoreDetails,
  ({ match: { params: { key } } }) => (
    {
      query: storeQueries.getDetails,
      variables: {
        store_key: key,
      },
    }
  ),
);
