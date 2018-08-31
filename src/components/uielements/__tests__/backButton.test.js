import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GoBackButton } from '../backButton';

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/display-name
  Link: () => <a />,
  withRouter: () => null,
}));

describe('<BackButton />', () => {
  const props = {
    history: {
      goBack: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render properly', () => {
    expect(toJson(shallow(<GoBackButton {...props} />))).toMatchSnapshot();
  });

  it('should run goBack method on click', () => {
    mount(<GoBackButton {...props} />)
      .find('button')
      .first()
      .simulate('click');
    expect(props.history.goBack).toHaveBeenCalledTimes(1);
  });
});
