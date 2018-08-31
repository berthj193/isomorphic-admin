import React from 'react';
import PropTypes from 'prop-types';
import Form from './storeForm';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';
import storeQueries from '../../graphql/stores';

export class EditStore extends React.Component {
  static propTypes = {
    stores: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        key: PropTypes.string,
        warehouse: PropTypes.shape({ name: PropTypes.string }),
        company: PropTypes.shape({ name: PropTypes.string }),
        channel: PropTypes.shape({ name: PropTypes.string }),
        store_products: PropTypes.arrayOf(PropTypes.object),
        created_at: PropTypes.string,
      }),
    ),
    match: PropTypes.shape({
      params: PropTypes.shape({
        key: PropTypes.string,
      }),
    }),
    mutate: PropTypes.func,
  };

  static defaultProps = {
    stores: [],
  };

  getStoreKey = () =>
    this.props.match.params.key;

  getStore = () => {
    const storeKey = this.getStoreKey();
    return this.props.stores.find(({ key }) => key === storeKey);
  };

  handleSubmit = values => {
    const options = values.options.reduce((prev, curr) => ({
      ...prev,
      [curr.key]: curr.value,
    }), {});
    this.props.mutate({
      mutation: storeQueries.updateStore,
      variables: {
        ...values,
        options: JSON.stringify(options),
      },
      refetchQueries: [
        {
          query: storeQueries.getList,
          variables: {
            store_key: this.getStoreKey(),
          },
        },
      ],
      messages: ['Store modified successfully'],
    });
  };

  initialValues = () => {
    const {
      id, key, options = {},
      channel: { id: channel_id } = {},
      warehouse: { id: warehouse_id } = {},
      legal_entity: { id: legal_entity_id } = {},
    } = this.getStore() || {};
    return {
      id, key,
      channel_id,
      warehouse_id,
      legal_entity_id,
      options: Object.entries(options).reduce((prev, curr) => [
        ...prev,
        {
          key: curr[0],
          value: String(curr[1]),
        },
      ], []),
    };
  };

  render() {
    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Stores</h1>
          <ButtonList buttons={[{ link: `/dashboard/stores/${this.getStoreKey()}`, title: 'Go back' }]} />
          <Form
            onSubmit={this.handleSubmit}
            initialValues={this.initialValues()}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(
  EditStore,
  ({ match: { params: { key } } }) =>
    ({
      query: storeQueries.getList,
      variables: {
        store_key: key,
      },
    })
);
