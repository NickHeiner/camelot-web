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
    !this.props.currentUser.isEmpty &&
        <React.Fragment>
            <ul>
                {
                    this.props.games &&
                    this.props.users && 
                        _.map(this.props.games, (game, key) => 
                            <li key={key}><Link to={`play/${key}`}>
                                Hosted by {this.props.users[game.host].displayName}
                            </Link></li>
                        )
                }
            </ul>
            <Button bsStyle="primary" onClick={this.props.createNewGame}>New</Button>
        </React.Fragment>;
}

@firebaseConnect(['/games', '/users'])
@connect(
    ({firebase}) => ({
      games: firebase.data.games,
      users: firebase.data.users,
      currentUser: firebase.profile
    })
)
class GameListContainer extends PureComponent {
  @autobind
  createNewGame() {
    this.props.firebase.push('/games', {
      host: this.props.currentUser.uid,
      gameState: camelotEngine().createEmptyGame()
    });
  }

  render = () => <PresentationGameList 
        currentUser={this.props.currentUser}
        createNewGame={this.createNewGame} 
        games={this.props.games} 
        users={this.props.users} />
}

export default GameListContainer;
