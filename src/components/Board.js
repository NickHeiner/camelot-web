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
                                    actual: boardSpace
                                };

                            let pieceIcon;

                            const possibleValidMove = this.props.possibleMove.length && 
                                isValidMove(
                                    this.props.gameState, 
                                    this.props.possibleMove.concat({row, col}), 
                                    this.props.currentUserPlayer
                                );

                            if (boardSpace) {
                                if (boardSpace.piece) {
                                    _.merge(classNames, {
                                        piece: true,
                                        [boardSpace.piece.type]: true,
                                        host: boardSpace.piece.player === 'playerA',
                                        opponent: boardSpace.piece.player === 'playerB',
                                        'current-player': this.props.isCurrentUserActive && 
                                            this.props.currentUserPlayer === boardSpace.piece.player
                                    });

                                    const glyph = boardSpace.piece.type === 'pawn' ? 'pawn' : 'tower';
                                    pieceIcon = <Glyphicon glyph={glyph} />;
                                }

                                _.merge(classNames, {
                                    'possibly-moving-space': _.find(this.props.possibleMove, {row, col}),
                                    goal: isGoal(this.props.gameState, boardSpace.row, boardSpace.col),
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
