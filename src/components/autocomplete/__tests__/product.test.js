import React from 'react';
import { ProductAutocomplete } from '../product';
import { shallow } from 'enzyme';

describe('product autocomplete component', () => {
  const getComponent = (props = {}) => shallow(<ProductAutocomplete {...props} />);
  const dataObj = {
    id: '1',
    default_name: 'foo',
  };

  it('datasource should return empty array when there are no elements', () => {
    const instance = getComponent().instance();
    expect(instance.dataSource.length).toBe(0);
  });

  it('datasource should return one element', () => {
    const instance = getComponent({
      products: [dataObj],
    }).instance();

    expect(instance.dataSource).toMatchSnapshot();
  });
});
