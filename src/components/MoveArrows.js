import React, {PureComponent} from 'react';
import Arrow from './Arrow';
import {connect} from 'react-redux';
import {getPairs} from '../utils/camelot-engine';
import _ from 'lodash';

@connect(
  ({ui}) => ({
    chosenMoveSteps: ui.get('chosenMoveSteps')
  })
)
class PossibleMoveArrows extends PureComponent {
  render = () => 
    getPairs(this.props.chosenMoveSteps)
      .map(
        ([firstCoords, secondCoords]) => {
          const key = [firstCoords, secondCoords].map(_.values).join('-');
          return <Arrow width={100} height={30} key={key} />;
        }
      );
}

export default PossibleMoveArrows;
