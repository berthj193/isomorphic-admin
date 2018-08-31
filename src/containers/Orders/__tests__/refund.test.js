import React from 'react';
import { CreateRefund } from '../refund';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<OrderCreateRefund />', () => {
  const getComponent = (props = { mutate: () => null }) => shallow(<CreateRefund {...props} />);
  const mutate = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    mutate.mockReturnValue(Promise.resolve({ foo: 'bar' }));
  });

  it('should render properly', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });

  it('should execute mutate function on submit', () => {
    const wrapper = getComponent({ mutate });
    wrapper.instance().handleSubmit({});
    expect(mutate).toBeCalled();
  });
});
