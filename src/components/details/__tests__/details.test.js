import React from 'react';
import Details from '../details';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<PageDetails />', () => {
  const getComponent = (props = {}) => shallow(<Details {...props} />);

  it('should render properly', () => {
    const details = [
      { Hello: 'World' },
      { 'Hello-world': <div>Hello World</div> },
      '---',
    ];
    expect(toJson(getComponent({ details }))).toMatchSnapshot();
  });
});
