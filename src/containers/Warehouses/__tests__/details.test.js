import React from 'react';
import WarehouseDetails, { WarehouseDetails as RawWarehouseDetails } from '../details';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('<WarehouseDetails />', () => {
  const defaultParams = {
    match: {
      params: {},
    },
    warehouses: [{
      id: 1,
      name: 'foo',
      export_class: 'foo',
      stores: [{}],
      shipping_rates: [{}],
      options: [{}],
    }],
  };
  const getComponent = (props = {}) => shallow(<RawWarehouseDetails {...defaultParams} {...props} />);
  const mockStore = configureStore();

  it('should render properly', () => {
    expect(toJson(getComponent({ orders: [{ id: 1 }] }))).toMatchSnapshot();
  });

  it('should render loading page', () => {
    expect(toJson(getComponent({ warehouses: [{}] }))).toMatchSnapshot();
  });

  it('renderList should return list of elements', () => {
    expect(toJson(getComponent().instance().renderList(['foo', 'bar'])())).toMatchSnapshot();
  });

  it('renderOptions should return list of key value options', () => {
    expect(toJson(getComponent().instance().renderOptions([{ key: 'foo', value: 'bar' }])())).toMatchSnapshot();
  });

  it('loadDetailList should return list of details to render', () => {
    expect(getComponent().instance().loadDetailList().length).toBeGreaterThan(1);
  });

  it('should render details with provider', () => {
    expect(toJson(shallow(<WarehouseDetails store={mockStore()} />))).toMatchSnapshot();
  });
});
