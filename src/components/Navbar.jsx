import React, { useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from './../global/UserContext';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import "../styles/nav.scss";

const Navbar = () => {
	const [user, setUser] = useContext(UserContext);
	const navigate = useNavigate();
	const isActive = navProps => navProps.isActive ? "link-active" : "link-asleep";

	const handleLogout = () => {
		localStorage.removeItem("fyptoken");
		setUser({});
	}

	return (
		<nav className="nav-wrapper">
			<ul className="banner">
				<li>
					<NavLink to="/home" className={isActive}>
						<HomeOutlinedIcon fontSize='large' />
						<div className='text'>Techno Market Place</div>
					</NavLink>
				</li>
			</ul>
			<ul className='mid'>
				{user && !user._id && <li>
					<NavLink to="/login" className={isActive}>
						Sign In <LoginIcon />
					</NavLink>
				</li>}
				{user && !user._id && <li><NavLink to="/signup" className={isActive}>
					Sign Up <LogoutIcon /></NavLink>
				</li>}
			</ul>
			{user && user._id && <ul className="user">
				<li className='sell'>
					<NavLink to="/sell" className={isActive}>
						<AddIcon fontSize='large' />
					</NavLink>
				</li>
				<li className='messages'>
					<NavLink to="/messages" className={isActive}>
						<MailOutlineIcon fontSize='large' />
						{user.notifications?.length && <div className='num'>{user.notifications.length}</div>}
					</NavLink>
				</li>
				<li className='favourites'>
					<NavLink to="/profile/favourites" className={isActive}>
						<FavoriteBorderIcon fontSize='large' color='error' />
						{user.favourites?.length ? <div className="num">{user.favourites?.length}</div> : null}
					</NavLink>
				</li>
				<li className='picture' >
					{user.image ? <img onClick={() => navigate("profile")} src={user.image.url} alt="" /> : <PersonOutlineIcon onClick={() => navigate("profile")} />}
					<div className="menu">
						<Button onClick={() => navigate("/profile/my-ads")} color="inherit" variant="contained">My Ads</Button>
						<Button onClick={handleLogout} color="inherit" variant="contained">Logout</Button>
					</div>
				</li>
			</ul>}
		</nav>
	)
}

export default Navbar
