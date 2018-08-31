import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import Popconfirm from '../feedback/popconfirm';

export default class DeleteCell extends Component {
  static propTypes = {
    index: PropTypes.number,
    onDeleteCell: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    autoBind(this);
  }

  deleteCell() {
    const { index, onDeleteCell } = this.props;
    onDeleteCell(index);
  }

  render() {
    return (
      <Popconfirm
        title="Sure to delete?"
        okText="DELETE"
        cancelText="No"
        onConfirm={this.deleteCell}
      >
        <a>Delete</a>
      </Popconfirm>
    );
  }
}
