import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard';

// Orders
import Orders from '../Orders/orders';
import OrderDetails from '../Orders/details';
import CreateRefund from '../Orders/refund';
import NewOrder from '../Orders/new';

// Stores
import Stores from '../Stores/stores';
import NewStore from '../Stores/new';
import StoreDetails from '../Stores/details';
import StoreEdit from '../Stores/edit';

// Store Products
import ConnectedStoreProducts from '../StoreProducts/storeProducts';
import ConnectedNewStoreProduct from '../StoreProducts/new';
import ConnectedStoreProductDetails from '../StoreProducts/details';
import ConnectedStoreProductEdit from '../StoreProducts/edit';

// Warehouses
import Warehouses from '../Warehouses/warehouses';
import WarehousesDetails from '../Warehouses/details';
import WarehousesEdit from '../Warehouses/edit';
import NewWarehouse from '../Warehouses/new';

// Product
import Products from '../Products/products';
import NewProduct from '../Products/new';
import ProductDetails from '../Products/details';
import EditProduct from '../Products/edit';

// Shipping Rates
import ShippingRates from '../ShippingRates/shippingRates';
import NewShippingRate from '../ShippingRates/new';
import ShippingRateEdit from '../ShippingRates/edit';
import ShippingRateDetails from '../ShippingRates/details';

// Legal Entities
import LegalEntity from '../LegalEntities/legalEntities';
import NewLegalEntity from '../LegalEntities/new';
import LegalEntityDetails from '../LegalEntities/details';
import LegalEntityEdit from '../LegalEntities/edit';

// Product variants
import ProductVariant from '../ProductVariants/productVariants';
import Customers from '../Customers/customers';
import CustomerDetails from '../Customers/details';

// Store product variants
import ConnectedStoreProductVariant from '../StoreProductVariants/storeProductVariants';

const routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'orders',
    component: Orders,
  },
  {
    path: 'orders/new',
    component: NewOrder,
  },
  {
    path: 'orders/:key',
    component: OrderDetails,
  },
  {
    path: 'orders/:key/refund',
    component: CreateRefund,
  },
  {
    path: 'stores',
    component: Stores,
  },
  {
    path: 'stores/new',
    component: NewStore,
  },
  {
    path: 'stores/:key',
    component: StoreDetails,
  },
  {
    path: 'stores/:key/edit',
    component: StoreEdit,
  },
  {
    path: 'store_products',
    component: ConnectedStoreProducts,
  },
  {
    path: 'store_products/new',
    component: ConnectedNewStoreProduct,
  },
  {
    path: 'store_products/:store_key/:id',
    component: ConnectedStoreProductDetails,
  },
  {
    path: 'store_products/:store_key/:id/edit',
    component: ConnectedStoreProductEdit,
  },
  {
    path: 'store_product_variants/:store_key/:id',
    component: ConnectedStoreProductVariant,
  },
  {
    path: 'products',
    component: Products,
  },
  {
    path: 'products/new',
    component: NewProduct,
  },
  {
    path: 'products/:id',
    component: ProductDetails,
  },
  {
    path: 'products/:id/edit',
    component: EditProduct,
  },
  {
    path: 'product_variants/:id',
    component: ProductVariant,
  },
  {
    path: 'warehouses',
    component: Warehouses,
  },
  {
    path: 'warehouses/new',
    component: NewWarehouse,
  },
  {
    path: 'warehouses/:id/edit',
    component: WarehousesEdit,
  },
  {
    path: 'warehouses/:id',
    component: WarehousesDetails,
  },
  {
    path: 'shipping_rates',
    component: ShippingRates,
  },
  {
    path: 'shipping_rates/new',
    component: NewShippingRate,
  },
  {
    path: 'shipping_rates/:id/edit',
    component: ShippingRateEdit,
  },
  {
    path: 'shipping_rates/:id',
    component: ShippingRateDetails,
  },
  {
    path: 'legal_entities',
    component: LegalEntity,
  },
  {
    path: 'legal_entities/new',
    component: NewLegalEntity,
  },
  {
    path: 'legal_entities/:id/edit',
    component: LegalEntityEdit,
  },
  {
    path: 'legal_entities/:id',
    component: LegalEntityDetails,
  },
  {
    path: 'customers',
    component: Customers,
  },
  {
    path: 'customers/:id',
    component: CustomerDetails,
  },
];

class AppRouter extends Component {
  static propTypes = {
    style: PropTypes.object,
    url: PropTypes.string,
  };

  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        <Switch>
          {routes.map(singleRoute => {
            const { path, exact, ...otherProps } = singleRoute;
            return (
              <Route
                exact={exact !== false}
                key={path}
                path={`${url}/${path}`}
                {...otherProps}
              />
            );
          })}
        </Switch>
      </div>
    );
  }
}

export default AppRouter;
