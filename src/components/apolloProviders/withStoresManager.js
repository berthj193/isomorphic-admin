import withApollo from './withApollo';
import StoreClient from '../../helpers/client/storeManagerClient';

export default (WrappedComponent, query) => withApollo(WrappedComponent, query, StoreClient);
