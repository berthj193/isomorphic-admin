import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Address extends PureComponent {
  static propTypes = {
    line_one: PropTypes.string,
    line_two: PropTypes.string,
    postcode: PropTypes.string,
  };

  render() {
    const { line_one, line_two, postcode } = this.props;
    return (
      <div className="customer-address">
        <p>{line_one}</p>
        { line_two && <p>{line_two}</p> }
        <p>{postcode}</p>
      </div>
    );
  }
}
