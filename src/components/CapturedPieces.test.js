import CapturedPieces from './CapturedPieces';
import React from 'react';
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
                    <CapturedPieces gameState={gameState.toJS()} whosePiecesWereCaptured="host" />
                )).toMatchSnapshot();
      });
      it('opponent is captured', () => {
        expect(reactTestRenderer.create(
                    <CapturedPieces gameState={gameState.toJS()} whosePiecesWereCaptured="opponent" />
                )).toMatchSnapshot();
      });
    });

    describe('captured pieces', () => {
      it('host is captured', () => {
        const withCaptures = gameState
          .setIn(['capturedPieces', 'playerA', 'knight'], 1)
          .setIn(['capturedPieces', 'playerA', 'pawn'], 3);
        expect(reactTestRenderer.create(
          <CapturedPieces gameState={withCaptures.toJS()} whosePiecesWereCaptured="host" />
        )).toMatchSnapshot();
      });
      it('opponent is captured', () => {
        const withCaptures = gameState
          .setIn(['capturedPieces', 'playerB', 'knight'], 4)
          .setIn(['capturedPieces', 'playerB', 'pawn'], 2);
        expect(reactTestRenderer.create(
          <CapturedPieces gameState={withCaptures.toJS()} whosePiecesWereCaptured="opponent" />
        )).toMatchSnapshot();
      });
    });
  });
});
