import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

export default reduxFormOptions => CustomComponent => {
  const ComponentWithReduxForm = reduxForm(reduxFormOptions)(CustomComponent);
  return class ReduxFormWrapper extends Component {
    static propTypes = {
      resetOnSuccess: PropTypes.bool,
      onSubmitSuccess: PropTypes.func,
    };

    handleSubmitSuccess = (result, dispatch, props) => {
      // props parameter contain properties of ComponentWithReduxForm from above! Keep that in mind!
      if (this.props.resetOnSuccess) {
        props.reset();
      }
      if (this.props.onSubmitSuccess) {
        this.props.onSubmitSuccess(result, dispatch, props);
      }
    };

    render() {
      const props = {
        ...this.props,
        onSubmitSuccess: this.handleSubmitSuccess,
      };

      return <ComponentWithReduxForm {...props} />;
    }
  };
};
