import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { ProductDetails } from '../details';

describe('<ProductDetails />', () => {
  const defaultProps = {
    products: [{
      id: '1',
      default_master_sku: 'MasterSKU',
      default_name: 'MasterName',
      defaultDescription: 'Hyper Uber Master Description',
    }],
    match: {
      params: {
        id: '1',
      },
    },
  };

  it('should render loading, if product is not set', () => {
    expect(toJson(shallow(<ProductDetails />))).toMatchSnapshot();
  });

  it('should render product', () => {
    expect(toJson(shallow(<ProductDetails {...defaultProps} />))).toMatchSnapshot();
  });

  it('should render error', () => {
    const props = {
      ...defaultProps,
      error: 'Product not Found!',
    };
    expect(toJson(shallow(<ProductDetails {...props} />))).toMatchSnapshot();
  });
});
