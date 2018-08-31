import React from 'react';
import PropTypes from 'prop-types';
import { Switch as AntSwitch } from 'antd';
import './styles/switch.scss';
import makeField from '../../utils/makeField';

export { AntSwitch as Switch };

const MadeSwitch = makeField(AntSwitch);

export default function Switch(props) {
  return <MadeSwitch {...props} checked={props.input.value === true} />;
}

Switch.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.bool,
  }),
};
