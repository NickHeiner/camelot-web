import BoardSpace from './BoardSpace';
import React from 'React';
import reactTestRenderer from 'react-test-renderer';
import camelotEngine from 'camelot-engine';
import {fromJS} from 'immutable';

describe('BoardSpace', () => {
  describe('board position classnames', () => {
    const gameState = camelotEngine().createEmptyGame();

    const getBoardSpace = (row, col) => <BoardSpace 
      row={row} 
      col={col} 
      gameState={gameState}
      possibleMoveSteps={fromJS([])}
      currentUserPlayer={null}
      isCurrentUserActive={false} />

    it('top-left board space', () => {
      expect(reactTestRenderer.create(getBoardSpace(0, 0))).toMatchSnapshot();
    })

    it('top goal first column', () => {
      expect(reactTestRenderer.create(getBoardSpace(0, 5))).toMatchSnapshot();
    })

    it('top goal second column', () => {
      expect(reactTestRenderer.create(getBoardSpace(0, 6))).toMatchSnapshot();
    })

    it('bottom goal first column', () => {
      expect(reactTestRenderer.create(getBoardSpace(16, 5))).toMatchSnapshot();
    })

    it('bottom goal second column', () => {
      expect(reactTestRenderer.create(getBoardSpace(16, 6))).toMatchSnapshot();
    })
  })
})
