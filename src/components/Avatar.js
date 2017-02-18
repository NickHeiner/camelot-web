import React from 'react';
import './Avatar.less';

export default ({currentUser}) => (
    currentUser ? 
        <img src={currentUser.photoURL} 
            alt={`avatar for ${currentUser.displayName}`} 
            className="profile-picture" />
        : <span className="profile-picture unknown" aria-label="No one">?</span>
);



