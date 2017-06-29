import Avatar from './Avatar';
import React from 'React';
import { shallow } from 'enzyme';

describe('Avatar', () => {
    it('renders with no user', () => {
        expect(shallow(
            <Avatar />
        ).html()).toMatchSnapshot();
    });

    describe('has a current user', () => {
        it('inactive', () => {
            const currentUser = {
                photoURL: 'photoURL',
                displayName: 'Display Name'
            };
            expect(shallow(
                <Avatar currentUser={currentUser} />
            ).html()).toMatchSnapshot();
        });

        it('active', () => {
            const currentUser = {
                photoURL: 'photoURL',
                displayName: 'Display Name'
            };
            expect(shallow(
                <Avatar currentUser={currentUser} isActive />
            ).html()).toMatchSnapshot();
        });
    });
});
