import React from 'react';
import PropTypes from 'prop-types';
import { getList } from '../../graphql/legalEntities';
import PageLoading from '../PageLoading/PageLoading';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import DetailPage from '../../components/details/details';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ButtonList from '../../components/uielements/buttonList';

export class LegalEntityDetails extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    legal_entities: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    legal_entities: [{}],
  };

  legalEntityId = () => this.props.match.params.id;

  legalEntity = () =>
    this.props.legal_entities.find(({ id }) => id === this.legalEntityId()) || {};

  loadDetailList = () => {
    const {
      name,
      vat_number,
      stores = [],
      updated_at,
    } = this.legalEntity();

    return [
      { Name: name },
      { 'VAT number': vat_number },
      '---',
      { Stores: this.renderList(stores.map(store => store.key)) },
      '---',
      { 'Updated at': updated_at },
    ];
  };

  renderList = data => () =>
    <ul className="detail-list">
      { data.map(item =>
        <li className="detail-list-item" key={item}>{item}</li>) }
    </ul>;

  render() {
    if (!this.props.error && !this.legalEntity().id) {
      return (<PageLoading style={{ height: '50vh' }} />);
    }

    const { match: { params: { id } } } = this.props;

    return (
      <React.Fragment>
        <LayoutContentWrapper style={{ minHeight: '100vh' }}>
          <LayoutContent>
            <h1>Legal entities</h1>
            <ButtonList
              buttons={[
                { link: '/dashboard/legal_entities', title: 'Go back' },
                { link: `/dashboard/legal_entities/${id}/edit`, title: 'Edit' },
              ]} />
            <DetailPage details={this.loadDetailList()} />
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

export default withStoresManager(LegalEntityDetails,
  ({ match: { params: { id } } }) => ({
    query: getList,
    variables: {
      id,
    },
  }),
);
