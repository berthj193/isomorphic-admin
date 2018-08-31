import apolloClientProvider from './apolloClientProvider';
import { graphqlConfig } from '../../settings';

export default apolloClientProvider(graphqlConfig.order_url);
