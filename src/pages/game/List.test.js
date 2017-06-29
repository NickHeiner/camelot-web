import {PresentationGameList} from './List';
import React from 'React';
import { shallow } from 'enzyme';

describe('GameList', () => {
    it('renders with no games', () => {
        expect(shallow(
            <PresentationGameList />
        ).html()).toMatchSnapshot();
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
        expect(shallow(
            <PresentationGameList games={games} />
        ).html()).toMatchSnapshot();
    });
});
