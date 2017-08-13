import reducer from './reducer';
import {makeMove} from './actions';
import * as Constants from './constants';
import dataPostInitialLoad from '../fixtures/data-post-initial-load';
import update from 'immutability-helper';
import {fromJS} from 'immutable';

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

    it('handles clicking on a space that is owned by the other player', () => {
      const nextState = reducer(dataPostInitialLoad, {
        type: Constants.BOARD_SPACE_CLICK,
        payload: {
          gameId: '-KnrZP2chDv_4frmGLqQ',
          boardSpace: {
            col: 4,
            row: 9,
            piece: {
              player: 'playerB',
              type: 'pawn'
            }
          }
        }
      });
      expect(nextState).toMatchSnapshot();
    });
  });

  describe(Constants.MAKE_MOVE, () => {
    it('makes a move', () => {
      const state = update(dataPostInitialLoad, {
        ui: {
          $set: fromJS({
            chosenMoveSteps: [
              {row: 6, col: 6},
              {row: 7, col: 6},
            ]
          })
        }
      });
      const nextState = reducer(state, makeMove('-KnrZP2chDv_4frmGLqQ'))
      expect(nextState).toMatchSnapshot();
    });
  });
});
