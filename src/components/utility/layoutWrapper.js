import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './layoutWrapper.scss';

export default class LayoutWrapper extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const { className, children, ...otherProps } = this.props;
    return (
      <div
        className={
          classnames(
            'layout-content-wrapper isoLayoutContentWrapper',
            className,
          )
        }
        {...otherProps}
      >
        {children}
      </div>
    );
  }
}
