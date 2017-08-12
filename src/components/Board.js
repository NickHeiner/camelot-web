import React, {PureComponent} from 'react';
import {Modal} from 'react-bootstrap';
import camelotEngine from 'camelot-engine';
import _ from 'lodash';
import './Board.less';
import BoardSpace from './BoardSpace';

class Board extends PureComponent {
  render() {

    const camelotConstants = camelotEngine().constants(),
      boardPieces = _(camelotConstants.BOARD_HEIGHT)
                .range()
                .map(row => _(camelotConstants.BOARD_WIDTH)
                    .range()
                    .map(col => 
                        <BoardSpace 
                        row={row} 
                        col={col} 
                        key={`${row}-${col}`} 
                        gameState={this.props.gameState} 
                        currentUserPlayer={this.props.currentUserPlayer}
                        isCurrentUserActive={this.props.isCurrentUserActive}
                    />)
                    .value()
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
}

export default Board;
