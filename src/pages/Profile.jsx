import React, { useContext } from 'react';
import { UserContext } from './../global/UserContext';
import UserImage from '../components/UserImage';

import "../styles/profile.scss";

const Profile = () => {
	const [user] = useContext(UserContext);

	return (
		<div className="profile-wrapper">
			<UserImage />
			<div className="username">{user.name}</div>
			{JSON.stringify(user)}
		</div>
	)
}

export default Profile;