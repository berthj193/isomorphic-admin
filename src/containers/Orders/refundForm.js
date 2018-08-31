import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Form, { FormSubmit } from '../../components/uielements/form';
import Select, { SelectOption } from '../../components/uielements/select';
import Input from '../../components/uielements/input';
import { required } from '../../helpers/formValidation';
import withReduxForm from './../../components/formWrapper/withReduxForm';

export class RefundForm extends React.Component {
  static propTypes = {
    items: PropTypes.string,
    handleSubmit: PropTypes.func,
    edit: PropTypes.bool,
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Field label="Payment" name="payment_id" component={Select} validate={[required]} required>
          <SelectOption value="1">Payment #1</SelectOption>
          <SelectOption value="2">Payment #2</SelectOption>
        </Field>

        <Field label="Amount" name="amount_pence" component={Input} validate={[required]} required />

        <FormSubmit />
      </Form>
    );
  }
}

export default withReduxForm({
  form: 'CreateOrderForm',
  enableReinitialize: true,
})(RefundForm);
