import * as Constants from './constants';

export const boardSpaceClick = (boardSpace, gameId) => ({
  type: Constants.BOARD_SPACE_CLICK,
  payload: {
    boardSpace,
    gameId
  }
});
