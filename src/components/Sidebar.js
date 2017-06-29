import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import autobind from 'autobind-decorator';
import { Button } from 'react-bootstrap';
import firebase from 'firebase';
import {browserHistory} from 'react-router';
import { slide as SlideMenu } from 'react-burger-menu';
import Avatar from './Avatar';

export class SidebarPresentation extends PureComponent {
    static propTypes = {
        currentUser: PropTypes.object.isRequired
    }
    render() {
        const currentUser = this.props.currentUser;
        return (
            <SlideMenu>
                <div className="user-bar">
                    <span>{currentUser.displayName}</span>
                    <Avatar currentUser={currentUser} />
                </div>
                <Button bsStyle="primary" onClick={this.signOut}>Sign Out</Button>
            </SlideMenu>
        );
    }
}

export default class Sidebar extends PureComponent {
    static propTypes = {
        currentUser: PropTypes.object.isRequired
    }

    constructor() {
        super();
        this.auth = new firebase.auth();
    }

    render() {
        return <SidebarPresentation onClick={this.signOut} currentUser={this.props.currentUser} />;
    }

    @autobind
    signOut() {
        this.auth.signOut().then(() => browserHistory.push('/'));
    }
}
