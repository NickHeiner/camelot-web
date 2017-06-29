import CapturedPieces from './CapturedPieces';
import React from 'React';
import { shallow } from 'enzyme';
import camelotEngine from 'camelot-engine';

describe('CapturedPieces', () => {
    it('renders when there is no game state', () => {
        expect(shallow(
            <CapturedPieces />
        ).html()).toMatchSnapshot();
    });

    describe('with game state', () => {
        describe('no captured pieces', () => {
            it('host is captured', () => {
                const gameState = camelotEngine().createEmptyGame();
                expect(shallow(
                    <CapturedPieces gameState={gameState} whosePiecesWereCaptured="host" />
                ).html()).toMatchSnapshot();
            });
            it('opponent is captured', () => {
                const gameState = camelotEngine().createEmptyGame();
                expect(shallow(
                    <CapturedPieces gameState={gameState} whosePiecesWereCaptured="opponent" />
                ).html()).toMatchSnapshot();
            });
        });

        describe('captured pieces', () => {
            it('host is captured', () => {
                const gameState = camelotEngine().createEmptyGame();
                gameState.capturedPieces.playerA.knight = 1;
                gameState.capturedPieces.playerA.pawn = 3;
                expect(shallow(
                    <CapturedPieces gameState={gameState} whosePiecesWereCaptured="host" />
                ).html()).toMatchSnapshot();
            });
            it('opponent is captured', () => {
                const gameState = camelotEngine().createEmptyGame();
                gameState.capturedPieces.playerB.knight = 4;
                gameState.capturedPieces.playerB.pawn = 1;
                expect(shallow(
                    <CapturedPieces gameState={gameState} whosePiecesWereCaptured="opponent" />
                ).html()).toMatchSnapshot();
            });
        });
    });
});
