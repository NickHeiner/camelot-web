import * as Constants from './constants';

export const boardSpaceClick = (boardSpace, gameId) => ({
  type: Constants.BOARD_SPACE_CLICK,
  payload: {
    boardSpace,
    gameId
  }
});

export const makeMove = (gameId) => ({
  type: Constants.MAKE_MOVE,
  payload: {
    gameId
  }
});
