import React, {PureComponent} from 'react';
import Arrow from './Arrow';
import {css} from 'glamor';
import _ from 'lodash';

const getRotationDegrees = (srcCoords, destCoords) => {
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

export const getRotationAngle = (srcCoords, destCoords) => `rotate(${getRotationDegrees()}deg)`;

class MoveArrow extends PureComponent {
  render = () => {
    const {srcCoords, destCoords, boardSpaceContentRect} = this.props;

    if (!boardSpaceContentRect.bounds.width > 0) {
      return null;
    }

    const rotationDegrees = getRotationDegrees(srcCoords, destCoords);
    
    const rightAngleFactorDeg = 90;
    const arrowIsDiagonal = rotationDegrees % rightAngleFactorDeg;
    const sideLength = arrowIsDiagonal
      ? Math.sqrt(boardSpaceContentRect.bounds.width ** 2 + boardSpaceContentRect.bounds.width ** 2)
      : boardSpaceContentRect.bounds.width;

    const style = css({
      position: 'absolute',
      transform: `rotate(${rotationDegrees}deg) translateX(${sideLength}px)`,
      zIndex: 1
    });

    return <Arrow width={sideLength * 2} height={30} style={style} />;
  };
}

export default MoveArrow;
