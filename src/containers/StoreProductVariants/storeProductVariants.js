import React from 'react';
import PropTypes from 'prop-types';

import storeProductVariantQueries from '../../graphql/storeProductVariants';
import storeProductQueries from '../../graphql/storeProducts';

import withStoresManager from '../../components/apolloProviders/withStoresManager';
import StoreProductVariantForm from './storeProductVariantForm';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import { FormDivider } from '../../components/uielements/form';
import Button from '../../components/uielements/button';
import ButtonList from '../../components/uielements/buttonList';
import makeField from '../../utils/makeField';
import withReduxForm from '../../components/formWrapper/withReduxForm';
import { isEqual } from 'lodash';

export class StoreProductVariants extends React.Component {
  static propTypes = {
    store_product_variants: PropTypes.object,
    store_products: PropTypes.arrayOf(PropTypes.object),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    mutate: PropTypes.func,
  };

  static defaultProps = {
    store_product_variants: [],
    store_products: [],
  };

  state = {
    storeProductVariants: [],
    forms: [],
  };

  componentDidUpdate(prevProps) {
    const { store_product_variants } = this.props;
    if (!isEqual(store_product_variants, prevProps.store_product_variants) && store_product_variants.length) {
      const storeProductVariants = [];
      const forms = [];
      this.props.store_product_variants.forEach(storeProductVariant => {
        forms.push(this.addNewForm(forms.length));
        storeProductVariants.push(storeProductVariant);
      });

      this.setState({
        storeProductVariants,
        forms,
      });
    }
  }

  storeProductId = () => this.props.match.params.id;

  storeProduct = () =>
    this.props.store_products.length
      ? this.props.store_products[0]
      : {};

  addNewForm = formId =>
    withReduxForm({
      form: `storeProductVariantForm${this.storeProductId()}-${formId}`,
    })(StoreProductVariantForm);

  addStoreProductVariant = () => this.setState(state => ({
    storeProductVariants: [
      ...state.storeProductVariants,
      {},
    ],
    forms: [
      ...state.forms,
      this.addNewForm(state.forms.length),
    ],
  }));

  handleSave = values => {
    let mutation = storeProductVariantQueries.updateStoreProductVariant;
    const storeProduct = this.storeProduct();

    if (!values.id) {
      mutation = storeProductVariantQueries.createStoreProductVariant;
      values.store_product_id = storeProduct.id;
    }

    this.props.mutate({
      mutation,
      variables: {
        ...values,
        price_pence: parseInt(values.price_pence),
      },
      messages: ['Store product variant modified successfully'],
    });
  };

  removeStoreProductVariant = index => {
    this.setState(state => {
      state.storeProductVariants[index] = null;
      state.forms[index] = null;
      return state;
    });
  };

  handleDelete = index => () => {
    const { id } = this.state.storeProductVariants[index];
    if (id) {
      this.props.mutate({
        mutation: storeProductVariantQueries.destroyStoreProductVariant,
        variables: {
          id,
        },
        messages: ['Store product variant has been deleted successfully'],
      });
    } else {
      this.removeStoreProductVariant(index);
    }
  };

  renderStoreProductVariantForms = id =>
    this.state.storeProductVariants.map((storeProductVariant, index) => {
      if (!storeProductVariant) {
        return;
      }
      const Form = this.state.forms[index];
      const {
        product_variant = {},
        ...initialValues
      } = storeProductVariant;
      return (
        <React.Fragment key={storeProductVariant.id || `freshStoreProductVariant${index}`}>
          <Form
            productId={id}
            initialValues={{
              ...initialValues,
              product_variant_id: product_variant.id,
            }}
            onDelete={this.handleDelete(index)}
            onSubmit={this.handleSave}
          />
          <FormDivider />
        </React.Fragment>
      );
    });

  render() {
    const ProductName = makeField(() => this.storeProduct().name || '');
    const AddStoreProductVariantButton = makeField(
      () => <Button onClick={this.addStoreProductVariant}>Add store product variant</Button>,
      { withoutLabel: true }
    );

    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Store Product Variants</h1>
          <ButtonList buttons={[{ link: `/dashboard/store_products/`, title: 'Go back' }]} />
          <ProductName label="Product name" />
          <FormDivider />
          { this.renderStoreProductVariantForms(this.storeProductId()) }
          <AddStoreProductVariantButton />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(StoreProductVariants,
  ({ match: { params: { store_key } } }) => [
    {
      query: storeProductVariantQueries.getList,
      variables: {
        store_key,
      },
    },
    {
      query: storeProductQueries.getDetails,
      variables: {
        store_key,
      },
    },
  ],
);
