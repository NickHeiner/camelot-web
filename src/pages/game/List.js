import React, {PureComponent} from 'react';
import { Button } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import firebase from 'firebase';
import _ from 'lodash';
import { Link } from 'react-router';
import camelotEngine from 'camelot-engine';
import HandleConnectivity from '../../utils/HandleConnectivity';

export class GameList extends PureComponent {
    render = () =>
        <div>
            <ul>
                {
                    _.map(this.props.games, ((game, key) => <li key={key}><Link to={`play/${key}`}>{game.host}</Link></li>))
                }
            </ul>
            <Button bsStyle="primary" onClick={this.props.createNewGame}>New</Button>
        </div>;
}

class OnlineGameListContainer extends PureComponent {
    componentWillMount() {
        this.gamesRef = firebase.database().ref('games');
        this.gamesRef.on('value', this.onGamesUpdate);
    }
    
    componentWillUnmount() {
        this.gamesRef.off('value', this.onGamesUpdate);
    }

    @autobind
    onGamesUpdate(snapshot) {
        const val = snapshot.val();
        if (val) {
            this.setState({games: val});
        }
    }

    @autobind
    createNewGame() {
        this.gamesRef.push({
            host: this.props.params.currentUser.uid,
            gameState: camelotEngine().createEmptyGame()
        });
    }

    render = () => <GameList createNewGame={this.createNewGame} />
}

class OfflineGameListContainer extends PureComponent {
    render = () => <GameList />
}

export default HandleConnectivity(
    OnlineGameListContainer,
    OfflineGameListContainer
);
