import React from 'react';
import { EditLegalEntity } from '../edit';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<EditLegalEntity />', () => {
  const getLegalEntityDetails = () => ({
    id: 1,
    name: 'foo',
    vat_number: 'bar',
  });
  const getComponent = (props = {}) => shallow(
    <EditLegalEntity
      getLegalEntityDetails={getLegalEntityDetails}
      {...props}
    />
  );
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
