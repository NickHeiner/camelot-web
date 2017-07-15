import React, {PureComponent} from 'react';
import {Button} from 'react-bootstrap';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import {Link} from 'react-router';
import camelotEngine from 'camelot-engine';
import {firebaseConnect} from 'react-redux-firebase';
import {connect} from 'react-redux';

export class PresentationGameList extends PureComponent {
  render = () =>
        <div>
            <ul>
                {
                    this.props.games &&
                    this.props.users && 
                        this.props.games
                        .map(((game, key) => 
                            <li key={key}><Link to={`play/${key}`}>
                                Hosted by {this.props.users.getIn([game.get('host'), 'displayName'])}
                            </Link></li>
                        ))
                        .toList()
                        .toJS()
                }
            </ul>
            <Button bsStyle="primary" onClick={this.props.createNewGame}>New</Button>
        </div>;
}

@firebaseConnect(['/games', '/users'])
@connect(
    ({firebase}) => ({
      games: firebase.getIn(['data', 'games']),
      users: firebase.getIn(['data', 'users']),
      currentUserUid: firebase.getIn(['profile', 'uid'])
    })
)
class GameListContainer extends PureComponent {
    @autobind
  createNewGame() {
    this.props.firebase.push('/games', {
      host: this.props.currentUserUid,
      gameState: camelotEngine().createEmptyGame()
    });
  }

  render = () => <PresentationGameList 
        createNewGame={this.createNewGame} 
        games={this.props.games} 
        users={this.props.users} />
}

export default GameListContainer;
