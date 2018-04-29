import {PresentationGameList} from './List';
import React from 'react';
import reactTestRenderer from 'react-test-renderer';

describe('GameList', () => {
  it('renders with no games', () => {
    expect(reactTestRenderer.create(
            <PresentationGameList currentUser={{isEmpty: false}} />
        )).toMatchSnapshot();
  });
  it('renders with no user', () => {
    expect(reactTestRenderer.create(
            <PresentationGameList currentUser={{isEmpty: true}} />
        )).toMatchSnapshot();
  });
  it('renders with games', () => {
    const games = {
      'game-key-1': {
        host: 'Game Host 1'
      },
      'game-key-2': {
        host: 'Game Host 2'
      }
    };
    const users = {
      'Game Host 1': {
        displayName: 'Display Name 1'
      },
      'Game Host 2': {
        displayName: 'Display Name 2'
      }
    };
    expect(reactTestRenderer.create(
            <PresentationGameList games={games} users={users} currentUser={{isEmpty: false}} />
        )).toMatchSnapshot();
  });
});
