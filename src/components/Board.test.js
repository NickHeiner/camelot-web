import Board from './Board';
import React from 'React';
import camelotEngine from 'camelot-engine';
import {getGameStateWithPiece, shallowRenderComponent} from '../utils/test-utils';

describe('Board', () => {
  // This fails because of what looks like a sub-dep of react-bootstrap.
  it.skip('message', () => {
    const gameState = camelotEngine().createEmptyGame();
    const renderOutput = shallowRenderComponent(
      <Board gameState={gameState} possibleMove={[]} 
        currentUserPlayer="playerA" message="the message" gameId="game-id" />
    );
    expect(renderOutput).toMatchSnapshot();
  });

  describe('possible moves', () => {
    it('single possible move', () => {
      const gameState = camelotEngine().createEmptyGame();
      const possibleMove = [
        {
          row: 5,
          col: 5
        },
        {
          row: 5,
          col: 6
        }
      ];
      expect(shallowRenderComponent(
        <Board gameState={gameState} possibleMove={possibleMove} currentUserPlayer="playerA" gameId="game-id" />
      )).toMatchSnapshot();
    });
  });



  describe('pieces in goal', () => {
    describe('host goal', () => {
      it('pawn', () => {
        const gameState = getGameStateWithPiece(
          {row: 0, col: 5}, 
          {
            type: 'pawn',
            player: 'playerA'
          }
        );

        expect(shallowRenderComponent(
          <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" gameId="game-id" />
        )).toMatchSnapshot();
      });            
      it('knight', () => {
        const gameState = getGameStateWithPiece(
          {row: 0, col: 5}, 
          {
            type: 'knight',
            player: 'playerA'
          }
        );
        
        expect(shallowRenderComponent(
          <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" gameId="game-id" />
        )).toMatchSnapshot();
      });      
    });
    describe('opponent goal', () => {
      it('pawn', () => {
        const gameState = getGameStateWithPiece(
          {row: 16, col: 6}, 
          {
            type: 'pawn',
            player: 'playerB'
          }
        );
        
        expect(shallowRenderComponent(
          <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" gameId="game-id"  />
        )).toMatchSnapshot();
      });        
      it('knight', () => {
        const gameState = getGameStateWithPiece(
          {row: 16, col: 6}, 
          {
            type: 'knight',
            player: 'playerB'
          }
        );

        expect(shallowRenderComponent(
          <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" gameId="game-id" />
        )).toMatchSnapshot();
      });      
    });
  });

  describe('current user', () => {
    describe('playerA', () => {
      it('active', () => {
        const gameState = camelotEngine().createEmptyGame();
        expect(shallowRenderComponent(
          <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" 
            isCurrentUserActive gameId="game-id" />
        )).toMatchSnapshot();
      });

      it('not active', () => {
        const gameState = camelotEngine().createEmptyGame();
        expect(shallowRenderComponent(
          <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" gameId="game-id" />
        )).toMatchSnapshot();
      });
    });
    describe('playerB', () => {
      it('active', () => {
        const gameState = camelotEngine().createEmptyGame();
        expect(shallowRenderComponent(
          <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerB" isCurrentUserActive gameId="game-id" />
        )).toMatchSnapshot();
      });

      it('not active', () => {
        const gameState = camelotEngine().createEmptyGame();
        expect(shallowRenderComponent(
          <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerB" gameId="game-id" />
        )).toMatchSnapshot();
      });
    });
  });
});
