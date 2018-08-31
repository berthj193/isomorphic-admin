import React from 'react';
import Error from '../error';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('<Error />', () => {
  const getComponent = (props = {}) => shallowToJson(shallow(<Error {...props} >I am ok :)</Error>));

  it('should display children, if error props is falsy', () =>
    expect(
      getComponent(),
    ).toMatchSnapshot()
  );

  it('should display children, if error props is falsy', () =>
    expect(
      getComponent({ error: 'I am not ok :(' })
    ).toMatchSnapshot()
  );
});
