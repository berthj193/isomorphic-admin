import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './contentHolder.scss';

export default class StyledContentHolder extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    children: PropTypes.node,
  };

  render() {
    const { style, children } = this.props;
    return (
      <div className="content-holder isoExampleWrapper" style={style}>
        {children}
      </div>
    );
  }
}
