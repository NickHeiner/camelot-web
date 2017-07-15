import {PresentationGameList} from './List';
import React from 'React';
import reactTestRenderer from 'react-test-renderer';

describe('GameList', () => {
  it('renders with no games', () => {
    expect(reactTestRenderer.create(
            <PresentationGameList />
        )).toMatchSnapshot();
  });
  it('renders with games', () => {
    const games = [
      {
        host: 'Game Host 1',
        key: 'game-key-1'
      },
      {
        host: 'Game Host 2',
        key: 'game-key-2'
      }
    ];
    expect(reactTestRenderer.create(
            <PresentationGameList games={games} />
        )).toMatchSnapshot();
  });
});
