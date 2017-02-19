import React, {Component} from 'react';
import { Glyphicon } from 'react-bootstrap';
import camelotEngine from 'camelot-engine';
import _ from 'lodash';
import './Board.less';
import autobind from 'autobind-decorator';
import classnames from 'classnames';

const {getBoardSpace, isValidMove, isGoal} = camelotEngine().query();

class Board extends Component {
    render() {
        const camelotConstants = camelotEngine().constants(),
            boardPieces = _(camelotConstants.BOARD_HEIGHT)
                .range()
                .map(row => 
                    _(camelotConstants.BOARD_WIDTH)
                        .range()
                        .map(col => {
                            const boardSpace = getBoardSpace(this.props.gameState, {row, col}),
                                classNames = {
                                    'board-space': true,
                                    actual: boardSpace,
                                    highlight: (row + col) % 2 === 1
                                };

                            let pieceIcon;

                            const possibleValidMove = this.props.possibleMove.length && 
                                isValidMove(
                                    this.props.gameState, 
                                    this.props.possibleMove.concat({row, col}), 
                                    this.props.currentUserPlayer
                                );

                            if (boardSpace) {
                                let glyph;
                                const originalMoveBoardSpace = getBoardSpace(this.props.gameState, this.props.possibleMove[0]);
                                if (boardSpace.piece) {
                                    _.merge(classNames, {
                                        [boardSpace.piece.type]: true,
                                        host: boardSpace.piece.player === 'playerA',
                                        opponent: boardSpace.piece.player === 'playerB',
                                        'current-player': this.props.isCurrentUserActive && 
                                            this.props.currentUserPlayer === boardSpace.piece.player
                                    });

                                    if (!(_.isEqual(originalMoveBoardSpace, boardSpace) && this.props.possibleMove.length > 1)) {
                                        glyph = boardSpace.piece.type === 'pawn' ? 'pawn' : 'tower';
                                    }
                                } else {
                                    const lastMoveBoardSpace = getBoardSpace(this.props.gameState, _.last(this.props.possibleMove));
                                    if (possibleValidMove || _.isEqual(lastMoveBoardSpace, boardSpace)) {
                                        glyph = originalMoveBoardSpace.piece.type === 'pawn' ? 'pawn' : 'tower';
                                        _.merge(classNames, {
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

                                _.merge(classNames, {
                                    'possibly-moving-space': _.find(this.props.possibleMove, {row, col}),
                                    goal: isGoalSpace,
                                    'possible-valid-move': possibleValidMove
                                });
                            }

                            return (
                                <div 
                                    key={`${row}-${col}`} 
                                    onClick={() => this.onBoardSpaceClick(boardSpace, possibleValidMove)}
                                    className={classnames(classNames)}>
                                    {pieceIcon}
                                </div>
                            );    
                        })
                )
                .flatten()
                .value();
        
        return (
            <div className="board">
                {boardPieces}
            </div>
        );
    }

    @autobind
    onBoardSpaceClick(boardSpace, possibleValidMove) {
        if (!this.props.isCurrentUserActive) {
            return;
        }

        const possibleMoveAddition = _.pick(boardSpace, ['row', 'col']);

        if (!boardSpace.piece && possibleValidMove) {
            this.props.setPossibleMove(this.props.possibleMove.concat(possibleMoveAddition));
        } else if (this.props.currentUserPlayer === _.get(boardSpace, ['piece', 'player'])) {
            this.props.setPossibleMove([possibleMoveAddition]);
        }
    }
}

export default Board;
