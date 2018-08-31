import React from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '../components/uielements/form';

const makeField = (Component, options = {}) =>
  class CustomComponent extends React.Component {
    static propTypes = {
      label: PropTypes.string,
      meta: PropTypes.shape({
        touched: PropTypes.bool,
        invalid: PropTypes.invalid,
      }),
      hasFeedback: PropTypes.bool,
      children: PropTypes.node,
      input: PropTypes.object,
      required: PropTypes.bool,
    };

    formItemLayoutWithoutLabel = {
      wrapperCol: {
        xs: { offset: 24, span: 24 },
        sm: { offset: 4, span: 6 },
      },
    };

    render() {
      const { withoutLabel } = options;
      const { meta = {}, label, hasFeedback, input, children, required, ...rest } = this.props;
      const hasError = meta.touched && meta.invalid;

      if (withoutLabel) {
        return <FormItem
          {...this.formItemLayoutWithoutLabel}
          validateStatus={hasError ? 'error' : 'success'}
          hasFeedback={hasFeedback && hasError}
          help={hasError && meta.error}
          required={required}
        >
          <Component {...input} {...rest}>{children}</Component>
        </FormItem>;
      } else {
        return (
          <FormItem
            label={label}
            validateStatus={hasError ? 'error' : 'success'}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
            required={required}
          >
            <Component {...input} {...rest}>{children}</Component>
          </FormItem>
        );
      }
    }
  };

makeField.displayName = 'makeField';

export default makeField;
