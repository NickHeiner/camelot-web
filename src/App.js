import React, { Component } from 'react';
import { PageHeader, Button } from 'react-bootstrap';
import './App.less';
import firebase from 'firebase';
import { slide as SlideMenu } from 'react-burger-menu'

class App extends Component {
  constructor() {
    super();
    this.auth = new firebase.auth();
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.state = {
      currentUser: this.auth.currentUser
    };
  }

  componentWillMount() {
    this.unsubscribeFirebaseAuthWatcher = this.auth.onAuthStateChanged(currentUser => this.setState({currentUser}));
  }

  componentWillUnmount() {
    this.unsubscribeFirebaseAuthWatcher();
  }

  render() {
    const appBody = this.state.currentUser ?
      (<p>signed in</p>) :
      (<Button bsStyle="primary" onClick={this.signIn.bind(this)}>Sign In</Button>),
      
      slideMenu = this.state.currentUser ? 
        (<SlideMenu>
          <div>
            <div className="user-bar">
              <span>{this.state.currentUser.displayName}</span>
              <img src={this.state.currentUser.photoURL} 
                alt={`profile picture for ${this.state.currentUser.displayName}`} 
                className="profile-picture" />
            </div>
            <Button bsStyle="primary" onClick={this.signOut.bind(this)}>Sign Out</Button>
          </div>
        </SlideMenu>) :
        (null);

    return (
      <div>
        {slideMenu}
        <main className="App">
          <PageHeader>Camelot</PageHeader>
          {appBody}
        </main>
      </div>
    );
  }

  signIn() {
    this.auth.signInWithRedirect(this.provider);
  }

  signOut() {
    this.auth.signOut();
  }
}

export default App;
