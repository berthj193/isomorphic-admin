import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Icon } from 'antd';
import Form from '../../components/uielements/form';
import ButtonList from '../../components/uielements/buttonList';
import OptionsInput from '../../components/uielements/optionsInput';
import Input from '../../components/uielements/input';
import Switch from '../../components/uielements/switch';
import Select, { SelectOption } from '../../components/uielements/select';
import makeField from '../../utils/makeField';
import ProductVariantAutocomplete from '../../components/autocomplete/productVariant';

import { required, number, autocompleteIdRequired } from '../../helpers/formValidation';

export class ProductVariantForm extends React.Component {
  static propTypes = {
    productId: PropTypes.string,
    onDelete: PropTypes.func,
    handleSubmit: PropTypes.func,
    dirty: PropTypes.bool,
    pristine: PropTypes.bool,
  };

  buttons = productId => makeField(() => (
    <ButtonList
      buttons={[
        { onClick: this.props.handleSubmit,
          type: 'primary',
          key: `productVariantSave${productId}`,
          title: (
            <React.Fragment>
              <Icon type="check" />
              <span />
              Save
            </React.Fragment>),
        },
        { onClick: this.props.onDelete,
          type: 'danger',
          key: `productVariantDelete${productId}`,
          ghost: true,
          title: (
            <React.Fragment>
              <Icon type="delete" />
              <span />
              Delete
            </React.Fragment>),
        },
      ]} />
  ), { withoutLabel: true });

  render() {
    const { productId } = this.props;
    const Buttons = this.buttons(productId);
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Field
          label="SKU"
          name="sku"
          component={Input}
        />
        <Field label="Currency" name="currency" component={Select} validate={[required]} required>
          <SelectOption value="GBP">£ GBP</SelectOption>
          <SelectOption value="USD">$ USD</SelectOption>
          <SelectOption value="EUR">€ EUR</SelectOption>
        </Field>
        <Field
          label="Product variant"
          name="product_variant_id"
          component={ProductVariantAutocomplete}
          validate={[autocompleteIdRequired]}
          required
        />
        <Field
          label="Price"
          name="price_pence"
          component={Input}
          validate={[required, number]}
          required
        />
        <Field
          label="Use defaults"
          name="use-defaults"
          component={Switch}
          defaultChecked
        />
        <Field
          name="default_options"
          component={OptionsInput}
        />
        <Buttons />
      </Form>
    );
  }
}

export default ProductVariantForm;
