import apolloClientProvider from './apolloClientProvider';
import { graphqlConfig } from '../../settings';

export default apolloClientProvider(graphqlConfig.store_url);
