import React from 'react';
import { EditWarehouse } from '../edit';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<EditWarehouse />', () => {
  const mutate = jest.fn();
  const getComponent = (props = { mutate }) => shallow(<EditWarehouse {...props} />);

  beforeEach(() => {
    jest.resetAllMocks();
    mutate.mockReturnValue(Promise.resolve({ foo: 'bar' }));
  });

  it('should render loading, if component is not ready', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });

  it('should render loading, if component is not ready', () => {
    expect(toJson(getComponent({
      mutate,
      warehouses: [{
        id: '1234',
        name: 'My Warehouse',
        export_class: 'ExportSupreme',
      }],
    }))).toMatchSnapshot();
  });

  it('should execute mutate function on submit', () => {
    const wrapper = getComponent();
    wrapper.instance().handleSubmit({});
    expect(mutate).toBeCalled();
  });
});
