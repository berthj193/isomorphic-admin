import React, { PureComponent } from 'react';
import EnumSelect from './enumSelect';

export default class CurrencySelect extends PureComponent {
  render() {
    return <EnumSelect
      enumName="Currency"
      {...this.props}
    />;
  }
}
