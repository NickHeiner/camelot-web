import {Glyphicon, Badge} from 'react-bootstrap';
import React, {PureComponent} from 'react';

export default class CapturedPieces extends PureComponent {
  render() {
    const {gameState} = this.props;
    // Is this really necessary or is it an artifact of some other bad practice?
    if (!gameState) {
      return null;
    }

    const whichPlayer = this.props.whosePiecesWereCaptured === 'host' ? 'playerA' : 'playerB';
    return <div className="captured">
            <div className="piece-count-pair">
                <Glyphicon glyph="tower" className={this.props.whosePiecesWereCaptured} /> 
                <Badge>{gameState.capturedPieces[whichPlayer].knight}</Badge> 
            </div>
            <div className="piece-count-pair">
                <Glyphicon glyph="pawn" className={this.props.whosePiecesWereCaptured} /> 
                <Badge>{gameState.capturedPieces[whichPlayer].pawn}</Badge>
            </div>
        </div>;
  }
}
