import React from 'react';
import { LegalEntities } from '../legalEntities';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<LegalEntities />', () => {
  const mockLegalEntities = [
    {
      id: '1',
      name: 'Example legal entity',
      vat_number: '1234',
      stores: [{ id: 1 }, { id: 2 }],
      created_at: 'Yesterday',
    },
  ];
  const getComponent = (props = {}) => shallow(<LegalEntities legal_entities={mockLegalEntities} {...props} />);
  const mutate = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    mutate.mockReturnValue(Promise.resolve({ foo: 'bar' }));
  });

  it('should render properly', () => {
    expect(toJson(getComponent())).toMatchSnapshot();
  });

  it('should map and pass orders to table component', () => {
    const component = getComponent();
    component.instance().setState({
      legal_entities: mockLegalEntities,
    });

    expect(toJson(component.update())).toMatchSnapshot();
  });

  it('dataSource method should return mapped object', () => {
    const component = getComponent({ legal_entities: mockLegalEntities });
    expect(component.instance().dataSource().length).toBe(1);
  });

  it('action column should match snapshot', () => {
    expect(toJson(getComponent().instance().actionColumn(mockLegalEntities[0]))).toMatchSnapshot();
  });

  it('should execute mutate function on delete', () => {
    const wrapper = getComponent({ mutate });
    const event = {
      preventDefault: () => null,
      stopPropagation: () => null,
    };
    wrapper.instance().deleteEntity(1)(event);
    expect(mutate).toBeCalled();
  });
});
