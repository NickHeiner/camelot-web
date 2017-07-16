import React, {PureComponent} from 'react';
import {Glyphicon, Modal} from 'react-bootstrap';
import camelotEngine from 'camelot-engine';
import _ from 'lodash';
import './Board.less';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {boardSpaceClick} from '../actions';
import {fromJS} from 'immutable';
import {isValidMove, getBoardSpace, isGoal, getPairs, getCoordsBetween} from '../utils/camelot-engine';

@connect(
  ({ui}) => ({
    possibleMoveSteps: ui.get('possibleMoveSteps')
  }),
  dispatch => bindActionCreators({
    boardSpaceClick
  }, dispatch)
)
class Board extends PureComponent {
  render() {

    let spacesBetweenMoves = [];
    const multipleMoveStepsExist = this.props.possibleMoveSteps.size > 1;
    if (multipleMoveStepsExist) {
      const movePairs = getPairs(this.props.possibleMoveSteps);

      spacesBetweenMoves = movePairs.map(movePair => getCoordsBetween(...movePair));
    }

    const camelotConstants = camelotEngine().constants(),
      boardPieces = _(camelotConstants.BOARD_HEIGHT)
                .range()
                .map(row => 
                    _(camelotConstants.BOARD_WIDTH)
                        .range()
                        .map(col => {
                          const findBoardSpace = _.partial(getBoardSpace, this.props.gameState),
                            boardSpace = findBoardSpace({row, col}),
                            noTopBoardSpace = !findBoardSpace({row: row - 1, col}),
                            noBottomBoardSpace = !findBoardSpace({row: row + 1, col}),
                            noLeftBoardSpace = !findBoardSpace({row, col: col - 1}),
                            noRightBoardSpace = !findBoardSpace({row, col: col + 1}),
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

                          const possibleValidMove = this.props.possibleMoveSteps.size && 
                            isValidMove(
                                this.props.gameState, 
                                this.props.possibleMoveSteps.push(fromJS({row, col})), 
                                this.props.currentUserPlayer
                            );

                          if (boardSpace) {
                            let glyph;
                            const originalMoveBoardSpace = findBoardSpace(this.props.possibleMoveSteps.get(0));
                            if (boardSpace.piece) {
                              _.merge(spaceClassNames, {
                                [boardSpace.piece.type]: true,
                                host: boardSpace.piece.player === 'playerA',
                                opponent: boardSpace.piece.player === 'playerB',
                                'current-player': this.props.isCurrentUserActive && 
                                            this.props.currentUserPlayer === boardSpace.piece.player
                              });

                              spaceClassNames['space-between-moves'] = _.some(spacesBetweenMoves, {row, col});

                              if (!(_.isEqual(originalMoveBoardSpace, boardSpace) && multipleMoveStepsExist)) {
                                glyph = boardSpace.piece.type === 'pawn' ? 'pawn' : 'tower';
                              }
                            } else {
                              const lastMoveBoardSpace = findBoardSpace(this.props.possibleMoveSteps.last());
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
                              'possibly-moving-space': this.props.possibleMoveSteps.find(
                                step => step.get('row') === row && step.get('col') === col
                              ),
                              goal: isGoalSpace,
                              'possible-valid-move': possibleValidMove
                            });
                          }

                          return (
                                <div 
                                    key={`${row}-${col}`} 
                                    onClick={() => this.onBoardSpaceClick(boardSpace, possibleValidMove)}
                                    className={classnames(spaceClassNames)}>
                                    {pieceIcon}
                                </div>
                          );    
                        })
                )
                .flatten()
                .value();
        
    return (
            <div className="board-wrapper modal-container">
                <div className="board">
                    {this.props.message &&  
                        <Modal
                            show={true}
                            container={this}
                            className="status-modal"
                            aria-label="Game status message">
                            <Modal.Body>
                                {this.props.message}
                            </Modal.Body>
                        </Modal>
                    }
                    {boardPieces}
                </div>
            </div>
    );
  }

  @autobind
  onBoardSpaceClick(boardSpace, possibleValidMove) {
    if (!this.props.isCurrentUserActive || !boardSpace) {
      return;
    }

    this.props.boardSpaceClick(boardSpace, this.props.gameId);

    // const possibleMoveStepsAddition = _.pick(boardSpace, ['row', 'col']);

    // if (!boardSpace.piece && possibleValidMove) {
    //   this.props.setpossibleMoveSteps(this.props.possibleMoveSteps.concat(possibleMoveStepsAddition));
    // } else if (this.props.currentUserPlayer === _.get(boardSpace, ['piece', 'player'])) {
    //   this.props.setpossibleMoveSteps([possibleMoveStepsAddition]);
    // }
  }
}

export default Board;
