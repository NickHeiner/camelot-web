import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.less';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {PageHeader} from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import SignIn from './pages/SignIn';
import GameList from './pages/game/List';
import GamePlay from './pages/game/Play';

firebase.initializeApp({
  apiKey: 'AIzaSyC0mhGKUKIERUXlB8Amh2kq9S6gjbiqg9A',
  authDomain: 'camelot-ac734.firebaseapp.com',
  databaseURL: 'https://camelot-ac734.firebaseio.com',
  storageBucket: 'camelot-ac734.appspot.com',
  messagingSenderId: '644309983634'
});

import NoMatch from './pages/NoMatch';

class Frame extends React.Component {
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

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Frame}>
      <IndexRoute component={GameList} />
      <Route path="play/:id" component={GamePlay} />
    </Route>
    <Route path="*" component={NoMatch} />
  </Router>,
  document.getElementById('root')
);
