import React, {PureComponent} from 'react';
import classnames from 'classnames';
import {Glyphicon} from 'react-bootstrap';
import {fromJS} from 'immutable';
import {isValidMove, getBoardSpace, isGoal, getPairs, getCoordsBetween} from '../utils/camelot-engine';
import _ from 'lodash';
import camelotEngine from 'camelot-engine';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {boardSpaceClick} from '../actions';

const camelotConstants = camelotEngine().constants();

export class BoardSpace extends PureComponent {
  findBoardSpace = _.partial(getBoardSpace, this.props.gameState);
  
  getBoardSpace = () => this.findBoardSpace(_.pick(this.props, 'row', 'col'));

  onBoardSpaceClick = (boardSpace, possibleValidMove) => {
    if (!this.props.isCurrentUserActive || !boardSpace) {
      return;
    }

    this.props.boardSpaceClick(boardSpace, this.props.gameId);

    // const chosenMoveStepsAddition = _.pick(boardSpace, ['row', 'col']);

    // if (!boardSpace.piece && possibleValidMove) {
    //   this.props.setchosenMoveSteps(this.props.chosenMoveSteps.concat(chosenMoveStepsAddition));
    // } else if (this.props.currentUserPlayer === _.get(boardSpace, ['piece', 'player'])) {
    //   this.props.setchosenMoveSteps([chosenMoveStepsAddition]);
    // }
  }

  render() {
    const {row, col} = this.props,
      boardSpace = this.getBoardSpace(),
      noTopBoardSpace = !this.findBoardSpace({row: row - 1, col}),
      noBottomBoardSpace = !this.findBoardSpace({row: row + 1, col}),
      noLeftBoardSpace = !this.findBoardSpace({row, col: col - 1}),
      noRightBoardSpace = !this.findBoardSpace({row, col: col + 1}),
      spaceClassNames = {
        'board-space': true,
        actual: boardSpace,
        highlight: (row + col) % 2 === 1,
        'first-row': row === 0 || noTopBoardSpace,
        'last-row': row === camelotConstants.BOARD_HEIGHT - 1 || noBottomBoardSpace,
        'first-col': col === 0 || noLeftBoardSpace,
        'last-col': col === camelotConstants.BOARD_WIDTH - 1 || noRightBoardSpace
      };

    let pieceIcon;

    const possibleValidMove = this.props.chosenMoveSteps.size && 
      isValidMove(
        this.props.gameState, 
        this.props.chosenMoveSteps.push(fromJS({row, col})), 
        this.props.currentUserPlayer
      );

    if (boardSpace) {
      let glyph;
      const originalMoveBoardSpace = this.findBoardSpace(this.props.chosenMoveSteps.get(0));
      if (boardSpace.piece) {
        _.merge(spaceClassNames, {
          [boardSpace.piece.type]: true,
          host: boardSpace.piece.player === 'playerA',
          opponent: boardSpace.piece.player === 'playerB',
          'current-player': this.props.isCurrentUserActive && 
            this.props.currentUserPlayer === boardSpace.piece.player
        });

        let spacesBetweenMoves = [];
        const multipleMoveStepsExist = this.props.chosenMoveSteps.size > 1;
        if (multipleMoveStepsExist) {
          const movePairs = getPairs(this.props.chosenMoveSteps);

          spacesBetweenMoves = movePairs.map(movePair => getCoordsBetween(...movePair));
        }

        spaceClassNames['space-between-moves'] = _.some(spacesBetweenMoves, {row, col});

        if (!(_.isEqual(originalMoveBoardSpace, boardSpace) && multipleMoveStepsExist)) {
          glyph = boardSpace.piece.type === 'pawn' ? 'pawn' : 'tower';
        }
      } else {
        const lastMoveBoardSpace = this.findBoardSpace(this.props.chosenMoveSteps.last());
        if (possibleValidMove || _.isEqual(lastMoveBoardSpace, boardSpace)) {
          glyph = originalMoveBoardSpace.piece.type === 'pawn' ? 'pawn' : 'tower';
          _.merge(spaceClassNames, {
            host: this.props.currentUserPlayer === 'playerA',
            opponent: this.props.currentUserPlayer === 'playerB'
          });
        }
      }

      const isGoalSpace = isGoal(this.props.gameState, boardSpace.row, boardSpace.col);
      if (isGoalSpace && !glyph) {
        glyph = 'star';
      }

      if (glyph) {
        pieceIcon = <Glyphicon glyph={glyph} />;
      }

      _.merge(spaceClassNames, {
        'possibly-moving-space': this.props.chosenMoveSteps.find(
          step => step.get('row') === row && step.get('col') === col
        ),
        goal: isGoalSpace,
        'possible-valid-move': possibleValidMove
      });
    }

    return (
      <div 
        onClick={() => this.onBoardSpaceClick(boardSpace, possibleValidMove)}
        className={classnames(spaceClassNames)}>
        {pieceIcon}
      </div>
    );    
  }
}

@connect(
  ({ui}) => ({
    chosenMoveSteps: ui.get('chosenMoveSteps')
  }),
  dispatch => bindActionCreators({
    boardSpaceClick
  }, dispatch)
)
class ConnectedBoardSpace extends React.PureComponent {
  render() {
    return <BoardSpace
      {...this.props}
    />;
  }
}

export default ConnectedBoardSpace;
