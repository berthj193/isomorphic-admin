import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Form, { FormDivider, FormSubmit } from '../../components/uielements/form';
import Input, { TextArea } from '../../components/uielements/input';
import Switch from '../../components/uielements/switch';
import withReduxForm from '../../components/formWrapper/withReduxForm';
import StoreAutocomplete from '../../components/autocomplete/store';
import ProductAutocomplete from '../../components/autocomplete/product';

import { required, autocompleteKeyRequired, autocompleteIdRequired } from '../../helpers/formValidation';

export class StoreProductForm extends React.Component {
  static propTypes = {
    items: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
      use_defaults: PropTypes.bool,
    }),
    edit: PropTypes.bool,
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Field label="Name" name="name" component={Input} validate={[required]} required />
        <Field label="Master SKU" name="master_sku" component={Input} validate={[required]} required />

        { !this.props.edit
          ? <React.Fragment>
            <FormDivider />
            <Field
              label="Store"
              name="store_key"
              component={StoreAutocomplete}
              validate={[autocompleteKeyRequired]}
              required
            />
            <Field
              label="Product"
              name="product_id"
              component={ProductAutocomplete}
              validate={[autocompleteIdRequired]}
              required
            />
          </React.Fragment>
          : null
        }

        <FormDivider />
        <Field label="Description" name="description" component={TextArea} autosize={{ minRows: 3, maxRows: 6 }} />
        <Field label="Use defaults" name="use_defaults" component={Switch} defaultChecked={this.props.initialValues.use_defaults} />

        <FormSubmit />
      </Form>
    );
  }
}

export default withReduxForm({
  form: 'storeProductForm',
  enableReinitialize: true,
})(StoreProductForm);
