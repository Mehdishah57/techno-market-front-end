import React, { useContext } from 'react';
import { Routes , Route } from "react-router-dom";
import { UserContext } from './../global/UserContext';
import UserImage from '../components/UserImage';
import UserNav from './../components/UserNav';
import MyAds from './MyAds';
import Favourites from './Favourites';
import NameSection from '../components/Profile/NameSection';

import "../styles/profile.scss";

const Profile = () => {
	const [user] = useContext(UserContext);

	return (
		<div className="profile-wrapper">
			<UserImage />
			<NameSection />
			<Routes>
				<Route path='/' element={<UserNav />} />
				<Route path='my-ads' element={<MyAds />}/>
				<Route path='favourites' element={<Favourites />} />
			</Routes>
		</div>
	)
}

export default Profile;