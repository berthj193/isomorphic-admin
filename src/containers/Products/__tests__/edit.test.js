import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { EditProduct } from '../edit';

describe('<EditProduct />', () => {
  const defaultProps = {
    products: [{
      id: '1',
      default_master_sku: 'MasterSKU',
      default_name: 'MasterName',
      defaultDescription: 'Hyper Uber Master Description',
    }],
    match: {
      params: {
        id: '1',
      },
    },
    mutate: () => Promise.resolve({ success: true }),
  };

  it('should render loading, if product can\'t be found', () => {
    expect(toJson(shallow(<EditProduct />))).toMatchSnapshot();
  });

  it('should render error properly', () => {
    expect(toJson(shallow(<EditProduct {...defaultProps} error="Product not Found!" />))).toMatchSnapshot();
  });

  it('should render product properly', () => {
    expect(toJson(shallow(<EditProduct {...defaultProps} />))).toMatchSnapshot();
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

    shallow(<EditProduct {...props} />).instance().handleSubmit(mockData);
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

    shallow(<EditProduct {...props} />).instance()
      .handleSubmit(mockData);
    expect(Object.keys(mutationMock.mock.calls[0][0])).toEqual(['mutation', 'variables', 'refetchQueries', 'messages']);
  });

  it('should pass variables and add id from handleSubmit to mutate method', () => {
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

    shallow(<EditProduct {...props} />).instance()
      .handleSubmit(mockData);
    expect(mutationMock.mock.calls[0][0].variables).toEqual({ ...mockData, id: '1' });
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

    shallow(<EditProduct {...props} />).instance()
      .handleSubmit(mockData);

    expect(mutationMock.mock.calls[0][0].variables).toEqual({
      default_name: 'SuperProduct',
      default_description: 'SuperDescription',
      default_master_sku: 'SuperSKU',
      id: '1',
    });
  });
});
