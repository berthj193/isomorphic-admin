import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import FieldList from '../fieldList';

const defaultProps = {
  // tests ;)
  // eslint-disable-next-line react/display-name
  component: () => <span>My Component</span>,
  meta: {
    touched: false,
    invalid: false,
  },
  value: [],
  onChange: () => null,
};

describe('<FieldList />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render properly', () => {
    expect(toJson(shallow(<FieldList {...defaultProps} />))).toMatchSnapshot();
  });

  it('should render properly with given values', () => {
    const props = {
      ...defaultProps,
      value: ['lorem', 'ipsum', 'dolor'],
      // tests ;)
      // eslint-disable-next-line react/display-name,react/prop-types
      component: ({ value }) => <span>{value}</span>,
    };
    expect(toJson(shallow(<FieldList {...props} />))).toMatchSnapshot();
  });

  it('should initially add one item, if value is empty', () => {
    const onChangeMock = jest.fn();
    const props = {
      ...defaultProps,
      onChange: onChangeMock,
    };
    mount(<FieldList {...props} />);
    expect(onChangeMock).toHaveBeenCalledWith(['']);
  });

  it('should not initially add new item if values has been passed', () => {
    const onChangeMock = jest.fn();
    const props = {
      ...defaultProps,
      onChange: onChangeMock,
      value: ['Something'],
      defaultItemValue: { lorem: 'Lorem', ipsum: 'Ipsum' },
    };
    mount(<FieldList {...props} />);
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('should add new item with value from defaultItemValue props, after calling add method', () => {
    const onChangeMock = jest.fn();
    const props = {
      ...defaultProps,
      onChange: onChangeMock,
      value: [{ lorem: 'test', ipsum: 'test' }],
      defaultItemValue: { lorem: 'Lorem', ipsum: 'Ipsum' },
    };
    shallow(<FieldList {...props} />).instance().add();
    expect(onChangeMock).toHaveBeenCalledWith([
      { lorem: 'test', ipsum: 'test' },
      { lorem: 'Lorem', ipsum: 'Ipsum' },
    ]);
  });

  it('should remove item with given index, after calling provided remove method', () => {
    const onChangeMock = jest.fn();
    const props = {
      ...defaultProps,
      onChange: onChangeMock,
      value: ['lorem', 'ipsum', 'dolor'],
    };
    shallow(<FieldList {...props} />).instance().remove(1)();
    expect(onChangeMock).toHaveBeenCalledWith([
      'lorem',
      'dolor',
    ]);
  });

  it('should not remove last item, after calling provided remove method', () => {
    const onChangeMock = jest.fn();
    const props = {
      ...defaultProps,
      onChange: onChangeMock,
      value: ['lorem'],
    };
    shallow(<FieldList {...props} />).instance().remove(0)();
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('handle change should accept second value parameter, that has higher priority', () => {
    const onChangeMock = jest.fn();
    const props = {
      ...defaultProps,
      onChange: onChangeMock,
      value: ['lorem', 'ipsum'],
    };
    shallow(<FieldList {...props} />).instance().handleChange(1)({ target: { value: 'value1' } }, 'value2');
    expect(onChangeMock).toHaveBeenCalledWith(['lorem', 'value2']);
  });

  it('remove icons should remove element with proper index', () => {
    const onChangeMock = jest.fn();
    const props = {
      ...defaultProps,
      onChange: onChangeMock,
      value: ['lorem', 'ipsum', 'dolor'],
    };
    const tree = mount(<FieldList {...props} />);
    tree.find('.dynamic-delete-button').at(2).simulate('click');
    expect(onChangeMock).toHaveBeenCalledWith([
      'lorem',
      'dolor',
    ]);
  });

  it('should pass onChange method to single child component', () => {
    const componentMock = jest.fn().mockImplementation(() => <span />);
    const props = {
      ...defaultProps,
      component: componentMock,
      value: ['lorem'],
    };
    const instance = mount(<FieldList {...props} />).instance();
    // arguments of first call
    const args = componentMock.mock.calls[0][0];
    expect(args.onChange.toString()).toEqual(instance.handleChange(0).toString());
  });

  it('should pass onBlur method to single child component', () => {
    const componentMock = jest.fn().mockImplementation(() => <span />);
    const props = {
      ...defaultProps,
      component: componentMock,
      value: ['lorem'],
    };
    const instance = mount(<FieldList {...props} />).instance();
    // arguments of first call
    const args = componentMock.mock.calls[0][0];
    expect(args.onBlur.toString()).toEqual(instance.handleBlur(0).toString());
  });

  it('should pass itemClassName to single child component', () => {
    const componentMock = jest.fn().mockImplementation(() => <span />);
    const props = {
      ...defaultProps,
      component: componentMock,
      value: ['lorem'],
      itemClassName: 'test-class',
    };
    mount(<FieldList {...props} />);
    // arguments of first call
    const args = componentMock.mock.calls[0][0];
    expect(args.className).toEqual('test-class');
  });

  it('should pass value to single child component', () => {
    const componentMock = jest.fn().mockImplementation(() => <span />);
    const props = {
      ...defaultProps,
      component: componentMock,
      value: ['lorem'],
    };
    mount(<FieldList {...props} />);
    // arguments of first call
    const args = componentMock.mock.calls[0][0];
    expect(args.value).toEqual('lorem');
  });

  it('should change value under given index, after calling valueUpdate method', () => {
    const props = {
      ...defaultProps,
      value: ['lorem', 'ipsum', 'dolor'],
    };
    const instance = shallow(<FieldList {...props} />).instance();
    expect(instance.valueUpdate(1, 'ipsumium')).toEqual([
      'lorem',
      'ipsumium',
      'dolor',
    ]);
  });
});

