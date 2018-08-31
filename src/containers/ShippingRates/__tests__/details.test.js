import React from 'react';
import ShippingRateDetails, { ShippingRateDetails as RawShippingRateDetails } from '../details';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('<ShippingRateDetails />', () => {
  const defaultParams = {
    match: {
      params: {},
    },
    shipping_rates: [{}],
  };
  const getComponent = (props = {}) => shallow(<RawShippingRateDetails {...defaultParams} {...props} />);
  const mockStore = configureStore();

  it('should render properly', () => {
    expect(toJson(getComponent({ shipping_rates: [{ id: '1' }] }))).toMatchSnapshot();
  });

  it('should render loading page', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });

  it('should render details with provider', () => {
    expect(toJson(shallow(<ShippingRateDetails store={mockStore()} />))).toMatchSnapshot();
  });
});
