/* eslint-disable no-magic-numbers */
import _ from 'lodash';
import {BoardSpace} from './BoardSpace';
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
      chosenMoveSteps={fromJS([])}
      currentUserPlayer="playerA"
      isCurrentUserActive={false} />;

    const camelotConstants = camelotEngine().constants();
    _(camelotConstants.BOARD_HEIGHT)
      .range()
      .forEach(row => 
          _(camelotConstants.BOARD_WIDTH)
              .range()
              .forEach(col => 
                it(`renders (row=${row}, col=${col}) correctly`, () => {
                  expect(reactTestRenderer.create(getBoardSpace(row, col))).toMatchSnapshot();
                })
              )
      );
  });

  it.only('when the user has chosen the first step of a move', () => {
    const gameState = camelotEngine().createEmptyGame();

    const chosenCol = 6;
    const chosenRow = 9;
    const boardSpace = <BoardSpace 
      row={chosenRow - 1} 
      col={chosenCol} 
      gameState={gameState}
      chosenMoveSteps={fromJS([{row: chosenRow, col: chosenCol}])}
      currentUserPlayer="playerA"
      isCurrentUserActive={false} />;

    expect(reactTestRenderer.create(boardSpace)).toMatchSnapshot();
  });
});
