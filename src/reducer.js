import * as Constants from './constants';
import update from 'immutability-helper';

const defaultState = {
    currentUser: {
        displayName: '',
        photoURL: ''
    }
};

export default (state, action) => {
    switch(action.type) {
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
                }
            });
        default:
            return defaultState;
    }
};
