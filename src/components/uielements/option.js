import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Input } from './input';

import './styles/option.scss';

export default class Option extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    }),
  };

  static defaultProps = {
    value: { key: '', value: '' },
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  keyChanged(e) {
    this.optionChanged(e, {
      key: e.target.value,
      value: this.props.value.value,
    });
  }

  valueChanged(e) {
    this.optionChanged(e, {
      key: this.props.value.key,
      value: e.target.value,
    });
  }

  optionChanged(e, value) {
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  render() {
    return (
      <span className="option">
        <Input
          key={`key-${this.props.index}`}
          value={this.props.value && this.props.value.key}
          onChange={this.keyChanged}
          className="option-key"
          placeholder="key"
        />
        =
        <Input
          key={`value-${this.props.index}`}
          value={this.props.value && this.props.value.value}
          onChange={this.valueChanged}
          className="option-value"
          placeholder="value"
        />
      </span>
    );
  }
}
