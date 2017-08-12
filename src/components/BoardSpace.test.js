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
      currentUserPlayer={null}
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
});
