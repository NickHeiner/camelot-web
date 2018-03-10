import CapturedPieces from './CapturedPieces';
import React from 'React';
import reactTestRenderer from 'react-test-renderer';
import camelotEngine from 'camelot-engine';
import {fromJS} from 'immutable';

/* eslint-disable no-magic-numbers */

describe('CapturedPieces', () => {
  it('renders when there is no game state', () => {
    expect(reactTestRenderer.create(
            <CapturedPieces />
        )).toMatchSnapshot();
  });

  const gameState = fromJS(camelotEngine().createEmptyGame());

  describe('with game state', () => {
    describe('no captured pieces', () => {
      it('host is captured', () => {
        expect(reactTestRenderer.create(
                    <CapturedPieces gameState={gameState} whosePiecesWereCaptured="host" />
                )).toMatchSnapshot();
      });
      it('opponent is captured', () => {
        expect(reactTestRenderer.create(
                    <CapturedPieces gameState={gameState} whosePiecesWereCaptured="opponent" />
                )).toMatchSnapshot();
      });
    });

    describe('captured pieces', () => {
      it('host is captured', () => {
        gameState.setIn(['capturedPieces', 'playerA', 'knight'], 1);
        gameState.setIn(['capturedPieces', 'playerA', 'pawn'], 3);
        expect(reactTestRenderer.create(
                    <CapturedPieces gameState={gameState} whosePiecesWereCaptured="host" />
                )).toMatchSnapshot();
      });
      it('opponent is captured', () => {
        gameState.setIn(['capturedPieces', 'playerB', 'knight'], 4);
        gameState.setIn(['capturedPieces', 'playerB', 'pawn'], 2);
        expect(reactTestRenderer.create(
                    <CapturedPieces gameState={gameState} whosePiecesWereCaptured="opponent" />
                )).toMatchSnapshot();
      });
    });
  });
});
