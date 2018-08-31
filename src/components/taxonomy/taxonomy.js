import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _find from 'lodash/find';

import AddTaxonomy from './add';
import EditTaxonomy from './edit';
import { TaxonomyTree } from './tree';

import withStoresManager from '../apolloProviders/withStoresManager';
import Error from '../error/error';
import {
  getTaxonomies,
  updateTaxonomy,
  createTaxonomy,
  destroyTaxonomy,
} from '../../graphql/taxonomies';
import { buildTree } from '../../mappers/taxonomies';

import './taxonomy.scss';

export class Taxonomy extends Component {
  static propTypes = {
    storeId: PropTypes.string.isRequired,
    storeKey: PropTypes.string.isRequired,
    taxonomies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        parent: PropTypes.shape({
          id: PropTypes.string.isRequired,
        }),
        store: PropTypes.shape({ id: PropTypes.string }).isRequired,
      }),
    ),
    readonly: PropTypes.bool,
    mutate: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    taxonomies: [],
  };

  constructor() {
    super();
    this.state = {
      active: null,
    };
  }

  getTaxonomy(id) {
    return _find(this.props.taxonomies, { id });
  }

  handleClick = id => {
    this.setState({ active: id });
  };

  handleCancel = () => {
    this.setState({
      active: null,
    });
  };

  handleDrop = ({ draggedId, containerId }) => {
    const dragged = this.getTaxonomy(draggedId);
    this.updateTaxonomy({
      store_id: dragged.store.id,
      parent_id: containerId,
      name: dragged.name,
      id: dragged.id,
    });
  };

  handleEdit = ({ name, id, parentId }) => {
    const edited = this.getTaxonomy(id);
    this.updateTaxonomy({
      store_id: edited.store.id,
      parent_id: parentId,
      name,
      id,
    });
  };

  handleAdd = ({ parent_id, name }) =>
    this.addTaxonomy({
      store_id: this.props.storeId,
      parent_id,
      name,
    });

  handleDelete = taxonomyId =>
    this.removeTaxonomy(taxonomyId);

  addTaxonomy(data) {
    const { name, parent_id, store_id } = data;
    return this.props.mutate({
      mutation: createTaxonomy,
      variables: {
        name,
        parent_id,
        store_id,
      },
    });
  }

  updateTaxonomy({ name, id, store_id, parent_id }) {
    return this.props.mutate({
      mutation: updateTaxonomy,
      variables: {
        id,
        name,
        parent_id,
        store_id,
      },
    });
  }

  removeTaxonomy(id) {
    return this.props.mutate({
      mutation: destroyTaxonomy,
      variables: {
        id,
      },
    });
  }

  render() {
    const activeTaxonomy = this.getTaxonomy(this.state.active);
    return (
      <div className="taxonomy">
        <TaxonomyTree
          taxonomies={buildTree(this.props.taxonomies)}
          onDrop={this.handleDrop}
          onClick={this.handleClick}
          draggable={!this.props.readonly}
        />
        { !this.props.readonly
          && <div className="taxonomy-forms">
            <AddTaxonomy
              onSubmit={this.handleAdd}
              parent={activeTaxonomy}
              initialValues={{ parent_id: activeTaxonomy ? activeTaxonomy.id : null }}
              resetOnSuccess
            />
            { activeTaxonomy
              && <EditTaxonomy
                onSubmit={this.handleEdit}
                id={activeTaxonomy.id}
                initialValues={activeTaxonomy}
                onDelete={this.handleDelete}
                resetOnSuccess
              />
            }
            <Error error={this.props.error} />
          </div>
        }
      </div>
    );
  }
}

export default withStoresManager(Taxonomy, ({ storeKey }) => ({
  query: getTaxonomies,
  variables: {
    store_key: storeKey,
  },
}));
