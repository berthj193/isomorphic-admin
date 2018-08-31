import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

global.routerContext = { options: { context: { router: { isActive: () => true } } } };
Enzyme.configure({ adapter: new Adapter() });
