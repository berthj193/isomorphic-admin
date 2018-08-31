import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStoresManager from '../apolloProviders/withStoresManager';
import Select, { SelectOption } from '../uielements/select';
import { getEnum } from '../../graphql/enums';

export class EnumSelect extends PureComponent {
  static propTypes = {
    __type: PropTypes.shape({
      enumValues: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
    }),
    enumName: PropTypes.string,
    nameParser: PropTypes.func,
  };

  render() {
    const { __type, nameParser, ...otherProps } = this.props;
    if (!__type) {
      return null;
    }
    return (
      <Select {...otherProps}>
        { __type.enumValues.map(({ name }) =>
          <SelectOption key={name} value={name}>
            { nameParser ? nameParser(name) : name }
          </SelectOption>) }
      </Select>);
  }
}

export default withStoresManager(EnumSelect, ({ enumName }) => ({
  query: getEnum,
  variables: {
    enumName,
  },
}));
