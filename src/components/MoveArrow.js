import React, {PureComponent} from 'react';
import Arrow from './Arrow';
import {css} from 'glamor';
import _ from 'lodash';

export const getRotationAngle = (srcCoords, destCoords) => {
  const getRotationValue = () => {
    const rowDiff = srcCoords.row - destCoords.row; 
    const colDiff = srcCoords.col - destCoords.col;

    /* eslint-disable no-magic-numbers */
    if (!colDiff) {
      return rowDiff === -2 ? 90 : -90;
    }
    
    if (!rowDiff) {
      return colDiff === -2 ? 0 : 180;
    }
    
    if (rowDiff === -2 && colDiff === -2) {
      return 45;
    }
    /* eslint-enable no-magic-numbers */
  };

  return `rotate(${getRotationValue()}deg)`;
};

class MoveArrow extends PureComponent {
  render = () => {
    const style = css({
      position: 'absolute',
      transform: getRotationAngle(this.props.srcCoords, this.props.destCoords),
      zIndex: 1
    });
    return <Arrow width={100} height={30} style={style} />
  };
}

export default MoveArrow;
