import React, {Component} from 'react';
import { Glyphicon } from 'react-bootstrap';
import camelotEngine from 'camelot-engine';
import _ from 'lodash';

class Board extends Component {
    render() {
        const camelotConstants = camelotEngine().constants(),
            boardPieces = _(camelotConstants.BOARD_HEIGHT)
                .range()
                .map(row => 
                    _(camelotConstants.BOARD_WIDTH)
                        .range()
                        .map(col => {
                            const boardSpace = _.find(this.props.gameState.boardSpaces, {row, col}),
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
                            }

                            return (
                                <div 
                                    key={`${row}-${col}`} 
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
}

export default Board;



