import {PresentationGamePlay} from './Play';
import React from 'React';
import {fromJS} from 'immutable';
import {setPieceInBoardSpace, getGameStateWithPiece, shallowRenderComponent} from '../../utils/test-utils';

describe('GamePlay', () => {
  it('renders with no games', () => {
    expect(shallowRenderComponent(
      <PresentationGamePlay />
    )).toMatchSnapshot();
  });

  it('renders with a game that has a winner', () => {
    const gameState = getGameStateWithPiece({row: 0, col: 5}, {
      type: 'pawn',
      player: 'playerA'
    });
    const gameStateWithWinner = setPieceInBoardSpace(gameState, {row: 0, col: 6}, {
      type: 'pawn',
      player: 'playerA'
    });

    const game = fromJS({
      gameState: gameStateWithWinner
    });

    const host = fromJS({
      uid: 'host-uid'
    });

    const opponent = fromJS({
      uid: 'host-uid'
    });

    const chosenMoveSteps = fromJS([]);

    expect(shallowRenderComponent(
      <PresentationGamePlay game={game} host={host} 
        opponent={opponent} currentUser={host} chosenMoveSteps={chosenMoveSteps} />
    )).toMatchSnapshot();
  });
});
