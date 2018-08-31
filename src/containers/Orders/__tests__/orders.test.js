import React from 'react';
import { Orders } from '../orders';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import OrderClient from '../../../helpers/client/orderManagerClient';

jest.mock('../../../helpers/client/orderManagerClient');

describe('<Orders />', () => {
  const mutate = jest.fn();
  const defaultProps = { mutate };
  const getComponent = (props = {}) => shallow(<Orders {...Object.assign(defaultProps, props)} />);
  const mockOrders = [
    {
      id: '1',
      customer: {
        given_name: 'John',
        family_name: 'Doe',
        email: 'johndoe@isomorphic.com',
      },
      grand_total: {
        value: 0,
        currency: 'GBP',
      },
      created_at: '2018-05-31 15:43:15 UTC',
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
    OrderClient.query.mockReturnValue(Promise.resolve({ data: { stores: [] } }));

    mutate.mockReturnValue(Promise.resolve({ foo: 'bar' }));
  });

  it('should render properly', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });

  it('should map and pass orders to table component', () => {
    const component = getComponent();
    component.instance().setState({
      orders: mockOrders,
    });

    expect(toJson(component.update())).toMatchSnapshot();
  });

  it('dataSource method should return mapped object', () => {
    const component = getComponent({ orders: mockOrders });
    expect(component.instance().dataSource().length).toBe(1);
  });
});
