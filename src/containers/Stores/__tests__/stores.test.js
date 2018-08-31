import React from 'react';
import { Stores } from '../stores';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<Stores />', () => {
  const defaultProps = {};

  const getComponent = (props = { mutate: () => null }) => shallow(<Stores {...Object.assign(defaultProps, props)} />);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render properly', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });

  it('should map stores', () => {
    const mockStores = [
      {
        id: '123',
        warehouse: { name: 'My Little Warehouse' },
        company: { name: 'Shmetterling' },
        channel: { name: 'CNN' },
        created_at: new Date(1990).toISOString(),
        store_products: [{}],
      },
      {
        id: '133',
        warehouse: { name: 'My Bigger Warehouse' },
        company: { name: 'Kummerspeck' },
        channel: { name: 'BBC' },
        created_at: new Date(1992).toISOString(),
        store_products: [{}, {}, {}],
      },
    ];
    const component = getComponent({ stores: mockStores });

    expect(component.instance().dataSource()).toMatchSnapshot();
  });
});

