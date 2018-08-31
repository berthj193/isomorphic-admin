import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../uielements/icon';
import { FormItem } from './form';
import Button from './button';
import { Input } from './input';

import './styles/fieldlist.scss';

class FieldList extends React.Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      invalid: PropTypes.invalid,
    }).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]).isRequired,
    defaultItemValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    label: PropTypes.string,
    addFieldLabel: PropTypes.string,
    onBlur: PropTypes.func,
    itemClassName: PropTypes.string,
    allowEmpty: PropTypes.bool,
    required: PropTypes.bool,
  };

  static defaultProps = {
    defaultItemValue: '',
  };

  componentDidMount() {
    if (this.props.value.length <= 0 && !this.props.allowEmpty) {
      this.add();
    }
  }

  formItemLayoutWithoutLabel = {
    wrapperCol: {
      xs: { offset: 24, span: 24 },
      sm: { offset: 4, span: 6 },
    },
  };

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
  };

  remove = index => () => {
    const { value } = this.props;
    const minValue = this.props.allowEmpty ? 0 : 1;
    if (value.length > minValue) {
      const fields = value.filter((v, i) => i !== index);
      this.props.onChange(fields);
    }
  };

  add = () => {
    const { value, defaultItemValue } = this.props;
    this.props.onChange([...value, defaultItemValue]);
  };

  valueUpdate = (index, targetValue) => {
    const { value } = this.props;
    const fields = [...value];
    fields[index] = targetValue;
    return fields;
  };

  handleChange = index => (e, value) =>
    this.props.onChange(
      this.valueUpdate(index, value || e.target.value)
    );

  handleBlur = index => e =>
    this.props.onBlur(
      this.valueUpdate(index, e.target.value)
    );

  renderFieldList = () => {
    const { meta, value: fields } = this.props;
    const hasError = meta.touched && meta.invalid;
    const DisplayComponent = this.props.component || Input;
    const minValue = this.props.allowEmpty ? 0 : 1;
    const addNewOptionString = 'addNewOption';

    return [
      ...fields,
      addNewOptionString,
    ].map((value, index) => (
      <FormItem
        {...(index === 0 ? this.formItemLayout : this.formItemLayoutWithoutLabel)}
        label={index === 0 ? this.props.label || 'Items' : ''}
        required={index === 0 ? this.props.required : false}
        validateStatus={index === 0 && hasError ? 'error' : 'success'}
        help={index === 0 && hasError && meta.error}
        key={index}
      >
        {
          value !== 'addNewOption'
            ? <DisplayComponent
              className={this.props.itemClassName}
              onChange={this.handleChange(index)}
              onBlur={this.handleBlur(index)}
              {...{ index, value }}
            />
            : <Button className="add-new-field-button" type="dashed" onClick={this.add}>
              <Icon type="plus" /> {this.props.addFieldLabel || 'Add field'}
            </Button>
        }
        {fields.length > minValue && value !== addNewOptionString ? (
          <Icon
            className="dynamic-delete-button field-list-delete-button"
            type="minus-circle-o"
            disabled={fields.length === minValue}
            onClick={this.remove(index)}
          />
        ) : null}
      </FormItem>
    ));
  };

  render() {
    return (
      <React.Fragment>
        {this.renderFieldList()}
      </React.Fragment>
    );
  }
}

export default FieldList;
