import React from 'react';
import { OrderForm } from '../orderForm';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<OrderForm />', () => {
  const getComponent = (props = {}) => shallow(<OrderForm {...props} />);

  it('should render properly', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });
});
