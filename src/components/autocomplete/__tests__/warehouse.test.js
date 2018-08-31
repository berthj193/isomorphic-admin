import React from 'react';
import { WarehouseAutocomplete } from '../warehouse';
import { shallow } from 'enzyme';

describe('warehouse autocomplete component', () => {
  const getComponent = (props = {}) => shallow(<WarehouseAutocomplete {...props} />);
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
      warehouses: [dataObj],
    }).instance();

    expect(instance.dataSource).toMatchSnapshot();
  });
});
