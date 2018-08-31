import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import _omit from 'lodash/omit';

import DeleteButton from '../deleteButton';

describe('<DeleteButton />', () => {
  const props = {
    onConfirm: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render icon on default', () => {
    expect(toJson(shallow(<DeleteButton {...props} />))).toMatchSnapshot();
  });

  it('should render children, if they were passed', () => {
    expect(toJson(shallow(<DeleteButton {...props}><a>Link!</a></DeleteButton>))).toMatchSnapshot();
  });

  it('should pass all props, besides tooltipText and children, to AntD component', () => {
    const customProps = {
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
      okText: 'Thats ok!',
      cancelText: 'That\'s not okay:(',
      title: 'Are you REALLY sure?',
      children: <span />,
      placement: 'top',
      tooltipText: 'You touched me!',
    };

    const popconfirmInstance = mount(<DeleteButton {...customProps} />)
      .find('Popconfirm')
      .first()
      .instance();

    expect(popconfirmInstance.props)
      .toMatchObject(_omit(customProps, 'tooltipText', 'onCancel', 'children'));
  });

  describe('preventEvent', () => {
    const mockEvent = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    };

    it('should prevent event from propagating', () => {
      DeleteButton.preventEvent(mockEvent);
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should prevent defaultm behaviour', () => {
      DeleteButton.preventEvent(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });
});
