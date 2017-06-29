import React, {PureComponent} from 'react';
import { Button } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { Link } from 'react-router';
import camelotEngine from 'camelot-engine';
import {firebaseConnect} from 'react-redux-firebase';
import {connect} from 'react-redux';

export class PresentationGameList extends PureComponent {
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

@firebaseConnect(['/games'])
@connect(
    ({firebase}) => ({
        games: firebase.getIn(['data', 'games'])
    })
)
class GameListContainer extends PureComponent {
    @autobind
    onGamesUpdate(snapshot) {
        const val = snapshot.val();
        if (val) {
            this.setState({games: val});
        }
    }

    @autobind
    createNewGame() {
        this.props.firebase.push('/games', {
            host: this.props.params.currentUser.uid,
            gameState: camelotEngine().createEmptyGame()
        });
    }

    render = () => <PresentationGameList createNewGame={this.createNewGame} games={this.props.games} />
}

export default GameListContainer;
