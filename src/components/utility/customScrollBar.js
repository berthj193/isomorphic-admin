import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SmoothScrollBar from 'react-smooth-scrollbar';

export default class CustomScrollBar extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { id, className, style, children } = this.props;
    return (
      <SmoothScrollBar
        id={id}
        className={className}
        style={style}
        continuousScrolling
      >
        {children}
      </SmoothScrollBar>
    );
  }
}
