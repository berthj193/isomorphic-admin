import React from 'react';
import { ChannelAutocomplete } from '../channel';
import { shallow } from 'enzyme';

describe('channel autocomplete component', () => {
  const getComponent = (props = {}) => shallow(<ChannelAutocomplete {...props} />);
  const dataObj = {
    id: '1',
    name: 'foo',
  };

  it('datasource should return empty array when there are no elements', () => {
    const instance = getComponent().instance();
    expect(instance.dataSource.length).toBe(0);
  });

  it('datasource should return one element', () => {
    const instance = getComponent({
      channels: [dataObj],
    }).instance();

    expect(instance.dataSource).toMatchSnapshot();
  });
});
