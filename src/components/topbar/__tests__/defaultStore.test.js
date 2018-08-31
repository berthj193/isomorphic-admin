import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { DefaultStore } from '../defaultStore';

describe('<DefaultStore />', () => {
  const defaultProps = {
    setDefaultStore: jest.fn(),
  };

  const mockStores = [
    {
      id: 'myid',
      key: 'store-key',
    },
    {
      id: 'myid2',
      key: 'store-key2',
    },
    {
      id: 'myid3',
      key: 'store-key3',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    expect(toJson(mount(<DefaultStore {...defaultProps} stores={mockStores} />))).toMatchSnapshot();
  });

  it('should not render if stores are empty', () => {
    expect(toJson(mount(<DefaultStore {...defaultProps} stores={[]} />))).toMatchSnapshot();
  });

  it('should run setDefaultStore method on handleChange', () => {
    const instance = shallow(<DefaultStore {...defaultProps} stores={mockStores} />).instance();
    instance.handleChange('testId');
    expect(defaultProps.setDefaultStore).toHaveBeenCalledWith('testId');
  });
});
