import React, { Component } from 'react';
import PropTypes from 'prop-types';
import columns from './columns';
import { getList, destroyLegalEntity } from '../../graphql/legalEntities';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import ItemList from '../../components/list/item-list';
import DeleteButton from '../../components/uielements/deleteButton';

export class LegalEntities extends Component {
  static propTypes = {
    legal_entities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        vat_number: PropTypes.string,
        stores: PropTypes.arrayOf(PropTypes.object),
        created_at: PropTypes.string,
      }),
    ),
    error: PropTypes.string,
    mutate: PropTypes.func,
  };

  static defaultProps = {
    legal_entities: [],
  };

  dataSource = () => this.props.legal_entities.map(
    legalEntity => ({
      key: legalEntity.id,
      id: legalEntity.id,
      name: legalEntity.name,
      vat_number: legalEntity.vat_number,
      created_at: legalEntity.created_at,
      stores: legalEntity.stores.length,
    })
  );

  deleteEntity = id => e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.mutate({
      mutation: destroyLegalEntity,
      variables: {
        id,
      },
      messages: ['Legal entity removed successfully'],
    });
  };

  actionColumn = ({ id }) => (
    <ul className="table-action">
      <li>
        <DeleteButton
          onConfirm={this.deleteEntity(id)}
          tooltipText="Remove a legal entity"
        />
      </li>
    </ul>
  );

  columns = [
    ...columns,
    {
      title: 'Action',
      dataIndex: '',
      key: 'a',
      render: this.actionColumn,
    },
  ];

  render() {
    return (
      <ItemList
        data={this.dataSource()}
        error={this.props.error}
        title="Legal entities"
        columns={this.columns}
        buttons={[{
          title: 'New legal entity',
          link: '/dashboard/legal_entities/new',
        }]}
        loading={!this.props.legal_entities && !this.props.error}
      />
    );
  }
}

export default withStoresManager(LegalEntities, { query: getList });
