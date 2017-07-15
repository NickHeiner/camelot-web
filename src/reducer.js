import * as Constants from './constants';
import {fromJS, List} from 'immutable';
import _ from 'lodash';
import camelotEngine from 'camelot-engine';
const {isValidMove} = camelotEngine().query();

const defaultState = fromJS({
  possibleMoveSteps: []
});

const getCurrentGame = (fullState, gameId) => fullState.firebase.getIn(['data', 'games', gameId]);

const getCurrentUserPlayerName = (fullState, gameId) => {
  const currentUserUid = fullState.firebase.getIn(['profile', 'uid']);
  const currentGame = getCurrentGame(fullState, gameId);
  const currentHostUid = fullState.firebase.getIn(['data', 'users', currentGame.get('host')]);
  const currentOpponentUid = fullState.firebase.getIn(['data', 'users', currentGame.get('opponent')]);

  if (currentUserUid === currentHostUid) {
    return 'playerA';
  }
  if (currentUserUid === currentOpponentUid) {
    return 'playerB';
  }
  return null;
};

export default (state = defaultState, action, restOfState) => {
  switch (action.type) {
  case Constants.BOARD_SPACE_CLICK:
    return (() => {
      const possibleMoveSteps = state.get('possibleMoveSteps');
      const boardCoords = _.pick(action.payload.boardSpace, 'row', 'col');
      const possibleValidMove = isValidMove(
        getCurrentGame(restOfState, action.payload.gameId),
        possibleMoveSteps.push(boardCoords), 
        getCurrentUserPlayerName(restOfState, action.payload.gameId)
      );

      if (!possibleMoveSteps.size) {
        return state.set('possibleMoveSteps', fromJS([boardCoords]));
      }
    })();
  default:
    return state;
  }
};
