import React from 'react';
import { WarehouseForm } from '../warehouseForm';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<WarehouseForm />', () => {
  const getComponent = (props = {}) => shallow(<WarehouseForm {...props} />);

  it('should render properly', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });
});
