import React from 'react';
import { ProductVariantAutocomplete } from '../productVariant';
import { shallow } from 'enzyme';

describe('product variants autocomplete component', () => {
  const getComponent = (props = {}) => shallow(<ProductVariantAutocomplete {...props} />);
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
      product_variants: [dataObj],
    }).instance();

    expect(instance.dataSource).toMatchSnapshot();
  });
});
