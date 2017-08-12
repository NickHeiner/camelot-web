import {PresentationGamePlay} from './Play';
import React from 'React';
import reactTestRenderer from 'react-test-renderer';
import {fromJS} from 'immutable';

describe('GamePlay', () => {
  it('renders with no games', () => {
    expect(reactTestRenderer.create(
      <PresentationGamePlay />
    )).toMatchSnapshot();
  });

  it('renders with a game that has a winner', () => {
    
    expect(reactTestRenderer.create(
      <PresentationGamePlay />
    )).toMatchSnapshot();
  });
});
