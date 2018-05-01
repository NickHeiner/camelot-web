import React, {PureComponent} from 'react';
import {Map} from 'immutable';
import {Modal} from 'react-bootstrap';
import camelotEngine from 'camelot-engine';
import _ from 'lodash';
import './Board.less';
import BoardSpace from './BoardSpace';
import MoveArrows from './MoveArrows';

class BoardSpaceWrapper extends PureComponent {
  setRef = ref => this.props.receiveRef(this.props.row, this.props.col, ref);

  render() {
    const {row, col, gameId, gameState, currentUserPlayer, isCurrentUserActive} = this.props;
    return <BoardSpace 
      row={row} 
      col={col} 
      ref={this.setRef}
      gameId={gameId}
      gameState={gameState} 
      currentUserPlayer={currentUserPlayer}
      isCurrentUserActive={isCurrentUserActive}
    />;
  }
}

class Board extends PureComponent {
  constructor() {
    super();
    this.state = {refs: Map.of()};
  }

  getBoardSpaceRef = (row, col, ref) => this.setState(({refs}) => ({
    refs: refs.setIn(['refs', row, col], ref)
  }))

  render() {

    const camelotConstants = camelotEngine().constants(),
      boardPieces = _(camelotConstants.BOARD_HEIGHT)
        .range()
        .map(row => _(camelotConstants.BOARD_WIDTH)
          .range()
          .map(col => 
            <BoardSpaceWrapper row={row} col={col} receiveRef={this.getBoardSpaceRef} key={`${row}-${col}`}
              {..._.pick(this.props, 'gameId', 'gameState', 'currentUserPlayer', 'isCurrentUserActive')}
            />
          )
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
          <MoveArrows boardSpaceRefs={this.state.refs} />
        </div>
      </div>
    );
  }
}

export default Board;
