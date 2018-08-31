import { getAutocompleteListQuery } from '../channels';

describe('stores gql', () => {
  describe('getListQuery()', () => {
    it('should return proper gql request', () =>
      expect(getAutocompleteListQuery).toMatchSnapshot()
    );
  });
});
