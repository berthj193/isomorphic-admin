import React from 'react';
import { Warehouses } from '../warehouses';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

jest.mock('../../../helpers/client/storeManagerClient');

describe('<Warehouses />', () => {
  const getComponent = (props = {}) => shallow(<Warehouses {...props} />);
  const mutate = jest.fn();
  const mockWarehouses = [{
    id: 1,
    name: 'Warehouse',
    export_class: 'Foo',
    stores: [],
  }];

  beforeEach(() => {
    jest.resetAllMocks();
    mutate.mockReturnValue(Promise.resolve({ foo: 'bar' }));
  });

  it('should render properly', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });

  it('should map and pass orders to table component', () => {
    const mockOrders = [
      {
        id: '1',
        name: 'Test',
        export_class: 'exportClass',
        created_at: '2018-05-31 15:43:15 UTC',
      },
    ];
    const component = getComponent();
    component.instance().setState({
      orders: mockOrders,
    });

    expect(toJson(component.update())).toMatchSnapshot();
  });

  it('dataSource method should return mapped object', () => {
    const component = getComponent({ warehouses: mockWarehouses });
    expect(component.instance().dataSource().length).toBe(1);
  });

  it('should execute mutate function on delete', () => {
    const wrapper = getComponent({ mutate });
    const event = {
      preventDefault: () => null,
      stopPropagation: () => null,
    };
    wrapper.instance().deleteWarehouse(1)(event);
    expect(mutate).toBeCalled();
  });

  it('action column should match snapshot', () => {
    expect(toJson(getComponent().instance().actionColumn({ id: 1 }))).toMatchSnapshot();
  });
});
