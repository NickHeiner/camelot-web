import React, {PureComponent} from 'react';
import firebase from 'firebase';
import autobind from 'autobind-decorator';
import Avatar from '../../components/Avatar';
import Board from '../../components/Board';
import './Play.less';
import {Button} from 'react-bootstrap';
import _ from 'lodash';

import camelotEngine from 'camelot-engine';
const {isValidMove} = camelotEngine().query();

class GamePlay extends PureComponent {
    constructor() {
        super();
        this.state = {
            game: undefined,
            possibleMove: []
        };
        this.unmountFunctions = [];
    }
    componentWillMount() {
        this.gameRef = firebase.database().ref(`games/${this.props.params.id}`);
        this.gameRef.on('value', this.onGameUpdate);
        this.unmountFunctions.push(() => this.gameRef.off('value', this.onGameUpdate));
    }
    
    componentWillUnmount() {
        this.unmountFunctions.forEach(fn => fn());
        this.unmountFunctions = [];
    }

    @autobind
    onGameUpdate(snapshot) {
        const val = snapshot.val();

        if (val) {
            const hostRef = firebase.database().ref(`users/${val.host}`),
                hostListener = hostRef.on('value', snapshot => {
                    this.setState({host: snapshot.val()});
                }),
                opponentRef = firebase.database().ref(`users/${val.opponent}`),
                opponentListener = opponentRef.on('value', snapshot => {
                    this.setState({opponent: snapshot.val()});
                });
                
            this.unmountFunctions.push(
                () => hostRef.off('value', hostListener), 
                () => opponentRef.off('value', opponentListener),
            );
        }

        this.setState({game: val});
    }
    
    render() {
        let gameDisplay;
        if (this.state.game === undefined) {
            gameDisplay = <p>Loading...</p>;
        } else if (this.state.game === null) {
            gameDisplay = <p>This link is not valid. Did someone share it with you incorrectly?</p>;
        } else {
            const currentUserIsHost = this.props.params.currentUser.uid === this.state.game.host;

            let findOpponentMessage;
            if (!this.state.game.opponent) {
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
            if (gameState) {
                activeUser = gameState.turnCount % 2 === 0 ? 'host' : 'opponent';

                isCurrentUserActive = this.props.params.currentUser.uid === this.state[activeUser].uid;

                currentUserPlayer = this.props.params.currentUser.uid === this.state.host.uid ? 'playerA' : 
                    this.props.params.currentUser.uid === this.state.opponent.uid ? 'playerB' : null;

                userHasValidMove = isValidMove(gameState, this.state.possibleMove, currentUserPlayer);
            }

            gameDisplay = (
                <div>
                    <div className="board-wrapper">
                        <Board gameState={gameState} 
                            isCurrentUserActive={isCurrentUserActive}
                            possibleMove={this.state.possibleMove}
                            setPossibleMove={possibleMove => this.setState({possibleMove})}
                            currentUserPlayer={currentUserPlayer} />
                        {findOpponentMessage}
                    </div>
                    <div className="control-bar">
                        <Avatar currentUser={this.state.host} isActive={activeUser === 'host'}/>
                        {
                            isCurrentUserActive ?
                                <Button bsStyle="primary" 
                                    disabled={!userHasValidMove} 
                                    onClick={this.makeMove}>Make Move</Button> :
                                <p>Other player's turn</p>
                        }
                        <Avatar currentUser={this.state.opponent} isActive={activeUser === 'opponent'} />
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
        const newGameState = camelotEngine().update().applyMoves(this.state.game.gameState, this.state.possibleMove);
        this.gameRef.update({gameState: newGameState}).then(() => this.setState({possibleMove: []}));
    }
}

export default GamePlay;
