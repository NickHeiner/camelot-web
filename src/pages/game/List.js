import React, {PureComponent} from 'react';
import { Button } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import firebase from 'firebase';
import _ from 'lodash';
import { Link } from 'react-router';
import camelotEngine from 'camelot-engine';
import HandleConnectivity from '../../utils/HandleConnectivity';

@HandleConnectivity({
    componentWillMount: _.noop,
    componentWillUnmount: _.noop
}, {
    componentWillMount: () => {
        this.gamesRef = firebase.database().ref('games');
        this.gamesRef.on('value', this.onGamesUpdate);
    },
    componentWillUnmount: () => {
        this.gamesRef.off('value', this.onGamesUpdate);
    }
})
class GameList extends PureComponent {
    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        this.props.componentWillMount();
    }
    
    componentWillUnmount() {
        this.props.componentWillUnmount();
    }

    @autobind
    onGamesUpdate(snapshot) {
        const val = snapshot.val();
        if (val) {
            this.setState({games: val});
        }
    }

    render() {
        return <div>
            <ul>
                {
                    _.map(this.state.games, ((game, key) => <li key={key}><Link to={`play/${key}`}>{game.host}</Link></li>))
                }
            </ul>
            <Button bsStyle="primary" onClick={this.createNewGame}>New</Button>
        </div>;
    }

    @autobind
    createNewGame() {
        this.gamesRef.push({
            host: this.props.params.currentUser.uid,
            gameState: camelotEngine().createEmptyGame()
        });
    }
}

export default GameList;
