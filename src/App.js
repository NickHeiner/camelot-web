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
      (<p>You are signed in as {this.state.currentUser.displayName}.</p>) :
      (<Button bsStyle="primary" onClick={this.signIn.bind(this)}>Sign In</Button>);

    return (
      <div>
        <SlideMenu>
          <p>Side content</p>
        </SlideMenu>
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
}

export default App;
