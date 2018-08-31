import { buildTree, separateTable } from '../taxonomies';
import {
  standardTaxonomies,
  standardTaxonomiesResult,
  circularTaxonomies,
  circularTaxonomiesResult,
} from '../__mocks__/taxonomies.mock';

describe('taxonomiesMapper', () => {
  describe('separateTable()', () => {
    it('should check value on default', () => {
      const testData = [true, false, true, 1, 0];
      expect(separateTable(testData)).toEqual({
        truthy: [true, true, 1],
        falsy: [false, 0],
      });
    });

    it('should check condition', () => {
      const testData = [1, 2, 3, 1991, 2099320];
      expect(separateTable(testData, val => val%2 === 0)).toEqual({
        truthy: [2, 2099320],
        falsy: [1, 3, 1991],
      });
    });
  });

  describe('buildTree()', () => {
    it('should build tree', () => {
      expect(buildTree(standardTaxonomies)).toEqual(standardTaxonomiesResult);
    });

    it('should ignore circular relation', () => {
      expect(buildTree(circularTaxonomies)).toEqual(circularTaxonomiesResult);
    });
  });
});
