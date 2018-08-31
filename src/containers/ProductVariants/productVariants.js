import React from 'react';
import PropTypes from 'prop-types';

import productQueries from '../../graphql/products';
import productVariantQueries from '../../graphql/productVariants';

import withReduxForm from '../../components/formWrapper/withReduxForm';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import ProductVariantForm from './productVariantForm';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import { FormDivider } from '../../components/uielements/form';
import Button from '../../components/uielements/button';
import ButtonList from '../../components/uielements/buttonList';
import makeField from '../../utils/makeField';
import _isEqual from 'lodash/isEqual';

export class ProductVariants extends React.Component {
  static propTypes = {
    product_variants: PropTypes.arrayOf(PropTypes.shape({
      default_options: PropTypes.object,
      default_sku: PropTypes.string,
      id: PropTypes.string,
    })),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    mutate: PropTypes.func,
    products: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  };

  static defaultProps = {
    product_variants: [],
  };

  state = {
    productVariants: [],
    forms: [],
  };

  componentDidMount() {
    this.productVariantInitialValues({});
  }

  componentDidUpdate(prevProps) {
    this.productVariantInitialValues(prevProps);
  }

  productVariantInitialValues = prevProps => {
    const { product_variants } = this.props;
    if (!_isEqual(product_variants, prevProps.product_variants) && product_variants.length) {
      const productVariants = [];
      const forms = [];
      product_variants.forEach(productVariant => {
        forms.push(this.addNewForm(forms.length));

        productVariants.push({
          ...productVariant,
          default_options: productVariant.default_options
            && Object.entries(productVariant.default_options).map(option => ({
              key: option[0],
              value: option[1],
            })),
        });
      });

      this.setState({
        productVariants,
        forms,
      });
    }
  };

  get productId() {
    return this.props.match.params.id;
  }

  addNewForm = formId =>
    withReduxForm({
      form: `productVariantForm${this.productId}-${formId}`,
    })(ProductVariantForm);

  addProductVariant = () => this.setState(state => ({
    ...state,
    productVariants: [
      ...state.productVariants,
      {},
    ],
    forms: [
      ...state.forms,
      this.addNewForm(state.forms.length),
    ],
  }));

  handleSave = values => {
    let mutation = productVariantQueries.updateProductVariant;
    const default_values = values.default_options.reduce((prevValue, { key, value }) => ({
      ...prevValue,
      [key]: value,
    }), {});
    const variables = {
      ...values,
      default_options: JSON.stringify(default_values),
    };

    if (!values.id) {
      mutation = productVariantQueries.createProductVariant;
      variables.product_id = this.productId;
    }

    this.props.mutate({
      mutation,
      variables,
      refetchQueries: [
        { query: productVariantQueries.getList },
      ],
      messages: ['Product variant modified successfully'],
    });
  };

  removeProductVariant = index => {
    this.setState(state => {
      state.productVariants[index] = null;
      state.forms[index] = null;
      return state;
    });
  };

  handleDelete = index => () => {
    const { id } = this.state.productVariants[index];
    if (id) {
      this.props.mutate({
        mutation: productVariantQueries.destroyProductVariant,
        variables: {
          id,
        },
        refetchQueries: [
          { query: productVariantQueries.getList },
        ],
      }).then(() => {
        this.removeProductVariant(index);
      });
    } else {
      this.removeProductVariant(index);
    }
  };

  renderProductVariantForms = id =>
    this.state.productVariants.map((productVariant, index) => {
      if (!productVariant) {
        return;
      }
      const Form = this.state.forms[index];
      return (
        <React.Fragment key={productVariant.id || `freshProductVariant${index}`}>
          <Form
            productId={id}
            initialValues={productVariant}
            onDelete={this.handleDelete(index)}
            onSubmit={this.handleSave}
          />
          <FormDivider />
        </React.Fragment>
      );
    });

  render() {
    const { products = [{}] } = this.props;

    const product = products.find(({ id }) => id === this.productId) || {};
    const ProductName = makeField(() => product.default_name || '');

    const AddProductVariantButton = makeField(
      () => <Button onClick={this.addProductVariant}>Add product variant</Button>,
      { withoutLabel: true }
    );

    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Product variants</h1>
          <ButtonList buttons={[{ link: `/dashboard/products`, title: 'Go back' }]} />
          <ProductName label="Product name" />
          <FormDivider />
          { this.renderProductVariantForms(this.productId) }
          <AddProductVariantButton />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(ProductVariants, [
  {
    query: productVariantQueries.getList,
  },
  {
    query: productQueries.productsAutocomplete,
  },
]);
