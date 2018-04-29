import React, {PureComponent} from 'react';
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

    return <React.Fragment>
      {!currentUser.isEmpty && <Sidebar currentUser={currentUser} />}
      <main {...styles}>
        <PageHeader>Camelot {this.props.offline && '– Offline Dev Mode'}</PageHeader>
        {this.props.children}
      </main>
    </React.Fragment>;
  }
}

export default Frame;
