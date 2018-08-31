import React from 'react';
import OrderDetails, { OrderDetails as RawOrderDetails } from '../details';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('<OrderDetails />', () => {
  const defaultParams = {
    match: {
      params: {},
    },
    orders: [{}],
  };
  const getComponent = (props = {}) => shallow(<RawOrderDetails {...defaultParams} {...props} />);
  const mockStore = configureStore();

  it('should render properly', () => {
    expect(toJson(getComponent({ orders: [{ id: 1 }] }))).toMatchSnapshot();
  });

  it('should render loading page', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });

  it('should render details with provider', () => {
    expect(toJson(shallow(<OrderDetails store={mockStore()} />))).toMatchSnapshot();
  });
});
