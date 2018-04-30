import reducer from './reducer';
import * as Constants from './constants';
import dataPostInitialLoad from '../fixtures/data-post-initial-load';
import update from 'immutability-helper';
import {fromJS} from 'immutable';

const expectStateToMatchSnapshot = state => expect(
  update(state, {
    firebase: {
      $unset: ['listeners', 'errors', 'ordered', 'timestamps']
    }
  })).toMatchSnapshot();

const applyAllActions = (initialState, actions) => 
  actions.reduce((state, action) => reducer(state, action), initialState);

describe('reducer', () => {
  describe('unrecognized action', () => {
    it('is the identity function for an unrecognized action', () => {
      expect(reducer(dataPostInitialLoad, {type: 'unrecognized'})).toEqual(dataPostInitialLoad);
    });
  });

  describe(Constants.BOARD_SPACE_CLICK, () => {
    it('handles the source board space in a move chain', () => {
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
      expect(nextState.ui.get('chosenMoveSteps')).toEqual(fromJS([{col: 3, row: 6}]));
    });

    it('handles the first destination board space in a move chain', () => {
      const nextState = applyAllActions(dataPostInitialLoad, [
        {
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
        },
        {
          type: Constants.BOARD_SPACE_CLICK,
          payload: {
            gameId: '-KnrZP2chDv_4frmGLqQ',
            boardSpace: {
              col: 3,
              row: 7
            }
          }
        }
      ]);
      expect(nextState.ui.get('chosenMoveSteps')).toEqual(fromJS([
        {col: 3, row: 6},
        {col: 3, row: 7}
      ]));
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
      expectStateToMatchSnapshot(nextState);
    });
  });

  describe(Constants.MAKE_MOVE, () => {
    it('makes a move', () => {
      const state = update(dataPostInitialLoad, {
        ui: {
          $set: fromJS({
            chosenMoveSteps: [
              {row: 6, col: 6},
              {row: 7, col: 6}
            ]
          })
        }
      });
      const nextState = reducer(state, {
        type: Constants.MAKE_MOVE,
        payload: {
          gameId: '-KnrZP2chDv_4frmGLqQ'
        }
      });
      expectStateToMatchSnapshot(nextState);
    });
  });
});
