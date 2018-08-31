import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'antd';
import './styles/autocomplete.scss';
import makeField from '../../utils/makeField';

const AutoCompleteOption = AutoComplete.Option;

class AutoCompleteComponent extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    filterOption: PropTypes.func,
  };

  static defaultProps = {
    filterOption: (value, option) => {
      const { props: { children: optionText } = {} } = option;
      if (optionText.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    },
  };

  handleSelect = option => {
    this.props.onChange(option);
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(option);
    }
  };

  render() {
    return <AutoComplete
      {...this.props}
      onSelect={this.handleSelect}
      filterOption={this.props.filterOption}
    />;
  }
}

export default makeField(AutoCompleteComponent);
export { AutoComplete, AutoCompleteOption };
