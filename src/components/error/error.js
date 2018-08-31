import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Error extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    error: PropTypes.string,
  };

  render() {
    if (this.props.error) {
      return <span className="error">{this.props.error}</span>;
    }
    return this.props.children || null;
  }
}
