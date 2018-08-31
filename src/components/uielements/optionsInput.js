import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FieldList from './fieldList';
import Option from './option';

export default class StoreOptionsInput extends PureComponent {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.string,
      ]),
      onChange: PropTypes.func,
    }),
    meta: PropTypes.object,
    label: PropTypes.string,
    addFieldLabel: PropTypes.string,
    required: PropTypes.bool,
  };

  static defaultProps = {
    label: 'Options',
    addFieldLabel: 'Add option',
  };

  render() {
    const { input: { value, ...restOfInput }, meta } = this.props;
    return (
      <FieldList
        label={this.props.label}
        addFieldLabel={this.props.addFieldLabel}
        defaultItemValue={{ key: '', value: '' }}
        meta={meta}
        component={Option}
        value={value || []}
        required={this.props.required}
        allowEmpty
        {...restOfInput}
      />
    );
  }
}
