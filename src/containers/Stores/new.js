import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StoreForm from './storeForm';

import withStoresManager from '../../components/apolloProviders/withStoresManager';

import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';

import storeQueries from '../../graphql/stores';

class NewStore extends Component {
  static propTypes = {
    mutate: PropTypes.func,
  };

  handleSubmit = values => {
    const options = values.options.reduce((prev, curr) => ({
      ...prev,
      [curr.key]: curr.value,
    }), {});
    this.props.mutate({
      mutation: storeQueries.createStore,
      variables: {
        ...values,
        legal_entity_id: parseInt(values.legal_entity_id, 0),
        warehouse_id: parseInt(values.warehouse_id, 0),
        channel_id: parseInt(values.channel_id, 0),
        options: JSON.stringify(options),
      },
      refetchQueries: [{
        query: storeQueries.getList,
      }],
      messages: ['Store added successfully'],
    });
  };

  render() {
    const initialValues = {
      options: [
        {
          key: 'email_templates_order_completed',
          value: '1',
        },
        {
          key: 'email_templates_order_dispatched',
          value: '3',
        },
      ],
    };

    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Store</h1>
          <ButtonList buttons={[{ link: '/dashboard/stores', title: 'Go back' }]} />
          <StoreForm
            onSubmit={this.handleSubmit}
            initialValues={initialValues}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(NewStore);
