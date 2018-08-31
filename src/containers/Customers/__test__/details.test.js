import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { CustomerDetails } from '../details';

describe('<CustomerDetails />', () => {
  const defaultProps = {
    match: {
      params: {
        id: '1',
      },
    },
  };

  it('should render loading if there is no customer to display', () => {
    expect(toJson(shallow(<CustomerDetails {...defaultProps} />))).toMatchSnapshot();
  });

  it('should render properly, if customer has been found', () => {
    const props = {
      customers: [
        {
          auth0_id: 'holonet|d3str0y-d3ath-st4r',
          given_name: 'Leia',
          family_name: 'Organa',
          email: 'lorgana@rebellion.ga',
        },
        {
          auth0_id: 'imperialnet|1-am-th3-s3n4t3',
          given_name: 'Sheev',
          family_name: 'Palpatine',
          email: 'palpi@coruscant.co',
        },
      ],
      match: {
        params: {
          id: 'holonet|d3str0y-d3ath-st4r',
        },
      },
    };

    expect(toJson(shallow(<CustomerDetails {...{ ...defaultProps, ...props }} />))).toMatchSnapshot();
  });
});
