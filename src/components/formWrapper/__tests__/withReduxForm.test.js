import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { reduxForm } from 'redux-form';

import withReduxForm from '../withReduxForm';

const defaultOptions = {
  form: 'test-form',
};

const mockComponent = jest.fn().mockImplementation(() => <span />);

const getComponent = options => withReduxForm(options)(mockComponent);

jest.mock('redux-form', () => ({
  reduxForm: jest.fn().mockImplementation(() => Component => Component),
}));

describe('withReduxForm()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render deliveredComponent', () => {
    const Component = getComponent(defaultOptions);
    expect(toJson(mount(<Component />))).toMatchSnapshot();
  });

  it('should initialize reduxForm with given options', () => {
    const options = {
      ...defaultOptions,
      myCustom: 'option',
    };

    getComponent(options);
    expect(reduxForm).toHaveBeenCalledWith(options);
  });

  it('should initialize reduxForm with given options', () => {
    const options = {
      ...defaultOptions,
      myCustom: 'option',
    };

    getComponent(options);
    expect(reduxForm).toHaveBeenCalledWith(options);
  });

  it('should run reset method from props if resetOnSuccess flag is set', () => {
    const options = {
      ...defaultOptions,
      myCustom: 'option',
    };

    const resetMock = jest.fn();

    const Component = getComponent(options);
    mount(<Component resetOnSuccess />).instance().handleSubmitSuccess(null, null, { reset: resetMock });
    expect(resetMock).toHaveBeenCalled();
  });

  it('should not run reset method from props if resetOnSuccess flag is unset', () => {
    const options = {
      ...defaultOptions,
      myCustom: 'option',
    };

    const resetMock = jest.fn();

    const Component = getComponent(options);
    mount(<Component />).instance().handleSubmitSuccess(null, null, { reset: resetMock });
    expect(resetMock).not.toHaveBeenCalled();
  });

  it('should run onSubmitSuccess method from props', () => {
    const options = {
      ...defaultOptions,
      myCustom: 'option',
    };

    const onSubmitSuccessMock = jest.fn();

    const Component = getComponent(options);
    mount(<Component onSubmitSuccess={onSubmitSuccessMock} />)
      .instance()
      .handleSubmitSuccess(null, null, { reset: () => null });
    expect(onSubmitSuccessMock).toHaveBeenCalled();
  });
});
