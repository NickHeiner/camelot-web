import {fromJS} from 'immutable';

export const getDummyCurrentUser = () => fromJS({
  photoURL: 'photoURL',
  displayName: 'Display Name'
});
