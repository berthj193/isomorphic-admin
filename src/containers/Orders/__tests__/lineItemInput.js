import React from 'react';
import LineInputItem from '../lineItemInput';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<LineInputItem />', () => {
  const defaultProps = {
    meta: {},
  };

  const getComponent = (props = {}) => shallow(<LineInputItem {...{ ...defaultProps, ...props }} />);

  it('should render properly', () => {
    expect(toJson(getComponent({ input: { onChange: () => null } }))).toMatchSnapshot();
  });
});
