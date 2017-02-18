import React, {PureComponent} from 'react';

class GamePlay extends PureComponent {
    render() {
        return <div>
            <h1>GamePlay {this.props.route.id}</h1>
        </div>;
    }
}

export default GamePlay;
