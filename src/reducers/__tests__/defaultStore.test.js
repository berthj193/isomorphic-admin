import {
  SET_DEFAULT_STORE,
  UNSET_DEFAULT_STORE,
} from '../../constants/actionTypes/defaultStore';
import defaultStoreReducer from '../defaultStore';

describe('defaultStoreReducer', () => {
  it('should initially contain store rest to null', () => {
    // eslint-disable-next-line no-undefined
    expect(defaultStoreReducer(undefined, { type: 'unknown' })).toEqual({ store: null });
  });

  it('should initially contain store rest to null', () => {
    expect(defaultStoreReducer(
      { store: null },
      { type: SET_DEFAULT_STORE, payload: { store: 'loremIpsum' } },
    )).toEqual({ store: 'loremIpsum' });
  });

  it('should unserdefault store', () => {
    expect(defaultStoreReducer(
      { store: 'loremIpsumDolor' },
      { type: UNSET_DEFAULT_STORE },
    )).toEqual({ store: null });
  });
});
