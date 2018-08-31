import React from 'react';
import { LegalEntitiesAutocomplete } from '../legalEntities';
import { shallow } from 'enzyme';

describe('legal entities autocomplete component', () => {
  const getComponent = (props = {}) => shallow(<LegalEntitiesAutocomplete {...props} />);
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
      legal_entities: [dataObj],
    }).instance();

    expect(instance.dataSource).toMatchSnapshot();
  });
});
