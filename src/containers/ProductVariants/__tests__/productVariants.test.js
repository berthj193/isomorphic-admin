import React from 'react';
import { ProductVariants } from '../productVariants';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<productVariants />', () => {
  const defaultProps = {
    match: {
      params: {
        id: '1',
      },
    },
  };
  const getComponent = (props = {}) =>
    shallow(<ProductVariants {...defaultProps} {...props} />);

  it('should render properly', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });

  it('should add product variant from props to state in componentDidMount() lifecycle method', () => {
    const wrapper = getComponent({
      product_variants: [{
        options: { foo: 'bar' },
      }],
    });
    expect(wrapper.instance().state.productVariants.length).toBe(1);
  });

  it('productId should return URL param', () => {
    const wrapper = getComponent();
    expect(wrapper.instance().productId).toBe('1');
  });

  it('addProductVariant() should add product variant to state', () => {
    const wrapper = getComponent();
    const instance = wrapper.instance();
    instance.addProductVariant();
    expect(instance.state.productVariants.length).toBe(1);
  });

  it('handleSave() should execute mutate function', () => {
    const wrapper = getComponent({
      mutate: jest.fn().mockReturnValue(Promise.resolve('data')),
    });
    const instance = wrapper.instance();
    instance.handleSave({
      default_options: [{ key: 'foo', value: 'bar' }],
    });
    expect(instance.props.mutate).toHaveBeenCalledTimes(1);
  });

  it('handleDelete() should delete product variant from state', () => {
    const wrapper = getComponent();
    const instance = wrapper.instance();
    instance.addProductVariant();
    instance.handleDelete(0)();
    expect(instance.state.productVariants[0]).toBe(null);
  });

  it('handleDelete() should execute mutate function if product variant ID is provided', () => {
    const wrapper = getComponent({
      mutate: jest.fn().mockReturnValue(Promise.resolve('data')),
      product_variants: [{ id: '1' }],
    });
    const instance = wrapper.instance();
    instance.handleDelete(0)();
    expect(instance.props.mutate).toHaveBeenCalledTimes(1);
  });

  it('renderProductVariantForms() should render product variant forms based on state data', () => {
    const wrapper = getComponent();
    const instance = wrapper.instance();
    instance.setState({
      productVariants: [{
        id: '1',
        default_sku: 'foo',
      }],
      forms: [
        require('../productVariantForm').default,
      ],
    });
    expect(instance.renderProductVariantForms('1')).toMatchSnapshot();
  });
});
