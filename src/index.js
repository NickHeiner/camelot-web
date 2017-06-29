import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Frame from './components/Frame';
import NoMatch from './pages/NoMatch';
import GameList from './pages/game/List';
import GamePlay from './pages/game/Play';
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers } from 'redux';
import reducer from './reducer';
import {reactReduxFirebase, firebaseStateReducer} from 'react-redux-firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCGnYHyEB2_iHhVmrvnHYkpt_KJlxyb3k0',
  authDomain: 'policourse.firebaseapp.com',
  databaseURL: 'https://policourse.firebaseio.com',
  projectId: 'policourse',
  messagingSenderId: '603341743697'
};

const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  ui: reducer
});

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, {userProfile: 'users'}),
)(createStore);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStoreWithFirebase(rootReducer, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Frame}>
        <IndexRoute component={GameList} />
        <Route path="play/:id" component={GamePlay} />
      </Route>
      <Route path="*" component={NoMatch} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
