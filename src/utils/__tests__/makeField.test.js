import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import makeField from '../makeField';

describe('makeField util', () => {
  const textField = (props = {}) => <input {...props} />;

  it('should render component without label properly', () => {
    const Component = makeField(textField, {
      withoutLabel: true,
    });
    expect(toJson(shallow(<Component />))).toMatchSnapshot();
  });

  it('should render component without label with correct props', () => {
    const Component = makeField(textField, {
      withoutLabel: true,
    });
    expect(toJson(shallow(
      <Component
        input={{ inputProp: 'foo' }}
        anotherProp="anotherProp"
      />
    ))).toMatchSnapshot();
  });

  it('should render component with label properly', () => {
    const Component = makeField(textField);
    expect(toJson(shallow(<Component label="foo" />))).toMatchSnapshot();
  });

  it('should render component with required prop', () => {
    const Component = makeField(textField);
    expect(toJson(shallow(<Component label="foo" required />))).toMatchSnapshot();
  });

  it('should render component with an error', () => {
    const Component = makeField(textField);
    expect(toJson(shallow(
      <Component
        label="foo"
        meta={{
          error: 'required',
          touched: true,
          invalid: true,
        }}
        required
      />
    ))).toMatchSnapshot();
  });

  it('should render component with error feedback icon', () => {
    const Component = makeField(textField);
    expect(toJson(shallow(
      <Component
        label="foo"
        meta={{
          error: 'required',
          touched: true,
          invalid: true,
        }}
        hasFeedback
        required
      />
    ))).toMatchSnapshot();
  });
});
