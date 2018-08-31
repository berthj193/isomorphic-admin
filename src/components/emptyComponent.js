import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './emptyComponent.scss';

export default class StyledEmptyComponent extends Component {
  static propTypes = {
    value: PropTypes.string,
  };

  render() {
    const value = this.props.value || 'Please include Config';
    return (
      <div className="isoEmptyComponent">
        <span>
          {value}
        </span>
      </div>
    );
  }
}
