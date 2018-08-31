import React from 'react';
import PropTypes from 'prop-types';
import './layoutContent.scss';

class LayoutContent extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="layout-content">
        {this.props.children}
      </div>
    );
  }
}

export default LayoutContent;
