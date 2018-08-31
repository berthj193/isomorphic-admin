import React, { PureComponent } from 'react';
import EnumSelect from './enumSelect';

export default class CountrySelect extends PureComponent {
  render() {
    return <EnumSelect
      enumName="Country"
      {...this.props}
    />;
  }
}
