import React, {PureComponent} from 'react';
import SignIn from '../pages/SignIn';
import Sidebar from './Sidebar';
import {PageHeader} from 'react-bootstrap';
import _ from 'lodash';
import {setOffline} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {css} from 'glamor';
import {pageHeaderMarginTop} from '../styles';
@connect(
  ({firebase}) => ({currentUser: firebase.profile}),
  dispatch => bindActionCreators({
    setOffline
  }, dispatch)
)
class Frame extends PureComponent {
  render() {
    const {currentUser} = this.props;
    
    let body;
    if (currentUser) {
      // TODO is this heinous?
      this.props.children.props.params.currentUser = currentUser;
      body = this.props.children;
    } else if (currentUser === null) {
      body = <SignIn />;
    } else {
      body = <p>Loading...</p>;
    }

    const styles = css({
      textAlign: 'center',
      '& > .page-header': {
        marginTop: pageHeaderMarginTop,
        '& > h1': {
          marginTop: '-6px',
          marginBottom: '0px'
        }
      }
    });

    return (
      <div>
        {currentUser && <Sidebar currentUser={currentUser} />}
        <main {...styles}>
          <PageHeader>Camelot {this.props.offline && '– Offline Dev Mode'}</PageHeader>
          {body}
        </main>
      </div>
    );
  }
}

export default Frame;
