import React, {PureComponent} from 'react';
import './Avatar.less';
import classnames from 'classnames';

export default class Avatar extends PureComponent {
  render() {
    const {currentUser, isActive} = this.props;
    const classes = classnames('profile-picture', {
      active: isActive
    });
    return currentUser 
            ? <img src={currentUser.get('photoURL')} 
                alt={`avatar for ${currentUser.get('displayName')}`} 
                className={classes} />
            : <span className="profile-picture unknown" aria-label="No one">?</span>;
  }
}
