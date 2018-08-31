import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Icon } from 'antd';
import Form from '../../components/uielements/form';
import ButtonList from '../../components/uielements/buttonList';
import OptionsInput from '../../components/uielements/optionsInput';
import Input from '../../components/uielements/input';
import makeField from '../../utils/makeField';

import { required, fieldListRequired } from '../../helpers/formValidation';

export default class ProductVariantForm extends React.Component {
  static propTypes = {
    productId: PropTypes.string,
    onDelete: PropTypes.func,
    handleSubmit: PropTypes.func,
    dirty: PropTypes.bool,
    pristine: PropTypes.bool,
  };

  render() {
    const { productId } = this.props;
    const Buttons = makeField(() => (
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
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Field
          label="Default SKU"
          name="default_sku"
          component={Input}
          validate={[required]}
          required
        />
        <Field
          name="default_options"
          component={OptionsInput}
          validate={[fieldListRequired]}
          required
        />
        <Buttons />
      </Form>
    );
  }
}
