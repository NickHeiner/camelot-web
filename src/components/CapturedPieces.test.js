import CapturedPieces from './CapturedPieces';
import React from 'React';
import reactTestRenderer from 'react-test-renderer';
import camelotEngine from 'camelot-engine';

describe('CapturedPieces', () => {
  it('renders when there is no game state', () => {
    expect(reactTestRenderer.create(
            <CapturedPieces />
        )).toMatchSnapshot();
  });

  describe('with game state', () => {
    describe('no captured pieces', () => {
      it('host is captured', () => {
        const gameState = camelotEngine().createEmptyGame();
        expect(reactTestRenderer.create(
                    <CapturedPieces gameState={gameState} whosePiecesWereCaptured="host" />
                )).toMatchSnapshot();
      });
      it('opponent is captured', () => {
        const gameState = camelotEngine().createEmptyGame();
        expect(reactTestRenderer.create(
                    <CapturedPieces gameState={gameState} whosePiecesWereCaptured="opponent" />
                )).toMatchSnapshot();
      });
    });

    describe('captured pieces', () => {
      it('host is captured', () => {
        const gameState = camelotEngine().createEmptyGame();
        gameState.capturedPieces.playerA.knight = 1;
        gameState.capturedPieces.playerA.pawn = 3;
        expect(reactTestRenderer.create(
                    <CapturedPieces gameState={gameState} whosePiecesWereCaptured="host" />
                )).toMatchSnapshot();
      });
      it('opponent is captured', () => {
        const gameState = camelotEngine().createEmptyGame();
        gameState.capturedPieces.playerB.knight = 4;
        gameState.capturedPieces.playerB.pawn = 1;
        expect(reactTestRenderer.create(
                    <CapturedPieces gameState={gameState} whosePiecesWereCaptured="opponent" />
                )).toMatchSnapshot();
      });
    });
  });
});
