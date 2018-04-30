import * as Constants from './constants';
import {getFirebase} from 'react-redux-firebase';
import {applyMoves} from './utils/camelot-engine';

export const boardSpaceClick = (boardSpace, gameId) => ({
  type: Constants.BOARD_SPACE_CLICK,
  payload: {
    boardSpace,
    gameId
  }
});

export const makeMove = (gameId, gameState, chosenMoveSteps) => {
  const firebase = getFirebase();
  const newGameState = applyMoves(gameState, chosenMoveSteps);
  firebase.set(`games/${gameId}/gameState`, newGameState);
  return {
    type: Constants.MAKE_MOVE,
    payload: {
      gameId
    }
  };
};
