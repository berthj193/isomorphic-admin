import React from 'react';
import { Select } from 'antd';
import './styles/select.scss';
import makeField from '../../utils/makeField';

const { Option: SelectOption } = Select;

class SelectComponent extends React.Component {
  handleSearch = (value, option) => {
    const { props: { children: optionText } = {} } = option;
    if (optionText.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <Select
        filterOption={this.handleSearch}
        {...this.props}
      />
    );
  }
}

export default makeField(SelectComponent);
export { Select, SelectOption };
