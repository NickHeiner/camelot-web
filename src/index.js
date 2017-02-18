import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.less';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {PageHeader} from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import SignIn from './pages/SignIn';
import GameList from './pages/game/List';
// import GamePlay from './pages/game/Play';

firebase.initializeApp({
  apiKey: 'AIzaSyC0mhGKUKIERUXlB8Amh2kq9S6gjbiqg9A',
  authDomain: 'camelot-ac734.firebaseapp.com',
  databaseURL: 'https://camelot-ac734.firebaseio.com',
  storageBucket: 'camelot-ac734.appspot.com',
  messagingSenderId: '644309983634'
});

import NoMatch from './pages/NoMatch';

class Frame extends React.Component {
  render() {
    return (
      <div>
        {this.props.sidebar}
        <main className="App">
          <PageHeader>Camelot</PageHeader>
          {this.props.main}
        </main>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Frame}>
      <IndexRoute getComponents={getComponents}>
        {/*<Route path="play/:id" component={GamePlay} />*/}
      </IndexRoute>
    </Route>
    <Route path="*" component={NoMatch} />
  </Router>,
  document.getElementById('root')
);

function getComponents(nextState, cb) {
  new firebase.auth().onAuthStateChanged(currentUser => {
    nextState.params.currentUser = currentUser;
    cb(null, currentUser ? 
      {sidebar: Sidebar, main: GameList} :
      {sidebar: null, main: SignIn}
    );
  }, cb);
}
