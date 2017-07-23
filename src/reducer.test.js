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
      const nextState = reducer(dataPostInitialLoad, {
        type: Constants.BOARD_SPACE_CLICK,
        payload: {
          gameId: '-KnrZP2chDv_4frmGLqQ',
          boardSpace: {
            col: 3,
            row: 6,
            piece: {
              player: 'playerA',
              type: 'knight'
            }
          }
        }
      });
      expect(nextState).toMatchSnapshot();
    });
  });
});
