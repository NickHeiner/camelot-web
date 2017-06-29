import Avatar from './Avatar';
import React from 'React';
import reactTestRenderer from 'react-test-renderer';
import { getDummyCurrentUser } from '../utils/test-utils';

describe('Avatar', () => {
    it('renders with no user', () => {
        expect(reactTestRenderer.create(
            <Avatar />
        )).toMatchSnapshot();
    });

    describe('has a current user', () => {
        it('inactive', () => {
            const currentUser = getDummyCurrentUser();
            expect(reactTestRenderer.create(
                <Avatar currentUser={currentUser} />
            )).toMatchSnapshot();
        });

        it('active', () => {
            const currentUser = getDummyCurrentUser();
            expect(reactTestRenderer.create(
                <Avatar currentUser={currentUser} isActive />
            )).toMatchSnapshot();
        });
    });
});
