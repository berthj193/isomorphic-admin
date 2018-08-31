import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { NewProduct } from '../new';

describe('<NewProduct />', () => {
  const defaultProps = {
    mutate: () => Promise.resolve({ result: 'success' }),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(toJson(shallow(<NewProduct {...defaultProps}/>))).toMatchSnapshot();
  });

  it('should render error correctly', () => {
    const props = {
      ...defaultProps,
      error: 'We don\'t like this product!',
    };
    expect(toJson(shallow(<NewProduct {...props}/>))).toMatchSnapshot();
  });

  it('should run mutate method on submit', () => {
    const mutateMock = jest.fn().mockImplementation(() => Promise.resolve());
    const props = {
      ...defaultProps,
      mutate: mutateMock,
    };

    const mockData = {
      default_name: 'SuperProduct',
      default_description: 'SuperDescription',
      default_master_sku: 'SuperSKU',
    };

    shallow(<NewProduct {...props} />).instance().handleSubmit(mockData);
    expect(mutateMock).toHaveBeenCalledTimes(1);
  });

  it('should build mutation query and call mutate method with it', () => {
    const mutationMock = jest.fn().mockImplementation(() => Promise.resolve());
    const props = {
      ...defaultProps,
      mutate: mutationMock,
    };

    const mockData = {
      default_name: 'SuperProduct',
      default_description: 'SuperDescription',
      default_master_sku: 'SuperSKU',
    };

    shallow(<NewProduct {...props} />).instance()
      .handleSubmit(mockData);
    expect(Object.keys(mutationMock.mock.calls[0][0])).toEqual(['mutation', 'variables', 'refetchQueries', 'messages']);
  });

  it('should pass variables from handleSubmit to mutate method', () => {
    const mutationMock = jest.fn().mockImplementation(() => Promise.resolve());
    const props = {
      ...defaultProps,
      mutate: mutationMock,
    };

    const mockData = {
      default_name: 'SuperProduct',
      default_description: 'SuperDescription',
      default_master_sku: 'SuperSKU',
    };

    shallow(<NewProduct {...props} />).instance()
      .handleSubmit(mockData);
    expect(mutationMock.mock.calls[0][0].variables).toEqual(mockData);
  });

  it('should strip unused parameters from arguments of mutate', () => {
    const mutationMock = jest.fn().mockImplementation(() => Promise.resolve());
    const props = {
      ...defaultProps,
      mutate: mutationMock,
    };

    const mockData = {
      unusedParameter: 'YOLO',
      default_name: 'SuperProduct',
      default_description: 'SuperDescription',
      default_master_sku: 'SuperSKU',
    };

    shallow(<NewProduct {...props} />).instance()
      .handleSubmit(mockData);

    expect(mutationMock.mock.calls[0][0].variables).toEqual({
      default_name: 'SuperProduct',
      default_description: 'SuperDescription',
      default_master_sku: 'SuperSKU',
    });
  });
});
