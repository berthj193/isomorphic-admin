import React from 'react';
import PropTypes from 'prop-types';
import { getDetails } from '../../graphql/warehouses';
import PageLoading from '../PageLoading/PageLoading';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import DetailPage from '../../components/details/details';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';

export class WarehouseDetails extends React.Component {
  static propTypes = {
    warehouses: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    warehouses: [],
  };

  getWarehouse = () =>
    this.props.warehouses[0] || null;

  loadDetailList = () => {
    const {
      name,
      export_class,
      options = [],
      shipping_rates = [],
      stores = [],
      updated_at,
    } = this.getWarehouse() || {};
    return [
      { Name: name },
      { 'Export class': export_class },
      '---',
      options.length > 0 && { Options: this.renderOptions(options) },
      options.length > 0 && '---',
      shipping_rates.length > 0 && { 'Shipping rates': this.renderShippingRates(shipping_rates) },
      shipping_rates.length > 0 && '---',
      stores.length > 0 && { Stores: this.renderStores(stores) },
      stores.length > 0 && '---',
      { 'Updated at': updated_at },
    ];
  };

  renderOptions = data => () =>
    data.map(option => (
      <ul className="key-value-detail" key={option.key}>
        <li>
          <span className="key-value-detail-title">{option.key}</span>
          <span className="key-value-detail-value">{option.value}</span>
        </li>
      </ul>
    ));

  renderStores = stores => this.renderList(stores.map(({ key }) => key));

  renderShippingRates = rates => this.renderList(rates.map(({ name }) => name));

  renderList = data => () =>
    <ul className="detail-list">
      { data.map(value => <li className="detail-list-item" key={value}>{value}</li> ) }
    </ul>;

  render() {
    if (!this.props.error && !this.getWarehouse()) {
      return (<PageLoading style={{ height: '50vh' }} />);
    }

    const { match: { params: { id } } } = this.props;

    return (
      <React.Fragment>
        <LayoutContentWrapper style={{ minHeight: '100vh' }}>
          <LayoutContent>
            <h1>Warehouses</h1>
            <ButtonList
              buttons={[
                { link: '/dashboard/warehouses', title: 'Go back' },
                { link: `/dashboard/warehouses/${id}/edit`, title: 'Edit' },
              ]} />
            <DetailPage details={this.loadDetailList()} />
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

export default withStoresManager(WarehouseDetails,
  ({ match: { params: { id } } }) => ({
    query: getDetails,
    variables: {
      id,
    },
  }),
);
