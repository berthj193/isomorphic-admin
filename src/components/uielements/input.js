import { Input } from 'antd';
import './styles/input.scss';
import makeField from '../../utils/makeField';

const {
  Search: RawInputSearch,
  TextArea: RawTextArea,
  Group: RawGroup,
} = Input;

const InputSearch = makeField(RawInputSearch);
const TextArea = makeField(RawTextArea);
const Group = makeField(RawGroup);

export default makeField(Input);
export { Input, InputSearch, Group, TextArea };
