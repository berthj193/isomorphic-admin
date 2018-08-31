import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FieldList from '../../components/uielements/fieldList';
import { Input } from '../../components/uielements/input';

export default class LineItemInput extends PureComponent {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
      onChange: PropTypes.func,
    }),
    meta: PropTypes.object,
  };

  render() {
    const { input: { value, ...restOfInput }, meta } = this.props;
    return (
      <FieldList
        label="Items"
        addFieldLabel="Add item"
        itemClassName="field-list-input"
        meta={meta}
        component={Input}
        value={value || []}
        {...restOfInput}
      />
    );
  }
}
