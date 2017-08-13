import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Frame from './components/Frame';
import NoMatch from './pages/NoMatch';
import GameList from './pages/game/List';
import GamePlay from './pages/game/Play';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import {syncHistoryWithStore} from 'react-router-redux';
import gameListJson from '../offline-data/game-play';
import _ from 'lodash';

const firebaseConfig = {
  apiKey: 'AIzaSyC0mhGKUKIERUXlB8Amh2kq9S6gjbiqg9A',
  authDomain: 'camelot-ac734.firebaseapp.com',
  databaseURL: 'https://camelot-ac734.firebaseio.com',
  storageBucket: 'camelot-ac734.appspot.com',
  messagingSenderId: '644309983634'
};

// TODO what is the difference between `auth` and `profile` that react-redux-firebase sets up?
// Do we want to use composeEnhancers instead of compose here?
const createStoreWithFirebase = compose(
  applyMiddleware(thunk),
  reactReduxFirebase(firebaseConfig, {userProfile: 'users'}),
)(createStore);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStoreWithFirebase(reducer, composeEnhancers());
const history = syncHistoryWithStore(browserHistory, store);

if (window.localStorage.offline === 'true') {
  const actionsToReplay = JSON.parse(gameListJson.payload);
  actionsToReplay.forEach(store.dispatch.bind(store));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Frame}>
        <IndexRoute component={GameList} />
        <Route path="play/:id" component={GamePlay} />
      </Route>
      <Route path="*" component={NoMatch} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
