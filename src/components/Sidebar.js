import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import autobind from 'autobind-decorator';
import {Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {slide as SlideMenu} from 'react-burger-menu';
import {firebaseConnect} from 'react-redux-firebase';
import Avatar from './Avatar';
import {css} from 'glamor';

export class SidebarPresentation extends PureComponent {
  static propTypes = {
    currentUser: PropTypes.object.isRequired
  }
  render() {
    const currentUser = this.props.currentUser;
    const styles = css({
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px'
    });
    return (
            <SlideMenu>
                <div {...styles}>
                    <span>{currentUser.displayName}</span>
                    <Avatar currentUser={currentUser} />
                </div>
                <Button bsStyle="primary" onClick={this.props.onSignOutClick}>Sign Out</Button>
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
    return <SidebarPresentation onSignOutClick={this.signOut} currentUser={this.props.currentUser} />;
  }

  @autobind
  signOut() {
    this.props.firebase.logout().then(() => browserHistory.push('/'));
  }
}

export default Sidebar;
