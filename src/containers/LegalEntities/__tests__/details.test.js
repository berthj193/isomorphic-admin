import React from 'react';
import LegalEntityDetails, { LegalEntityDetails as RawLegalEntityDetails } from '../details';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

describe('<LegalEntityDetails />', () => {
  const defaultParams = {
    match: {
      params: {},
    },
    legal_entities: [{
      id: 1,
      name: 'foo',
      vat_number: '123',
    }],
  };
  const getComponent = (props = {}) => shallow(<RawLegalEntityDetails {...defaultParams} {...props} />);
  const mockStore = configureStore();

  it('should render loading page', () => {
    expect(toJson(getComponent({ legal_entities: [{}] }))).toMatchSnapshot();
  });

  it('renderList should return list of elements', () => {
    expect(toJson(getComponent().instance().renderList(['foo', 'bar'])())).toMatchSnapshot();
  });

  it('loadDetailList should return list of details to render', () => {
    expect(getComponent().instance().loadDetailList().length).toBeGreaterThan(1);
  });

  it('should render details with provider', () => {
    expect(toJson(shallow(<LegalEntityDetails store={mockStore()} />))).toMatchSnapshot();
  });
});
