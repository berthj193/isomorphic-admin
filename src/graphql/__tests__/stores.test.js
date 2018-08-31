import { storeDetailsQuery, storeListQuery, createStoreQuery, updateStoreQuery } from '../stores';

describe('stores gql', () => {
  describe('storeListQuery', () => {
    it('should return proper gql request', () =>
      expect(storeListQuery).toMatchSnapshot()
    );
  });

  describe('getDetailsQuery()', () => {
    it('should return proper gql request', () =>
      expect(storeDetailsQuery).toMatchSnapshot()
    );
  });

  describe('updateStoreQuery', () => {
    it('should return proper gql request', () =>
      expect(updateStoreQuery).toMatchSnapshot()
    );
  });

  describe('createStoreQuery', () => {
    it('should return proper gql request', () =>
      expect(createStoreQuery).toMatchSnapshot()
    );
  });
});
