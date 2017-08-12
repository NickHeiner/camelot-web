import {fromJS} from 'immutable';
import camelotEngine from 'camelot-engine';
const {getBoardSpace} = camelotEngine().query();

export const getDummyCurrentUser = () => fromJS({
  photoURL: 'photoURL',
  displayName: 'Display Name'
});

// TODO: add method to set a piece's location directly
// without breaking encapsulation like we're doing here.
export const setPieceInBoardSpace = (gameState, {row, col}, piece) => {
  getBoardSpace(gameState, {row, col}).piece = {
    type: 'pawn',
    player: 'playerA'
  };
  return gameState;
}
