import React from 'react';
import { NewShippingRateForm } from '../shippingRateForm';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<ShippingRateForm />', () => {
  const getComponent = (props = {}) => shallow(<NewShippingRateForm {...props} />);

  it('should render properly', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });
});
