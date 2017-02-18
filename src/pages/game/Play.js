import React, {PureComponent} from 'react';
import firebase from 'firebase';
import autobind from 'autobind-decorator';
import Avatar from '../../components/Avatar';
import './Play.less';

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
            gameDisplay = (
                <div>
                    <div className="board-wrapper">
                        <h1>the board</h1>
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
}

export default GamePlay;
