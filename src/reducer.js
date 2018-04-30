import * as Constants from './constants';
import {fromJS, List} from 'immutable';
import _ from 'lodash';
import {isValidMove} from './utils/camelot-engine';
import {getCurrentGame, getCurrentUserPlayerName} from './utils/reducer-utils';
import {combineReducers} from 'redux';
import {firebaseStateReducer} from 'react-redux-firebase';
import {routerReducer} from 'react-router-redux';
import update from 'immutability-helper';

const defaultState = fromJS({
  chosenMoveSteps: []
});

const reducer = (state = defaultState, action, restOfState) => {
  switch (action.type) {
  case Constants.BOARD_SPACE_CLICK:
    return (() => {
      const chosenMoveSteps = state.get('chosenMoveSteps');
      const boardCoords = _.pick(action.payload.boardSpace, 'row', 'col');
      const currentUserPlayerName = getCurrentUserPlayerName(restOfState, action.payload.gameId);

      if (action.payload.boardSpace.piece) {
        return currentUserPlayerName !== action.payload.boardSpace.piece.player
          ? state : state.set('chosenMoveSteps', fromJS([boardCoords]));
      }

      if (!chosenMoveSteps.size) {
        return state.set('chosenMoveSteps', fromJS([boardCoords]));
      }

      const stepsWithThisMoveAdded = chosenMoveSteps.push(fromJS(boardCoords));
      const possibleValidMove = isValidMove(
        getCurrentGame(restOfState, action.payload.gameId).gameState,
        stepsWithThisMoveAdded, 
        currentUserPlayerName
      );

      return possibleValidMove
        ? state.set('chosenMoveSteps', stepsWithThisMoveAdded)
        : state;
    })();
  case Constants.MAKE_MOVE:
    return state.set('chosenMoveSteps', List.of());
  default:
    return state;
  }
};

// Maybe this approach to combining reducers is hacky. We'll see. :)
const combinedReducer = combineReducers({
  firebase: firebaseStateReducer,
  routing: routerReducer
});

export default (state, action) => {
  const nextState = combinedReducer(_.omit(state, 'ui'), action);
  const nextUi = reducer(_.get(state, 'ui'), action, _.omit(nextState, 'ui'));
  return update(nextState, {
    ui: {
      $set: nextUi
    }
  });
};
