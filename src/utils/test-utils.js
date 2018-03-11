import ReactShallowRenderer from 'react-test-renderer/shallow';
import camelotEngine from 'camelot-engine';
const {getBoardSpace} = camelotEngine().query();

export const getDummyCurrentUser = () => ({
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
};

export const getGameStateWithPiece = (coords, piece) => setPieceInBoardSpace(
  camelotEngine().createEmptyGame(),
  coords, piece
);

export const shallowRenderComponent = component => {
  const renderer = new ReactShallowRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
};
