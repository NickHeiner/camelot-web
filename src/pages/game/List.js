import React, {PureComponent} from 'react';
import { Button } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import firebase from 'firebase';
import _ from 'lodash';
import { Link } from 'react-router';

class GameList extends PureComponent {
    constructor() {
        super();
        this.state = {count: null};
    }

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
            host: this.props.params.currentUser.uid
        });
    }
}

export default GameList;
