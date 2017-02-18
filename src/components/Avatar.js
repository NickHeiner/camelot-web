import React from 'react';
import './Avatar.less';

export default function Avatar({currentUser, isActive}) {
    return currentUser ? 
        <img src={currentUser.photoURL} 
            alt={`avatar for ${currentUser.displayName}`} 
            className={`profile-picture ${isActive ? 'active' : ''}`} />
        : <span className="profile-picture unknown" aria-label="No one">?</span>;
};
