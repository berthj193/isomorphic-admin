import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './pageHeader.scss';

export default class PageHeader extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <h1 className="page-header isoComponentTitle">
        {this.props.children}
      </h1>
    );
  }
}
