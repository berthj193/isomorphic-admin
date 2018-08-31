import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

import Input from '../uielements/input';
import Icon from '../uielements/icon';

export default class EditableCell extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    columnsKey: PropTypes.string.isRequired,
    index: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editable: false,
    };
    autoBind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ value });
  }

  check() {
    this.setState({ editable: false });
    const { onChange, columnsKey, index } = this.props;
    if (onChange) {
      onChange(
        this.state.value,
        columnsKey,
        index,
      );
    }
  }

  edit() {
    this.setState({ editable: true });
  }

  render() {
    const { value, editable } = this.state;
    return (
      <div className="isoEditData">
        {editable ? (
          <div className="isoEditDataWrapper">
            <Input
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
            />
            <Icon type="check" className="isoEditIcon" onClick={this.check} />
          </div>
        ) : (
          <p className="isoDataWrapper">
            {value || ' '}
            <Icon type="edit" className="isoEditIcon" onClick={this.edit} />
          </p>
        )}
      </div>
    );
  }
}
