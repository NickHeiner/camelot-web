import Board from './Board';
import React from 'React';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import camelotEngine from 'camelot-engine';
const {getBoardSpace} = camelotEngine().query();

const renderComponent = component => {
  const renderer = new ReactShallowRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
};

describe('Board', () => {
  // This fails because of what looks like a sub-dep of react-bootstrap.
  it.skip('message', () => {
    const gameState = camelotEngine().createEmptyGame();
    const renderOutput = renderComponent(
        <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" message="the message" />
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
      expect(renderComponent(
                <Board gameState={gameState} possibleMove={possibleMove} currentUserPlayer="playerA" />
            )).toMatchSnapshot();
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

        expect(renderComponent(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" />
                )).toMatchSnapshot();
      });            
      it('knight', () => {
        const gameState = camelotEngine().createEmptyGame();

                // TODO: add method to set a piece's location directly
                // without breaking encapsulation like we're doing here.
        getBoardSpace(gameState, {row: 0, col: 5}).piece = {
          type: 'knight',
          player: 'playerA'
        };

        expect(renderComponent(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" />
                )).toMatchSnapshot();
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

        expect(renderComponent(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" />
                )).toMatchSnapshot();
      });        
      it('knight', () => {
        const gameState = camelotEngine().createEmptyGame();

                // TODO: add method to set a piece's location directly
                // without breaking encapsulation like we're doing here.
        getBoardSpace(gameState, {row: 16, col: 6}).piece = {
          type: 'knight',
          player: 'playerB'
        };

        expect(renderComponent(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" />
                )).toMatchSnapshot();
      });      
    });
  });

  describe('current user', () => {
    describe('playerA', () => {
      it('active', () => {
        const gameState = camelotEngine().createEmptyGame();
        expect(renderComponent(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" isCurrentUserActive />
                )).toMatchSnapshot();
      });

      it('not active', () => {
        const gameState = camelotEngine().createEmptyGame();
        expect(renderComponent(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerA" />
                )).toMatchSnapshot();
      });
    });
    describe('playerB', () => {
      it('active', () => {
        const gameState = camelotEngine().createEmptyGame();
        expect(renderComponent(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerB" isCurrentUserActive />
                )).toMatchSnapshot();
      });

      it('not active', () => {
        const gameState = camelotEngine().createEmptyGame();
        expect(renderComponent(
                    <Board gameState={gameState} possibleMove={[]} currentUserPlayer="playerB" />
                )).toMatchSnapshot();
      });
    });
  });
});
