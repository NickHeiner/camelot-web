import React, {PureComponent} from 'react';
import { Button } from 'react-bootstrap';

class GameList extends PureComponent {
    render() {
        return <div>
            <h1>Game List</h1>
            <Button bsStyle="primary">New</Button>
        </div>;
    }
}

export default GameList;
