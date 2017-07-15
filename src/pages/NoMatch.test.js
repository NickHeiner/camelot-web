import NoMatch from './NoMatch';
import React from 'React';
import reactTestRenderer from 'react-test-renderer';

describe('NoMatch', () => {
  it('renders', () => {
    expect(reactTestRenderer.create(
            <NoMatch />
        )).toMatchSnapshot();
  });
});
