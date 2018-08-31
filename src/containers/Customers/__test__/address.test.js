import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Address from '../address';

describe('<Address />', () => {
  it('should render properly', () => {
    const props = {
      line_one: 'lorem-ipsum',
      line_two: 'dolor-sit-amet',
      postcode: 'P0stC0d3',
    };
    expect(toJson(shallow(<Address {...props} />))).toMatchSnapshot();
  });

  it('should skip second line of address', () => {
    const props = {
      line_one: 'lorem-ipsum',
      postcode: 'P0stC0d3',
    };
    expect(toJson(shallow(<Address {...props} />))).toMatchSnapshot();
  });
});
