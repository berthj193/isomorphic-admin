import React from 'react';
import { ShippingRateAutocomplete } from '../shippingRate';
import { shallow } from 'enzyme';

describe('shipping ratess autocomplete component', () => {
  const getComponent = (props = {}) => shallow(<ShippingRateAutocomplete {...props} />);
  const dataObj = {
    id: '1',
    name: 'foo',
  };

  it('datasource should return empty array when there are no elements', () => {
    const instance = getComponent().instance();
    expect(instance.dataSource.length).toBe(0);
  });

  it('datasource should return one element', () => {
    const instance = getComponent({
      shipping_rates: [dataObj],
    }).instance();

    expect(instance.dataSource).toMatchSnapshot();
  });
});
