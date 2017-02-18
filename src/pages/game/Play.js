import React, {PureComponent} from 'react';
import firebase from 'firebase';
import autobind from 'autobind-decorator';

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
        this.gamesRef.off('value', this.onGameUpdate);
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
            gameDisplay = <p>Host: {this.props.params.currentUser.displayName}</p>;
        }

        return gameDisplay;
    }
}

export default GamePlay;
