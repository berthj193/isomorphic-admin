import React from 'react';
import PropTypes from 'prop-types';
import Address from './address';
import customersQueries from '../../graphql/customers';
import { getListFor } from '../../graphql/orders';
import PageLoading from '../PageLoading/PageLoading';
import DetailPage from '../../components/details/details';
import ItemList from '../../components/list/item-list';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';
import withOrdersManager from '../../components/apolloProviders/withOrdersManager';
import orderColumns from '../Orders/columns';
import { toListItem } from '../../mappers/order';

export class CustomerDetails extends React.Component {
  static propTypes = {
    auth0_id: PropTypes.string,
    customers: PropTypes.arrayOf(PropTypes.shape({
      given_name: PropTypes.string,
      family_name: PropTypes.string,
      email: PropTypes.string,

      payment_sources: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          brand: PropTypes.string.isRequired,
          created_at: PropTypes.string.isRequired,
          last4: PropTypes.string,
          payment_method: PropTypes.string,
        }),
      ),
    })),
    orders: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  };

  static defaultProps = {
    customers: [],
    orders: [],
  };

  // Temporary solution. No way to get single customer yet
  getCustomer() {
    return this.props.customers
      .find(({ auth0_id }) => auth0_id === this.props.match.params.id);
  }

  loadDetailList = () => {
    const {
      given_name,
      family_name,
      email,
      addresses,
      payment_sources,
    } = this.getCustomer();

    return [
      { Name: `${given_name} ${family_name}` },
      { Email: email },
      '---',
      { Addresses: () => addresses.map((address, index) => <Address {...address} key={index} />) },
      { 'Payment Methods': payment_sources },
    ];
  };

  render() {
    if (!this.props.error && !this.getCustomer()) {
      return (<PageLoading style={{ height: '50vh' }} />);
    }

    return (
      <React.Fragment>
        <LayoutContentWrapper style={{ minHeight: '100vh' }}>
          <LayoutContent>
            <h1>Customer</h1>
            <ButtonList
              buttons={[
                { link: '/dashboard/customers', title: 'Go back' },
              ]} />
            <DetailPage details={this.loadDetailList()} />
            <ItemList
              data={toListItem(this.props.orders)}
              title="Customer Orders"
              columns={orderColumns}
              detailsPath="/dashboard/orders"
            />
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

export default withOrdersManager(CustomerDetails, ({ match: { params: { id } } }) => [
  {
    query: customersQueries.getList(),
  },
  {
    query: getListFor,
    variables: { auth0Id: id },
  },
]);
