import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Text extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  };

  static defaultProps = {
    width: '100%',
    height: '40vh',
  };

  render() {
    const { text, width, height } = this.props;
    return (
      <div className="isoHelperText" style={{ width, height }}>
        <h3>{text}</h3>
      </div>
    );
  }
}
