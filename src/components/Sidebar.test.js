import {SidebarPresentation} from './Sidebar';
import React from 'React';
import reactTestRenderer from 'react-test-renderer';
import { getDummyCurrentUser } from '../utils/test-utils';

describe('Sidebar', () => {
    it('renders', () => {
        const currentUser = getDummyCurrentUser();
        expect(reactTestRenderer.create(
            <SidebarPresentation currentUser={currentUser} />
        )).toMatchSnapshot();
    });
});
