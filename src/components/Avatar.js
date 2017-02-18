import React from 'react';

export default ({currentUser}) => (
    <img src={currentUser.photoURL} 
        alt={`avatar for ${currentUser.displayName}`} 
        className="profile-picture" />
);



