import {SidebarPresentation} from './Sidebar';
import React from 'React';
import { shallow } from 'enzyme';
import { getDummyCurrentUser } from '../utils/test-utils';

describe('Sidebar', () => {
    it('renders', () => {
        const currentUser = getDummyCurrentUser();
        expect(shallow(
            <SidebarPresentation currentUser={currentUser} />
        ).html()).toMatchSnapshot();
    });
});
