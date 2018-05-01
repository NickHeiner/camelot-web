import React, {PureComponent} from 'react';
import Arrow from './Arrow';
import {connect} from 'react-redux';
import {getPairs} from '../utils/camelot-engine';
import _ from 'lodash';

class MoveArrow extends PureComponent {
  render = () => <Arrow width={100} height={30} />;
}

export default MoveArrow;
