import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Form, { FormSubmit } from '../../components/uielements/form';
import Input from '../../components/uielements/input';
import { required } from '../../helpers/formValidation';
import withReduxForm from '../../components/formWrapper/withReduxForm';

export class LegalEntityForm extends React.Component {
  static propTypes = {
    items: PropTypes.string,
    handleSubmit: PropTypes.func,
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Field label="Name" name="name" component={Input} validate={[required]} required />
        <Field label="VAT Number" name="vat_number" component={Input} />

        <FormSubmit />
      </Form>
    );
  }
}

export default withReduxForm({
  form: 'legalEntitiesForm',
  enableReinitialize: true,
})(LegalEntityForm);
