import React, {Component} from 'react';
import { Glyphicon } from 'react-bootstrap';
import camelotEngine from 'camelot-engine';
import _ from 'lodash';
import './Board.less';
import autobind from 'autobind-decorator';

class Board extends Component {
    render() {
        const camelotConstants = camelotEngine().constants(),
            boardPieces = _(camelotConstants.BOARD_HEIGHT)
                .range()
                .map(row => 
                    _(camelotConstants.BOARD_WIDTH)
                        .range()
                        .map(col => {
                            const boardSpace = _.find(this.props.gameState.boardSpaces, {row, col});
                            return <BoardSpace boardSpace={boardSpace} row={row} col={col}
                                        isCurrentUserActive={this.props.isCurrentUserActive} 
                                        currentUserPlayer={this.props.currentUserPlayer} />;
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

class BoardSpace extends Component {
    constructor() {
        super();
        this.state = {
            possiblyMovingPiece: false
        };
    }
    render() {
        const boardSpace = this.props.boardSpace,
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

                if (this.state.possiblyMovingPiece) {
                    classNames.push('possibly-moving-piece');
                }
            }
        }

        return (
            <div key={`${this.props.row}-${this.props.col}`} 
                onClick={this.onBoardSpaceClick}
                className={classNames.join(' ')}>
                {glyph && <Glyphicon glyph={glyph} />}
            </div>
        );
    }

    @autobind
    onBoardSpaceClick(boardSpace) {
        if (!this.props.isCurrentUserActive || 
                this.props.currentUserPlayer !== _.get(this.props, ['boardSpace', 'piece', 'player'])) {

            return;
        }

        this.setState({possiblyMovingPiece: true});
    }
}

export default Board;


