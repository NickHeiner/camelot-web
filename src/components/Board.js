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
            activeBoardSpace: {
                row: null,
                col: null
            }
        };
    }
    render() {
        const camelotConstants = camelotEngine().constants(),
            getBoardSpace = camelotEngine().query().getBoardSpace,
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

                                    if (_.isEqual(this.state.activeBoardSpace, {row, col})) {
                                        classNames.push('possibly-moving-piece');
                                    }
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
        if (!this.props.isCurrentUserActive || 
                this.props.currentUserPlayer !== _.get(this.props, ['boardSpace', 'piece', 'player'])) {

            return;
        }

        this.setState({activeBoardSpace: _.pick(boardSpace, ['row', 'col'])});
    }
}

export default Board;
