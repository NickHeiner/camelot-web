import React, {PureComponent} from 'react';
import autobind from 'autobind-decorator';
import { Button } from 'react-bootstrap';
import firebase from 'firebase';
import {browserHistory} from 'react-router';
import { slide as SlideMenu } from 'react-burger-menu';

class Sidebar extends PureComponent {
    static propTypes = {
        currentUser: React.PropTypes.object
    }

    constructor() {
        super();
        this.auth = new firebase.auth();
    }

    render() {
        const currentUser = this.props.currentUser;
        return (
            <SlideMenu>
                <div className="user-bar">
                    <span>{currentUser.displayName}</span>
                    <img src={currentUser.photoURL} 
                        alt={`avatar for ${currentUser.displayName}`} 
                        className="profile-picture" />
                </div>
                <Button bsStyle="primary" onClick={this.signOut}>Sign Out</Button>
            </SlideMenu>
        );
    }

    @autobind
    signOut() {
        this.auth.signOut().then(() => browserHistory.push('/'));
    }
}

export default Sidebar;



