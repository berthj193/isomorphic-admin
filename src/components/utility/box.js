import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BoxTitleWrapper from './boxTitle';
import './box.scss';

export default class Boc extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const { title, subtitle, children } = this.props;
    return (
      <div className="box-wrapper isoBoxWrapper">
        <BoxTitleWrapper title={title} subtitle={subtitle} />
        {children}
      </div>
    );
  }
}
