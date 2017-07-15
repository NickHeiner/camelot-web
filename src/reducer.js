import * as Constants from './constants';
import {fromJS} from 'immutable';

const defaultState = {
  possibleMoveSteps: []
};

export default (state, action) => {
  switch (action.type) {
  default:
    return fromJS(defaultState);
  }
};
