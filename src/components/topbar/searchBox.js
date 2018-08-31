import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputSearch } from '../uielements/input';

export default class SearchBox extends Component {
  static propTypes = {
    onBlur: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // TODO remove!
    setTimeout(() => {
      try {
        document.getElementById('InputTopbarSearch').focus();
      } catch (e) {
        console.error(e);
      }
    }, 200);
  }
  render() {
    return (
      <InputSearch
        id="InputTopbarSearch"
        size="large"
        placeholder="Enter search text"
        onBlur={this.props.onBlur}
      />
    );
  }
}
