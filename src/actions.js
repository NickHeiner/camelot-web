import * as Constants from './constants';

export const boardSpaceClick = boardSpace => ({
  type: Constants.BOARD_SPACE_CLICK,
  payload: {boardSpace}
});
