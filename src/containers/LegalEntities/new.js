import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LegalEntitiesForm from './legalEntitiesForm';

import withStoresManager from '../../components/apolloProviders/withStoresManager';

import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';

import { createLegalEntity, getList } from '../../graphql/legalEntities';

export class NewLegalEntity extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  };

  handleSubmit = values => {
    this.props.mutate({
      mutation: createLegalEntity,
      variables: {
        ...values,
      },
      refetchQueries: [{ query: getList }],
      messages: ['Legal entity added successfully'],
    });
  };

  render() {
    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Legal entities</h1>
          <ButtonList buttons={[{ link: '/dashboard/legal_entities', title: 'Go back' }]} />
          <LegalEntitiesForm
            onSubmit={this.handleSubmit}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(NewLegalEntity);
