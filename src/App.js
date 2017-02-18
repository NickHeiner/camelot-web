import React, { PureComponent } from 'react';
import { PageHeader, Button } from 'react-bootstrap';
import './App.less';
import firebase from 'firebase';
import { slide as SlideMenu } from 'react-burger-menu';
import autobind from 'autobind-decorator';
import { browserHistory } from 'react-router';
import SignIn from './pages/SignIn';

class App extends PureComponent {
  static propTypes = {
    currentUser: React.PropTypes.object
  }

  constructor() {
      super();
      this.auth = new firebase.auth();
      this.state = {};
  }

  componentWillMount() {
    // TODO handle auth error
    this.unsubscribeFirebaseAuthWatcher = this.auth.onAuthStateChanged(currentUser => this.setState({currentUser}));
  }

  componentWillUnmount() {
    this.unsubscribeFirebaseAuthWatcher();
  }

  render() {
    const currentUser = this.state.currentUser;
    let body;
    if (currentUser) {
      body = <p>Signed In</p>;
    } else if (currentUser === null) {
      body = <SignIn />;
    } else {
      body = null;
    }

    return (
      <div>
        {currentUser && 
          <SlideMenu>
            <div>
              <div className="user-bar">
                <span>{currentUser.displayName}</span>
                <img src={currentUser.photoURL} 
                  alt={`avatar for ${currentUser.displayName}`} 
                  className="profile-picture" />
              </div>
              <Button bsStyle="primary" onClick={this.signOut}>Sign Out</Button>
            </div>
          </SlideMenu>
        }
        <main className="App">
          <PageHeader>Camelot</PageHeader>
          {body}
        </main>
      </div>
    );
  }

  @autobind
  signOut() {
    this.auth.signOut().then(() => browserHistory.push('/'));
  }
}

export default App;
