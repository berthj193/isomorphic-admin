import React from 'react';
import { StoreAutocomplete } from '../store';
import { shallow } from 'enzyme';

describe('stores autocomplete component', () => {
  const getComponent = (props = {}) => shallow(<StoreAutocomplete {...props} />);
  const dataObj = {
    id: '1',
    key: 'foo',
  };

  it('datasource should return empty array when there are no elements', () => {
    const instance = getComponent().instance();
    expect(instance.dataSource.length).toBe(0);
  });

  it('datasource should return one element', () => {
    const instance = getComponent({
      stores: [dataObj],
    }).instance();

    expect(instance.dataSource).toMatchSnapshot();
  });
});
