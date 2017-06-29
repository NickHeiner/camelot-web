import * as Constants from './constants';

export const setCurrentUser = (currentUser) => ({
    type: Constants.SET_CURRENT_USER,
    payload: currentUser
});

export const setOffline = () => ({payload: Constants.SET_OFFLINE});
