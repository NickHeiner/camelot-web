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

import camelotEngine from 'camelot-engine';
const {isValidMove, getGameWinner} = camelotEngine().query();

@firebaseConnect(['/users'])
@connect(
    ({firebase, ui}, ownProps) => ({
      possibleMoveSteps: ui.get('possibleMoveSteps'),
      host: firebase.getIn(['data', 'users', ownProps.game.get('host')]),
      opponent: firebase.getIn(['data', 'users', ownProps.game.get('opponent')], null),
      currentUser: firebase.get('profile')
    })
)
class GamePlay extends PureComponent {
  render() {
    let gameDisplay;
    if (this.props.game === undefined || this.props.host === undefined || this.props.opponent === undefined) {
      gameDisplay = <p>Loading...</p>;
    } else if (this.props.game === null) {
      gameDisplay = <p>This link is not valid. Did someone share it with you incorrectly?</p>;
    } else {
      const currentUserUid = this.props.currentUser.get('uid'),
        currentUserIsHost = currentUserUid === this.props.host.get('uid');

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

      const gameState = this.props.game.get('gameState');
      let activeUser = null;
      let isCurrentUserActive = false;
      let currentUserPlayer = null;
      let userHasValidMove = false;
      let gameWinner = null;
      if (gameState) {
        activeUser = gameState.get('turnCount') % 2 === 0 ? 'host' : 'opponent';

        isCurrentUserActive = currentUserUid === this.props[activeUser].get('uid');

        const opponentUid = this.props.opponent && this.props.opponent.get('uid');

        currentUserPlayer = currentUserUid === this.props.host.get('uid') ? 'playerA' 
                    : currentUserUid === opponentUid ? 'playerB' : null;

        const gameStateJs = gameState.toJS();

        // I don't know why isValidMove considers [] and [singleMove] to be valid.
        userHasValidMove = this.props.possibleMoveSteps.size > 1 && 
                    isValidMove(gameStateJs, this.props.possibleMoveSteps, currentUserPlayer);

        gameWinner = getGameWinner(gameStateJs);
      }

      gameDisplay = (
                <div>
                    <Board gameState={gameState} 
                        isCurrentUserActive={isCurrentUserActive}
                        possibleMove={this.props.possibleMoveSteps}
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
            .set(this.props.currentUser.get('uid'));
  }

  @autobind
  makeMove() {
    const newGameState = camelotEngine().update().applyMoves(
      this.props.game.get('gameState').toJS(), 
      this.props.possibleMoveSteps
    );
    this.setState({possibleMove: []}, () => this.gameRef.update({gameState: newGameState}));
  }

  @autobind
  getWinMessage(gameWinner) {
    if (!gameWinner) {
      return;
    }
    const {winningUser} = gameWinner === 'playerA' ? this.props.host : this.props.opponent;
    return `${winningUser.get('displayName')} wins!`;
  }
}

@firebaseConnect(['/games'])
@connect(
    ({firebase}, ownProps) => ({
      game: firebase.getIn(['data', 'games', ownProps.params.id])
    })
)
class GamePlayContainer extends PureComponent {
  render = () => Boolean(this.props.game) && <GamePlay game={this.props.game} gameId={this.props.params.id} />
}

export default GamePlayContainer;
