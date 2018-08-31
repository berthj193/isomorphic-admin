import React from 'react';
import PropTypes from 'prop-types';
import { getDetails } from '../../graphql/shippingRates';
import PageLoading from '../PageLoading/PageLoading';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import DetailPage from '../../components/details/details';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';

export class ShippingRateDetails extends React.Component {
  static propTypes = {
    shipping_rates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        country: PropTypes.string,
        name: PropTypes.string,
        premium: PropTypes.bool,
        live: PropTypes.bool,
        updated_at: PropTypes.string,
      }),
    ),
    error: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    shipping_rates: [{}],
  };

  getShippingRate() {
    return this.props.shipping_rates.find(({ id }) => id === this.props.match.params.id);
  }

  loadDetailList = () => {
    const {
      country,
      name,
      premium,
      live,
      updated_at,
    } = this.getShippingRate() || {};

    return [
      { Country: country },
      { Name: name },
      '---',
      { 'Is premium': premium ? 'Yes' : 'No' },
      { 'Is live': live ? 'Yes' : 'No' },
      '---',
      { 'Updated at': updated_at },
    ];
  };

  render() {
    if (!this.props.error && !this.getShippingRate()) {
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
                { link: '/dashboard/shipping_rates', title: 'Go back' },
                { link: `/dashboard/shipping_rates/${id}/edit`, title: 'Edit' },
              ]} />
            <DetailPage details={this.loadDetailList()} />
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

export default withStoresManager(ShippingRateDetails,
  ({ match: { params: { id } } }) => ({
    query: getDetails,
    variables: {
      id,
    },
  }),
);
