import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import autobind from 'autobind-decorator';
import {Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {slide as SlideMenu} from 'react-burger-menu';
import {firebaseConnect} from 'react-redux-firebase';
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

@firebaseConnect()
class Sidebar extends PureComponent {
  static propTypes = {
    currentUser: PropTypes.object.isRequired
  }

  render() {
    return <SidebarPresentation onClick={this.signOut} currentUser={this.props.currentUser} />;
  }

    @autobind
  signOut() {
    this.props.firebase.logout().then(() => browserHistory.push('/'));
  }
}

export default Sidebar;
