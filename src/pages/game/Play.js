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
    }
    componentWillMount() {
        this.gameRef = firebase.database().ref(`games/${this.props.params.id}`);
        this.gameRef.on('value', this.onGameUpdate);
    }
    
    componentWillUnmount() {
        this.gameRef.off('value', this.onGameUpdate);
    }

    @autobind
    onGameUpdate(snapshot) {
        const val = snapshot.val();
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
                        <Avatar currentUser={this.props.params.currentUser} />
                        <p>vs.</p>
                        <Avatar currentUser={this.props.params.currentUser} />
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
