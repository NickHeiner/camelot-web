import React, { PureComponent } from 'react';
import { PageHeader, Button } from 'react-bootstrap';
import './App.less';
import firebase from 'firebase';
import { slide as SlideMenu } from 'react-burger-menu'
import autobind from 'autobind-decorator'

class App extends PureComponent {
  static propTypes = {
    currentUser: React.PropTypes.object
  }

  constructor() {
      super();
      this.auth = new firebase.auth();
  }

  render() {
    const currentUser = this.props.route.currentUser;
    return (
      <div>
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
        <main className="App">
          <PageHeader>Camelot</PageHeader>
          <p>signed in</p>
        </main>
      </div>
    );
  }

  @autobind
  signOut() {
    this.auth.signOut();
  }
}

export default App;
