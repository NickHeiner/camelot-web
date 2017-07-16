import * as Constants from './constants';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {isValidMove} from './utils/camelot-engine';
import {getCurrentGame, getCurrentUserPlayerName} from './utils/reducer-utils';

const defaultState = fromJS({
  possibleMoveSteps: []
});

export default (state = defaultState, action, restOfState) => {
  switch (action.type) {
  case Constants.BOARD_SPACE_CLICK:
    return (() => {
      const possibleMoveSteps = state.get('possibleMoveSteps');
      const boardCoords = _.pick(action.payload.boardSpace, 'row', 'col');
      if (!possibleMoveSteps.size) {
        return state.set('possibleMoveSteps', fromJS([boardCoords]));
      }

      const stepsWithThisMoveAdded = possibleMoveSteps.push(fromJS(boardCoords));
      const possibleValidMove = isValidMove(
        getCurrentGame(restOfState, action.payload.gameId).get('gameState'),
        stepsWithThisMoveAdded, 
        getCurrentUserPlayerName(restOfState, action.payload.gameId)
      );

      return possibleValidMove ?
        state.set('possibleMoveSteps', stepsWithThisMoveAdded) :
        state;
    })();
  default:
    return state;
  }
};
