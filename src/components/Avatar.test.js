import Avatar from './Avatar';
import React from 'React';
import { shallow } from 'enzyme';
import { getDummyCurrentUser } from '../utils/test-utils';

describe('Avatar', () => {
    it('renders with no user', () => {
        expect(shallow(
            <Avatar />
        ).html()).toMatchSnapshot();
    });

    describe('has a current user', () => {
        it('inactive', () => {
            const currentUser = getDummyCurrentUser();
            expect(shallow(
                <Avatar currentUser={currentUser} />
            ).html()).toMatchSnapshot();
        });

        it('active', () => {
            const currentUser = getDummyCurrentUser();
            expect(shallow(
                <Avatar currentUser={currentUser} isActive />
            ).html()).toMatchSnapshot();
        });
    });
});
