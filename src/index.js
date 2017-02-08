import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.less';

firebase.initializeApp({
  apiKey: 'AIzaSyC0mhGKUKIERUXlB8Amh2kq9S6gjbiqg9A',
  authDomain: 'camelot-ac734.firebaseapp.com',
  databaseURL: 'https://camelot-ac734.firebaseio.com',
  storageBucket: 'camelot-ac734.appspot.com',
  messagingSenderId: '644309983634'
});

import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
