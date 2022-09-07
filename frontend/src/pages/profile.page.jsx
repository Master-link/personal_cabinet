import React from 'react';
import './homepage.style.scss';
import Profile from '../components/profiles/profiles.component';

const ProfilePage = ({...props}) => (
  <div>
    <Profile {...props} />
  </div>
)

export default ProfilePage;