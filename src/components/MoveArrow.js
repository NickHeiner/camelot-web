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
    const {srcCoords, destCoords, boardSpaceRef} = this.props;

    if (!boardSpaceRef) {
      return null;
    }

    const style = css({
      position: 'absolute',
      // transform: getRotationAngle(srcCoords, destCoords),
      zIndex: 1
    });

    // The arrow length calculation may not be correct if the arrow is going to be diagonal.
    return <Arrow width={boardSpaceRef.getBoundingClientRect().width * 2} height={30} style={style} />;
  };
}

export default MoveArrow;
