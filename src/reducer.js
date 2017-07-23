import * as Constants from './constants';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {isValidMove} from './utils/camelot-engine';
import {getCurrentGame, getCurrentUserPlayerName} from './utils/reducer-utils';
import {combineReducers} from 'redux';
import {firebaseStateReducer} from 'react-redux-firebase';
import {routerReducer} from 'react-router-redux';

const defaultState = fromJS({
  possibleMoveSteps: []
});

const reducer = (state = defaultState, action, restOfState) => {
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

      return possibleValidMove
        ? state.set('possibleMoveSteps', stepsWithThisMoveAdded)
        : state;
    })();
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
  return {
    ...nextState,
    ui: nextUi
  };
};
