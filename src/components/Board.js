import React, {Component} from 'react';
import { Glyphicon } from 'react-bootstrap';
import camelotEngine from 'camelot-engine';
import _ from 'lodash';
import './Board.less';
import autobind from 'autobind-decorator';

class Board extends Component {
    constructor() {
        super();
        this.state = {
            possibleMove: []
        };
    }
    render() {
        const camelotConstants = camelotEngine().constants(),
            {getBoardSpace, isValidMove} = camelotEngine().query(),
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

                                }
                                
                                if (_.find(this.state.possibleMove, {row, col})) {
                                    classNames.push('possibly-moving-space');
                                }

                                if (this.state.possibleMove.length && isValidMove(
                                        this.props.gameState, 
                                        this.state.possibleMove.concat({row, col}), 
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

        const possibleMoveAddition = _.pick(boardSpace, ['row', 'col']);
        if (!boardSpace.piece && this.state.possibleMove.length) {
            this.setState({possibleMove: this.state.possibleMove.concat(possibleMoveAddition)});
            return;
        }
        
        if (this.props.currentUserPlayer === _.get(boardSpace, ['piece', 'player'])) {
            this.setState({possibleMove: [possibleMoveAddition]});
        }
    }
}

export default Board;
