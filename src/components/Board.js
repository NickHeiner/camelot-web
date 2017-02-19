import React, {Component} from 'react';
import { Glyphicon } from 'react-bootstrap';
import camelotEngine from 'camelot-engine';
import _ from 'lodash';
import './Board.less';
import autobind from 'autobind-decorator';

const {getBoardSpace, isValidMove} = camelotEngine().query();

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
                                classNames = ['board-space'];

                            let glyph;

                            if (boardSpace) {
                                classNames.push('actual');

                                if (boardSpace.piece) {
                                    classNames.push(
                                        'piece', 
                                        boardSpace.piece.type,
                                        boardSpace.piece.player === 'playerA' ? 'host' : 'opponent'
                                    );
                                    glyph = boardSpace.piece.type === 'pawn' ? 'pawn' : 'tower';

                                    if (this.props.isCurrentUserActive && this.props.currentUserPlayer === boardSpace.piece.player) {
                                        classNames.push('current-player');
                                    }
                                }

                                if (_.find(this.props.possibleMove, {row, col})) {
                                    classNames.push('possibly-moving-space');
                                }

                                if (this.props.possibleMove.length && isValidMove(
                                        this.props.gameState, 
                                        this.props.possibleMove.concat({row, col}), 
                                        this.props.currentUserPlayer
                                    )
                                ) {
                                    classNames.push('possible-valid-move');
                                }
                            }

                            return (
                                <div 
                                    key={`${row}-${col}`} 
                                    onClick={() => this.onBoardSpaceClick(boardSpace)}
                                    className={classNames.join(' ')}>
                                    {glyph && <Glyphicon glyph={glyph} />}
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
    onBoardSpaceClick(boardSpace) {
        if (!this.props.isCurrentUserActive) {
            return;
        }

        const possibleMoveAddition = _.pick(boardSpace, ['row', 'col']),
            moveIsValidWithAddition = isValidMove(
                this.props.gameState,
                this.props.possibleMove.concat(possibleMoveAddition),
                this.props.currentUserPlayer
            );

        if (!boardSpace.piece && this.props.possibleMove.length && moveIsValidWithAddition) {
            this.props.setPossibleMove(this.props.possibleMove.concat(possibleMoveAddition));
        } else if (this.props.currentUserPlayer === _.get(boardSpace, ['piece', 'player'])) {
            this.props.setPossibleMove([possibleMoveAddition]);
        }
    }
}

export default Board;
