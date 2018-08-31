import React from 'react';
import PropTypes from 'prop-types';
import Form from './warehouseForm';
import withStoresManager from '../../components/apolloProviders/withStoresManager';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import PageLoading from '../PageLoading/PageLoading';
import ButtonList from '../../components/uielements/buttonList';
import { updateWarehouse, getDetails } from '../../graphql/warehouses';

export class EditWarehouse extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    error: PropTypes.string,
    mutate: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    warehouses: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    warehouses: [],
  };

  handleSubmit = values => {
    this.props.mutate({
      mutation: updateWarehouse,
      variables: {
        ...values,
        id: this.props.id,
      },
      messages: ['Warehouse modified successfully'],
    });
  };

  render() {
    if (!this.props.error && !this.props.warehouses[0]) {
      return (<PageLoading style={{ height: '50vh' }} />);
    }
    const { id, name, export_class } = this.props.warehouses[0];
    return (
      <LayoutContentWrapper style={{ minHeight: '100vh' }}>
        <LayoutContent>
          <h1>Warehouses</h1>
          <ButtonList buttons={[{ link: `/dashboard/warehouses/${id}`, title: 'Go back' }]} />
          <Form
            onSubmit={this.handleSubmit}
            initialValues={{ name, export_class }}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default withStoresManager(
  EditWarehouse,
  ({ match: { params: { id } } }) => ({
    query: getDetails,
    variables: {
      id,
    },
  }),
);
