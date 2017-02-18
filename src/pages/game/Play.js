import React, {PureComponent} from 'react';
import firebase from 'firebase';
import autobind from 'autobind-decorator';
import Avatar from '../../components/Avatar';
import './Play.less';
import {Button} from 'react-bootstrap';

class GamePlay extends PureComponent {
    constructor() {
        super();
        this.state = {
            game: undefined
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
            const hostListener = firebase.database().ref(`users/${val.host}`).on('value', snapshot => {
                this.setState({host: snapshot.val()});
            });
            const opponentListener = firebase.database().ref(`users/${val.opponent}`).on('value', snapshot => {
                this.setState({opponent: snapshot.val()});
            });
            this.unmountFunctions.push(hostListener, opponentListener);
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

            gameDisplay = (
                <div>
                    <div className="board-wrapper">
                        <h1>the board</h1>
                        {findOpponentMessage}
                    </div>
                    <div className="control-bar">
                        <Avatar currentUser={this.state.host} />
                        <p>vs.</p>
                        <Avatar currentUser={this.state.opponent} />
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
}

export default GamePlay;
