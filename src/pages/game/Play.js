import React, {PureComponent} from 'react';
import autobind from 'autobind-decorator';
import Avatar from '../../components/Avatar';
import Board from '../../components/Board';
import './Play.less';
import {Button} from 'react-bootstrap';
import CapturedPieces from '../../components/CapturedPieces';
import _ from 'lodash';
import {firebaseConnect} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {makeMove} from '../../actions';

import camelotEngine from 'camelot-engine';
const {isValidMove, getGameWinner} = camelotEngine().query();

export class PresentationGamePlay extends PureComponent {
  render() {
    let gameDisplay;
    if (this.props.host === undefined || this.props.opponent === undefined) {
      gameDisplay = <p>Loading...</p>;
    } else if (this.props.game === null) {
      gameDisplay = <p>This link is not valid. Did someone share it with you incorrectly?</p>;
    } else {
      const currentUserUid = this.props.currentUser.uid,
        currentUserIsHost = currentUserUid === this.props.host.uid;

      let findOpponentMessage;
      if (!this.props.opponent) {
        if (currentUserIsHost) {
          findOpponentMessage = <p>Find someone to play with you by sharing this link with them.</p>;
        } else {
          findOpponentMessage = (
              <div>
                <p>This game is currently looking for an opponent.</p>
                <Button bsStyle="primary" onClick={this.joinGame}>Join</Button>
              </div>
          );
        }
      }

      const gameState = this.props.game.gameState;
      let activeUser = null;
      let isCurrentUserActive = false;
      let currentUserPlayer = null;
      let userHasValidMove = false;
      let gameWinner = null;
      if (gameState) {
        activeUser = gameState.turnCount % 2 === 0 ? 'host' : 'opponent';

        isCurrentUserActive = currentUserUid === this.props[activeUser].uid;

        const opponentUid = this.props.opponent && this.props.opponent.uid;

        currentUserPlayer = currentUserUid === this.props.host.uid ? 'playerA' 
                    : currentUserUid === opponentUid ? 'playerB' : null;

        // I don't know why isValidMove considers [] and [singleMove] to be valid.
        userHasValidMove = this.props.chosenMoveSteps.size > 1 && 
                    isValidMove(gameState, this.props.chosenMoveSteps, currentUserPlayer);

        gameWinner = getGameWinner(gameState);
      }

      gameDisplay = (
                <div>
                    <Board gameState={gameState} 
                        isCurrentUserActive={isCurrentUserActive}
                        possibleMove={this.props.chosenMoveSteps}
                        gameId={this.props.gameId}
                        message={findOpponentMessage || this.getWinMessage(gameWinner)}
                        currentUserPlayer={currentUserPlayer} />
                    <div className="control-bar">
                        <Avatar currentUser={this.props.host} isActive={activeUser === 'host'} />
                        <CapturedPieces whosePiecesWereCaptured="opponent" gameState={gameState} />
                        {
                            isCurrentUserActive
                                ? <Button bsStyle="primary" 
                                    disabled={!userHasValidMove} 
                                    onClick={this.makeMove}>Make Move</Button>
                                : <p>Other player's turn</p>
                        }
                        <CapturedPieces whosePiecesWereCaptured="host" gameState={gameState} />
                        <Avatar currentUser={this.props.opponent} isActive={activeUser === 'opponent'} />
                    </div>
                </div>
            );
    }

    return gameDisplay;
  }

  @autobind
  joinGame() {
    this.props.firebase
            .ref(`/games/${this.props.gameId}/opponent`)
            .set(this.props.currentUser.uid);
  }

  @autobind
  makeMove() {
    this.props.makeMove(this.props.gameId, this.props.game.gameState, this.props.chosenMoveSteps);
  }

  @autobind
  getWinMessage(gameWinner) {
    if (!gameWinner) {
      return;
    }
    const winningUser = gameWinner === 'playerA' ? this.props.host : this.props.opponent;
    return `${winningUser.displayName} wins!`;
  }
}

@firebaseConnect(['/games', '/users'])
@connect(
  ({firebase, ui}, ownProps) => {
    const game = _.get(firebase.data, ['games', ownProps.params.id]);
    
    return {
      game,
      chosenMoveSteps: ui.get('chosenMoveSteps'),
      host: game && _.get(firebase.data.users, game.host),
      opponent: game && _.get(firebase.data.users, game.opponent, null),
      currentUser: firebase.profile
    };
  },
  dispatch => bindActionCreators({
    makeMove
  }, dispatch)
)
export default class GamePlayContainer extends PureComponent {
  render = () => Boolean(this.props.game) && 
    <PresentationGamePlay gameId={this.props.params.id} {...this.props} />
}
