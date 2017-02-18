import React from 'react';

export default props => (
    <img src={props.currentUser.photoURL} 
        alt={`avatar for ${props.currentUser.displayName}`} 
        className="profile-picture" />
);



