import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Option from '../option';

describe('<Option />', () => {
  it('should render properly', () => {
    const tree = mount(<Option />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render with initial values', () => {
    const tree = mount(<Option value={{ key: 'Lorem', value: 'Ipsum' }} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should trigger on change method with event and input value if key field is changed', () => {
    const onChangeMock = jest.fn();
    const tree = shallow(<Option onChange={onChangeMock} />);
    const event = { target: { value: 'Lorem' } };
    tree.find('.option-key').first().simulate('change', event);
    expect(onChangeMock).toHaveBeenCalledWith(event, { key: 'Lorem', value: '' });
  });

  it('should trigger on change method with event and input value if value field is changed', () => {
    const onChangeMock = jest.fn();
    const tree = shallow(<Option onChange={onChangeMock} />);
    const event = { target: { value: 'Ipsum' } };
    tree.find('.option-value').first().simulate('change', event);
    expect(onChangeMock).toHaveBeenCalledWith(event, { key: '', value: 'Ipsum' });
  });
});
