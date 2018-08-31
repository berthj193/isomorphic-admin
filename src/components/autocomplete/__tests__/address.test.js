import React from 'react';
import { AddressAutocomplete } from '../address';
import { shallow } from 'enzyme';

describe('address autocomplete component', () => {
  const getComponent = (props = {}) => shallow(<AddressAutocomplete {...props} />);
  const dataObj = {
    id: '1',
    given_name: 'john',
    family_name: 'doe',
    line_one: 'foo',
    city: 'bar',
  };

  it('datasource should return empty array when there are no elements', () => {
    const instance = getComponent().instance();
    expect(instance.dataSource.length).toBe(0);
  });

  it('datasource should return one element', () => {
    const instance = getComponent({
      addresses: [dataObj],
    }).instance();

    expect(instance.dataSource).toMatchSnapshot();
  });
});
