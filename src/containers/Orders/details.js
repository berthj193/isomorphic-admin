import React from 'react';
import PropTypes from 'prop-types';
import { getDetails } from '../../graphql/orders';
import PageLoading from '../PageLoading/PageLoading';
import withOrdersManager from '../../components/apolloProviders/withOrdersManager';
import DetailPage from '../../components/details/details';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';

export class OrderDetails extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    orders: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
    match: PropTypes.object,
  };

  static defaultProps = {
    orders: [{}],
  };

  loadDetailList = () => {
    const {
      customer: { given_name, family_name, email, phone } = {},
      store_key,
      shipping_address: {
        city, region, line_one, line_two,
        postcode, given_name: shippingGivenName, family_name: shippingFamilyName,
      } = {},
      item_total = {},
      grand_total = {},
      shipping_total = {},
      item_discount_total = {},
      shipping_discount_total = {},
    } = this.props.orders[0] || {};

    return [
      { Store: store_key },
      '---',
      { 'E-mail': email },
      { 'First name': given_name },
      { 'Last name': family_name },
      { 'Phone number': phone },
      '---',
      { 'First name': shippingGivenName },
      { 'Last name': shippingFamilyName },
      { City: city },
      { Region: region },
      { Postcode: postcode },
      { 'Line one': line_one },
      { 'Line two': line_two },
      '---',
      { 'Item total': `${item_total.value} ${item_total.currency}` },
      { 'Grand total': `${grand_total.value} ${grand_total.currency}` },
      { 'Shipping total': `${shipping_total.value} ${shipping_total.currency}` },
      { 'Item discount total': `${item_discount_total.value} ${item_discount_total.currency}` },
      { 'Shipping discount total': `${shipping_discount_total.value} ${shipping_discount_total.currency}` },
    ];
  };

  render() {
    if (!this.props.error && !this.props.orders[0].id) {
      return (<PageLoading style={{ height: '50vh' }} />);
    }

    const { match: { params: { key } } } = this.props;

    return (
      <React.Fragment>
        <LayoutContentWrapper style={{ minHeight: '100vh' }}>
          <LayoutContent>
            <h1>Orders</h1>
            <ButtonList
              buttons={[
                { link: '/dashboard/orders', title: 'Go back' },
                { link: `/dashboard/orders/${key}/refund`, title: 'Add refund' },
              ]} />
            <DetailPage details={this.loadDetailList()} />
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

export default withOrdersManager(OrderDetails,
  ({ match: { params: { key } } }) => ({
    query: getDetails,
    variables: {
      id: key,
    },
  }),
);
