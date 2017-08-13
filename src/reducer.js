import * as Constants from './constants';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {isValidMove, applyMoves} from './utils/camelot-engine';
import {getCurrentGame, getCurrentUserPlayerName} from './utils/reducer-utils';
import {combineReducers} from 'redux';
import {firebaseStateReducer} from 'react-redux-firebase';
import {routerReducer} from 'react-router-redux';

export const defaultState = fromJS({
  chosenMoveSteps: []
});

const reducer = (state, action) => {
  switch (action.type) {
  case Constants.BOARD_SPACE_CLICK:
    return (() => {
      const chosenMoveSteps = state.getIn(['ui', 'chosenMoveSteps']);
      const boardCoords = _.pick(action.payload.boardSpace, 'row', 'col');
      const currentUserPlayerName = getCurrentUserPlayerName(state, action.payload.gameId);

      if (action.payload.boardSpace.piece && currentUserPlayerName !== action.payload.boardSpace.piece.player) {
        return state;
      }

      if (!chosenMoveSteps.size) {
        return state.setIn(['ui', 'chosenMoveSteps'], fromJS([boardCoords]));
      }

      const stepsWithThisMoveAdded = chosenMoveSteps.push(fromJS(boardCoords));
      const possibleValidMove = isValidMove(
        getCurrentGame(state, action.payload.gameId).get('gameState'),
        stepsWithThisMoveAdded, 
        currentUserPlayerName
      );

      return possibleValidMove
        ? state.setIn(['ui', 'chosenMoveSteps'], stepsWithThisMoveAdded)
        : state;
    })();
  case Constants.MAKE_MOVE:
    return (() => {
      const gameState = getCurrentGame(state, action.payload.gameId).get('gameState');
      const newGameState = applyMoves(gameState, state.getIn(['ui', 'chosenMoveSteps']));
      return state.setIn(['firebase', 'data', 'games', action.payload.gameId, 'gameState'], newGameState);
    })();
  default:
    return state;
  }
};

// Maybe this approach to combining reducers is hacky. We'll see. :)
const combinedReducer = combineReducers({
  firebase: firebaseStateReducer,
  routing: routerReducer,
  ui: state => state || null
});

export default (state, action) => {
  const nextState = combinedReducer(state, action);

  nextState.ui = nextState.ui || defaultState;

  const finalState = reducer(fromJS(nextState), action);
  return {
    firebase: finalState.get('firebase'),
    routing: finalState.get('routing').toJS(),
    ui: finalState.get('ui')
  }
};
