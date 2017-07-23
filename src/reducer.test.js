import reducer from './reducer';
import * as Constants from './constants';
import dataPostInitialLoad from '../fixtures/data-post-initial-load';

describe('reducer', () => {
  describe('unrecognized action', () => {
    it('is the identity function for an unrecognized action', () => {
      expect(reducer(dataPostInitialLoad, {type: 'unrecognized'})).toEqual(dataPostInitialLoad);
    });
  });

  describe(Constants.BOARD_SPACE_CLICK, () => {
    it('handles the first board space in a move chain', () => {
      
    });
  });
});
