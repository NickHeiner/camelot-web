import React, {PureComponent} from 'react';
import {Modal} from 'react-bootstrap';
import camelotEngine from 'camelot-engine';
import _ from 'lodash';
import './Board.less';
import autobind from 'autobind-decorator';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {boardSpaceClick} from '../actions';
import BoardSpace from './BoardSpace';

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

    const camelotConstants = camelotEngine().constants(),
      boardPieces = _(camelotConstants.BOARD_HEIGHT)
                .range()
                .map(row => 
                    _(camelotConstants.BOARD_WIDTH)
                        .range()
                        .map(col => 
                          <BoardSpace 
                            row={row} 
                            col={col} 
                            key={`${row}-${col}`} 
                            gameState={this.props.gameState} 
                            possibleMoveSteps={this.props.possibleMoveSteps}
                            currentUserPlayer={this.props.currentUserPlayer}
                            isCurrentUserActive={this.props.isCurrentUserActive}
                        />)
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
