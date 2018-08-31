import React from 'react';
import { LegalEntityForm } from '../legalEntitiesForm';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<LegalEntityForm />', () => {
  const getComponent = (props = {}) => shallow(<LegalEntityForm {...props} />);

  it('should render properly', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });
});
