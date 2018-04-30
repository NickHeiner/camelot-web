import {PresentationGamePlay} from './Play';
import React from 'react';
import {fromJS} from 'immutable';
import camelotEngine from 'camelot-engine';

import {setPieceInBoardSpace, getGameStateWithPiece, shallowRenderComponent} from '../../utils/test-utils';

describe('GamePlay', () => {
  it('renders with no games', () => {
    expect(shallowRenderComponent(
      <PresentationGamePlay />
    )).toMatchSnapshot();
  });

  it('renders a game with no winner where the host is active', () => {
    const game = {
      gameState: camelotEngine().createEmptyGame()
    };

    const host = {
      uid: 'host-uid',
      displayName: 'host-name'
    };

    const opponent = {
      uid: 'opponent-uid',
      displayName: 'opponent-name'
    };

    const chosenMoveSteps = fromJS([]);

    expect(shallowRenderComponent(
      <PresentationGamePlay game={game} host={host} 
        opponent={opponent} currentUser={host} chosenMoveSteps={chosenMoveSteps} />
    )).toMatchSnapshot();
  });

  it('renders a game with no winner where the opponent is active', () => {
    const game = {
      gameState: camelotEngine().update().applyMoves(
        camelotEngine().createEmptyGame(), 
        [{col: 3, row: 5}, {col: 3, row: 6}]
      )
    };

    const host = {
      uid: 'host-uid',
      displayName: 'host-name'
    };

    const opponent = {
      uid: 'opponent-uid',
      displayName: 'opponent-name'
    };

    const chosenMoveSteps = fromJS([]);

    expect(shallowRenderComponent(
      <PresentationGamePlay game={game} host={host} 
        opponent={opponent} currentUser={host} chosenMoveSteps={chosenMoveSteps} />
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

    const game = {
      gameState: gameStateWithWinner
    };

    const host = {
      uid: 'host-uid'
    };

    const opponent = {
      uid: 'opponent-uid',
      displayName: 'opponent-name'
    };

    const chosenMoveSteps = fromJS([]);

    expect(shallowRenderComponent(
      <PresentationGamePlay game={game} host={host} 
        opponent={opponent} currentUser={host} chosenMoveSteps={chosenMoveSteps} />
    )).toMatchSnapshot();
  });
});
