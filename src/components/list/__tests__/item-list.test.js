import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { ItemList } from '../item-list';

describe('<ItemList />', () => {
  const defaultProps = {
    title: 'List title!',
    detailsComponent: () => null,
    columns: [
      {
        title: 'TestField1',
        dataIndex: 'testField1',
        key: 'testField1',
      },
      {
        title: 'TestField2',
        dataIndex: 'testField2',
        key: 'testField2',
      },
      {
        title: 'TestField3',
        dataIndex: 'testField3',
        key: 'testField3',
      },
    ],
  };

  it('should render data correctly', () => {
    const data = [
      {
        key: 1,
        testField1: 'Hello',
        testField2: 'World',
        testField3: 'How Are You?',
      },
      {
        key: 2,
        testField1: 'Foo',
        testField2: 'Bar',
        testField3: 'Baz',
      },
    ];
    const Component = mount(<ItemList {...{ ...defaultProps, data }} />);

    expect(toJson(Component)).toMatchSnapshot();
  });

  it('should render error', () => {
    const component = shallow(<ItemList {...defaultProps} error="Woopsie, error occured" />);
    expect(toJson(component.update())).toMatchSnapshot();
  });

  it('click on row should run push method to details on default', () => {
    const props = {
      ...defaultProps,
      history: { push: jest.fn(), location: { pathname: 'testPath' } },
    };

    const instance = shallow(<ItemList {...props} />).instance();
    instance.onRow({ id: 337 }).onClick();
    expect(props.history.push).toHaveBeenCalledWith('testPath/337');
  });

  it('click on row should run push method to details on given detailsPath', () => {
    const props = {
      ...defaultProps,
      history: { push: jest.fn(), location: { pathname: 'testPath' } },
      detailsPath: 'another/path/to/consider',
    };

    const instance = shallow(<ItemList {...props} />).instance();
    instance.onRow({ id: 337 }).onClick();
    expect(props.history.push).toHaveBeenCalledWith('another/path/to/consider/337');
  });
});
