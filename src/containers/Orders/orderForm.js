import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import LineItemInput from './lineItemInput';
import Form, { FormDivider, FormSubmit } from '../../components/uielements/form';
import Select, { SelectOption } from '../../components/uielements/select';
import Input from '../../components/uielements/input';
import { required, email, fieldListRequired } from '../../helpers/formValidation';
import AddressAutocomlete from '../../components/autocomplete/address';
import ShippingRateAutocomlete from '../../components/autocomplete/shippingRate';
import StoreAutocomlete from '../../components/autocomplete/store';

import withReduxForm from '../../components/formWrapper/withReduxForm';

export class OrderForm extends React.Component {
  static propTypes = {
    items: PropTypes.string,
    handleSubmit: PropTypes.func,
    edit: PropTypes.bool,
  };

  static defaultProps = {
    shipping_rates: [],
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Field
          label="Store"
          name="store_key"
          component={StoreAutocomlete}
          validate={[required]}
          required
        />

        <FormDivider />

        <Field
          label="Guest e-mail"
          name="guest_email"
          placeholder="johndoe@isomorphic.com"
          component={Input}
          validate={[email]}
        />
        <Field label="Guest first name" name="guest_given_name" placeholder="John" component={Input} hasFeedback />
        <Field label="Guest last name" name="guest_family_name" placeholder="Doe" component={Input} hasFeedback />
        <Field label="Phone number" name="phone_number" component={Input} hasFeedback />

        <FormDivider />

        <Field label="Currency" name="currency" defaultValue="GBP" component={Select} validate={[required]} required>
          <SelectOption value="GBP">£ GBP</SelectOption>
          <SelectOption value="USD">$ USD</SelectOption>
          <SelectOption value="EUR">€ EUR</SelectOption>
        </Field>

        {
          !this.props.edit
            ? <React.Fragment>
              <Field label="Discount code" name="discount_code" component={Input} hasFeedback />

              <FormDivider />

              <Field
                name="line_items"
                component={LineItemInput}
                validate={[fieldListRequired]}
                required
              />

              <FormDivider />

              <Field
                label="Shipping address"
                name="shipping_address_id"
                component={AddressAutocomlete}
                validate={[required]}
                required
              />
              <Field
                label="Shipping rate"
                name="shipping_rate_id"
                component={ShippingRateAutocomlete}
                validate={[required]}
                required
              />
              <Field label="payment_token" name="payment_token" component={Input} />
            </React.Fragment>
            : null
        }

        <FormSubmit />
      </Form>
    );
  }
}

export default withReduxForm({
  form: 'orderForm',
  enableReinitialize: true,
})(OrderForm);
