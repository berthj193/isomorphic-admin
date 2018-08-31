import withApollo from './withApollo';
import OrderClient from '../../helpers/client/orderManagerClient';

export default (WrappedComponent, query) => withApollo(WrappedComponent, query, OrderClient);
