import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import withReduxForm from '../../components/formWrapper/withReduxForm';
import Form, { FormSubmit } from '../../components/uielements/form';
import Input from '../../components/uielements/input';
import { required } from '../../helpers/formValidation';

class NewProductForm extends Component {
  static propTypes = {
    items: PropTypes.string,
    handleSubmit: PropTypes.func,
    stores: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        key: PropTypes.string,
      }),
    ),
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Field label="Name" name="default_name" component={Input} validate={[required]} required />
        <Field label="Description" name="default_description" component={Input} validate={[required]} required />
        <Field label="SKU" name="default_master_sku" component={Input} validate={[required]} required />
        <FormSubmit />
      </Form>
    );
  }
}

export default withReduxForm({
  form: 'newStoreForm',
})(NewProductForm);
