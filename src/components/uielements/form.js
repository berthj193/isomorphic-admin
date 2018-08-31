import React from 'react';
import PropTypes from 'prop-types';
import { Form, Divider } from 'antd';
import Button from './button';
import './styles/form.scss';

export default Form;

class FormItem extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
  };

  render() {
    return (
      <Form.Item
        {...this.formItemLayout}
        {...this.props}
      />
    );
  }
}

class FormDivider extends React.Component {
  render() {
    return (
      <FormItem className="form-divider-wrapper">
        <Divider className="form-divider" />
      </FormItem>
    );
  }
}

class FormSubmit extends React.Component {
  buttonItemLayout = {
    wrapperCol: {
      xs: { offset: 24, span: 24 },
      sm: { offset: 4, span: 4 },
    },
  };

  render() {
    return (
      <FormItem
        {...this.buttonItemLayout}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    );
  }
}

export { FormItem, FormDivider, FormSubmit };
