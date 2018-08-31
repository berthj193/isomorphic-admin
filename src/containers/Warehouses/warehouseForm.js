import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Form, { FormSubmit, FormDivider } from '../../components/uielements/form';
import OptionsInput from '../../components/uielements/optionsInput';
import Input from '../../components/uielements/input';
import { required, fieldListRequired } from '../../helpers/formValidation';
import withReduxForm from '../../components/formWrapper/withReduxForm';

export class WarehouseForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Field label="Name" name="name" component={Input} validate={[required]} required />
        <Field label="Export class" name="export_class" component={Input} validate={[required]} required />
        <FormDivider />
        <Field
          name="options"
          component={OptionsInput}
          required
          validate={[fieldListRequired]}
        />
        <FormDivider />
        <FormSubmit />
      </Form>
    );
  }
}

const form = withReduxForm({
  form: 'warehouseForm',
  enableReinitialize: true,
})(WarehouseForm);

export default form;
