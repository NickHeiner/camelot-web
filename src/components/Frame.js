import React, { Component } from 'react';
import SignIn from '../pages/SignIn';
import Sidebar from './Sidebar';
import {PageHeader} from 'react-bootstrap';
import firebase from 'firebase';
import _ from 'lodash';

class Frame extends Component {
  constructor() {
    super();
    this.auth = new firebase.auth();
    this.state = {};
  }

  componentWillMount() {
    // TODO handle auth error
    this.unsubscribeFirebaseAuthWatcher = this.auth.onAuthStateChanged(currentUser => {
      // TODO Is this the best place to do this?
      if (currentUser) {
        firebase.database()
          .ref(`users/${currentUser.uid}`)
          .set(_.pick(currentUser, 'displayName', 'uid', 'photoURL'));
      }
      this.setState({currentUser});
    });
  }

  componentWillUnmount() {
    this.unsubscribeFirebaseAuthWatcher();
  }

  render() {
    const currentUser = this.state.currentUser;
    
    let body;
    if (currentUser) {
      // TODO is this heinous?
      this.props.children.props.params.currentUser = currentUser;
      body = this.props.children;
    } else if (currentUser === null) {
      body = <SignIn />;
    } else {
      body = <p>Loading...</p>;
    }

    return (
      <div>
        {currentUser && <Sidebar currentUser={currentUser} />}
        <main className="App">
          <PageHeader>Camelot</PageHeader>
          {body}
        </main>
      </div>
    );
  }
}

export default Frame;
