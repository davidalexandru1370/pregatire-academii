import React from 'react';
import connectionUserLogo from '../Utilities/index.js'
const ProfileCard = () => {
    return (
        <div>
            <img src={`${connectionUserLogo}`} width="50px"/>
            <span>Contul meu</span>
        </div>
    );
}

export default ProfileCard;
