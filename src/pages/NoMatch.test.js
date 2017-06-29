import NoMatch from './NoMatch';
import React from 'React';
import { shallow } from 'enzyme';

describe('NoMatch', () => {
    it('renders', () => {
        expect(shallow(
            <NoMatch />
        ).html()).toMatchSnapshot();
    });
});
