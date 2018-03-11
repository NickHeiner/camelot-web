import _ from 'lodash';
import {fromJS} from 'immutable';
import initialData from './initial-data';

export default {
  ..._.pick(initialData, 'routing', 'firebase'),
  ui: fromJS(initialData.ui)
};

