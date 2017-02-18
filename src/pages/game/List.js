import React, {PureComponent} from 'react';
import { Button } from 'react-bootstrap';
import autobind from 'autobind-decorator';
import firebase from 'firebase';

class GameList extends PureComponent {
    constructor() {
        super();
        this.state = {count: null};
    }
    componentWillMount() {
        this.database = firebase.database();

        this.database.ref('widgets').on('value', snapshot => {
            const val = snapshot.val();
            if (val) {
                this.setState(val);
            }
        });
    }

    render() {
        return <div>
            <h1>Game List</h1>
            <p>Count: {this.state.count}</p>
            <Button bsStyle="primary" onClick={this.createNewGame}>New</Button>
        </div>;
    }

    @autobind
    createNewGame() {
        this.database.ref('widgets').set({count: this.state.count + 1}).then(() => {
            debugger;
        }, () => {
            debugger;
        });
    }
}

export default GameList;
