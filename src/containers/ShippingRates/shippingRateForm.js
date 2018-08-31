import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Form, { FormDivider, FormSubmit } from '../../components/uielements/form';
import Input from '../../components/uielements/input';
import Switch from '../../components/uielements/switch';
import CurrencySelect from '../../components/enum/currencySelect';
import CountrySelect from '../../components/enum/countrySelect';
import withReduxForm from '../../components/formWrapper/withReduxForm';
import WarehouseAutocomplete from '../../components/autocomplete/warehouse';

import { required, number, autocompleteIdRequired } from '../../helpers/formValidation';

export class NewShippingRateForm extends React.Component {
  static propTypes = {
    items: PropTypes.string,
    handleSubmit: PropTypes.func,
    warehouses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
  };

  static defaultProps = {
    warehouses: [],
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Field label="Name" name="name" component={Input} validate={[required]} required />
        <Field
          label="Warehouse"
          name="warehouse_id"
          component={WarehouseAutocomplete}
          validate={[autocompleteIdRequired]}
          required
        />

        <FormDivider />
        <Field label="Currency" name="currency" component={CurrencySelect} validate={[required]} required />
        <Field label="Shipping price" name="price_pence" component={Input} validate={[required, number]} required />

        <FormDivider />
        <Field label="Country" name="country" placeholder="United Kingdom" component={CountrySelect} validate={[required]} required />
        <Field label="Shipping code" name="shipping_code" placeholder="NW1 5LS" component={Input} validate={[required]} required />

        <FormDivider />
        <Field label="Premium" name="premium" component={Switch} />
        <Field label="Live" name="live" component={Switch} />

        <FormSubmit />
      </Form>
    );
  }
}

const form = withReduxForm({
  form: 'shippingRateForm',
  enableReinitialize: true,
  initialValues: {
    live: true,
    premium: false,
  },
})(NewShippingRateForm);

export default form;
