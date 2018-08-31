import React from 'react';
import PropTypes from 'prop-types';
import Form from './legalEntitiesForm';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';
import { updateLegalEntity, getList } from '../../graphql/legalEntities';

export class EditLegalEntity extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.string,
    mutate: PropTypes.func,
    legal_entities: PropTypes.arrayOf(PropTypes.object),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    legal_entities: [],
  };

  legalEntityId = () => this.props.match.params.id;

  legalEntity = () =>
    this.props.legal_entities.find(({ id }) => id === this.legalEntityId()) || {};

  handleSubmit = values => {
    this.props.mutate({
      mutation: updateLegalEntity,
      variables: {
        ...values,
        id: this.props.id,
      },
      refetchQueries: [{ query: getList }],
      messages: ['Legal entity has been modified successfully'],
    });
  };

  render() {
    const { id, name, vat_number } = this.legalEntity();
    return (
      <React.Fragment>
        <LayoutContentWrapper style={{ minHeight: '100vh' }}>
          <LayoutContent>
            <h1>Legal entities</h1>
            <ButtonList
              buttons={[
                { link: `/dashboard/legal_entities/${id}`, title: 'Go back' },
              ]} />
            <Form
              onSubmit={this.handleSubmit}
              initialValues={{ name, vat_number }}
            />
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

export default withStoresManager(EditLegalEntity,
  ({ match: { params: { id } } }) => ({
    query: getList,
    variables: {
      id,
    },
  })
);
