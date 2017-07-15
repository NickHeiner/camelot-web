import * as Constants from './constants';
import update from 'immutability-helper';

const defaultState = {
  offline: false,
  currentUser: {
    displayName: '',
    photoURL: ''
  },
  games: []
};

export default (state, action) => {
  switch (action.type) {
  case Constants.SET_OFFLINE:
    return update(state, {
      offline: {
        $set: true
      },
      currentUser: {
        $set: {
          displayName: 'Offline Jim',
          photoURL: 'https://invalid.offline-url.com/i.png'
        }
      },
      games: {
        $set: [
          {
            key: 'offline-1',
            host: 'Offline Jim'
          }
        ]
      }
    });
  default:
    return defaultState;
  }
};
