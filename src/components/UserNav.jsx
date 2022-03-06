import React from 'react'
import { useNavigate } from 'react-router-dom';

import "../styles/user-nav.scss";

const UserNav = () => {
	const navigate = useNavigate();
	return (
		<div className='user-nav-wrapper'>
			<ul>
				<li>Change Phone Number</li>
				<li onClick={() => navigate("my-ads")}>View Your Ads</li>
				<li>Favourite Ads</li>
				<li>Coming Soon</li>
			</ul>
		</div>
	)
}

export default UserNav