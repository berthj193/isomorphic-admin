import { getDetailsQuery, getListQuery, getCreateQuery, getUpdateQuery } from '../products';

describe('stores gql', () => {
  describe('getProductsQuery()', () => {
    it('should return proper gql request', () =>
      expect(getListQuery()).toMatchSnapshot()
    );
  });

  describe('getProductQuery()', () => {
    it('should return proper gql request', () =>
      expect(getDetailsQuery(1)).toMatchSnapshot()
    );

    it('should return proper gql request with passed parameter', () =>
      expect(getDetailsQuery(3)).toMatchSnapshot()
    );
  });

  describe('getCreateQuery', () =>
    expect(getCreateQuery()).toMatchSnapshot()
  );

  describe('getUpdateQuery', () =>
    expect(getUpdateQuery()).toMatchSnapshot()
  );
});
