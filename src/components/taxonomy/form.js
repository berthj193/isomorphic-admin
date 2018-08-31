import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Input from '../uielements/input';
import Form, { FormSubmit } from '../uielements/form';

export default class TaxonomyForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    return (
      <div className={this.props.className}>
        <Form onSubmit={this.props.handleSubmit}>
          <Field name="name" placeholder="Name" component={Input} />
          { this.props.children }
          <FormSubmit />
        </Form>
      </div>
    );
  }
}
