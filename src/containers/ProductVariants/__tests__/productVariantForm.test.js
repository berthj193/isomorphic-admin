import React from 'react';
import ProductVariantForm from '../productVariantForm';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<ProductVariantForm />', () => {
  const getComponent = (props = {}) => shallow(<ProductVariantForm {...props} />);

  it('should render properly', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });
});
