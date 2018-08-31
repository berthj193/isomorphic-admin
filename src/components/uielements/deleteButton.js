import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popconfirm } from 'antd';
import Icon from './icon';
import Tooltip from './tooltip';

export default class DeleteButton extends Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
    placement: PropTypes.string,
    tooltipText: PropTypes.string,
  };

  static defaultProps = {
    okText: 'Delete',
    cancelText: 'Cancel',
    title: 'Are you sure?',
    placement: 'bottom',
    tooltipText: 'Remove',
  };

  static preventEvent(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  handleCancel = e => {
    DeleteButton.preventEvent(e);
    if (this.props.onCancel) {
      this.props.onCancel(e);
    }
  };

  render() {
    const { children, tooltipText, ...otherProps } = this.props;
    return (
      <Popconfirm {...otherProps} onCancel={this.handleCancel}>
        { children
          || <a onClick={DeleteButton.preventEvent}>
            <Tooltip title={tooltipText}>
              <Icon type="delete" />
            </Tooltip>
          </a>
        }
      </Popconfirm>
    );
  }
}
