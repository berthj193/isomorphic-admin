import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import OptionsInput from '../../components/uielements/optionsInput';
import Form, { FormDivider, FormSubmit } from '../../components/uielements/form';
import Input from '../../components/uielements/input';
import { required, fieldListRequired, autocompleteIdRequired } from '../../helpers/formValidation';
import withReduxForm from '../../components/formWrapper/withReduxForm';

import StoreAutocomplete from '../../components/autocomplete/channel';
import LegalEntitiesAutocomplete from '../../components/autocomplete/legalEntities';
import WarehouseAutocomplete from '../../components/autocomplete/warehouse';

class NewStoreForm extends React.Component {
  static propTypes = {
    items: PropTypes.string,
    handleSubmit: PropTypes.func,
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Field
          label="Channel"
          name="channel_id"
          component={StoreAutocomplete}
          validate={[autocompleteIdRequired]}
          required
        />

        <Field label="Key" name="key" component={Input} validate={[required]} required />

        <FormDivider />

        <Field
          name="options"
          component={OptionsInput}
          required
          validate={[fieldListRequired]}
        />

        <FormDivider />

        <Field
          label="Legal entity"
          name="legal_entity_id"
          component={LegalEntitiesAutocomplete}
          validate={[autocompleteIdRequired]}
          required
        />

        <Field
          label="Warehouse"
          name="warehouse_id"
          component={WarehouseAutocomplete}
          validate={[autocompleteIdRequired]}
          required
        />

        <FormSubmit />
      </Form>
    );
  }
}

export default withReduxForm({
  form: 'newStoreForm',
  enableReinitialize: true,
})(NewStoreForm);
