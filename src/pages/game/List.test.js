import {PresentationGameList} from './List';
import React from 'React';
import reactTestRenderer from 'react-test-renderer';
import {fromJS} from 'immutable';

describe('GameList', () => {
  it('renders with no games', () => {
    expect(reactTestRenderer.create(
            <PresentationGameList />
        )).toMatchSnapshot();
  });
  it('renders with games', () => {
    const games = fromJS({
      'game-key-1': {
        host: 'Game Host 1'
      },
      'game-key-2': {
        host: 'Game Host 2'
      }
    });
    const users = fromJS({
      'Game Host 1': {
        displayName: 'Display Name 1'
      },
      'Game Host 2': {
        displayName: 'Display Name 2'
      }
    });
    expect(reactTestRenderer.create(
            <PresentationGameList games={games} users={users} />
        )).toMatchSnapshot();
  });
});
