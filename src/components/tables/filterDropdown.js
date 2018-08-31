import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../uielements/input';
import Button from '../uielements/button';

export default class FilterDropdown extends Component {
  static propTypes = {
    searchText: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
  };

  render() {
    const { searchText, onInputChange, onSearch } = this.props;
    return (
      <div className="isoTableSearchBox">
        <Input
          id="tableFilterInput"
          placeholder="Search name"
          value={searchText}
          onChange={onInputChange}
          onPressEnter={onSearch}
        />
        <Button type="primary" onClick={onSearch}>
          Search
        </Button>
      </div>
    );
  }
}
