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
    ({firebase}, ownProps) => ({
        host: firebase.getIn(['data', 'users', ownProps.game.get('host')]),
        opponent: firebase.getIn(['data', 'users', ownProps.game.get('opponent')], null),
        currentUser: firebase.get('profile')
    })
)
class GamePlay extends PureComponent {
    constructor() {
        super();
        this.state = {
            possibleMove: []
        };
        this.unmountFunctions = [];
    }

    componentWillUnmount() {
        this.unmountFunctions.forEach(fn => fn());
    }
    
    render() {
        let gameDisplay;
        if (this.props.game === undefined || this.props.host === undefined || this.props.opponent === undefined) {
            gameDisplay = <p>Loading...</p>;
        } else if (this.props.game === null) {
            gameDisplay = <p>This link is not valid. Did someone share it with you incorrectly?</p>;
        } else {
            const currentUserUid = this.props.currentUser.get('uid'),
                currentUserIsHost = currentUserUid === this.props.host;

            let findOpponentMessage;
            if (!this.props.game.opponent) {
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

            const gameState = _.get(this.state, ['game', 'gameState']);
            let activeUser = null;
            let isCurrentUserActive = false;
            let currentUserPlayer = null;
            let userHasValidMove = false;
            let gameWinner = null;
            if (gameState) {
                activeUser = gameState.turnCount % 2 === 0 ? 'host' : 'opponent';

                isCurrentUserActive = currentUserUid === this.state[activeUser].uid;

                currentUserPlayer = currentUserUid === this.props.host.uid ? 'playerA' : 
                    currentUserUid === _.get(this.props.opponent, 'uid') ? 'playerB' : null;

                userHasValidMove = isValidMove(gameState, this.state.possibleMove, currentUserPlayer);

                gameWinner = getGameWinner(gameState);
            }

            gameDisplay = (
                <div>
                    <Board gameState={gameState} 
                        isCurrentUserActive={isCurrentUserActive}
                        possibleMove={this.state.possibleMove}
                        setPossibleMove={possibleMove => this.setState({possibleMove})}
                        message={findOpponentMessage || this.getWinMessage(gameWinner)}
                        currentUserPlayer={currentUserPlayer} />
                    <div className="control-bar">
                        <Avatar currentUser={this.props.host} isActive={activeUser === 'host'} />
                        <CapturedPieces whosePiecesWereCaptured="opponent" gameState={gameState} />
                        {
                            isCurrentUserActive ?
                                <Button bsStyle="primary" 
                                    disabled={!userHasValidMove} 
                                    onClick={this.makeMove}>Make Move</Button> :
                                <p>Other player's turn</p>
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
        this.gameRef.update({opponent: this.props.params.currentUser.uid});
    }

    @autobind
    makeMove() {
        const newGameState = camelotEngine().update().applyMoves(this.props.game.gameState, this.state.possibleMove);
        this.setState({possibleMove: []}, () => this.gameRef.update({gameState: newGameState}));
    }

    @autobind
    getWinMessage(gameWinner) {
        if (!gameWinner) {
            return;
        }
        const {displayName} = gameWinner === 'playerA' ? this.props.host : this.props.opponent;
        return `${displayName} wins!`;
    }
}

@firebaseConnect(['/games'])
@connect(
    ({firebase}, ownProps) => ({
        game: firebase.getIn(['data', 'games', ownProps.params.id]),
    })
)
class GamePlayContainer extends PureComponent {
    render = () => Boolean(this.props.game) && <GamePlay game={this.props.game} />
}

export default GamePlayContainer;
