import React from 'react';
import { Products } from '../products';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<Products />', () => {
  const defaultProps = {};

  const getComponent = (props = {}) => shallow(<Products {...Object.assign(defaultProps, props)} />);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render properly', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });

  it('should map products', () => {
    const mockStores = [
      {
        id: 1,
        default_name: 'MyLittlePony Toy',
        default_description: 'Representation of unicorn',
        default_master_sku: 'r41nb0w',
        stores: [{}, {}],
      },
      {
        id: 2,
        default_name: 'Necronomicon',
        default_description: 'Ph\'nglui mglw\'nafh Cthulhu R\'lyeh wgah\'nagl fhtagn',
        default_master_sku: 'd3v1l',
        stores: [],
      },
    ];
    const component = getComponent({ products: mockStores });

    expect(component.instance().dataSource()).toMatchSnapshot();
  });
});

