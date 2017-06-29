import Board from './Board';
import React from 'React';
import { shallow } from 'enzyme';
import camelotEngine from 'camelot-engine';
const {getBoardSpace} = camelotEngine().query();

describe('Board', () => {
    it('message', () => {
        const gameState = camelotEngine().createEmptyGame();
        expect(shallow(
            <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" message="the message" />
        ).html()).toMatchSnapshot();
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
            expect(shallow(
                <Board gameState={gameState} possibleMove={possibleMove} currentUserPlayer="playerA" />
            ).html()).toMatchSnapshot();
        });
    });

    describe('pieces in goal', () => {
        describe('host goal', () => {
            it('pawn', () => {
                const gameState = camelotEngine().createEmptyGame();

                // TODO: add method to set a piece's location directly
                // without breaking encapsulation like we're doing here.
                getBoardSpace(gameState, {row: 0, col: 5}).piece = {
                    type: 'pawn',
                    player: 'playerA'
                };

                expect(shallow(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" />
                ).html()).toMatchSnapshot();
            });        
            it('knight', () => {
                const gameState = camelotEngine().createEmptyGame();

                // TODO: add method to set a piece's location directly
                // without breaking encapsulation like we're doing here.
                getBoardSpace(gameState, {row: 0, col: 5}).piece = {
                    type: 'knight',
                    player: 'playerA'
                };

                expect(shallow(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" />
                ).html()).toMatchSnapshot();
            });      
        });
        describe('opponent goal', () => {
            it('pawn', () => {
                const gameState = camelotEngine().createEmptyGame();

                // TODO: add method to set a piece's location directly
                // without breaking encapsulation like we're doing here.
                getBoardSpace(gameState, {row: 16, col: 6}).piece = {
                    type: 'pawn',
                    player: 'playerB'
                };

                expect(shallow(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" />
                ).html()).toMatchSnapshot();
            });        
            it('knight', () => {
                const gameState = camelotEngine().createEmptyGame();

                // TODO: add method to set a piece's location directly
                // without breaking encapsulation like we're doing here.
                getBoardSpace(gameState, {row: 16, col: 6}).piece = {
                    type: 'knight',
                    player: 'playerB'
                };

                expect(shallow(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" />
                ).html()).toMatchSnapshot();
            });      
        });
    });

    describe('current user', () => {
        describe('playerA', () => {
            it('active', () => {
                const gameState = camelotEngine().createEmptyGame();
                expect(shallow(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" isCurrentUserActive />
                ).html()).toMatchSnapshot();
            });

            it('not active', () => {
                const gameState = camelotEngine().createEmptyGame();
                expect(shallow(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" />
                ).html()).toMatchSnapshot();
            });
        });
        describe('playerB', () => {
            it('active', () => {
                const gameState = camelotEngine().createEmptyGame();
                expect(shallow(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerB" isCurrentUserActive />
                ).html()).toMatchSnapshot();
            });

            it('not active', () => {
                const gameState = camelotEngine().createEmptyGame();
                expect(shallow(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerB" />
                ).html()).toMatchSnapshot();
            });
        });
    });
});
