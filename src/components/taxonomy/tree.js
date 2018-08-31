import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tree, { TreeNode } from '../uielements/tree';
import withStoresManager from '../apolloProviders/withStoresManager';
import { getTaxonomies } from '../../graphql/taxonomies';

export class TaxonomyTree extends Component {
  static propTypes = {
    taxonomies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]).isRequired,
        name: PropTypes.string.isRequired,
        children: PropTypes.arrayOf(PropTypes.object),
      }),
    ).isRequired,
    draggable: PropTypes.bool,
    onDrop: PropTypes.func,
    onClick: PropTypes.func,
  };

  handleDrop = ({ node, dragNode }) => {
    if (this.props.onDrop) {
      this.props.onDrop({
        draggedId: dragNode.props.id,
        containerId: node.props.id,
      });
    }
  };

  handleSelect = selectedElements => {
    if (this.props.onClick) {
      this.props.onClick(...selectedElements);
    }
  };

  renderBranch = ({ id, name, children }) =>
    <TreeNode title={name} key={id} id={id}>
      { children && children.map(this.renderBranch) }
    </TreeNode>;

  render() {
    return (
      <div>
        <h2>Taxonomies</h2>
        <Tree
          draggable={this.props.draggable}
          onDrop={this.handleDrop}
          onSelect={this.handleSelect}
          className="taxonomy-tree"
        >
          {this.props.taxonomies.map(this.renderBranch)}
        </Tree>
        {!this.props.taxonomies.length && <span>No data</span>}
      </div>
    );
  }
}

export default withStoresManager(TaxonomyTree, ({ storeKey }) => ({
  query: getTaxonomies,
  variables: {
    store_key: storeKey,
  },
}));
