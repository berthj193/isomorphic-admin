import React from 'react';
import { ShippingRates } from '../shippingRates';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import StoreClient from '../../../helpers/client/storeManagerClient';

jest.mock('../../../helpers/client/storeManagerClient');

describe('<ShippingRates />', () => {
  const defaultProps = {
    query: jest.fn(),
    mutate: jest.fn(),
    refresh: jest.fn(),
  };
  const getComponent = (props = {}) => shallow(<ShippingRates {...Object.assign(defaultProps, props)} />);
  const mutate = jest.fn();
  const mockShippingRates = [{
    id: '1',
    country: 'United Kingdom',
    name: 'Shipping rate example',
    premium: true,
    live: false,
    created_at: 'yesterday',
  }];

  beforeEach(() => {
    jest.resetAllMocks();
    StoreClient.query.mockReturnValue(Promise.resolve({ data: { stores: [] } }));
    mutate.mockReturnValue(Promise.resolve({ foo: 'bar' }));
  });

  it('should render properly', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });

  it('should map and pass shipping rates to table component', () => {
    const mockOrders = [
      {
        id: '1',
        country: 'United Kingdom',
        name: 'Test',
        premium: true,
        live: true,
        created_at: '2018-05-31 15:43:15 UTC',
      },
    ];
    const component = getComponent();
    component.instance().setState({
      orders: mockOrders,
    });

    expect(toJson(component.update())).toMatchSnapshot();
  });

  it('action column should match snapshot', () => {
    expect(toJson(getComponent().instance().actionColumn(mockShippingRates[0]))).toMatchSnapshot();
  });

  it('should execute mutate function on delete', () => {
    const wrapper = getComponent({ mutate });
    const event = {
      preventDefault: () => null,
      stopPropagation: () => null,
    };
    wrapper.instance().deleteShippingRate(1)(event);
    expect(mutate).toBeCalled();
  });
});
