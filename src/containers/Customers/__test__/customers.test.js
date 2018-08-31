import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Customers } from '../customers';

describe('<Customers />', () => {
  it('should render correctly', () => {
    expect(toJson(shallow(<Customers />))).toMatchSnapshot();
  });

  it('should render error correctly', () => {
    expect(toJson(shallow(<Customers error="Woopsie, error happened" />))).toMatchSnapshot();
  });

  it('should map customers to proper object', () => {
    const mockData = [
      {
        auth0_id: 'holonet|d3str0y-d3ath-st4r',
        given_name: 'Leia',
        family_name: 'Organa',
        email: 'lorgana@rebellion.ga',
      },
      {
        auth0_id: 'imperialnet|1-am-th3-s3n4t3',
        given_name: 'Sheev',
        family_name: 'Palpatine',
        email: 'palpi@coruscant.co',
      },
    ];
    const instance = shallow(<Customers customers={mockData} />).instance();
    expect(instance.dataSource()).toMatchSnapshot();
  });
});
